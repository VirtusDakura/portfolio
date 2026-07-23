# 🎨 Sanity Studio — Virtus Dakura Portfolio CMS

This directory contains the **Sanity Studio v3** headless CMS configuration for managing portfolio content dynamically.

---

## 📌 Content Schemas

Sanity Studio is configured with 4 active content models (`studio/schemaTypes`):

| Schema File | Content Model | Purpose |
|-------------|---------------|---------|
| `hero.ts` | **Hero Section** | Manages name, roles, intro bio, social links, profile image, and resume asset. |
| `about.ts` | **About Section** | Manages bio paragraphs, engineering principles, and core technologies stack. |
| `project.ts` | **Projects** | Manages project showcases with images, category filters, tech stack tags, live demo & GitHub URLs. |
| `skill.ts` | **Capabilities (Services)** | Manages technical domains, icons, technologies, and deliverable highlights. |

---

## 🚀 Development & Commands

### 1. Start Local Studio
```bash
npm run dev
```
Access the local CMS dashboard at: `http://localhost:3333`

### 2. Build Studio
```bash
npm run build
```

### 3. Deploy Studio to Sanity Cloud
```bash
npx sanity deploy
```

### 4. Manage CORS Origins
Allow your local frontend and production deployment domain to query Sanity APIs:
```bash
# Allow local Vite dev server
npx sanity cors add http://localhost:5173

# Allow production domain
npx sanity cors add https://virtus-dakura.vercel.app
```

---

## ⚙️ Sanity Configuration

Project details defined in `sanity.config.ts`:
- **Project ID**: `6ajwuesb`
- **Dataset**: `production`
