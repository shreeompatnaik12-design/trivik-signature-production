
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
    ["About", "/about"],
    ["Residences", "/residences"],
    ["Amenities", "/amenities"],
    ["Offers", "/offers"],
    ["Contact", "/contact"]
  ];

  return (
    <header>
      <div className="container nav">
        <Link to="/" className="brand"><img src={assets.logo} alt="Trivik Signature logo" /></Link>
        <nav className="nav-links">
          {nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <Button to="/customer-login" variant="gold">Customer Login</Button>
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Open menu">☰</button>
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

function LeadMagnetStrip({ compact = false }) {
  const items = [
    ["Price Sheet", "Get the latest unit pricing and scheme details.", "/contact"],
    ["Floor Plans", "Download 3 BHK and duplex plan references.", "/residences"],
    ["Site Visit", "Schedule a private walkthrough with our team.", "/contact"]
  ];

  return (
    <section className={`lead-magnet ${compact ? "compact" : ""}`}>
      <div className="container lead-magnet-grid">
        {items.map(([title, copy, to]) => (
          <Link className="lead-magnet-card" to={to} key={title}>
            <span>{title}</span>
            <strong>{copy}</strong>
            <em>Request now →</em>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CinematicGallery() {
  const [active, setActive] = useState(null);
  const frames = [
    { role: "Arrival", src: assets["hero-entrance"], title: "A composed arrival that introduces the scale of the address." },
    { role: "Masterplan", src: assets["aerial-master"], title: "Aerial planning that reveals the full 6.34-acre community." },
    { role: "Lifestyle", src: assets["clubhouse-pool"], title: "Clubhouse, pool and leisure zones forming the social heart." },
    { role: "Architecture", src: assets["front-view"], title: "A clean architectural language with calm residential presence." },
    { role: "Landscape", src: assets["landscape-view"], title: "Open green pockets designed for daily pause and family life." }
  ];

  return (
    <section className="block pearl cinematic-block">
      <div className="container">
        <div className="cinematic-heading">
          <div>
            <SectionLabel>Visual Journey</SectionLabel>
            <h2 className="section-title display">From first arrival to everyday life.</h2>
          </div>
          <p className="copy-lg">Each render now has a role: arrival, scale, lifestyle, architecture and landscape. Click any frame to view it larger.</p>
        </div>
        <div className="cinematic-gallery">
          {frames.map((item, index) => (
            <button className={`cinematic-frame frame-${index + 1}`} key={item.role} onClick={() => setActive(item)}>
              <img src={item.src} alt={item.title} loading="lazy" />
              <span>{item.role}</span>
              <strong className="display">{item.title}</strong>
            </button>
          ))}
        </div>
      </div>
      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <button aria-label="Close image" className="lightbox-close">×</button>
          <img src={active.src} alt={active.title} />
          <div><span>{active.role}</span><strong className="display">{active.title}</strong></div>
        </div>
      )}
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-bg" src={assets["hero-entrance"]} alt="Trivik Signature entrance approach" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div>
            <div className="eyebrow">Soukya Road · Samethanahalli · East Bengaluru</div>
            <h1 className="display">The Art of <em>Elevated</em> Living</h1>
            <p className="lead">Welcome to Trivik Signature — where modern architecture meets an elevated way of life. A community of 408 premium residences across 3 stunning towers, designed for those who refuse to compromise on quality, comfort or aesthetics.</p>
            <div className="hero-actions">
              <Button to="/contact" variant="gold">Get Current Price Sheet</Button>
              <Button to="/residences" variant="outline">Download Floor Plans</Button>
            </div>
          </div>
          <aside className="snapshot">
            <p className="tiny-title">Project Snapshot</p>
            <h2 className="display">Trivik Signature</h2>
            <div className="stats">
              {stats.map(([v, l]) => <div className="stat" key={l}><strong className="num">{v}</strong><span>{l}</span></div>)}
            </div>
            <div className="snapshot-lines">
              <div>Configuration: Spacious 3 BHK apartments and duplex homes</div>
              <div>Size range: 1,650 – 3,624 sq. ft.</div>
              <div>RERA: {project.rera}</div>
            </div>
          </aside>
        </div>
      </section>

      <LeadMagnetStrip />

      <section className="block pearl">
        <div className="container split">
          <div>
            <SectionLabel>Discover Modern Living</SectionLabel>
            <h2 className="section-title display">This is not just a home. This is your signature address.</h2>
          </div>
          <div>
            <p className="copy-lg">Every corner of Trivik Signature has been conceived with one purpose: to give you a life that is as beautiful as it is fulfilling. From thoughtfully designed living spaces to world-class amenities, the project blends luxury, functionality and legal transparency into one composed residential experience.</p>
            <Button to="/about" variant="dark">Know the Brand</Button>
          </div>
        </div>
      </section>

      <section className="block navy">
        <div className="container">
          <SectionLabel light>Development Highlights</SectionLabel>
          <h2 className="section-title display">Building tomorrow's communities today.</h2>
          <div className="card-grid four mt">
            <InfoCard title="3 Towers" text="Three iconic high-rise towers with a G+17 profile." light />
            <InfoCard title="408 Residences" text="A premium residential community planned at scale." light />
            <InfoCard title="RERA Approved" text="Registered for buyer confidence and legal transparency." light />
            <InfoCard title="OC/CC Compliance" text="Compliance-led communication and documentation." light />
          </div>
        </div>
      </section>

      <CinematicGallery />

      <PreviewSection
        image={assets["front-view"]}
        eyebrow="About Trivik"
        title="Built on integrity, innovation and excellence."
        copy="Founded in 2024, Trivik Signature is a premier real estate development firm committed to redefining urban living through legal transparency, thoughtful planning, quality construction and an elevated lifestyle experience."
        to="/about"
        cta="Read About Us"
      />

      <PreviewSection
        reverse
        image={assets.floorPlans}
        eyebrow="Residences"
        title="Spacious 3 BHK homes and limited duplex residences."
        copy="Explore residences ranging from 1,650 to 3,624 sq. ft., with smart space planning, natural light, cross ventilation, private balconies and a clear distinction between apartment and duplex living."
        to="/residences"
        cta="View Floor Plans"
      />

      <section className="block navy">
        <div className="container home-preview">
          <div>
            <SectionLabel light>Amenities</SectionLabel>
            <h2 className="section-title display">A lifestyle system across wellness, recreation and convenience.</h2>
            <p className="preview-copy">From clubhouse, pool, gymnasium and multipurpose hall to landscaped gardens, children's play areas, senior zones, security systems, co-working and convenience spaces — the project is planned for everyday completeness.</p>
            <Button to="/amenities" variant="gold">Explore Amenities</Button>
          </div>
          <div className="preview-image"><img src={assets["clubhouse-pool"]} alt="Clubhouse and pool" loading="lazy" /><span>Clubhouse & Pool</span></div>
        </div>
      </section>

      <PreviewSection
        reverse
        image={assets["entrance-gateway"]}
        eyebrow="Offers"
        title="Flexible schemes for easier ownership."
        copy="The Trivik T20 Scheme and EMI Holiday Scheme are presented clearly so buyers can understand payment flexibility without aggressive sales language."
        to="/offers"
        cta="View Offers"
      />

      <section className="block royal">
        <div className="container home-preview">
          <div>
            <SectionLabel light>Customer Portal</SectionLabel>
            <h2 className="section-title display">A private space for flat, payment and construction details.</h2>
            <p className="preview-copy">The customer portal connects to a backend so customers can view their flat details, construction completion percentage, payments, pending dues and documents securely.</p>
            <Button to="/customer-login" variant="gold">Customer Login</Button>
          </div>
          <div className="preview-image"><img src={assets["aerial-master"]} alt="Customer portal preview" loading="lazy" /><span>Customer Dashboard</span></div>
        </div>
      </section>
    </>
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
      <LeadMagnetStrip compact />

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
              <Button to="/contact" variant="gold">Download Full Floor Plan</Button>
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
      <PageHero eyebrow="Private Preview" title="Receive the brochure, floor plans and" italic="availability details" copy="Choose what you need — current price sheet, floor plan, duplex availability or a private site visit — and our team will follow up directly." image={assets["entrance-gateway"]} />
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
            <label>Interested In<select><option>Get Current Price Sheet</option><option>Download 3 BHK Floor Plan</option><option>Check Duplex Availability</option><option>Book a Private Site Visit</option><option>Understand T20 / EMI Holiday Scheme</option></select></label>
            <label>Message<textarea rows="5" placeholder="Tell us your requirement" /></label>
            <button className="btn dark" type="submit">Get Price Sheet & Book Site Visit</button>
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
    <footer>
      <div className="container footer-grid">
        <div><img src={assets.logo} alt="Trivik Signature logo" /><p>Building tomorrow's communities today — where every detail is crafted with purpose, elegance and enduring quality.</p></div>
        <p>RERA: {project.rera}<br />{project.location}<br />This project is mortgaged and funded by Bajaj Housing Finance Limited. Final legal copy to be verified before launch.</p>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return <div className="sticky-cta"><Link to="/contact">Price Sheet</Link><Link to="/residences">Floor Plan</Link><Link to="/contact">Site Visit</Link></div>;
}

function App() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".block, .image-tile, .info-card, .preview-image, .portal-card, .offer-card, .fact, .lead-magnet-card, .cinematic-frame");
    nodes.forEach((node) => node.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

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
