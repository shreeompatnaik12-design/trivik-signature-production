
import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { amenityGroups, assets, gallery, partners, project, residences, staff, stats } from "./data";
import "./styles.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

function SectionLabel({ children, light = false }) {
  return <div className={`section-label ${light ? "light" : ""}`}>{children}</div>;
}

function Button({ children, to, href, variant = "gold", onClick }) {
  const className = `btn ${variant}`;
  if (href) return <a className={className} href={href} onClick={onClick}>{children}</a>;
  return <Link className={className} to={to || "/contact"} onClick={onClick}>{children}</Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Home", "/"],
    ["About Us", "/about"],
    ["Residences", "/residences"],
    ["Amenities", "/amenities"],
    ["Offers", "/offers"],
    ["Contact Us", "/contact"]
  ];

  return (
    <header className="premium-header">
      <div className="container nav premium-nav">
        <Link to="/" className="brand premium-brand"><img src={assets.logo} alt="Trivik Signature logo" /></Link>
        <nav className="nav-links refined-links">
          {nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions refined-actions">
          <Link to="/customer-login" className="icon-btn" aria-label="Customer login">♙</Link>
          <button className="hamburger icon-btn" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
        </div>
      </div>
      <div className={`menu-scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`side-drawer ${open ? "show" : ""}`} aria-hidden={!open}>
        <div className="drawer-top"><img src={assets.logo} alt="Trivik Signature logo" /><button onClick={() => setOpen(false)} aria-label="Close menu">×</button></div>
        <Link className="drawer-primary" to="/" onClick={() => setOpen(false)}>Home</Link>
        {nav.slice(1).map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className="drawer-login" to="/customer-login" onClick={() => setOpen(false)}>Customer Login</Link>
      </aside>
    </header>
  );
}

function PageHero({ eyebrow, title, italic, copy, image }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" loading="eager" />
      <div className="container page-hero-inner">
        <SectionLabel light>{eyebrow}</SectionLabel>
        <h1 className="display">{title} {italic && <em>{italic}</em>}</h1>
        {copy && <p className="lead">{copy}</p>}
      </div>
    </section>
  );
}

function ImageTile({ title, src, tag, large = false }) {
  return (
    <div className={`image-tile ${large ? "large" : ""}`}>
      <img src={src} alt={title} loading="lazy" />
      <div className="image-caption">
        <small>{tag}</small>
        <h3 className="display">{title}</h3>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero refined-hero">
        <img className="hero-bg" src={assets["aerial-master"]} alt="Trivik Signature premium residences" />
        <div className="hero-overlay refined-overlay" />
        <div className="container hero-content refined-hero-content">
          <div className="hero-copy-box">
            <div className="eyebrow">Welcome to Trivik Signature</div>
            <h1 className="display refined-headline">Crafted Living.<br />Elevated Experiences.</h1>
            <p className="lead refined-lead">Premium 3 BHK residences and limited duplex homes near Whitefield, East Bengaluru — designed for families who value space, comfort, legal clarity and long-term growth.</p>
            <div className="hero-actions">
              <Button to="/contact" variant="gold">Enquire Now</Button>
              <Button to="/residences" variant="outline">Explore Residences</Button>
            </div>
          </div>
          <div className="hero-play-card">
            <span className="play-ring">▶</span>
            <p>408 residences · 6.34 acres · G+17 towers</p>
          </div>
        </div>
      </section>

      <ApprovalStrip />

      <section className="block white spacious-block">
        <div className="container premium-split">
          <div>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="section-title display">Designed for modern Bengaluru living.</h2>
            <p className="copy-lg">Trivik Signature brings together refined architecture, thoughtful planning and lifestyle-focused amenities in one of East Bengaluru's fastest-growing residential corridors. Every space is crafted to feel open, functional and enduring.</p>
          </div>
          <div className="about-visual-card">
            <img src={assets["clubhouse-pool"]} alt="Trivik Signature clubhouse and swimming pool" loading="lazy" />
            <div className="stamp-card">Est. 2025 · Trivik Signature</div>
          </div>
        </div>
      </section>

      <VisualShowcase />
      <WhyUs />
      <OffersPreview />
      <AmenitiesPreview />
      <TimelineSection />
      <EmiCalculator />

      <section className="block royal closing-cta">
        <div className="container cta-panel">
          <div>
            <SectionLabel light>Private Site Visit</SectionLabel>
            <h2 className="section-title display">Receive floor plans, availability and the latest offer details.</h2>
            <p className="preview-copy">Speak directly with the Trivik Signature team and plan your visit with complete clarity.</p>
          </div>
          <div className="hero-actions cta-actions">
            <Button href={project.whatsapp} variant="gold">WhatsApp Now</Button>
            <Button href={project.phoneLink} variant="outline">Call Sales</Button>
          </div>
        </div>
      </section>
    </>
  );
}



function ApprovalStrip() {
  const approvals = [
    ["RERA Approved", "Legal registration secured", "▣"],
    ["STRR Approved", "Connectivity-led growth corridor", "◉"],
    ["CC & OC Approved", "Compliance-first planning", "✓"]
  ];
  return (
    <section className="approval-strip">
      <div className="container approval-grid">
        {approvals.map(([title, text, icon]) => <div className="approval-item" key={title}><span>{icon}</span><strong>{title}</strong><small>{text}</small></div>)}
      </div>
    </section>
  );
}

function VisualShowcase() {
  return (
    <section className="block pearl spacious-block">
      <div className="container section-head-row">
        <div><SectionLabel>Visual Showcase</SectionLabel><h2 className="section-title display">A composed preview of the community.</h2></div>
        <Button to="/amenities" variant="dark">View More</Button>
      </div>
      <div className="container visual-grid">
        <img src={assets["front-view"]} alt="Trivik Signature elevation" loading="lazy" />
        <img src={assets["clubhouse-pool"]} alt="Trivik Signature clubhouse pool" loading="lazy" />
        <img src={assets["entrance-gateway"]} alt="Trivik Signature entrance gateway" loading="lazy" />
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    ["Premium Design", "Tailored for modern families with refined finishes, generous natural light and efficient planning."],
    ["Connectivity", "Close to Whitefield, Hope Farm, Kadugodi, schools, hospitals and daily conveniences."],
    ["Future Growth", "Located along a high-appreciation East Bengaluru corridor with strong infrastructure momentum."],
    ["Family-Centric Living", "Amenities, security and open spaces planned around everyday comfort and community life."]
  ];
  return (
    <section className="block white spacious-block why-section">
      <div className="container why-layout">
        <img src={assets["landscape-view"]} alt="Trivik Signature landscaped view" loading="lazy" />
        <div>
          <SectionLabel>Why Us</SectionLabel>
          <h2 className="section-title display">Quiet confidence in every detail.</h2>
          <div className="why-list">{points.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function OffersPreview() {
  return (
    <section className="block navy spacious-block offer-preview-section">
      <img src={assets["front-view"]} alt="" className="section-bg-watermark" loading="lazy" />
      <div className="container offer-preview-grid">
        <div>
          <SectionLabel light>Exclusive Offers For You</SectionLabel>
          <h2 className="section-title display">Flexible schemes for easier ownership.</h2>
          <div className="compact-offer"><strong>Trivik T20 Scheme</strong><p>Pay 20% upfront and enjoy a simplified payment plan for the next 20 months.</p></div>
          <div className="compact-offer"><strong>EMI Holiday Scheme</strong><p>Pay 20% down payment and enjoy no EMI burden for the next 25 months.</p></div>
          <Button to="/offers" variant="gold">Check Eligibility</Button>
        </div>
        <img src={assets["aerial-master"]} alt="Trivik Signature aerial view" loading="lazy" />
      </div>
    </section>
  );
}

function AmenitiesPreview() {
  const amenities = ["Festival Plaza", "Kids School Pick-up & Drop Point", "Driver Room", "Security Guard Room", "EV Charging Point", "Swimming Pool"];
  return (
    <section className="block white spacious-block">
      <div className="container centered-head">
        <SectionLabel>Facilities</SectionLabel>
        <h2 className="section-title display">Trivik Signature's Amenities</h2>
        <p className="copy-lg max center-copy">Everyday comfort, family convenience and leisure experiences planned into one complete residential ecosystem.</p>
      </div>
      <div className="container amenity-preview-grid">
        {amenities.map((item, i) => <div className="amenity-preview-card" key={item}><span>{["✦","▰","♙","◇","⌁","◌"][i]}</span><strong>{item}</strong></div>)}
      </div>
      <div className="container center-action"><Button to="/amenities" variant="dark">Explore Amenities</Button></div>
    </section>
  );
}

function TimelineSection() {
  const steps = [
    ["Done", "RERA Approval", "Regulatory approval secured"],
    ["Ongoing", "Launch Phase", "Customer enquiries and bookings"],
    ["Upcoming", "Construction Start", "Site execution milestones"],
    ["Planned", "Structure Progress", "Tower-wise progress updates"],
    ["RERA", "Possession", project.possession]
  ];
  return (
    <section className="block navy timeline-section">
      <div className="container centered-head dark-head">
        <SectionLabel light>Project Timeline</SectionLabel>
        <h2 className="section-title display">Follow the journey from vision to reality.</h2>
      </div>
      <div className="container timeline-row">
        {steps.map(([status, title, text]) => <div className="timeline-step" key={title}><span className="timeline-dot">⌁</span><small>{status}</small><strong>{title}</strong><p>{text}</p></div>)}
      </div>
    </section>
  );
}

function EmiCalculator() {
  const [price, setPrice] = useState(18400000);
  const [down, setDown] = useState(3680000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const loan = Math.max(price - down, 0);
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const emi = monthlyRate > 0 ? loan * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1) : loan / months;
  const inr = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(n || 0));
  return (
    <section className="block pearl spacious-block emi-section">
      <div className="container emi-layout">
        <div>
          <SectionLabel>Home Loan Calculator</SectionLabel>
          <h2 className="section-title display">Estimate your monthly EMI with clarity.</h2>
          <p className="copy-lg">Plan your purchase better with a simple calculator. Final eligibility, interest rate and payment schedule are subject to bank approval and sales-team confirmation.</p>
          <div className="emi-result"><span>Estimated Monthly EMI</span><strong>{inr(emi)}</strong><small>Loan amount: {inr(loan)}</small></div>
        </div>
        <div className="emi-card">
          <label>Property Value<input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} /></label>
          <label>Down Payment<input type="number" value={down} onChange={e => setDown(Number(e.target.value))} /></label>
          <div className="form-grid"><label>Interest Rate %<input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} /></label><label>Tenure Years<input type="number" value={years} onChange={e => setYears(Number(e.target.value))} /></label></div>
          <Button to="/contact" variant="dark">Get Exact Cost Sheet</Button>
        </div>
      </div>
    </section>
  );
}

function PreviewSection({ image, eyebrow, title, copy, to, cta, reverse }) {
  return (
    <section className="block white">
      <div className={`container home-preview ${reverse ? "reverse" : ""}`}>
        <div>
          <div className="preview-kicker">{eyebrow}</div>
          <h2 className="section-title display">{title}</h2>
          <p className="preview-copy dark">{copy}</p>
          <Button to={to} variant="dark">{cta}</Button>
        </div>
        <div className="preview-image"><img src={image} alt="" loading="lazy" /><span>{eyebrow}</span></div>
      </div>
    </section>
  );
}

function InfoCard({ title, text, light = false }) {
  return <div className={`info-card ${light ? "light" : ""}`}><div className="diamond">◇</div><h3>{title}</h3><p>{text}</p></div>;
}

function About() {
  return (
    <>
      <PageHero eyebrow="About Trivik" title="A premier real estate development firm built on" italic="integrity" copy="Founded in 2024, Trivik Signature is built on the pillars of integrity, innovation and excellence." image={assets["front-view"]} />
      <section className="block pearl">
        <div className="container split">
          <div><SectionLabel>01 · About Us</SectionLabel><h2 className="section-title display">We do not just build homes — we craft environments.</h2></div>
          <p className="copy-lg">Founded in 2024, Trivik Signature is a premier real estate development firm built on the pillars of integrity, innovation, and excellence. Spread across a thoughtfully planned community featuring 3 iconic towers and 408 luxurious residences, we are committed to redefining the very idea of urban living. Our projects are fully RERA approved and OC/CC compliant, ensuring complete legal transparency and peace of mind for every homeowner.</p>
        </div>
      </section>
      <section className="block white">
        <div className="container split">
          <div><SectionLabel>02 · Mission & Values</SectionLabel><h2 className="section-title display">A people-first approach to better everyday living.</h2></div>
          <div className="card-grid two">
            <InfoCard title="Our Mission" text="To create inclusive, sustainable and livable communities that support better everyday living." />
            <InfoCard title="Integrity" text="Transparency in communication, approvals and homeowner trust." />
            <InfoCard title="Innovation" text="Design decisions that combine modern convenience with refined living." />
            <InfoCard title="Quality & Community" text="Superior construction, thoughtful amenities and spaces that bring people together." />
          </div>
        </div>
      </section>
      <section className="block navy">
        <div className="container">
          <SectionLabel light>03 · Management</SectionLabel>
          <h2 className="section-title display">Managing Partners</h2>
          <p className="lead">Trivik Signature is a partnership firm. This section displays only names and designations.</p>
          <div className="mini-grid mt">
            {partners.map((p, i) => <div className="mini-card" key={p}><strong>{String(i+1).padStart(2,"0")}</strong><span>{p}</span><em>Managing Partner</em></div>)}
          </div>
        </div>
      </section>
      <section className="block pearl">
        <div className="container">
          <SectionLabel>04 · The Team</SectionLabel>
          <h2 className="section-title display">Staff Details</h2>
          <div className="table-wrap mt">
            <table><thead><tr><th>#</th><th>Name</th><th>Designation</th></tr></thead><tbody>{staff.map(([n,r], i) => <tr key={n}><td>{i+1}</td><td>{n}</td><td>{r}</td></tr>)}</tbody></table>
          </div>
        </div>
      </section>
    </>
  );
}

function Residences() {
  const [active, setActive] = useState(0);
  const home = residences[active];
  return (
    <>
      <PageHero eyebrow="Project Details" title="Premium apartments and duplex homes planned for" italic="modern family life" copy="Every residence has been designed with smart space planning, natural ventilation and an uncompromising eye for detail." image={assets["full-view"]} />
      <section className="block pearl">
        <div className="container">
          <div className="fact-grid">
            <Fact k="Project Name" v="Trivik Signature" />
            <Fact k="Type" v="Premium Residential Apartments & Duplex Homes" />
            <Fact k="Developer" v="Trivik Signature" />
            <Fact k="Possession" v={project.possession} />
            <Fact k="Total Units" v="408 Apartments" />
            <Fact k="Project Area" v="6.34 Acres" />
            <Fact k="Configuration" v="3 BHK Apartments & Duplex Homes" />
            <Fact k="Size Range" v="1,650 – 3,624 sq. ft." />
          </div>
        </div>
      </section>
      <section className="block white">
        <div className="container">
          <SectionLabel>Official Plan Reference</SectionLabel>
          <h2 className="section-title display">Typical floor and duplex level plans.</h2>
          <p className="copy-lg max">The plan below is taken from the block plan shared for Trivik Signature. It includes the typical floor plan and duplex level references for the project.</p>
          <div className="floor-plan-real mt"><img src={assets.floorPlans} alt="Trivik Signature floor plans" loading="lazy" /></div>
        </div>
      </section>
      <section className="block pearl">
        <div className="container">
          <div className="tabs">{residences.map((r, i) => <button className={`tab ${i === active ? "active" : ""}`} onClick={() => setActive(i)} key={r.title}>{r.title}</button>)}</div>
          <div className="floor-wrap">
            <div className="floor-card">
              <SectionLabel>{home.type}</SectionLabel>
              <h2 className="display floor-title">{home.plan}</h2>
              <div className="num floor-area">{home.area}</div>
              <div className="floor-abstract">
                {Array.from({ length: 24 }).map((_, i) => <span key={i} className={i % 7 === 0 ? "big" : i % 5 === 0 ? "tall" : ""} />)}
              </div>
            </div>
            <div className="detail-panel">
              <SectionLabel light>{home.type}</SectionLabel>
              <h2 className="display floor-title">{home.title}</h2>
              <p className="lead">{home.copy}</p>
              <ul>{home.points.map(p => <li key={p}>◇ {p}</li>)}</ul>
              <Button to="/contact" variant="gold">Request Official Plan</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ k, v }) {
  return <div className="fact"><span>{k}</span><strong>{v}</strong></div>;
}

function Amenities() {
  return (
    <>
      <PageHero eyebrow="Amenities" title="Life, beautifully" italic="curated" copy="Amenities are organized as a complete lifestyle system across wellness, recreation, family, convenience and security." image={assets["clubhouse-pool"]} />
      <section className="block pearl"><div className="container amenity-layout">{Object.entries(amenityGroups).map(([group, list]) => <div className="amenity-group" key={group}><h3>{group}</h3><ul>{list.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
      <section className="block navy"><div className="container gallery-main"><ImageTile large src={assets["clubhouse-pool"]} tag="Clubhouse & Pool" title="A private social address for wellness, leisure and community life." /><div className="gallery-stack"><ImageTile src={assets["aerial-master"]} tag="Landscape" title="Gardens and outdoor courts." /><ImageTile src={assets["entrance-gateway"]} tag="Security" title="Gated arrival and controlled access." /></div></div></section>
    </>
  );
}

function Offers() {
  return (
    <>
      <PageHero eyebrow="Current Schemes" title="Flexible ownership for" italic="premium living" copy="Two structured schemes designed to give buyers more breathing room while securing a home at Trivik Signature." image={assets["entrance-gateway"]} />
      <section className="block navy">
        <div className="container">
          <div className="offer-grid">
            <Offer title="Pay 20%, Relax for 20 Months" badge="Trivik T20 Scheme" text1="Owning your dream home just got simpler. Under the Trivik T20 Scheme, you pay just 20% of the total cost upfront and enjoy a completely payment-free window for the next 20 months." text2="This scheme is designed for those who value flexibility without compromise, giving you time to settle your finances while your dream home is being built to perfection." />
            <Offer title="Pay 20%, No EMI for 25 Months" badge="EMI Holiday Scheme" text1="Step into premium living without the burden of immediate repayment. With just a 20% down payment, you secure your home and enjoy a full 25-month EMI holiday." text2="Whether you are planning your finances or waiting for an investment to mature, this scheme gives you time, flexibility and control." />
          </div>
          <p className="muted-note">Terms, eligibility, payment schedule and final offer availability are subject to confirmation by the Trivik Signature sales team.</p>
        </div>
      </section>
    </>
  );
}

function Offer({ badge, title, text1, text2 }) {
  return <div className="offer-card"><span>{badge}</span><h3 className="display">{title}</h3><p>{text1}</p><p>{text2}</p></div>;
}

function Contact() {
  const submit = (e) => {
    e.preventDefault();
    window.open(project.whatsapp, "_blank");
  };
  return (
    <>
      <PageHero eyebrow="Private Preview" title="Receive the brochure, floor plans and" italic="availability details" copy="A direct enquiry journey connected to WhatsApp for immediate follow-up." image={assets["entrance-gateway"]} />
      <section className="block pearl">
        <div className="container split">
          <div>
            <SectionLabel>Contact Information</SectionLabel>
            <h2 className="section-title display">Let us arrange the next step.</h2>
            <p className="copy-lg">{project.phone}<br />{project.email}<br />{project.website}<br />{project.address}</p>
            <div className="fact-grid small"><Fact k="RERA" v={project.rera} /><Fact k="Funding" v="Mortgaged & funded by Bajaj Housing Finance Limited" /></div>
          </div>
          <form onSubmit={submit} className="lead-form">
            <div className="form-grid"><label>Name<input required placeholder="Your name" /></label><label>Phone<input required placeholder="+91" /></label></div>
            <label>Email<input type="email" placeholder="you@example.com" /></label>
            <label>Interested In<select><option>3 BHK Signature Apartment</option><option>Premium Duplex Home</option><option>Trivik T20 Scheme</option><option>EMI Holiday Scheme</option><option>Site Visit</option></select></label>
            <label>Message<textarea rows="5" placeholder="Tell us your requirement" /></label>
            <button className="btn dark" type="submit">Request Details</button>
          </form>
        </div>
      </section>
    </>
  );
}

function CustomerLogin() {
  const [email, setEmail] = useState("john.doe@gmail.com");
  const [password, setPassword] = useState("johndoe");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid login");
      localStorage.setItem("trivikToken", data.token);
      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.message || "Could not login. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="logo-box"><img src={assets.logo} alt="Trivik Signature logo" /></div>
        <SectionLabel>Customer Portal</SectionLabel>
        <h1 className="display">Secure customer login</h1>
        <p>Enter your registered email and password to view your personal flat details, construction progress, payment summary, pending dues and documents.</p>
        <form onSubmit={login}>
          <label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" /></label>
          <label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" /></label>
          <button className="btn dark" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login & View Customer Details"}</button>
          {error && <div className="error">{error}</div>}
          <div className="demo-note"><strong>Demo login</strong><br />Email: john.doe@gmail.com<br />Password: johndoe</div>
        </form>
      </div>
    </section>
  );
}

function CustomerDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("trivikToken");
    if (!token) { navigate("/customer-login"); return; }
    fetch(`${API_BASE}/api/customer/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async r => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.message || "Unauthorized");
        setData(d);
      })
      .catch(() => {
        localStorage.removeItem("trivikToken");
        navigate("/customer-login");
      });
  }, [navigate]);

  if (!data) return <section className="block pearl"><div className="container">Loading customer details...</div></section>;

  const { customer, flat, construction, payments, dues, documents, notifications } = data;

  return (
    <>
      <PageHero eyebrow="Customer Details" title={`Welcome, ${customer.name}`} copy="Your personal Trivik Signature flat, payment and construction summary." image={assets["aerial-master"]} />
      <section className="block pearl">
        <div className="container">
          <div className="portal-top"><span className="portal-id">Customer ID: {customer.id}</span><button className="btn dark" onClick={() => { localStorage.removeItem("trivikToken"); navigate("/customer-login"); }}>Logout</button></div>
          <div className="dashboard-grid">
            <PortalCard title="Flat Information">
              <h2 className="display portal-heading">{flat.tower} · Unit {flat.unitNumber}</h2>
              <PortalRows rows={[
                ["Customer Name", customer.name],
                ["Registered Email", customer.email],
                ["Configuration", flat.configuration],
                ["Saleable Area", flat.area],
                ["Floor", flat.floor],
                ["Facing", flat.facing],
                ["Booking Date", flat.bookingDate],
                ["Agreement Status", flat.agreementStatus]
              ]} />
            </PortalCard>
            <PortalCard title="Construction Progress">
              <h2 className="display portal-heading">Overall Completion</h2>
              <strong className="num progress-number">{construction.percent}%</strong>
              <div className="progress-track"><div style={{ width: `${construction.percent}%` }} /></div>
              <PortalRows rows={[
                ["Current Stage", construction.stage],
                ["Tower Status", construction.towerStatus],
                ["Last Updated", construction.lastUpdated],
                ["Next Milestone", construction.nextMilestone]
              ]} />
            </PortalCard>
          </div>
          <div className="dashboard-grid mt">
            <PortalCard dark title="Payment Summary">
              <h2 className="display portal-heading">Financial Overview</h2>
              <PortalRows rows={[
                ["Total Agreement Value", payments.total],
                ["Amount Paid", payments.paid],
                ["Pending Amount", payments.pending],
                ["Next Due Date", payments.nextDueDate],
                ["Payment Plan", payments.plan]
              ]} />
            </PortalCard>
            <PortalCard title="Upcoming Dues">
              <h2 className="display portal-heading">Next Payment</h2>
              <strong className="num progress-number">{dues.nextAmount}</strong>
              <p className="dark-copy">{dues.note}</p>
              <Button href={project.whatsapp} variant="dark">Contact CRM</Button>
            </PortalCard>
          </div>
          <PortalCard title="Payment History" className="mt">
            <h2 className="display portal-heading">Receipts & Transactions</h2>
            <div className="table-wrap"><table><thead><tr><th>Date</th><th>Description</th><th>Mode</th><th>Receipt</th><th>Amount</th></tr></thead><tbody>{payments.history.map(row => <tr key={row.receipt}><td>{row.date}</td><td>{row.description}</td><td>{row.mode}</td><td>{row.receipt}</td><td>{row.amount}</td></tr>)}</tbody></table></div>
          </PortalCard>
          <PortalCard title="Documents" className="mt">
            <h2 className="display portal-heading">Your Documents</h2>
            <div className="doc-grid">{documents.map(d => <div className="doc-card" key={d.name}><div className="diamond">◇</div><strong>{d.name}</strong><span>{d.status}</span></div>)}</div>
          </PortalCard>
          <div className="dashboard-grid mt">
            <PortalCard title="Support">
              <h2 className="display portal-heading">Need assistance?</h2>
              <p className="dark-copy">Reach the CRM team for payment clarification, document requests, construction updates or site visit scheduling.</p>
              <div className="hero-actions"><Button href={project.phoneLink} variant="dark">Call CRM</Button><Button href={project.whatsapp} variant="dark">WhatsApp CRM</Button></div>
            </PortalCard>
            <PortalCard title="Notifications">
              <h2 className="display portal-heading">Latest Updates</h2>
              <PortalRows rows={notifications.map(n => [n.date, n.message])} />
            </PortalCard>
          </div>
        </div>
      </section>
    </>
  );
}

