import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  amenityGroups,
  amenityHighlights,
  assets,
  facts,
  milestones,
  offerSchemes,
  partners,
  project,
  residences,
  staff,
  stats,
  visualShowcase,
  whyUs
} from "./data";
import "./styles.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function SectionLabel({ children, light = false }) {
  return <div className={`section-label ${light ? "light" : ""}`}>{children}</div>;
}

function Button({ children, to, href, variant = "gold", onClick, type = "button", className = "" }) {
  const cls = `btn ${variant} ${className}`.trim();
  if (href) return <a className={cls} href={href} onClick={onClick}>{children}</a>;
  if (to) return <Link className={cls} to={to} onClick={onClick}>{children}</Link>;
  return <button className={cls} type={type} onClick={onClick}>{children}</button>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Home", "/"],
    ["About", "/about"],
    ["Residences", "/residences"],
    ["Amenities", "/amenities"],
    ["Offers", "/offers"],
    ["Contact", "/contact"]
  ];

  return (
    <header className="site-header">
      <div className="container nav">
        <Link to="/" className="brand" aria-label="Trivik Signature home">
          <img src={assets.logo} alt="Trivik Signature logo" />
        </Link>
        <nav className="nav-links">
          {nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <Button to="/customer-login" variant="dark" className="login-link">Customer Login</Button>
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu">
          {nav.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link to="/customer-login" onClick={() => setOpen(false)}>Customer Login</Link>
        </div>
      )}
    </header>
  );
}

function PageHero({ eyebrow, title, italic, copy, image }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" loading="eager" />
      <div className="page-hero-overlay" />
      <div className="container page-hero-inner">
        <SectionLabel light>{eyebrow}</SectionLabel>
        <h1 className="display">{title} {italic && <em>{italic}</em>}</h1>
        {copy && <p className="lead">{copy}</p>}
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return <div className="stat"><strong className="num">{value}</strong><span>{label}</span></div>;
}

function Fact({ label, value }) {
  return <div className="fact"><span>{label}</span><strong>{value}</strong></div>;
}

function VisualCard({ title, tag, image }) {
  return (
    <article className="visual-card reveal">
      <img src={image} alt={title} loading="lazy" />
      <div className="visual-caption">
        <small>{tag}</small>
        <h3 className="display">{title}</h3>
      </div>
    </article>
  );
}

function WhyCard({ item }) {
  return (
    <div className="why-card reveal">
      <span className="why-mark">◇</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  );
}

function AmenityTile({ title, tag, image }) {
  return (
    <article className="amenity-tile reveal">
      <img src={image} alt={title} loading="lazy" />
      <div className="amenity-caption">
        <small>{tag}</small>
        <h3>{title}</h3>
      </div>
    </article>
  );
}

