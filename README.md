# Personal Website

Personal site for tarunkota.com — plain HTML/CSS/JS, hosted on GitHub Pages.

## Structure
- `index.html` — page markup (About / Writing / Photos tabs)
- `static/css/style.css` — all styling and the light/dark theme tokens
- `static/js/app.js` — tab switching, article expand/collapse, theme toggle, photo grid
- `static/js/posts.js` — blog post content (edit this to add/change posts)
- `Photos/` — gallery images + `manifest.json` listing them

## Adding a blog post
Append an object to the array in `static/js/posts.js` (title, teaser, date,
and body paragraphs). Read time is computed automatically.

## Adding photos
Drop image files into `Photos/` and push — a GitHub Action regenerates
`Photos/manifest.json` automatically. To preview locally, regenerate it
yourself first:

```
node scripts/generate-photos-manifest.js
```

## Local preview
The photo grid loads `manifest.json` via fetch, so use a local server rather
than opening the file directly:

```
python3 -m http.server 4173
```