function PortalCard({ children, title, dark, className = "" }) {
  return <div className={`portal-card ${dark ? "dark" : ""} ${className}`}><SectionLabel light={dark}>{title}</SectionLabel>{children}</div>;
}
function PortalRows({ rows }) {
  return <div className="portal-list">{rows.map(([a,b]) => <div className="portal-row" key={`${a}-${b}`}><span>{a}</span><strong>{b}</strong></div>)}</div>;
}

function Footer() {
  return (
    <footer className="premium-footer">
      <div className="container footer-columns">
        <div className="footer-brand"><img src={assets.logo} alt="Trivik Signature logo" /><p>Crafting refined residences built on design, trust and enduring value.</p><div className="social-row"><span>f</span><span>x</span><span>◎</span><span>▶</span></div></div>
        <div><h3>Get In Touch</h3><p>{project.address}<br />Bengaluru, Karnataka</p><p><a href={project.phoneLink}>{project.phone}</a><br /><a href={`mailto:${project.email}`}>{project.email}</a></p></div>
        <div><h3>Useful Links</h3><Link to="/about">About Us</Link><Link to="/residences">Our Projects</Link><Link to="/amenities">Gallery</Link><Link to="/contact">Contact Us</Link></div>
        <div><h3>Explore</h3><Link to="/offers">Offers</Link><Link to="/amenities">Amenities</Link><Link to="/customer-login">Customer Login</Link><Link to="/contact">FAQ</Link></div>
      </div>
      <div className="container newsletter-row"><strong>Newsletter To Get Updated The Latest News</strong><form><input placeholder="Enter your Email" /><button type="button">Subscribe ↗</button></form></div>
      <div className="footer-bottom"><div className="container"><span>Copyright © 2026 Trivik Signature, All rights reserved.</span><span>Terms of service · Privacy policy · Cookies</span></div></div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <>
      <div className="floating-actions"><a className="whatsapp-float" href={project.whatsapp} aria-label="WhatsApp">☘</a><a className="call-float" href={project.phoneLink} aria-label="Call">☎</a></div>
      <a className="scroll-top" href="#top" aria-label="Back to top">↑</a>
      <div className="sticky-cta"><a href={project.phoneLink}>Call</a><a href={project.whatsapp}>WhatsApp</a><Link to="/contact">Brochure</Link></div>
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/residences" element={<Residences />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <StickyCTA />
    </>
  );
}

export default App;
