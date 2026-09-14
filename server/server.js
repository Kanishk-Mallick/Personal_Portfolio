import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// File storage paths
const PROJECTS_FILE = path.join(__dirname, "data", "projects.json");
const SUBMISSIONS_FILE = path.join(__dirname, "data", "submissions.json");

// Middleware: CORS & Body Parser
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === CLIENT_URL || origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Helper functions for reading/writing persistent data
function readProjects() {
  try {
    const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects file:", err);
    return [];
  }
}

function readSubmissions() {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([]), "utf-8");
      return [];
    }
    const data = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading submissions file:", err);
    return [];
  }
}

function writeSubmissions(submissions) {
  try {
    const dir = path.dirname(SUBMISSIONS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing submissions file:", err);
    return false;
  }
}

// ==========================================
// Task B1: Server Health Check
// GET /
// ==========================================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// Task B2: Get All Projects
// GET /api/projects
// ==========================================
app.get("/api/projects", (req, res) => {
  const projects = readProjects();
  res.status(200).json(projects);
});

// ==========================================
// Task B3: Get Single Project by ID
// GET /api/projects/:id
// ==========================================
app.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const projects = readProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.status(200).json(project);
});

// ==========================================
// Task B4: Submit Contact Form
// POST /api/contact
// ==========================================
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  // Server-side validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required." });
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ error: "Email is required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters long." });
  }

  // Create new submission record
  const newSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  const submissions = readSubmissions();
  submissions.push(newSubmission);

  const saved = writeSubmissions(submissions);
  if (!saved) {
    return res.status(500).json({ error: "Failed to persist submission." });
  }

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out! Your message has been received.",
    data: newSubmission,
  });
});

// ==========================================
// Task B5: List All Submissions (Verification)
// GET /api/contact
// ==========================================
app.get("/api/contact", (req, res) => {
  const submissions = readSubmissions();
  res.status(200).json(submissions);
});

// ==========================================
// Task B6: Catch-All 404 Handler
// ==========================================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ==========================================
// Task B6: Centralized Global Error Handler
// ==========================================
app.use((err, req, res, next) => {
  console.error("Global Server Error:", err);
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred on the server.",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Portfolio API server is running on http://localhost:${PORT}`);
  console.log(`Accepting requests from client origin: ${CLIENT_URL}`);
});
