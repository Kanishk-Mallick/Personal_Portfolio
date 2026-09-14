import Skills from "../components/Skills";
import "./About.css";

const skills = [
  "C++",
  "Java",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL"
];

const education = [
  {
    qualification: "B.Tech CSE",
    institute: "NIT Warangal",
    year: "2024 - Present"
  },
  {
    qualification: "Class XII",
    institute: "CBSE Board",
    year: "2024"
  }
];

const hobbies = [
  "Competitive Programming",
  "Learning New Technologies",
  "Playing Games",
  "Listening to Music"
];

export default function About() {
  return (
    <main className="page-main animate-in" id="about-page">
      <h1 className="section-heading">About Me</h1>

      <section className="about-bio" aria-labelledby="bio-heading">
        <h2 id="bio-heading" className="about-subheading">
          Personal Background
        </h2>
        <p>
          Hello! My name is <strong>Kanishk Mallick</strong>. I am from Indore,
          Madhya Pradesh. I am currently pursuing my B.Tech in Computer Science and Engineering at NIT Warangal.
        </p>
        <p>
          I have a strong interest in software development, web technologies, and problem solving.
          I enjoy building websites and learning new tools that help me become a better developer.
        </p>
        <p>
          Apart from academics, I regularly practice coding questions to improve my logical thinking and programming skills.
        </p>
      </section>

      <section className="about-education" aria-labelledby="education-heading">
        <h2 id="education-heading" className="section-heading">
          Education
        </h2>
        <div className="education-table-wrapper">
          <table className="education-table">
            <thead>
              <tr>
                <th scope="col">Qualification</th>
                <th scope="col">Institute</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              {education.map((row) => (
                <tr key={row.qualification}>
                  <td>{row.qualification}</td>
                  <td>{row.institute}</td>
                  <td>{row.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Skills skills={skills} />

      <section className="about-hobbies" aria-labelledby="hobbies-heading">
        <h2 id="hobbies-heading" className="section-heading">
          Hobbies & Interests
        </h2>
        <ul className="hobbies-list" role="list">
          {hobbies.map((h) => (
            <li key={h} className="hobby-item">
              {h}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
