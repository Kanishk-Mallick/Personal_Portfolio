import { useState } from "react";
import { Link } from "react-router-dom";
import TechTag from "./TechTag";
import "./ProjectCard.css";

export default function ProjectCard({ id, title, description, techStack, image, link }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="project-card">
      <div className="project-card__image-wrapper">
        <img
          src={image}
          alt={title}
          className="project-card__image"
          loading="lazy"
        />
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>

        <div className="project-card__tags" role="list" aria-label="Technologies used">
          {techStack && techStack.map((tech) => (
            <TechTag key={tech} tech={tech} />
          ))}
        </div>

        <div className="project-card__actions">
          <button
            id={`details-btn-${id}`}
            className="btn btn-outline project-card__btn"
            onClick={() => setShowDetails((prev) => !prev)}
            aria-expanded={showDetails}
          >
            {showDetails ? "Hide Quick Info" : "View Quick Info"}
          </button>

          <Link
            to={`/projects/${id}`}
            className="btn btn-accent project-card__btn"
            id={`full-page-btn-${id}`}
          >
            Full Details →
          </Link>
        </div>

        {showDetails && (
          <div className="project-card__details" role="region" aria-label={`${title} details`}>
            {link ? (
              <p>
                <strong>Live URL: </strong>
                <a href={link} target="_blank" rel="noreferrer noopener">
                  {link}
                </a>
              </p>
            ) : (
              <p>
                <em>Live demo is unavailable for this repository / extension. Check full details page.</em>
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
