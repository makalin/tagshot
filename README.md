# TagShot

A tiny, no-backend meme toolkit that turns your text + tags into polished, shareable **fake screen** images (tweet-style posts, alerts, headlines, chat bubbles). Runs entirely on **GitHub Pages**—no API keys, no servers.

---

## ✨ What it does

* **Type a tag** (e.g., `#BREAKING`, `NEW:`) → get a crisp “screenshot” image.
* **Preset templates:** X/Tweet-style post, News alert banner, Chat bubble, System popup.
* **One-click export:** PNG (retina), optional transparent background.
* **URL-as-config:** Everything is reproducible via query params for instant links.
* **Works on GitHub Pages:** 100% static, client-side rendering (Canvas).

> Inspiration example: an X post like `https://x.com/elonmusk/status/1955343219648237961`.

---

## 🚀 Demo (coming soon!)

```
https://makalin.github.io/tagshot/
```

Try query params:

```
/?t=%23BREAKING&template=xpost&name=Elon%20Musk&handle=elonmusk
&text=We%20turned%20tags%20into%20screenshots.%20Open%20source!
&avatar=https%3A%2F%2F…%2Felon.png&likes=124k&replies=9,102&reposts=31k&theme=dark
```

*(URL-encode values; line breaks shown here for readability.)*

---

## 🧩 Templates

* **xpost** – Tweet-style card (name, handle, text, counts, time, avatar, badge).
* **banner** – Full-width news/alert bar with tag and headline.
* **chat** – Chat bubble (sender, message, time, avatar).
* **popup** – System modal (title, body, buttons).

Switch with `template=xpost|banner|chat|popup`.

---

## 🔧 Fields (URL Params)

| Param      | Template(s)         | Example                                 |                           |
| ---------- | ------------------- | --------------------------------------- | ------------------------- |
| `t` (tag)  | all                 | `#BREAKING`, `PSA:`, `NEW:`             |                           |
| `template` | all                 | `xpost`, `banner`, `chat`, `popup`      |                           |
| `text`     | all                 | Main content                            |                           |
| `theme`    | all                 | `light`, `dark`                         |                           |
| `bg`       | all                 | CSS color or hex (e.g., `%23121212`)    |                           |
| `name`     | xpost, chat         | `Elon Musk`                             |                           |
| `handle`   | xpost               | `elonmusk`                              |                           |
| `avatar`   | xpost, chat         | Public image URL                        |                           |
| `likes`    | xpost               | `124k`                                  |                           |
| `reposts`  | xpost               | `31k`                                   |                           |
| `replies`  | xpost               | `9,102`                                 |                           |
| `time`     | xpost, chat, banner | `2:34 PM · Aug 13, 2025`                |                           |
| `headline` | banner              | `Massive latency drop across the fleet` |                           |
| `buttons`  | popup               | \`OK                                    | Cancel\` (pipe-separated) |
| `og`       | xpost               | A public URL to prefill via Open Graph  |                           |

> Note: OG prefill is **best-effort** and depends on CORS/availability. Manual editing is always available.

---

## 🛠 Tech

* **Vite + TypeScript** (vanilla)
* **Canvas export** via `html2canvas` (client-only)
* **No frameworks required** (small, fast build)
* Minimal CSS with CSS variables for theming

---

## 📦 Quick Start

```bash
# 1) Use this repo as a template on GitHub
# 2) Clone your new repo
npm i
npm run dev
# open http://localhost:5173
```

Build:

```bash
npm run build
```

---

## 🌐 Deploy to GitHub Pages

1. **Settings → Pages**

   * Source: `GitHub Actions`
2. Add workflow: `.github/workflows/pages.yml`

```yaml
name: Deploy TagShot to Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

Your site will appear at `https://<user>.github.io/<repo>/`.

---

## 🖱 UI Flow

1. Type your **tag** (`#BREAKING`)
2. Choose **template** (X post, banner, chat, popup)
3. Fill **fields** (name, handle, text, etc.)
4. **Export PNG** (with/without background)
5. **Copy link** (URL params included for reproducibility)

---

## 🧠 How It Works

* Form state → Renders a hidden DOM “frame” → Captured with `html2canvas` → PNG download.
* URL params hydrate state on load.
* Optional **Open Graph** fetch to prefill when `og` param exists (best-effort; falls back to manual inputs).

---

## 🔒 Legal & Ethics

* This project is for **parody/meme/educational** use.
* Don’t impersonate real individuals or brands deceptively.
* Respect trademarks (X/Twitter, etc.)—this project is **not affiliated** with any platform.

---

## 🗂 Folder Structure

```
/public        # icons, default avatars
/src
  /templates   # xpost.ts, banner.ts, chat.ts, popup.ts (render fns)
  /styles      # base.css, themes.css
  main.ts      # state, router (URL params), exporter
  ui.ts        # minimal controls
index.html
```

---

## 🧪 Dev Notes

* All templates sized for **1080×1350** by default (IG-friendly).
  Use `?w=2048&h=1024` to override export size.
* Fonts: system stack by default; drop a `.woff2` into `/public/fonts` and set `--font-stack`.

---

## 🐛 Troubleshooting

* **Blank avatars?** Cross-origin images may be blocked. Use images with CORS enabled or upload to your repo `/public`.
* **OG prefill fails?** Some sites block CORS. Paste content manually.
* **Jagged text?** Export at 2× and downscale.

---

## 📜 License

MIT

---

## 🙌 Contributing

PRs for new templates (e.g., YouTube comment, app store review card, terminal output) are welcome. Keep them dependency-light and themeable.

---

## ✅ Roadmap

* SVG export option (for perfect scaling)
* More templates (story/storyboard, SMS/iMessage, Git log, commit diff)
* Drop-in **watermark** toggle
* Local font picker

---

**Happy tagging!**
