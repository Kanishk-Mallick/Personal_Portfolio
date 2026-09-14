import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TechTag from "../components/TechTag";
import "./ProjectDetail.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Dynamic Project Detail Page (Task F3)
 * Fetches single project by ID from GET /api/projects/:projectId via useEffect.
 * Handles loading state, 404/not found state, and network errors gracefully.
 */
export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status}`);
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetching project detail:", err);
        setError("Unable to retrieve project details from the server. Please check the backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <main className="page-main project-detail-loading" aria-busy="true" aria-label="Loading project details">
        <div className="spinner"></div>
        <p>Loading project details...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="page-main animate-in" id="project-detail-not-found">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/projects">← Back to All Projects</Link>
        </nav>
        <div className="project-not-found-card">
          <p className="project-not-found-code">404</p>
          <h2>Project Not Found</h2>
          <p>
            No project exists matching ID <code>"{projectId}"</code>. It may have been removed or the link is invalid.
          </p>
          <Link to="/projects" className="btn btn-accent">
            ← Browse All Projects
          </Link>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-main animate-in">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/projects">← Back to All Projects</Link>
        </nav>
        <div className="projects-error" role="alert">
          <span className="projects-error__icon">⚠️</span>
          <h3>Error Loading Project</h3>
          <p>{error}</p>
          <Link to="/projects" className="btn btn-outline">
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <main className="page-main animate-in" id="project-detail-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/projects">← Back to All Projects</Link>
      </nav>

      <article className="project-detail">
        <header className="project-detail__header">
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__description">{project.description}</p>
        </header>

        <div className="project-detail__image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="project-detail__image"
          />
        </div>

        <section className="project-detail__section" aria-labelledby="detail-about-heading">
          <h2 id="detail-about-heading" className="project-detail__section-heading">
            About This Project
          </h2>
          <p className="project-detail__details-text">{project.details}</p>
        </section>

        <section className="project-detail__section" aria-labelledby="detail-tech-heading">
          <h2 id="detail-tech-heading" className="project-detail__section-heading">
            Technologies & Tools
          </h2>
          <div className="project-detail__tags" role="list" aria-label="Tech stack">
            {project.techStack &&
              project.techStack.map((tech) => (
                <TechTag key={tech} tech={tech} />
              ))}
          </div>
        </section>

        {project.link && (
          <section className="project-detail__section">
            <h2 className="project-detail__section-heading">Live Deployment</h2>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-accent"
              id={`live-link-${project.id}`}
            >
              Open Live Application ↗
            </a>
          </section>
        )}
      </article>
    </main>
  );
}
