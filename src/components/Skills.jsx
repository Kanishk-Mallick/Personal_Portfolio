import "./Skills.css";

export default function Skills({ skills }) {
  return (
    <section className="skills-section" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="section-heading">
        Technical Skills
      </h2>
      <ul className="skills-grid" role="list">
        {skills && skills.map((skill) => (
          <li key={skill} className="skill-item">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
