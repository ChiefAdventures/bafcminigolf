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

  // Expose a small API on window for the pages to use.
  window.PCGG = {
    STORAGE_KEY: STORAGE_KEY,
    TOTAL_HOLES: TOTAL_HOLES,
    PAR_PER_HOLE: PAR_PER_HOLE,
    blankState: blankState,
    loadState: loadState,
    saveState: saveState,
    resetState: resetState
  };

  // ---- Rules page: enable Continue only when the box is checked -------
  window.toggleAgree = function () {
    var check = document.getElementById("agree-check");
    var btn = document.getElementById("continue-btn");
    if (check && btn) btn.disabled = !check.checked;
  };
})();
