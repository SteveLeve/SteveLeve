import { useState, useEffect } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  id: string;
}

interface NavigationProps {
  currentPage?: string;
  navItems: NavItem[];
}

export default function Navigation({ currentPage = 'home', navItems }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme as 'light' | 'dark' || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav">
      {/* Desktop Navigation */}
      <div className="nav__links desktop-nav">
        {navItems.map(item => (
          <a 
            key={item.id}
            href={item.href} 
            className={`nav__link ${currentPage === item.id ? 'is-active' : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-toggle md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span className="material-symbols-outlined">
          {isMobileMenuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {navItems.map(item => (
            <a 
              key={item.id}
              href={item.href} 
              className={`nav__link ${currentPage === item.id ? 'is-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="nav__controls">
        <button 
          className="theme-toggle" 
          type="button" 
          aria-label="Toggle color theme"
          onClick={toggleTheme}
        >
          <span className="theme-toggle__icon material-symbols-outlined">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
      </div>

      <style jsx>{`
        .nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
        }

        .desktop-nav {
          display: flex;
          gap: 0.5rem;
        }

        .nav__controls {
          display: flex;
          gap: 0.35rem;
        }

        .nav__link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.75rem;
          border-radius: 5pt;
          text-decoration: none;
          color: var(--muted);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav__link:hover {
          background: #ECE6F0;
          color: var(--brand-ink);
        }

        .nav__link.is-active {
          background: #ECE6F0;
          color: var(--brand-ink);
        }

        .mobile-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          border-radius: 50%;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-menu-toggle:hover {
          background: var(--border);
          color: var(--ink);
        }

        .mobile-nav {
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: var(--shadow);
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 200px;
          z-index: 1000;
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          border-radius: 50%;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-toggle:hover {
          background: var(--border);
          color: var(--ink);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-toggle {
            display: flex;
          }
          
          .nav {
            gap: 1rem;
          }
        }

        /* Dark theme styles */
        :global([data-theme="dark"]) .nav__link:hover {
          background: rgba(208, 188, 255, 0.16);
          color: var(--brand);
        }

        :global([data-theme="dark"]) .nav__link.is-active {
          background: rgba(208, 188, 255, 0.16);
          color: var(--brand);
        }
      `}</style>
    </nav>
  );
}