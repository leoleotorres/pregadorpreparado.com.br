# Video Streaming Page

This is a simple static video streaming page with a Netflix-like dark theme. It uses YouTube embeds and is designed for static hosting.

## Features

- Dark, modern design
- Gallery of 20 example YouTube videos populated from `videos.json`
- Thumbnails with titles and brief descriptions
- Animated overlay player (theater mode)
- Related videos disabled (`rel=0`) and minimal YouTube branding
- Fully static HTML/CSS/JS

## Usage

1. **Local testing:**
   - You can open `index.html` directly, but some browsers block `fetch()` for local files. Use a simple server instead.
   - If you have Node.js, run:
     ```bash
     npm install
     npm run start    # opens on http://localhost:8080
     ```
   - Alternatively: `npx http-server -c-1` or `python -m http.server`.

2. **Deploying to GitHub Pages:**
   - Push this repository to GitHub.
   - In repo settings, enable Pages and choose the `main` (or `master`) branch root.
   - The site will be available at `https://<your-username>.github.io/<repo>`.
   - A `.nojekyll` file is included to prevent GitHub Pages from ignoring files like `videos.json`.

3. Click on a thumbnail to open the video in a theater overlay.
4. Click outside the player or on the close button to return to the gallery.

Enjoy!