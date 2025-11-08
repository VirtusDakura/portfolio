# 🚀 Virtus Dakura Portfolio

A modern, full-stack portfolio website built with React, Vite, Tailwind CSS (frontend) and Django REST API (backend). Features immersive animations, a tech-aesthetic design, and comprehensive API integration.

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
- **Django REST Framework**: Robust backend API
- **ESLint**: Code quality and consistency enforcement
- **PropTypes**: Type checking for better developer experience

### 🔌 Backend Integration
- **Django REST API**: Full-featured backend on port 8000
- **Contact Form**: Connected to Django backend with email notifications
- **Admin Panel**: Content management through Django admin
- **Sample Data**: Population command for quick setup
- **API Documentation**: Available at `/api/`

### 🔗 Backend Ready
- **API Integration**: Comprehensive API service layer
- **Environment Configuration**: Production-ready environment management
- **Error Handling**: Robust error handling with retry mechanisms
- **Loading States**: Seamless UX with loading and error states

## 🏗️ Project Structure

```
portfolio/
├── public/                 # Static assets
│   └── Profile.png        # Profile image
├── src/
│   ├── assets/            # Image assets
│   │   ├── About.jpg
│   │   ├── hero-image.png
│   │   └── Project*.png
│   ├── components/        # React components
│   │   ├── About.jsx      # About section with stats
│   │   ├── Contact.jsx    # Contact form and info
│   │   ├── Hero.jsx       # Landing section
│   │   ├── Navbar.jsx     # Navigation with mobile menu
│   │   ├── Projects.jsx   # Portfolio showcase
│   │   ├── Service.jsx    # Skills and services
│   │   ├── ScrollAnimation.jsx  # Reusable animation component
│   │   └── TechBackground.jsx   # Animated background system
│   ├── config/            # Configuration files
│   │   └── app.config.js  # App-wide configuration
│   ├── utils/             # Utility functions
│   │   └── api.js         # API service layer
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles and animations
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VirtusDakura/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
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

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_CONTACT_API_ENDPOINT=/contact
VITE_PROJECTS_API_ENDPOINT=/projects

# Email Service (EmailJS)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Feature Flags
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_DYNAMIC_PROJECTS=false
```

### Customization

#### 🎨 Styling
- **Colors**: Modify the color scheme in `tailwind.config.js`
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

## 🔌 Backend Integration

### API Service Layer
The portfolio includes a comprehensive API service layer (`src/utils/api.js`) for seamless backend integration:

```javascript
import { apiService } from './utils/api.js';

// Send contact form
const result = await apiService.sendContactForm(formData);

// Fetch projects
const projects = await apiService.getProjects();
```

### Supported Endpoints
- `POST /api/contact` - Contact form submission
- `GET /api/projects` - Fetch projects data
- `GET /api/skills` - Fetch skills data
- `GET /api/experience` - Fetch experience data

### Error Handling
- Automatic retry mechanisms
- Graceful error messaging
- Loading state management
- Network timeout handling

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
- **`<Projects>`**: Portfolio projects with filtering
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
- Efficient re-renders with React.memo opportunities
- Optimized bundle with Vite

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables in Production
Make sure to set all required environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

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
- **Comments**: Add JSDoc comments for components
- **PropTypes**: Add PropTypes for all components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the blazing fast build tool
- **React Icons** for the comprehensive icon library

## 📞 Contact

**Virtus Dakura**
- Portfolio: [virtusdakura.dev](https://virtusdakura.dev)
- GitHub: [@VirtusDakura](https://github.com/VirtusDakura)
- LinkedIn: [LinkedIn Profile](https://linkedin.com/in/virtusdakura)
- Email: contact@virtusdakura.dev

---

⭐ **Star this repository if you found it helpful!**
