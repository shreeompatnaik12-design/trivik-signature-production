
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "development-only-secret-change-this";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

const demoEmail = (process.env.DEMO_EMAIL || "john.doe@gmail.com").toLowerCase();
const demoPassword = process.env.DEMO_PASSWORD || "johndoe";
const passwordHash = bcrypt.hashSync(demoPassword, 10);

const customerRecord = {
  customer: {
    id: "TS-2026-0142",
    name: "John Doe",
    email: demoEmail,
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
      { date: "18 May 2026", description: "Booking Amount", mode: "Bank Transfer", receipt: "TS-R-1024", amount: "₹5,00,000" },
      { date: "25 May 2026", description: "Initial Down Payment", mode: "RTGS", receipt: "TS-R-1088", amount: "₹21,80,000" },
      { date: "10 June 2026", description: "T20 Scheme Balance", mode: "NEFT", receipt: "TS-R-1162", amount: "₹10,00,000" }
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

function createToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "8h" });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Trivik Signature Portal API" });
});

app.post("/api/auth/login", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  const emailMatches = email === demoEmail;
  const passwordMatches = await bcrypt.compare(password, passwordHash);

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: createToken(email),
    customer: customerRecord.customer
  });
});

app.get("/api/customer/me", requireAuth, (req, res) => {
  if (req.user.email !== demoEmail) {
    return res.status(403).json({ message: "Not allowed" });
  }
  res.json(customerRecord);
});

app.post("/api/contact", (req, res) => {
  // Production version: send to CRM, Google Sheet, email, WhatsApp API, etc.
  res.json({ ok: true, message: "Lead received" });
});

app.listen(PORT, () => {
  console.log(`Trivik Signature portal API running on port ${PORT}`);
});
