import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="page-main not-found" id="not-found-page">
      <div className="not-found__content animate-in">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 className="not-found__heading">Page Not Found</h1>
        <p className="not-found__message">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-accent not-found__btn" id="go-home-btn">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
