# 🚀 TagShot Deployment Guide

This guide will help you deploy TagShot to GitHub Pages and other hosting platforms.

## 🌐 GitHub Pages (Recommended)

### Prerequisites
- GitHub account
- Git installed on your computer
- Node.js and npm installed

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and click "New repository"
2. Name it `tagshot` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Push Your Code

```bash
# In your local tagshot directory
git init
git add .
git commit -m "Initial commit: TagShot meme toolkit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tagshot.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### Step 4: Access Your Site

Your TagShot app will be available at:
```
https://YOUR_USERNAME.github.io/tagshot/
```

## 🔄 Automatic Deployment

The project includes GitHub Actions that automatically deploy on every push:

- **Trigger**: Push to `main` branch
- **Build**: Runs `npm ci` and `npm run build`
- **Deploy**: Uploads `dist` folder to GitHub Pages
- **Status**: Check Actions tab for deployment status

## 🌍 Other Hosting Platforms

### Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Deploy**: Connect your GitHub repository

### Vercel

1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Deploy**: Connect your GitHub repository

### Surge.sh

```bash
npm run build
surge dist your-project-name.surge.sh
```

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## ⚙️ Environment Configuration

### Required Environment Variables
None required - TagShot runs entirely client-side!

### Optional Customization
- **Base Path**: Modify `base: './'` in `vite.config.ts` for custom paths
- **Build Output**: Change `outDir: 'dist'` if needed
- **Port**: Modify `port: 5173` for development

## 🐛 Troubleshooting

### Build Failures
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

### Deployment Issues
- **Check Actions tab** for build logs
- **Verify repository permissions** for GitHub Pages
- **Ensure main branch** is the default branch

### CORS Issues
- **Local development**: Use `npm run dev`
- **Production**: All assets are bundled, no CORS issues

## 📱 Performance Optimization

### Build Optimization
- **Tree shaking**: Enabled by default
- **Code splitting**: Automatic with Vite
- **Asset optimization**: Images and CSS are optimized

### Runtime Performance
- **Lazy loading**: Templates loaded on demand
- **Efficient rendering**: Minimal DOM manipulation
- **Memory management**: Clean preview cleanup

## 🔒 Security Considerations

- **No server-side code**: 100% client-side
- **No API keys**: All processing local
- **No data collection**: Privacy-first design
- **HTTPS only**: GitHub Pages enforces HTTPS

## 📊 Monitoring

### GitHub Pages Analytics
- **Traffic**: View in repository Insights
- **Performance**: GitHub Pages built-in monitoring
- **Uptime**: GitHub's 99.9% uptime guarantee

### Custom Analytics
Add Google Analytics or other tracking:
```html
<!-- In index.html head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🚀 Advanced Deployment

### Custom Domain
1. **Add CNAME record** pointing to `YOUR_USERNAME.github.io`
2. **Configure in GitHub Pages** settings
3. **Update Vite config** if needed

### CDN Integration
- **Cloudflare**: Point domain to GitHub Pages
- **AWS CloudFront**: Configure origin as GitHub Pages
- **Vercel Edge**: Use Vercel's global CDN

### Multi-Environment
```bash
# Development
npm run dev

# Staging
npm run build:staging

# Production
npm run build
```

## 📚 Additional Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Need help?** Open an issue on GitHub or check the troubleshooting section above! 🆘
