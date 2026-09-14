import ContactForm from "../components/ContactForm";
import "./Contact.css";

export default function Contact() {
  return (
    <main className="page-main animate-in" id="contact-page">
      <h1 className="section-heading">Contact Me</h1>
      <p className="contact-intro">
        Thank you for visiting my portfolio. You can connect with me by sending a message below or via the platforms listed.
      </p>

      <div className="contact-layout">
        <section aria-labelledby="contact-form-heading" className="contact-form-section">
          <h2 id="contact-form-heading" className="contact-subheading">
            Send a Message
          </h2>
          <ContactForm />
        </section>

        <aside className="contact-info" aria-label="Contact information">
          <h2 className="contact-subheading">Contact Details</h2>

          <ul className="contact-info-list" role="list">
            <li className="contact-info-item">
              <span className="contact-info-item__label">Name</span>
              <span className="contact-info-item__value">Kanishk Mallick</span>
            </li>
            <li className="contact-info-item">
              <span className="contact-info-item__label">Email</span>
              <a href="mailto:kanishkmallick1210@gmail.com" className="contact-info-item__value">
                kanishkmallick1210@gmail.com
              </a>
            </li>
            <li className="contact-info-item">
              <span className="contact-info-item__label">Phone</span>
              <span className="contact-info-item__value">+91 9039727285</span>
            </li>
            <li className="contact-info-item">
              <span className="contact-info-item__label">GitHub</span>
              <a
                href="https://github.com/kanishk8090"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-info-item__value"
              >
                github.com/kanishk8090
              </a>
            </li>
            <li className="contact-info-item">
              <span className="contact-info-item__label">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/kanishk-mallick-889651351/"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-info-item__value"
              >
                linkedin.com/in/kanishk-mallick
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
