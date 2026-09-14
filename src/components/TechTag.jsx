import "./TechTag.css";

export default function TechTag({ tech }) {
  return (
    <span className="tech-tag" role="listitem">
      {tech}
    </span>
  );
}