function Milestone({ item, index }) {
  const [title, status, text, active] = item;
  return (
    <div className={`milestone ${active ? "active" : "blur"}`}>
      <div className="milestone-node">{String(index + 1).padStart(2, "0")}</div>
      <span>{status}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function OfferCard({ item }) {
  return (
    <article className={`offer-card ${item.tone}`}>
      <span>{item.badge}</span>
      <h3 className="display">{item.title}</h3>
      <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
      <Button to="/contact" variant={item.tone === "sand" ? "dark" : "gold"}>Request scheme details</Button>
    </article>
  );
}

function Home() {
  const amenityPreview = useMemo(() => amenityHighlights.slice(0, 6), []);
  return (
    <>
      <section className="hero">
        <img className="hero-bg" src={assets.hero} alt="Trivik Signature entrance approach" />
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Soukya Road · Samethanahalli · East Bengaluru</div>
            <h1 className="display">The Art of <em>Elevated</em> Living</h1>
            <p className="lead">Welcome to Trivik Signature — where modern architecture meets an elevated way of life. A community of 408 premium residences across 3 stunning towers, designed for those who value quality, comfort and refined everyday living.</p>
            <div className="hero-actions">
              <Button to="/contact" variant="gold">Get Current Price Sheet</Button>
              <Button to="/residences" variant="outline">View Floor Plans</Button>
            </div>
          </div>
          <aside className="snapshot reveal">
            <p className="tiny-title">Project Snapshot</p>
            <h2 className="display">Trivik Signature</h2>
            <div className="stats">
              {stats.map(([value, label]) => <Stat key={label} value={value} label={label} />)}
            </div>
            <div className="snapshot-lines">
              <div><span>Configuration</span><strong>3 BHK apartments & duplex homes</strong></div>
              <div><span>Size range</span><strong>1,650 – 3,624 sq. ft.</strong></div>
              <div><span>RERA</span><strong>{project.rera}</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="block pearl">
        <div className="container split">
          <div>
            <SectionLabel>Welcome to Trivik</SectionLabel>
            <h2 className="section-title display">This is not just a home. This is your signature address.</h2>
          </div>
          <div>
            <p className="copy-lg">Every corner of Trivik Signature has been conceived with one purpose: to give you a life that is as beautiful as it is fulfilling. Thoughtfully designed living spaces, curated amenities, legal transparency and refined architecture come together in one composed residential experience.</p>
            <Button to="/about" variant="dark">Know the Brand</Button>
          </div>
        </div>
      </section>

      <section className="block white">
        <div className="container">
          <SectionLabel>Trust & Compliance</SectionLabel>
          <div className="trust-layout">
            <div>
              <h2 className="section-title display">Confidence before commitment.</h2>
              <p className="copy-lg">Clear approvals, transparent documentation and direct buyer communication form the foundation of the Trivik Signature experience.</p>
            </div>
            <div className="trust-cards">
              <div className="rera-card reveal">
                <img src={assets.reraLogo} alt="RERA Approved" />
                <div>
                  <small>RERA Approved</small>
                  <strong>{project.rera}</strong>
                </div>
              </div>
              <div className="subtle-card reveal">
                <small>Connectivity Advantage</small>
                <strong>East Bengaluru growth corridor</strong>
                <p>Positioned around Soukya Road, Samethanahalli and the Whitefield growth belt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block navy">
        <div className="container">
          <SectionLabel light>Why Trivik</SectionLabel>
          <h2 className="section-title display">Designed for comfort, confidence and long-term value.</h2>
          <div className="why-grid">
            {whyUs.map((item) => <WhyCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className="block pearl">
        <div className="container">
          <div className="section-head">
            <div>
              <SectionLabel>Visual Showcase</SectionLabel>
              <h2 className="section-title display">A closer look at the spaces that define the community.</h2>
            </div>
            <p className="copy-lg">From arrival to architecture, each frame offers a quieter view of the lifestyle and scale of Trivik Signature.</p>
          </div>
          <div className="visual-grid">
            {visualShowcase.map(([title, tag, image]) => <VisualCard key={title} title={title} tag={tag} image={image} />)}
          </div>
        </div>
      </section>

      <PreviewSection
        eyebrow="Residences"
        title="Spacious 3 BHK homes and limited duplex residences."
        copy="Explore residences ranging from 1,650 to 3,624 sq. ft., with smart space planning, natural light, cross ventilation, private balconies and a clear distinction between apartment and duplex living."
        image={assets.floorPlans}
        to="/residences"
        cta="Explore Residences"
        reverse
      />

      <section className="block pearl">
        <div className="container">
          <div className="section-head">
            <div>
              <SectionLabel>Amenities</SectionLabel>
              <h2 className="section-title display">Lifestyle spaces planned with purpose.</h2>
            </div>
            <p className="copy-lg">A curated mix of social, wellness, family and sports amenities gives residents more reasons to spend time within the community.</p>
          </div>
          <div className="amenity-preview-grid">
            {amenityPreview.map(([title, tag, image]) => <AmenityTile key={title} title={title} tag={tag} image={image} />)}
          </div>
          <div className="center-cta">
            <Button to="/amenities" variant="dark">View Amenities</Button>
          </div>
        </div>
      </section>

      <section className="block white">
        <div className="container">
          <SectionLabel>Project Milestones</SectionLabel>
          <div className="section-head">
            <h2 className="section-title display">Follow the journey from vision to reality.</h2>
            <p className="copy-lg">RERA approval is the current confirmed milestone. The remaining stages stay softened until each step is officially achieved.</p>
          </div>
          <div className="milestone-line reveal">
            {milestones.map((item, index) => <Milestone key={item[0]} item={item} index={index} />)}
          </div>
        </div>
      </section>

      <section className="block navy offer-home">
        <div className="container split align-center">
          <div className="offer-image reveal">
            <img src={assets.entrance} alt="Trivik Signature arrival" loading="lazy" />
          </div>
          <div>
            <SectionLabel light>Flexible Schemes</SectionLabel>
            <h2 className="section-title display">Structured ownership options for premium living.</h2>
            <p className="copy-lg light-copy">Choose from payment schemes designed to give buyers more breathing room while securing a premium residence at Trivik Signature.</p>
            <div className="offer-grid small">
              {offerSchemes.map((item) => <OfferCard key={item.badge} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      <PreviewSection
        eyebrow="Customer Portal"
        title="A private customer space for flat details, payments and progress."
        copy="The customer portal gives buyers a clear view of apartment details, construction updates, payment summary, documents and CRM support."
        image={assets.aerial}
        to="/customer-login"
        cta="Open Customer Portal"
        dark
      />
    </>
  );
}

function PreviewSection({ eyebrow, title, copy, image, to, cta, reverse = false, dark = false }) {
  return (
    <section className={`block ${dark ? "navy" : "white"}`}>
      <div className={`container split align-center ${reverse ? "reverse" : ""}`}>
        <div>
          <SectionLabel light={dark}>{eyebrow}</SectionLabel>
          <h2 className="section-title display">{title}</h2>
          <p className={`copy-lg ${dark ? "light-copy" : ""}`}>{copy}</p>
          <Button to={to} variant={dark ? "gold" : "dark"}>{cta}</Button>
        </div>
        <div className="preview-image reveal">
          <img src={image} alt={eyebrow} loading="lazy" />
          <span>{eyebrow}</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="About Trivik" title="A premier real estate development firm built on" italic="integrity" copy="Founded in 2024, Trivik Signature is built on the pillars of integrity, innovation and excellence." image={assets.front} />
      <section className="block pearl">
        <div className="container split">
          <div>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="section-title display">We do not just build homes — we craft environments.</h2>
          </div>
          <p className="copy-lg">Founded in 2024, Trivik Signature is a premier real estate development firm built on the pillars of integrity, innovation and excellence. Spread across a thoughtfully planned community featuring 3 iconic towers and 408 luxurious residences, we are committed to redefining the idea of urban living with legal transparency and peace of mind for every homeowner.</p>
        </div>
      </section>
      <section className="block white">
        <div className="container">
          <SectionLabel>Mission & Values</SectionLabel>
          <div className="why-grid">
            <WhyCard item={{ title: "Our Mission", text: "To create inclusive, sustainable and livable communities that support better everyday living." }} />
            <WhyCard item={{ title: "Integrity", text: "Transparency in communication, approvals and customer-facing documentation." }} />
            <WhyCard item={{ title: "Innovation", text: "Design decisions that combine modern convenience with refined living." }} />
            <WhyCard item={{ title: "Quality & Community", text: "Superior construction, thoughtful amenities and spaces that bring people together." }} />
          </div>
        </div>
      </section>
      <section className="block navy">
        <div className="container">
          <SectionLabel light>Management</SectionLabel>
          <h2 className="section-title display">Managing Partners</h2>
          <div className="mini-grid">
            {partners.map((name, index) => <div className="mini-card reveal" key={name}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{name}</span><em>Managing Partner</em></div>)}
          </div>
        </div>
      </section>
      <section className="block pearl">
        <div className="container">
          <SectionLabel>The Team</SectionLabel>
          <h2 className="section-title display">Project & Sales Team</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Name</th><th>Designation</th></tr></thead>
              <tbody>{staff.map(([name, role], index) => <tr key={name}><td>{index + 1}</td><td>{name}</td><td>{role}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function Residences() {
  const [active, setActive] = useState(0);
  const residence = residences[active];
  return (
    <>
      <PageHero eyebrow="Residences" title="Premium apartments and duplex homes planned for" italic="modern family life" copy="Every residence has been designed with smart space planning, natural ventilation and an uncompromising eye for detail." image={assets.full} />
      <section className="block pearl">
        <div className="container fact-grid">
          {facts.map(([label, value]) => <Fact key={label} label={label} value={value} />)}
        </div>
      </section>
      <section className="block white">
        <div className="container">
          <SectionLabel>Official Plan Reference</SectionLabel>
          <h2 className="section-title display">Typical floor and duplex level plans.</h2>
          <div className="floor-plan-real reveal"><img src={assets.floorPlans} alt="Trivik Signature floor plans" loading="lazy" /></div>
        </div>
      </section>
      <section className="block pearl">
        <div className="container">
          <div className="tabs">
            {residences.map((item, index) => <button key={item.title} className={`tab ${active === index ? "active" : ""}`} onClick={() => setActive(index)}>{item.title}</button>)}
          </div>
          <div className="floor-wrap">
            <div className="floor-card reveal">
              <SectionLabel>{residence.type}</SectionLabel>
              <h2 className="display floor-title">{residence.plan}</h2>
              <div className="num floor-area">{residence.area}</div>
              <div className="floor-abstract">{Array.from({ length: 24 }).map((_, i) => <span key={i} className={i % 7 === 0 ? "big" : i % 5 === 0 ? "tall" : ""} />)}</div>
            </div>
            <div className="detail-panel reveal">
              <SectionLabel light>{residence.type}</SectionLabel>
              <h2 className="display floor-title">{residence.title}</h2>
              <p className="lead">{residence.copy}</p>
              <ul>{residence.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <Button to="/contact" variant="gold">Request Floor Plan</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Amenities() {
  return (
    <>
      <PageHero eyebrow="Amenities" title="Life, beautifully" italic="curated" copy="A complete lifestyle system across wellness, recreation, family, convenience and security." image={assets.clubhouse} />
      <section className="block pearl">
        <div className="container">
          <SectionLabel>Amenity Categories</SectionLabel>
          <div className="amenity-groups">
            {Object.entries(amenityGroups).map(([group, list]) => (
              <div className="amenity-group reveal" key={group}>
                <h3>{group}</h3>
                <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="block white">
        <div className="container">
          <SectionLabel>Amenity Visuals</SectionLabel>
          <h2 className="section-title display">Spaces that support leisure, wellness and community life.</h2>
          <div className="amenity-gallery">
            {amenityHighlights.map(([title, tag, image]) => <AmenityTile key={title} title={title} tag={tag} image={image} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function Offers() {
  return (
    <>
      <PageHero eyebrow="Offers" title="Flexible ownership for" italic="premium living" copy="Two structured schemes designed to give buyers more breathing room while securing a home at Trivik Signature." image={assets.entrance} />
      <section className="block navy">
        <div className="container offer-page">
          <div className="offer-image reveal">
            <img src={assets.clubhouse} alt="Clubhouse at Trivik Signature" loading="lazy" />
          </div>
          <div>
            <SectionLabel light>Current Schemes</SectionLabel>
            <h2 className="section-title display">Ownership options with clearer financial flexibility.</h2>
            <div className="offer-grid">
              {offerSchemes.map((item) => <OfferCard key={item.badge} item={item} />)}
            </div>
            <p className="muted-note">Terms, eligibility and final offer availability are subject to confirmation by the Trivik Signature sales team.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  function submit(event) {
    event.preventDefault();
    window.open(project.whatsapp, "_blank");
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Receive the brochure, floor plans and" italic="availability details" copy="Choose what you need — current price sheet, floor plan, duplex availability or a private site visit — and our team will follow up directly." image={assets.entrance} />
      <section className="block pearl">
        <div className="container contact-grid">
          <div>
            <SectionLabel>Contact Information</SectionLabel>
            <h2 className="section-title display">Let us arrange the next step.</h2>
            <div className="contact-card reveal">
              <p><strong>Phone</strong><span>{project.phone}</span></p>
              <p><strong>Email</strong><span>{project.email}</span></p>
              <p><strong>Website</strong><span>{project.website}</span></p>
              <p><strong>Address</strong><span>{project.address}</span></p>
            </div>
            <div className="contact-trust">
              <div className="rera-mini">
                <img src={assets.reraLogo} alt="RERA Approved" />
                <div><small>RERA Registration</small><strong>{project.rera}</strong></div>
              </div>
              <div className="funding-mini">
                <small>Funding Disclosure</small>
                <strong>Mortgaged & funded by Bajaj Housing Finance Limited</strong>
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="lead-form reveal">
            <div className="form-grid">
              <label>Name<input required placeholder="Your name" /></label>
              <label>Phone<input required placeholder="+91" /></label>
            </div>
            <label>Email<input type="email" placeholder="you@example.com" /></label>
            <label>Interested In
              <select>
                <option>Get Current Price Sheet</option>
                <option>Download 3 BHK Floor Plan</option>
                <option>Check Duplex Availability</option>
                <option>Book a Private Site Visit</option>
                <option>Understand T20 / EMI Holiday Scheme</option>
              </select>
            </label>
            <label>Message<textarea rows="5" placeholder="Tell us what you would like to receive" /></label>
            <button className="btn dark" type="submit">Get Price Sheet & Arrange Site Visit</button>
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

  async function login(event) {
    event.preventDefault();
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
      <div className="login-card reveal is-visible">
        <div className="login-logo"><img src={assets.logo} alt="Trivik Signature logo" /></div>
        <SectionLabel>Customer Portal</SectionLabel>
        <h1 className="display">Secure customer login</h1>
        <p>Enter your registered email and password to view your flat details, construction progress, payment summary, pending dues and documents.</p>
        <form onSubmit={login}>
          <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" /></label>
          <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" /></label>
          <button className="btn dark full" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login & View Customer Details"}</button>
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
    if (!token) {
      navigate("/customer-login");
      return;
    }
    fetch(`${API_BASE}/api/customer/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.message || "Unauthorized");
        setData(payload);
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
      <PageHero eyebrow="Customer Details" title={`Welcome, ${customer.name}`} copy="Your personal Trivik Signature flat, payment and construction summary." image={assets.aerial} />
      <section className="block pearl">
        <div className="container">
          <div className="portal-top">
            <span className="portal-id">Customer ID: {customer.id}</span>
            <Button variant="dark" onClick={() => { localStorage.removeItem("trivikToken"); navigate("/customer-login"); }}>Logout</Button>
          </div>
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
            <div className="table-wrap"><table><thead><tr><th>Date</th><th>Description</th><th>Mode</th><th>Receipt</th><th>Amount</th></tr></thead><tbody>{payments.history.map((row) => <tr key={row.receipt}><td>{row.date}</td><td>{row.description}</td><td>{row.mode}</td><td>{row.receipt}</td><td>{row.amount}</td></tr>)}</tbody></table></div>
          </PortalCard>
          <PortalCard title="Documents" className="mt">
            <h2 className="display portal-heading">Your Documents</h2>
            <div className="doc-grid">{documents.map((item) => <div className="doc-card" key={item.name}><strong>{item.name}</strong><span>{item.status}</span></div>)}</div>
          </PortalCard>
          <div className="dashboard-grid mt">
            <PortalCard title="Support">
              <h2 className="display portal-heading">Need assistance?</h2>
              <p className="dark-copy">Reach the CRM team for payment clarification, document requests, construction updates or site visit scheduling.</p>
              <div className="hero-actions"><Button href={project.phoneLink} variant="dark">Call CRM</Button><Button href={project.whatsapp} variant="dark">WhatsApp CRM</Button></div>
            </PortalCard>
            <PortalCard title="Notifications">
              <h2 className="display portal-heading">Latest Updates</h2>
              <PortalRows rows={notifications.map((item) => [item.date, item.message])} />
            </PortalCard>
          </div>
        </div>
      </section>
    </>
  );
}

function PortalCard({ children, title, dark = false, className = "" }) {
  return <div className={`portal-card ${dark ? "dark" : ""} ${className}`}><SectionLabel light={dark}>{title}</SectionLabel>{children}</div>;
}

function PortalRows({ rows }) {
  return <div className="portal-list">{rows.map(([a, b]) => <div className="portal-row" key={`${a}-${b}`}><span>{a}</span><strong>{b}</strong></div>)}</div>;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src={assets.logoWhite} alt="Trivik Signature logo" />
          <p>Building tomorrow's communities today — where every detail is crafted with purpose, elegance and enduring quality.</p>
        </div>
        <p>{project.phone}<br />{project.email}<br />{project.address}</p>
        <p>RERA: {project.rera}<br />Mortgaged & funded by Bajaj Housing Finance Limited.</p>
      </div>
    </footer>
  );
}

function FloatingContactRail() {
  return (
    <div className="floating-rail">
      <a href={project.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
      <a href={project.phoneLink} aria-label="Call">☎</a>
    </div>
  );
}

function StickyCTA() {
  return (
    <div className="sticky-cta">
      <Link to="/contact">Price Sheet</Link>
      <Link to="/residences">Floor Plan</Link>
      <Link to="/contact">Site Visit</Link>
    </div>
  );
}

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    let observer;
    let fallbackTimer;

    const setupRevealAnimations = () => {
      const nodes = document.querySelectorAll(".reveal, .block, .portal-card, .fact, .offer-card, .lead-form");

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) node.classList.add("is-visible");
      });

      if (!("IntersectionObserver" in window)) {
        nodes.forEach((node) => node.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.06, rootMargin: "0px 0px -2% 0px" });

      nodes.forEach((node) => observer.observe(node));

      fallbackTimer = window.setTimeout(() => {
        nodes.forEach((node) => node.classList.add("is-visible"));
      }, 700);
    };

    const frame = window.requestAnimationFrame(setupRevealAnimations);

    return () => {
      window.cancelAnimationFrame(frame);
      if (observer) observer.disconnect();
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
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
      <FloatingContactRail />
      <StickyCTA />
    </>
  );
}

export default App;
