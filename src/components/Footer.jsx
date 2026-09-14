import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">&lt;Kanishk /&gt;</h3>
          <p className="footer-tagline">
            Full Stack Developer · NIT Warangal CSE
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links" role="list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-links" role="list">
            <li>
              <a
                href="https://github.com/kanishk8090"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/kanishk-mallick-889651351/"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:kanishkmallick1210@gmail.com">Email</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {year} Kanishk Mallick &mdash; Full Stack Development Assignment
        </p>
      </div>
    </footer>
  );
}
