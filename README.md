# Steve Leve Consulting Website

A modern, performance-optimized consulting website built with Astro + React and deployed on Cloudflare Pages. This project demonstrates modern web development practices while serving as a professional platform for consulting services and job applications.

## 🚀 Project Overview

This website modernizes a static GitHub Pages site into a dynamic, scalable web application using cutting-edge technologies. The project serves multiple purposes:

- **Professional Consulting Platform**: Showcase services and case studies
- **Job Application Portfolio**: Demonstrate technical capabilities
- **Learning Laboratory**: Hands-on experience with modern DevOps technologies

## 🛠 Technology Stack

### Frontend
- **Astro 4.x** - Static site generation with islands architecture
- **React 18** - Interactive components where needed
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling with custom design system

### Backend & Infrastructure
- **Cloudflare Pages** - Static hosting with edge optimization
- **Cloudflare Workers** - Serverless API endpoints (planned)
- **Hono** - Fast, lightweight framework for Workers (planned)
- **Terraform** - Infrastructure as code (planned)

### Development & Deployment
- **Vite** - Fast build tooling (included with Astro)
- **GitHub Actions** - CI/CD automation (planned)
- **Wrangler** - Cloudflare deployment CLI

## 📁 Project Structure

```
├── src/consulting-website/          # Main Astro application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Header.astro        # Navigation with theme toggle
│   │   │   ├── Footer.astro        # Social links and copyright
│   │   │   ├── Hero.astro          # Animated hero sections
│   │   │   ├── ServicePillars.astro # Service grid cards
│   │   │   └── ...
│   │   ├── layouts/
│   │   │   └── Layout.astro        # Master page layout
│   │   ├── pages/                  # Route-based pages
│   │   │   ├── index.astro         # Homepage
│   │   │   ├── services.astro      # Service offerings
│   │   │   ├── case-studies.astro  # Project examples
│   │   │   └── about.astro         # Professional background
│   │   └── styles/
│   │       └── global.css          # Global styles and Tailwind
│   ├── astro.config.mjs           # Astro configuration
│   ├── wrangler.jsonc             # Cloudflare deployment config
│   └── package.json               # Dependencies and scripts
├── docs/                          # Project documentation
│   ├── adr/                       # Architecture Decision Records
│   ├── DEVELOPMENT-JOURNAL.md     # Development progress log
│   └── README.md                  # Documentation standards
├── static_site/                   # Original static site (reference)
└── .kiro/specs/                   # Project specifications
```

## 🎨 Design System

### Color Palette
- **Brand**: #6750A4 (Purple)
- **Brand Ink**: #21005D (Dark Purple)
- **Surface**: #FFFFFF / #1E192B (Light/Dark)
- **Background**: #FAFAFE / #14101F (Light/Dark)

### Key Features
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Dark/Light Themes**: Automatic system detection with manual override
- **Material Design**: Icons and interaction patterns
- **Smooth Animations**: Hover effects and micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd consulting-website-modernization
   ```

2. **Navigate to the Astro project**
   ```bash
   cd src/consulting-website
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:4321
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Cloudflare Pages (requires setup)

## 📋 Development Workflow

This project follows a **documentation-driven development** approach:

1. **Requirements First**: Define clear requirements and acceptance criteria
2. **Design Documentation**: Create architectural decisions and design docs
3. **Implementation**: Build features according to specifications
4. **Documentation**: Update development journal and ADRs

### Key Documents
- **Requirements**: `.kiro/specs/consulting-website-modernization/requirements.md`
- **Design**: `.kiro/specs/consulting-website-modernization/design.md`
- **Tasks**: `.kiro/specs/consulting-website-modernization/tasks.md`
- **ADRs**: `docs/adr/` - Architecture Decision Records
- **Journal**: `docs/DEVELOPMENT-JOURNAL.md` - Development progress

## 🎯 Current Status

### ✅ Completed Features
- [x] Astro + React + TypeScript setup
- [x] Responsive navigation with theme switching
- [x] Animated homepage with service pillars
- [x] Services page with detailed offerings
- [x] Case studies with structured presentations
- [x] About page with professional background
- [x] Complete design system implementation
- [x] Mobile-responsive layouts

### 🚧 In Progress
- [ ] Contact form with validation
- [ ] Cloudflare Workers API integration
- [ ] Email service setup
- [ ] Production deployment pipeline

### 📅 Planned Features
- [ ] Terraform infrastructure management
- [ ] Advanced monitoring and analytics
- [ ] Content management system integration
- [ ] Client authentication portal (future)

## 🚀 Deployment

### Cloudflare Pages
The site is configured for deployment on Cloudflare Pages with:
- Automatic builds from Git commits
- Edge optimization and global CDN
- Custom domain support
- Environment-specific deployments

### Build Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+

## 📊 Performance

### Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Key Optimizations
- Astro islands architecture for minimal JavaScript
- Optimized images and lazy loading
- Efficient CSS with custom properties
- Fast build times with Vite

## 🤝 Contributing

This is a personal consulting website project. For questions or suggestions:

1. Review the documentation in `docs/`
2. Check existing ADRs for architectural decisions
3. Follow the established development workflow

## 📄 License

This project is for personal/professional use. Please respect the content and branding.

## 📞 Contact

**Steve Leve**
- Website: [Coming Soon - This Project!]
- LinkedIn: [steve-leve](https://www.linkedin.com/in/steve-leve)
- GitHub: [SteveLeve](https://github.com/SteveLeve)

---

*Built with modern web technologies for performance, maintainability, and developer experience.*