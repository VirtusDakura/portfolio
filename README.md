# 🚀 Virtus Dakura Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features immersive animations, a tech-aesthetic design, and comprehensive showcase of projects and skills.

![Portfolio Preview](./preview.png)

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
- **ESLint**: Code quality and consistency enforcement
- **React Icons**: Comprehensive icon library for UI elements

### 🎯 Portfolio Sections
- **Hero Section**: Eye-catching landing with animated introduction
- **About**: Professional summary with key statistics
- **Projects**: Showcase of featured work
- **Services**: Technical expertise and offerings
- **Contact**: Interactive contact form with social links

## 🏗️ Project Structure

```
portfolio/
├── frontend/              # React application
│   ├── public/           # Static assets
│   │   └── Profile.png   # Profile image
│   ├── src/
│   │   ├── assets/       # Image assets
│   │   │   ├── About.jpg
│   │   │   ├── hero-image.png
│   │   │   ├── Project1.png
│   │   │   ├── Project2.png
│   │   │   └── Project3.png
│   │   ├── components/   # React components
│   │   │   ├── About.jsx          # About section
│   │   │   ├── Contact.jsx        # Contact form
│   │   │   ├── Hero.jsx           # Hero section
│   │   │   ├── MobileTechMarquee.jsx  # Mobile tech marquee
│   │   │   ├── Navbar.jsx         # Navigation
│   │   │   ├── Projects.jsx       # Projects showcase
│   │   │   ├── ScrollAnimation.jsx    # Animation wrapper
│   │   │   ├── Service.jsx        # Services section
│   │   │   └── TechBackground.jsx # Animated background
│   │   ├── App.jsx       # Main app component
│   │   ├── App.css       # App-specific styles
│   │   ├── main.jsx      # React entry point
│   │   └── index.css     # Global styles
│   ├── index.html        # HTML template
│   ├── package.json      # Dependencies
│   ├── vite.config.js    # Vite configuration
│   └── eslint.config.js  # ESLint configuration
├── .gitignore            # Git ignore rules
├── README.md             # Documentation
└── vercel.json           # Vercel deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VirtusDakura/portfolio.git
   cd portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🔧 Configuration

### Customization

#### 🎨 Styling
- **Colors**: Modify the color scheme in `src/index.css` or directly in components
- **Animations**: Add custom animations in `src/index.css`
- **Components**: Each component is fully customizable

#### 📱 Responsive Design
- **Mobile-first**: Built with mobile-first responsive design
- **Breakpoints**: Standard Tailwind CSS breakpoints
- **Touch-friendly**: Optimized for touch interactions

#### 🎭 Animations
- **ScrollAnimation**: Reusable component for scroll-triggered animations
- **TechBackground**: Section-specific animated backgrounds
- **Performance**: Automatically reduces animations for users who prefer reduced motion

## 📱 Components Overview

### Core Components

#### `<ScrollAnimation>`
Reusable animation component with Intersection Observer API:
- **Directions**: left, right, up, down, fade
- **Customizable**: delay, duration, threshold
- **Performance**: Optimized with proper cleanup

#### `<TechBackground>`
Sophisticated animated background system:
- **Section-specific**: Different themes per section
- **Performance**: Reduced motion support
- **Customizable**: Colors, particle count, animation intensity

#### `<Navbar>`
Responsive navigation with mobile menu:
- **Smooth scrolling**: Anchor links with smooth scrolling
- **Mobile-first**: Hamburger menu with tech aesthetic
- **Fixed positioning**: Stays visible during scroll

### Section Components

- **`<Hero>`**: Landing section with introduction
- **`<About>`**: Personal info, stats, and technologies
- **`<Service>`**: Skills and expertise showcase
- **`<Projects>`**: Portfolio projects showcase
- **`<Contact>`**: Contact form and social links

## 🎯 Performance Optimizations

### Image Optimization
- Lazy loading with loading states
- Optimized image formats
- Responsive image sizing

### Animation Performance
- CSS transforms for smooth animations
- `will-change` property for optimization
- Reduced motion support for accessibility

### Code Optimization
- Component lazy loading ready
- Efficient re-renders with React best practices
- Optimized bundle with Vite

## 🌐 Deployment

### Build for Production
```bash
cd frontend
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag and drop the `dist/` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

### Other Hosting Options
- **GitHub Pages**: Build and deploy the `dist/` folder
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Static website hosting

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run linting**
   ```bash
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards
- **ESLint**: Follow the configured linting rules
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utilities
- **Accessibility**: Follow WCAG guidelines
- **Performance**: Keep bundle size optimized

## 🛠️ Built With

- **[React 19](https://react.dev/)** - UI library
- **[Vite](https://vite.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[ESLint](https://eslint.org/)** - Code linting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the blazing fast build tool
- **React Icons** for the comprehensive icon library
- **Open Source Community** for inspiration and tools

## 📞 Contact

**Virtus Dakura**
- Portfolio: [virtusdakura.dev](https://virtusdakura.dev)
- GitHub: [@VirtusDakura](https://github.com/VirtusDakura)
- LinkedIn: [Virtus Dakura](https://linkedin.com/in/virtusdakura)
- Email: contact@virtusdakura.dev

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Virtus Dakura
