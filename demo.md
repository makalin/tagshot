# TagShot Demo Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🎯 How to Use

### 1. Choose a Template
- **X/Tweet Post**: Social media post style
- **News Banner**: Alert/announcement style  
- **Chat Bubble**: Messaging app style
- **System Popup**: Modal/dialog style

### 2. Fill in the Details
- **Tag**: Your hashtag or label (e.g., `#BREAKING`, `NEW:`, `PSA:`)
- **Text**: Main content message
- **Theme**: Light or dark mode
- **Background**: Custom background color

### 3. Template-Specific Fields

#### X Post Template:
- Name, Handle, Avatar
- Engagement stats (Likes, Reposts, Replies)
- Timestamp

#### Banner Template:
- Headline text
- Timestamp

#### Chat Template:
- Sender name
- Avatar URL
- Timestamp

#### Popup Template:
- Title
- Button labels (pipe-separated: `OK|Cancel`)

### 4. Export Options
- **Generate Preview**: See your creation
- **Export PNG**: Download with background
- **Export PNG (Transparent)**: Download with transparent background
- **Copy Link**: Get shareable URL with all parameters

## 🔗 URL Parameters

The app supports URL parameters for easy sharing:

```
/?t=%23BREAKING&template=xpost&name=Elon%20Musk&handle=elonmusk&text=We%20turned%20tags%20into%20screenshots!&theme=dark
```

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Generate preview
- **Ctrl/Cmd + S**: Export PNG

## 🎨 Customization

- **Dimensions**: Set custom width/height (default: 1080×1350)
- **Themes**: Switch between light/dark modes
- **Backgrounds**: Use any CSS color or hex value
- **Fonts**: Uses system fonts by default

## 🌐 Open Graph Support

Paste a URL in the "Open Graph URL" field to auto-fill content from that page (best-effort, depends on CORS).

## 💾 Auto-Save

Your work is automatically saved to localStorage every 3 seconds.

## 🚀 Deployment

The project includes GitHub Actions workflow for automatic deployment to GitHub Pages.

---

**Happy tagging!** 🎯✨
