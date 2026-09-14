import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Projects Page (Task F1 & F2)
 * Loads projects dynamically from GET /api/projects via useEffect.
 * Manages loading state and error/retry state.
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: Failed to load projects`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        "Unable to load projects from the server. Please ensure the backend service is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="page-main animate-in" id="projects-page">
      <h1 className="section-heading">My Projects</h1>
      <p className="projects-intro">
        Here are some of the projects that I have built. Click <strong>Full Details →</strong> for the dedicated dynamic project page or <strong>View Quick Info</strong> to expand details inline.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="projects-loading" role="status" aria-label="Loading projects">
          <div className="spinner"></div>
          <p>Fetching projects from API...</p>
        </div>
      )}

      {/* Error State with Retry Button */}
      {!loading && error && (
        <div className="projects-error" role="alert">
          <span className="projects-error__icon">⚠️</span>
          <h3>Failed to Load Projects</h3>
          <p>{error}</p>
          <button className="btn btn-accent projects-error__retry-btn" onClick={fetchProjects}>
            🔄 Retry Loading
          </button>
        </div>
      )}

      {/* Loaded Projects Grid */}
      {!loading && !error && (
        <section aria-label="Project grid">
          {projects.length === 0 ? (
            <p className="projects-empty">No projects found.</p>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  image={project.image}
                  link={project.link}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="projects-more" aria-labelledby="more-heading">
        <h2 id="more-heading" className="section-heading" style={{ marginTop: "2.5rem" }}>
          More Projects
        </h2>
        <p className="projects-more__text">
          I am continuously learning new technologies and working on more projects.
        </p>
      </section>
    </main>
  );
}
