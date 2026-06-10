[README.md](https://github.com/user-attachments/files/28813323/README.md)
# bafcminigolf# Pirate's Cove Glow Golf

A mobile-first scorecard web app for the Pirate's Cove glow golf course
at Big Apple Fun Center.

## Structure

```
/
├── index.html          redirects to home/
├── css/style.css       shared neon styling (edit the look here)
├── js/app.js           shared logic: game state, helpers
├── home/index.html     welcome
├── rules/index.html    course rules
├── setup/index.html    set up your game        (coming soon)
├── play/index.html     hole-by-hole scoring     (coming soon)
└── scorecard/index.html final scorecard         (coming soon)
```

## Hosting on GitHub Pages

1. Put these files at the root of a repo (or in a `/docs` folder).
2. Repo Settings -> Pages -> deploy from your branch.
3. Your site will be at https://<username>.github.io/<repo>/

## Notes

- Game data (players, ball colors, scores) is saved in the browser via
  localStorage so it carries across pages. This works on GitHub Pages.
- When testing by opening files directly (file://), some browsers
  (Safari) restrict localStorage between pages. Hosting on Pages or
  running a local server avoids that.
