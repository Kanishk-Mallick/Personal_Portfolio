import { useState } from "react";
import "./ContactForm.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const INITIAL_FORM = { name: "", email: "", message: "" };
const INITIAL_ERRORS = { name: "", email: "", message: "" };

function validate(fields) {
  const errors = { name: "", email: "", message: "" };
  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

function hasErrors(errors) {
  return Object.values(errors).some((e) => e !== "");
}

/**
 * ContactForm (Task F4)
 * Controlled form submitting data to POST /api/contact.
 * Handles client validation, server-side validation error display,
 * submitting state, and confirmation payload display.
 */
export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successResponse, setSuccessResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setServerError(null);
    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setServerError(null);

    const currentErrors = validate(formData);
    setErrors(currentErrors);

    if (hasErrors(currentErrors)) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Server validation error or failure (Task F4)
        throw new Error(data.error || data.message || `Submission failed (HTTP ${response.status})`);
      }

      // Success
      setSuccessResponse(data);
      setFormData(INITIAL_FORM);
      setTouched({ name: false, email: false, message: false });
      setErrors(INITIAL_ERRORS);
    } catch (err) {
      console.error("Submission error:", err);
      setServerError(err.message || "Failed to connect to backend server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentErrors = validate(formData);
  const isFormValid = !hasErrors(currentErrors) && formData.name && formData.email && formData.message;

  if (successResponse) {
    return (
      <div className="contact-form__success" role="alert">
        <span className="contact-form__success-icon">✓</span>
        <h3>Message Sent Successfully!</h3>
        <p>{successResponse.message || "Thank you for reaching out! Kanishk will get back to you shortly."}</p>
        {successResponse.data && (
          <div className="contact-form__submission-meta">
            <small>Submission ID: <code>{successResponse.data.id}</code></small>
          </div>
        )}
        <button
          className="btn btn-accent"
          onClick={() => {
            setSuccessResponse(null);
            setServerError(null);
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      {/* Server Error Banner */}
      {serverError && (
        <div className="form-server-error" role="alert">
          <span className="form-server-error__icon">⚠️</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Name Input */}
      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">
          Your Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          className={`form-input ${touched.name && errors.name ? "form-input--error" : ""}`}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Kanishk Mallick"
          autoComplete="name"
          aria-required="true"
          disabled={submitting}
          aria-describedby={touched.name && errors.name ? "name-error" : undefined}
        />
        {touched.name && errors.name && (
          <span id="name-error" className="form-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">
          Email Address <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          className={`form-input ${touched.email && errors.email ? "form-input--error" : ""}`}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="kanishkmallick1210@gmail.com"
          autoComplete="email"
          aria-required="true"
          disabled={submitting}
          aria-describedby={touched.email && errors.email ? "email-error" : undefined}
        />
        {touched.email && errors.email && (
          <span id="email-error" className="form-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Message Textarea */}
      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={`form-input form-textarea ${touched.message && errors.message ? "form-input--error" : ""}`}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Hello Kanishk, I would like to connect with you regarding..."
          rows={5}
          aria-required="true"
          disabled={submitting}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
        />
        {touched.message && errors.message && (
          <span id="message-error" className="form-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button
        id="submit-contact-btn"
        type="submit"
        className="btn btn-accent contact-form__submit"
        disabled={!isFormValid || submitting}
        aria-disabled={!isFormValid || submitting}
      >
        {submitting ? "Sending to Server..." : isFormValid ? "Send Message →" : "Fill Required Fields"}
      </button>
    </form>
  );
}
