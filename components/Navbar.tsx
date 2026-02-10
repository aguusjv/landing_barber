import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenBooking: () => void;
}

type NavLink = {
  name: string;
  href: string; // e.g. "#inicio"
};

const NAV_LINKS: NavLink[] = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Historia', href: '#historia' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Asesor IA', href: '#asesor' },
  { name: 'Prensa', href: '#prensa' },
  { name: 'Locales', href: '#locales' },
];

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const scrollToHash = (hash: string) => {
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    // Offset para que el navbar fixed no tape el título de la sección
    const nav = document.querySelector('nav');
    const navHeight = nav ? (nav as HTMLElement).offsetHeight : 96; // fallback

    const top =
      el.getBoundingClientRect().top + window.scrollY - Math.max(navHeight + 16, 80);

    window.scrollTo({ top, behavior: 'smooth' });

    // Mantiene el hash en la URL (sirve para refresh/compartir)
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  };

  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        closeMobileMenu();
        scrollToHash(href);
        return;
      }

      closeMobileMenu();
    };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-black/95 py-3 border-b border-gold/20'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={handleNavClick('#inicio')}
            className="flex flex-col items-center group"
          >
            <div className="text-xl md:text-2xl font-bold tracking-[0.2em] serif uppercase gold-gradient group-hover:scale-105 transition duration-500">
              Buenos Aires
            </div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400 -mt-1 font-semibold">
              Barbershop
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-10 text-[11px] uppercase tracking-[0.2em] font-bold items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover-gold transition"
                onClick={handleNavClick(link.href)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenBooking}
              className="border border-gold px-6 py-2 text-gold hover:bg-gold hover:text-black transition duration-300"
            >
              Turnos
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gold p-2"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-px bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-full h-px bg-current transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-full h-px bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center space-y-8 p-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl serif italic tracking-widest hover:text-gold transition-colors"
              onClick={handleNavClick(link.href)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              closeMobileMenu();
              onOpenBooking();
            }}
            className="w-full max-w-xs border border-gold py-4 text-gold uppercase tracking-[0.2em] font-bold"
          >
            Reservar Turnos
          </button>

          <div className="pt-12 text-center">
            <p className="text-[10px] tracking-[0.3em] text-gray-600 uppercase mb-4">Síguenos</p>
            <div className="flex space-x-6 text-gray-400">
              <span className="text-xs uppercase tracking-widest font-bold">IG</span>
              <span className="text-xs uppercase tracking-widest font-bold">FB</span>
              <span className="text-xs uppercase tracking-widest font-bold">WA</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
