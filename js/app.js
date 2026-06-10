/* =====================================================
   Pirate's Cove Glow Golf — shared logic
   Holds the game state (players, ball colors, scores) and
   saves it in the browser so it carries across pages.
   ===================================================== */

(function () {
  "use strict";

  // Storage key + how many holes the course has.
  var STORAGE_KEY = "pccgg_state";
  var TOTAL_HOLES = 18;
  var PAR_PER_HOLE = 3;

  // Neon accent colors auto-assigned to players (in order).
  // { name, hex, glow } — glow is a soft rgba for the dot's shadow.
  var COLORS = [
    { name: "Teal",   hex: "#00f0d0", glow: "rgba(0,240,208,0.6)" },
    { name: "Pink",   hex: "#ff5ad0", glow: "rgba(255,90,208,0.6)" },
    { name: "Purple", hex: "#b14fff", glow: "rgba(177,79,255,0.6)" },
    { name: "Gold",   hex: "#ffd34d", glow: "rgba(255,211,77,0.6)" },
    { name: "Blue",   hex: "#3da5ff", glow: "rgba(61,165,255,0.6)" },
    { name: "Green",  hex: "#69ff8c", glow: "rgba(105,255,140,0.6)" }
  ];

  // ---- State shape ----------------------------------------------------
  // {
  //   teamName: "",
  //   players: [ { name, color, scores: [18 numbers, 0 = not entered] }, ... ],
  //   teeOrder: [player indexes in current playing order],
  //   currentHole: 1
  // }

  function blankState() {
    return {
      teamName: "",
      players: [],
      teeOrder: [],
      currentHole: 1,
      totalHoles: TOTAL_HOLES,
      par: PAR_PER_HOLE
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return blankState();
      var parsed = JSON.parse(raw);
      return parsed && parsed.players ? parsed : blankState();
    } catch (e) {
      return blankState();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage may be unavailable on some file:// setups; ignore */
    }
  }

  function resetState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  // Compute the playing order for a given hole (0-based hole index).
  // Hole 0 (the 1st hole) uses the original entry order. For later holes,
  // sort by fewest strokes on the previous hole; break ties by stepping
  // further back hole by hole; if still tied, fall back to entry order.
  function teeOrderForHole(state, holeIndex) {
    var order = state.players.map(function (_, i) { return i; });
    if (holeIndex <= 0) return order;

    order.sort(function (a, b) {
      for (var k = holeIndex - 1; k >= 0; k--) {
        var sa = state.players[a].scores[k];
        var sb = state.players[b].scores[k];
        if (sa !== sb) return sa - sb; // fewer strokes tee off first
      }
      return a - b; // perfect tie -> original starting order
    });
    return order;
  }

  // Expose a small API on window for the pages to use.
  window.PCGG = {
    STORAGE_KEY: STORAGE_KEY,
    TOTAL_HOLES: TOTAL_HOLES,
    PAR_PER_HOLE: PAR_PER_HOLE,
    COLORS: COLORS,
    MAX_PLAYERS: COLORS.length,
    blankState: blankState,
    loadState: loadState,
    saveState: saveState,
    resetState: resetState,
    teeOrderForHole: teeOrderForHole
  };

  // ---- Rules page: enable Continue only when the box is checked -------
  window.toggleAgree = function () {
    var check = document.getElementById("agree-check");
    var btn = document.getElementById("continue-btn");
    if (check && btn) btn.disabled = !check.checked;
  };
})();
