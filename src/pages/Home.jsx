import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="page-main home-loading" aria-busy="true" aria-label="Loading">
        <div className="loading-spinner" role="status">
          <div className="spinner"></div>
          <p>Loading Portfolio...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-main">
      <section className="hero animate-in" aria-labelledby="hero-heading">
        <div className="hero-text">
          <p className="hero-greeting">Hello!</p>
          <h1 id="hero-heading" className="hero-name">
            I'm Kanishk Mallick
          </h1>
          <h2 className="hero-role">Full Stack Developer & Programmer</h2>
          <p className="hero-description">
            Welcome to my portfolio! I am a B.Tech Computer Science student at NIT Warangal,
            passionate about building dynamic web applications and solving Data Structures &
            Algorithms problems in C++.
          </p>
          <div className="hero-actions">
            <Link to="/projects" id="hero-view-projects-btn" className="btn btn-accent">
              View Projects →
            </Link>
            <Link to="/about" id="hero-about-btn" className="btn btn-outline">
              About Me
            </Link>
          </div>
        </div>
      </section>

      <section className="what-i-do animate-in" aria-labelledby="what-i-do-heading">
        <h2 id="what-i-do-heading" className="section-heading">
          What I Do
        </h2>
        <div className="info-grid">
          {[
            {
              icon: "",
              title: "Web Development",
              body: "I like building websites and web applications using HTML, CSS, JavaScript, React, and the MERN stack.",
            },
            {
              icon: "",
              title: "Programming",
              body: "I enjoy solving Data Structures and Algorithms problems using C++ to build robust algorithmic logic.",
            },
            {
              icon: "",
              title: "Continuous Learning",
              body: "I am actively exploring Full Stack Development and refining my software engineering skills.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="info-card">
              <span className="info-card__icon" aria-hidden="true">
                {icon}
              </span>
              <h3 className="info-card__title">{title}</h3>
              <p className="info-card__body">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
