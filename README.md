# 🚀 Virtus Dakura Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features a **Sanity CMS** integration for easy content management, immersive animations, and a tech-aesthetic design.

![Portfolio Preview](https://virtus-dakura.vercel.app)

## ✨ Features

### 🎨 Design & UX
- **Modern Tech Aesthetic**: Futuristic design with animated backgrounds and particle effects
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Scroll-triggered animations with performance optimizations
- **Accessibility First**: WCAG compliant with reduced motion support

### 🛠️ Technical Excellence
- **React 19**: Latest React with modern hooks and best practices
- **Vite**: Lightning-fast development and optimized builds
- **Tailwind CSS**: Utility-first styling with custom animations
- **Sanity CMS**: Headless CMS for content management
- **ESLint**: Code quality and consistency enforcement

### 📝 Content Management (Sanity CMS)
- **Easy Content Updates**: Edit projects, skills, and personal info without touching code
- **Image Optimization**: Automatic image optimization via Sanity CDN
- **Real-time Updates**: Changes appear on the site immediately
- **Contact Message Storage**: Form submissions saved to CMS + email notifications

### 🎯 Portfolio Sections
- **Hero Section**: Eye-catching landing with animated introduction
- **About**: Professional summary with key statistics and tech stack
- **Projects**: Showcase of featured work with filtering
- **Services/Skills**: Technical expertise and offerings
- **Contact**: Interactive contact form with email notifications

## 🏗️ Project Structure

```
portfolio/
├── frontend/                # React application
│   ├── public/             # Static assets
│   │   └── Profile.png     # Favicon
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ScrollAnimation.jsx
│   │   │   ├── Service.jsx
│   │   │   └── TechBackground.jsx
│   │   ├── utils/          # Utility functions
│   │   │   ├── sanity.js   # Sanity client & queries
│   │   │   └── iconMap.jsx # Icon mapping utility
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                # Environment variables (not in repo)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── studio/                  # Sanity Studio (CMS)
│   ├── schemaTypes/        # Content schemas
│   │   ├── hero.ts
│   │   ├── about.ts
│   │   ├── project.ts
│   │   ├── skill.ts
│   │   └── contactMessage.ts
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── .gitignore
├── README.md
└── vercel.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Sanity account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VirtusDakura/portfolio.git
   cd portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Sanity Studio dependencies**
   ```bash
   cd ../studio
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `frontend/` directory:
   ```env
   # Web3Forms Access Key (for email notifications)
   # Get your free key at: https://web3forms.com/
   VITE_WEB3FORMS_KEY=your_web3forms_access_key

   # Sanity Write Token (for saving contact messages)
   # Create at: https://sanity.io/manage → Your Project → API → Tokens
   VITE_SANITY_WRITE_TOKEN=your_sanity_write_token
   ```

5. **Start development servers**
   
   In one terminal (frontend):
   ```bash
   cd frontend
   npm run dev
   ```
   
   In another terminal (Sanity Studio):
   ```bash
   cd studio
   npm run dev
   ```

6. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Sanity Studio: `http://localhost:3333`

## 📝 Content Management

### Sanity Studio Dashboard

Access your CMS at: **[virtus-portfolio.sanity.studio](https://virtus-portfolio.sanity.studio)**

| Content Type | What You Can Edit |
|--------------|-------------------|
| **Hero Section** | Name, roles, bio, profile image, resume, social links |
| **About Section** | Stats, tech stack, paragraphs, about image |
| **Projects** | Add/edit projects with images, tech stack, links |
| **Skills/Services** | Skills with icons, technologies, descriptions |
| **Contact Messages** | View all form submissions (marked as read/unread) |

### Updating Content

1. Go to [virtus-portfolio.sanity.studio](https://virtus-portfolio.sanity.studio)
2. Log in with your Sanity account
3. Edit any section
4. Click **"Publish"** to save changes
5. Changes appear on your live site immediately!

## 📝 Scripts

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

### Sanity Studio
```bash
cd studio
npm run dev          # Start local Sanity Studio
npx sanity deploy    # Deploy Studio to sanity.studio
npx sanity cors add  # Add CORS origin
```

## 🌐 Deployment

### Deploy Frontend to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```

2. **Add Environment Variables in Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project → Settings → Environment Variables
   - Add `VITE_WEB3FORMS_KEY` and `VITE_SANITY_WRITE_TOKEN`

3. **Automatic Deployment**
   - Vercel auto-deploys on every push to main branch

### Deploy Sanity Studio

```bash
cd studio
npx sanity deploy
```

Studio will be available at: `https://your-project.sanity.studio`

## 🔧 Configuration

### Sanity Project Settings

The Sanity project is configured in `studio/sanity.config.ts`:

```typescript
projectId: '6ajwuesb'
dataset: 'production'
```

### CORS Configuration

To allow your frontend to access Sanity, add CORS origins:

```bash
cd studio
npx sanity cors add http://localhost:5173    # Local development
npx sanity cors add https://your-domain.com  # Production
```

## 🛠️ Built With

- **[React 19](https://react.dev/)** - UI library
- **[Vite](https://vite.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[Sanity](https://www.sanity.io/)** - Headless CMS
- **[Web3Forms](https://web3forms.com/)** - Form submissions & email
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

## 📞 Contact

**Virtus Dakura**
- Portfolio: [virtus-dakura.vercel.app](https://virtus-dakura.vercel.app)
- GitHub: [@VirtusDakura](https://github.com/VirtusDakura)
- LinkedIn: [Virtus Dakura](https://linkedin.com/in/virtus-dakura)
- Email: dakuravirtus@gmail.com

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Virtus Dakura
