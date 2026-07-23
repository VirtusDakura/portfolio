# 🚀 Virtus Dakura Portfolio

A modern, high-performance developer portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Sanity CMS**. Designed with clean dark glassmorphism, responsive horizontal swipe carousels, real-time ScrollSpy navigation, and direct communication channels.

---

## ✨ Features

### 🎨 Design & UX
- **Tech Glassmorphism Aesthetic**: Dark ambient spotlights (`#09090b`), radial glows, and modern typography.
- **Responsive 2-Row Carousels**: Physics-based horizontal snap carousels for tech cards and engineering principles on mobile devices.
- **ScrollSpy Navigation**: Active section tracking highlighting navigation tabs as you scroll.
- **Accessibility & Motion Support**: Touch-optimized touch targets with smooth CSS transitions.

### 🛠️ Technical Stack
- **React 19**: Modern functional components with React Hooks.
- **Vite**: Ultra-fast HMR and optimized production bundle building.
- **Tailwind CSS**: Custom utility design system with cross-browser scrollbar hiding.
- **Sanity CMS**: Headless CMS for project and bio management.
- **Lucide & React Icons**: Icon mapping integration across technologies and services.

### 🎯 Portfolio Sections
- **Hero**: Introduction with animated titles, resume download link, and social links.
- **About & Engineering Focus**: Narrative overview, profile image frame, 2-row engineering principles, and core tech stack grid.
- **Capabilities (Services)**: Deliverable highlights and service breakdown.
- **Selected Projects**: Filterable project cards with category tabs and live demo / source code links.
- **Get In Touch**: Direct contact action cards (Direct Email, WhatsApp Instant Chat, LinkedIn & GitHub).

---

## 🏗️ Project Structure

```
portfolio/
├── frontend/                # React Vite application
│   ├── public/              # Static assets & profile images
│   │   └── Profile.png
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ScrollAnimation.jsx
│   │   │   ├── Service.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── TechBackground.jsx
│   │   │   └── WhatsAppButton.jsx
│   │   ├── utils/           # Sanity client & icon mappings
│   │   │   ├── iconMap.jsx
│   │   │   └── sanity.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── studio/                  # Sanity Studio (CMS)
│   ├── schemaTypes/         # Content schemas
│   │   ├── about.ts
│   │   ├── hero.ts
│   │   ├── project.ts
│   │   └── skill.ts
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── README.md
└── vercel.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: Package manager

### Installation & Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/VirtusDakura/portfolio.git
   cd portfolio
   ```

2. **Run Frontend locally**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Run Sanity Studio locally**
   ```bash
   cd studio
   npm install
   npm run dev
   ```
   Open `http://localhost:3333` to manage content.

---

## 📝 Content Management (Sanity CMS)

| Content Type | What You Can Edit |
|--------------|-------------------|
| **Hero Section** | Name, title, intro bio, social links, resume URL |
| **About Section** | Headings, bio paragraphs, core tech stack items |
| **Projects** | Project titles, descriptions, category tags, images, live demo & GitHub URLs |
| **Skills / Capabilities** | Technical domain titles, descriptions, deliverable highlights |

---

## 🛠️ Built With

- **[React](https://react.dev/)**
- **[Vite](https://vite.dev/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Sanity Studio](https://www.sanity.io/)**
- **[React Icons](https://react-icons.github.io/react-icons/)**

---

## 📞 Contact

**Virtus Dakura** — *Software Engineer*
- **Portfolio**: [virtus-dakura.vercel.app](https://virtus-dakura.vercel.app)
- **GitHub**: [@VirtusDakura](https://github.com/VirtusDakura)
- **LinkedIn**: [Virtus Dakura](https://linkedin.com/in/virtus-dakura)
- **Email**: dakuravirtus@gmail.com
- **WhatsApp**: [+233 59 662 1148](https://wa.me/233596621148)
