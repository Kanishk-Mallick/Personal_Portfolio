import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          &lt;Kanishk /&gt;
        </NavLink>

        <button
          id="hamburger-btn"
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="nav-links"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          id="nav-links"
          className={`nav-links ${isMenuOpen ? "nav-links--open" : ""}`}
          role="list"
        >
          {[
            { to: "/", label: "Home", end: true },
            { to: "/about", label: "About" },
            { to: "/projects", label: "Projects" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          id="theme-toggle-btn"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}
