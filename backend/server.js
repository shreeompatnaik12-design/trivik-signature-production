import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "trivik-demo-secret-change-later";

const FRONTEND_URL = "https://trivik-signature-production.pages.dev";

const allowedOrigins = [
  FRONTEND_URL,
  "https://whimsical-treacle-9484a9.netlify.app",
  "http://localhost:5173",
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((x) => x.trim()).filter(Boolean) : [])
];

function corsOrigin(origin, callback) {
  if (!origin) return callback(null, true);

  try {
    const host = new URL(origin).hostname;

    if (
      allowedOrigins.includes(origin) ||
      host.endsWith(".pages.dev") ||
      host.endsWith(".netlify.app")
    ) {
      return callback(null, true);
    }
  } catch {
    // ignore malformed origins
  }

  return callback(new Error(`Blocked by CORS: ${origin}`));
}

app.use(express.json());

app.use(cors({
  origin: corsOrigin,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const DEMO_EMAIL = "john.doe@gmail.com";
const DEMO_PASSWORD = "johndoe";

const customerRecord = {
  customer: {
    id: "TS-2026-0142",
    name: "John Doe",
    email: DEMO_EMAIL,
    phone: "+91 90000 00000"
  },
  flat: {
    tower: "Tower B",
    unitNumber: "B-1204",
    configuration: "3 BHK Signature Apartment",
    area: "1,851 sq. ft.",
    floor: "12th Floor",
    facing: "East Facing",
    bookingDate: "18 May 2026",
    agreementStatus: "In Process"
  },
  construction: {
    percent: 42,
    stage: "Structure Work",
    towerStatus: "Foundation & podium completed",
    lastUpdated: "20 June 2026",
    nextMilestone: "Typical floor slab cycle"
  },
  payments: {
    total: "₹1,84,00,000",
    paid: "₹36,80,000",
    pending: "₹1,47,20,000",
    nextDueDate: "15 August 2026",
    plan: "Trivik T20 Scheme",
    history: [
      {
        date: "18 May 2026",
        description: "Booking Amount",
        mode: "Bank Transfer",
        receipt: "TS-R-1024",
        amount: "₹5,00,000"
      },
      {
        date: "25 May 2026",
        description: "Initial Down Payment",
        mode: "RTGS",
        receipt: "TS-R-1088",
        amount: "₹21,80,000"
      },
      {
        date: "10 June 2026",
        description: "T20 Scheme Balance",
        mode: "NEFT",
        receipt: "TS-R-1162",
        amount: "₹10,00,000"
      }
    ]
  },
  dues: {
    nextAmount: "₹9.20L",
    note: "Next installment scheduled against construction-linked milestone. Final due amount and timeline are subject to confirmation by the CRM team."
  },
  documents: [
    { name: "Allotment Letter", status: "Available for download" },
    { name: "Payment Receipts", status: "3 receipts uploaded" },
    { name: "Demand Letter", status: "Next milestone pending" },
    { name: "Agreement Draft", status: "Under review" },
    { name: "Construction Update", status: "June 2026 update" },
    { name: "RERA Details", status: "Project registration reference" }
  ],
  notifications: [
    { date: "20 June 2026", message: "Construction status updated" },
    { date: "10 June 2026", message: "Receipt TS-R-1162 uploaded" },
    { date: "01 June 2026", message: "Agreement draft under review" }
  ]
};

function makeToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "8h" });
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "Trivik Signature Portal API",
    health: "/api/health"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Trivik Signature Portal API",
    frontend: FRONTEND_URL
  });
});

app.post("/api/auth/login", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.json({
    token: makeToken(email),
    customer: customerRecord.customer
  });
});

app.get("/api/customer/me", requireAuth, (req, res) => {
  if (req.user.email !== DEMO_EMAIL) {
    return res.status(403).json({ message: "Not allowed" });
  }

  return res.json(customerRecord);
});

app.post("/api/contact", (_req, res) => {
  res.json({ ok: true, message: "Lead received" });
});

app.listen(PORT, () => {
  console.log(`Trivik Signature backend running on port ${PORT}`);
});
