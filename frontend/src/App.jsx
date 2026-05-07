import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  amenityCategories,
  amenityHighlights,
  approvals,
  assets,
  journeySteps,
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

function Icon({ name }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "shield":
      return <svg {...common}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /><path d="M9.5 12l1.7 1.7L14.8 10" /></svg>;
    case "location":
      return <svg {...common}><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "design":
      return <svg {...common}><path d="M4 15l8-11 8 11" /><path d="M6 13h12" /><path d="M8 19h8" /></svg>;
    case "leaf":
      return <svg {...common}><path d="M5 14c0-6 7-9 14-9 0 7-3 14-9 14-3 0-5-2-5-5z" /><path d="M7 17c2-3 6-6 10-8" /></svg>;
    case "star":
      return <svg {...common}><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.5 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3z" /></svg>;
    case "heart":
      return <svg {...common}><path d="M20 7.2a4.7 4.7 0 0 0-8-3.2A4.7 4.7 0 0 0 4 7.2c0 6.2 8 11.8 8 11.8s8-5.6 8-11.8z" /></svg>;
    case "sport":
      return <svg {...common}><path d="M5 19l14-14" /><path d="M8 5c2 2 2 5 0 7" /><path d="M19 16c-2-2-5-2-7 0" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="7" r="2" /></svg>;
    case "lock":
      return <svg {...common}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 1 1 8 0v3" /></svg>;
    case "phone":
      return <svg {...common}><path d="M8 4h3l1 4-2 1.5a16 16 0 0 0 4 4L15.5 12l4 1v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 6 6.7 2 2 0 0 1 8 4z" /></svg>;
    case "whatsapp":
      return <svg {...common}><path d="M20 11.5a8 8 0 1 0-15 4l-1 4 4-1a8 8 0 0 0 12-7z" /><path d="M9 9.5c.2 2 2.5 4.3 4.5 4.5" /><path d="M14.2 14.2c-.7.4-2.1-.1-3.4-1.4-1.3-1.3-1.8-2.7-1.4-3.4" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}

function Button({ children, to, href, variant = "gold", icon, className = "", onClick, type = "button" }) {
  const cls = `btn ${variant} ${className}`.trim();
  const body = (
    <>
      {icon && <span className="btn-icon"><Icon name={icon} /></span>}
      <span>{children}</span>
    </>
  );
  if (href) return <a className={cls} href={href} onClick={onClick}>{body}</a>;
  if (to) return <Link className={cls} to={to} onClick={onClick}>{body}</Link>;
  return <button className={cls} type={type} onClick={onClick}>{body}</button>;
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
      <div className="container nav-shell">
        <Link to="/" className="brand" aria-label="Trivik Signature home">
          <img src={assets.logo} alt="Trivik Signature logo" />
        </Link>
        <nav className="nav-links">
          {nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <Button to="/customer-login" variant="dark" icon="lock">Customer Login</Button>
          <button className="hamburger" aria-label="Open menu" onClick={() => setOpen(!open)}>
            <span />
            <span />
            <span />
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
      <div className="hero-overlay dark" />
      <div className="container page-hero-inner">
        <SectionLabel light>{eyebrow}</SectionLabel>
        <h1 className="display">{title} {italic && <em>{italic}</em>}</h1>
        {copy && <p className="lead max-copy">{copy}</p>}
      </div>
    </section>
  );
}

function StatCard({ value, label }) {
  return <div className="stat-card"><strong className="num">{value}</strong><span>{label}</span></div>;
}

function TrustBadge({ item }) {
  return (
    <div className="trust-badge-card reveal">
      <div className="trust-badge-visual">
        {item.kind === "image" ? (
          <img src={item.image} alt={item.title} />
        ) : (
          <div className="simple-strr-mark">
            <span>STRR</span>
            <strong>Connectivity Corridor</strong>
          </div>
        )}
      </div>
      <div className="trust-badge-copy">
        <small>{item.subtitle}</small>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <strong>{item.value}</strong>
      </div>
    </div>
  );
}

function WhyUsCard({ item }) {
  return (
    <div className="why-card reveal">
      <div className="why-icon"><Icon name={item.icon} /></div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  );
}

function VisualCard({ item }) {
  return (
    <article className="visual-card reveal">
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="visual-overlay">
        <span>{item.tag}</span>
        <h3 className="display">{item.title}</h3>
        <p>{item.copy}</p>
      </div>
    </article>
  );
}

function AmenityPreviewCard({ item }) {
  return (
    <article className="amenity-preview-card reveal">
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="amenity-preview-overlay">
        <small>{item.category}</small>
        <h3>{item.title}</h3>
      </div>
    </article>
  );
}

function AmenityFeatureCard({ item }) {
  return (
    <article className="amenity-feature-card reveal">
      <div className="amenity-feature-image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="amenity-feature-copy">
        <small>{item.category}</small>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </div>
    </article>
  );
}

function CategoryCard({ item }) {
  return (
    <div className="category-card reveal">
      <div className="category-icon"><Icon name={item.icon} /></div>
      <h3>{item.title}</h3>
      <ul>
        {item.items.map((entry) => <li key={entry}>{entry}</li>)}
      </ul>
    </div>
  );
}

function JourneyCard({ item, index }) {
  return (
    <div className={`timeline-item ${item.status}`}>
      <div className="timeline-node">{item.status === "active" ? "✓" : index + 1}</div>
      <span className="timeline-status">{item.stage}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  );
}

function OfferCard({ item }) {
  return (
    <article className={`offer-card ${item.tone} reveal`}>
      <span className="offer-badge">{item.badge}</span>
      <h3 className="display">{item.title}</h3>
      <ul>
        {item.points.map((point) => <li key={point}>{point}</li>)}
      </ul>
      <Button to="/contact" variant={item.tone === "navy" ? "gold" : "dark"}>Request this scheme</Button>
    </article>
  );
}

function Fact({ k, v }) {
  return <div className="fact"><span>{k}</span><strong>{v}</strong></div>;
}

function PortalCard({ children, title, dark = false, className = "" }) {
  return <div className={`portal-card ${dark ? "dark" : ""} ${className}`}><SectionLabel light={dark}>{title}</SectionLabel>{children}</div>;
}

function PortalRows({ rows }) {
  return <div className="portal-list">{rows.map(([a, b]) => <div className="portal-row" key={`${a}-${b}`}><span>{a}</span><strong>{b}</strong></div>)}</div>;
}

function PreviewSplit({ eyebrow, title, copy, image, to, cta, reverse = false, dark = false }) {
  return (
    <section className={`block ${dark ? "navy" : "white"}`}>
      <div className={`container preview-split ${reverse ? "reverse" : ""}`}>
        <div>
          <SectionLabel light={dark}>{eyebrow}</SectionLabel>
          <h2 className="section-title display">{title}</h2>
          <p className={`copy-lg ${dark ? "light-copy" : ""}`}>{copy}</p>
          <Button to={to} variant={dark ? "gold" : "dark"}>{cta}</Button>
        </div>
        <div className="preview-visual reveal">
          <img src={image} alt={eyebrow} loading="lazy" />
          <div className="preview-caption">{eyebrow}</div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const homeAmenities = useMemo(() => amenityHighlights.slice(0, 6), []);

  return (
    <>
      <section className="hero home-hero">
        <img className="hero-bg" src={assets.hero} alt="Trivik Signature entrance" />
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Soukya Road · Samethanahalli · East Bengaluru</div>
            <h1 className="display">A premium address shaped with <em>clarity, comfort and character</em>.</h1>
            <p className="lead">Trivik Signature brings together premium residences, elegant open spaces, curated lifestyle amenities and a trust-led development approach for modern homebuyers in East Bengaluru.</p>
            <div className="hero-actions">
              <Button to="/contact" variant="gold">Get current price sheet</Button>
              <Button to="/residences" variant="outline">View floor plans</Button>
            </div>
          </div>
          <aside className="hero-panel reveal">
            <SectionLabel light>Project Snapshot</SectionLabel>
            <h2 className="display">Trivik Signature</h2>
            <div className="hero-stats">
              {stats.map(([value, label]) => <StatCard key={label} value={value} label={label} />)}
            </div>
            <div className="hero-panel-lines">
              <div><span>Configuration</span><strong>3 BHK residences & duplex homes</strong></div>
              <div><span>Size range</span><strong>1,650 – 3,624 sq. ft.</strong></div>
              <div><span>RERA</span><strong>{project.rera}</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="block white intro-band">
        <div className="container split-intro">
          <div>
            <SectionLabel>Welcome to Trivik</SectionLabel>
            <h2 className="section-title display">A signature address for families who want more from everyday living.</h2>
          </div>
          <p className="copy-lg">At Trivik Signature, refined architecture, spacious residences, landscaped experiences and thoughtful amenities come together to create a home that feels private, practical and quietly premium.</p>
        </div>
      </section>

      <section className="block pearl">
        <div className="container">
          <SectionLabel>Trust & Approvals</SectionLabel>
          <h2 className="section-title display">A homebuying journey built on clarity and confidence.</h2>
          <div className="trust-badge-grid">
            {approvals.map((item) => <TrustBadge key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className="block navy">
        <div className="container">
          <SectionLabel light>Why Trivik</SectionLabel>
          <h2 className="section-title display">Designed for comfort, confidence and long-term value.</h2>
          <div className="why-grid">
            {whyUs.map((item) => <WhyUsCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className="block white">
        <div className="container">
          <div className="section-head split-head">
            <div>
              <SectionLabel>Visual Showcase</SectionLabel>
              <h2 className="section-title display">A closer look at the spaces that define the community.</h2>
            </div>
            <p className="copy-lg">From the arrival gateway to the master aerial view, every visual captures a different layer of the Trivik Signature lifestyle.</p>
          </div>
          <div className="visual-grid">
            {visualShowcase.map((item) => <VisualCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <PreviewSplit
        eyebrow="About Us"
        title="Built on integrity, innovation and a premium development outlook."
        copy="Founded with a commitment to transparent development and better urban living, Trivik Signature brings together strong planning, legal clarity and a customer-first approach."
        image={assets.front}
        to="/about"
        cta="Read about us"
      />

      <PreviewSplit
        eyebrow="Residences"
        title="Spacious residences crafted around light, comfort and privacy."
        copy="Explore well-planned 3 BHK homes and limited duplex residences with generous spaces, private balconies, natural ventilation and layouts made for modern family life."
        image={assets.floorPlans}
        to="/residences"
        cta="Explore residences"
        reverse
      />

      <section className="block pearl">
        <div className="container">
          <div className="section-head split-head">
            <div>
              <SectionLabel>Amenities</SectionLabel>
              <h2 className="section-title display">Amenities designed for leisure, wellness and community.</h2>
            </div>
            <p className="copy-lg">Clubhouse moments, landscaped courts, active sports zones and family-friendly spaces shape a lifestyle that feels complete beyond the apartment.</p>
          </div>
          <div className="amenity-preview-grid">
            {homeAmenities.map((item) => <AmenityPreviewCard key={item.title} item={item} />)}
          </div>
          <div className="amenity-preview-cta">
            <Button to="/amenities" variant="dark">View full amenities gallery</Button>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="timeline-heading">
            <SectionLabel light>Project Milestones</SectionLabel>
            <h2 className="section-title display">From <em>vision</em> to reality</h2>
            <p>RERA approval is the current confirmed milestone. The upcoming stages remain soft until each milestone is officially achieved.</p>
          </div>
          <div className="timeline-grid reveal">
            {journeySteps.map((item, index) => <JourneyCard key={item.title} item={item} index={index} />)}
          </div>
        </div>
      </section>

      <section className="block navy offer-highlight-block">
        <div className="container offer-highlight-layout">
          <div className="offer-highlight-image reveal">
            <img src={assets.entrance} alt="Trivik Signature offer section" loading="lazy" />
          </div>
          <div>
            <SectionLabel light>Flexible Schemes</SectionLabel>
            <h2 className="section-title display">Flexible schemes designed to make ownership easier.</h2>
            <p className="copy-lg light-copy">Choose from thoughtfully structured payment options created to give buyers more breathing room while securing a premium home at Trivik Signature.</p>
            <div className="offer-grid">
              {offerSchemes.map((item) => <OfferCard key={item.badge} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      <PreviewSplit
        eyebrow="Customer Portal"
        title="A private customer space for flat details, payments and progress."
        copy="The customer portal is designed to give buyers a clear view of their apartment details, construction updates, payment summary, documents and CRM support."
        image={assets.aerial}
        to="/customer-login"
        cta="Open customer portal"
        dark
      />
    </>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="About Trivik" title="A premium real estate development firm built on" italic="integrity" copy="Founded in 2024, Trivik Signature is built on the pillars of integrity, innovation and excellence." image={assets.front} />
      <section className="block pearl">
        <div className="container split-intro">
          <div>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="section-title display">We do not just build homes — we shape complete environments.</h2>
          </div>
          <p className="copy-lg">Spread across a thoughtfully planned community featuring three towers and 408 premium residences, Trivik Signature is committed to creating a more refined idea of urban living. Our work is rooted in legal transparency, thoughtful planning, quality construction and a better day-to-day lifestyle experience for residents.</p>
        </div>
      </section>
      <section className="block white">
        <div className="container">
          <SectionLabel>Mission & Values</SectionLabel>
          <div className="why-grid about-why-grid">
            <WhyUsCard item={{ icon: "design", title: "Our mission", text: "To create inclusive, sustainable and highly livable communities that support better everyday living." }} />
            <WhyUsCard item={{ icon: "shield", title: "Integrity", text: "Transparent communication, approvals-led planning and stronger homeowner trust." }} />
            <WhyUsCard item={{ icon: "star", title: "Innovation", text: "Design decisions that combine modern convenience with a composed premium aesthetic." }} />
            <WhyUsCard item={{ icon: "leaf", title: "Quality & community", text: "Superior construction, thoughtful amenities and spaces that bring residents together." }} />
          </div>
        </div>
      </section>
      <section className="block navy">
        <div className="container">
          <SectionLabel light>Management</SectionLabel>
          <h2 className="section-title display">Managing Partners</h2>
          <div className="mini-grid mt">
            {partners.map((name, index) => (
              <div className="mini-card reveal" key={name}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{name}</span>
                <em>Managing Partner</em>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="block pearl">
        <div className="container">
          <SectionLabel>The Team</SectionLabel>
          <h2 className="section-title display">Project & Sales Team</h2>
          <div className="table-wrap mt">
            <table>
              <thead><tr><th>#</th><th>Name</th><th>Designation</th></tr></thead>
              <tbody>
                {staff.map(([name, role], index) => <tr key={name}><td>{index + 1}</td><td>{name}</td><td>{role}</td></tr>)}
              </tbody>
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
          <Fact k="Project Name" v={project.name} />
          <Fact k="Type" v="Premium residential apartments & duplex homes" />
          <Fact k="Project Area" v="6.34 acres" />
          <Fact k="Configuration" v="3 BHK apartments & duplex homes" />
          <Fact k="Total Units" v="408 residences" />
          <Fact k="Tower Profile" v="3 towers · G+17" />
          <Fact k="Size Range" v="1,650 – 3,624 sq. ft." />
          <Fact k="Possession" v={project.possession} />
        </div>
      </section>
      <section className="block white">
        <div className="container">
          <SectionLabel>Official Plan Reference</SectionLabel>
          <h2 className="section-title display">Typical floor and duplex level plans.</h2>
          <div className="floor-plan-real mt reveal"><img src={assets.floorPlans} alt="Trivik Signature floor plans" loading="lazy" /></div>
        </div>
      </section>
      <section className="block pearl">
        <div className="container">
          <div className="tabs">
            {residences.map((item, index) => (
              <button key={item.title} className={`tab ${active === index ? "active" : ""}`} onClick={() => setActive(index)}>{item.title}</button>
            ))}
          </div>
          <div className="floor-wrap">
            <div className="floor-card reveal">
              <SectionLabel>{residence.type}</SectionLabel>
              <h2 className="display floor-title">{residence.plan}</h2>
              <div className="num floor-area">{residence.area}</div>
              <div className="floor-abstract">
                {Array.from({ length: 24 }).map((_, i) => <span key={i} className={i % 7 === 0 ? "big" : i % 5 === 0 ? "tall" : ""} />)}
              </div>
            </div>
            <div className="detail-panel reveal">
              <SectionLabel light>{residence.type}</SectionLabel>
              <h2 className="display floor-title">{residence.title}</h2>
              <p className="lead">{residence.copy}</p>
              <ul>
                {residence.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <Button to="/contact" variant="gold">Request floor plan</Button>
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
      <PageHero eyebrow="Amenities" title="Life, beautifully" italic="curated" copy="Amenities are now presented with more imagery, better naming and stronger lifestyle categorization." image={assets.clubhouse} />
      <section className="block pearl">
        <div className="container">
          <SectionLabel>Amenity Categories</SectionLabel>
          <h2 className="section-title display">A better-organized lifestyle offering.</h2>
          <div className="category-grid">
            {amenityCategories.map((item) => <CategoryCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>
      <section className="block white">
        <div className="container">
          <div className="section-head split-head">
            <div>
              <SectionLabel>Featured Amenity Visuals</SectionLabel>
              <h2 className="section-title display">Image-led presentation for stronger recall.</h2>
            </div>
            <p className="copy-lg">Every amenity visual now carries its own name and supporting line so users understand what they are viewing at a glance.</p>
          </div>
          <div className="amenity-feature-grid">
            {amenityHighlights.map((item) => <AmenityFeatureCard key={item.title} item={item} />)}
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
      <section className="block navy offer-page-block">
        <div className="container offer-page-layout">
          <div className="offer-page-image reveal">
            <img src={assets.clubhouse} alt="Clubhouse at Trivik Signature" loading="lazy" />
          </div>
          <div>
            <SectionLabel light>Current Schemes</SectionLabel>
            <h2 className="section-title display">Clearer visual contrast. Better scheme communication.</h2>
            <div className="offer-grid">
              {offerSchemes.map((item) => <OfferCard key={item.badge} item={item} />)}
            </div>
            <p className="muted-note">Terms, eligibility and final offer availability remain subject to confirmation by the Trivik Signature sales team.</p>
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
        <div className="container contact-layout">
          <div>
            <SectionLabel>Contact Information</SectionLabel>
            <h2 className="section-title display">Let us arrange the next step.</h2>
            <div className="contact-card-stack reveal">
              <div className="contact-info-card">
                <div className="contact-line"><strong>Phone</strong><span>{project.phone}</span></div>
                <div className="contact-line"><strong>Email</strong><span>{project.email}</span></div>
                <div className="contact-line"><strong>Website</strong><span>{project.website}</span></div>
                <div className="contact-line"><strong>Address</strong><span>{project.address}</span></div>
              </div>
              <div className="compliance-row">
                <div className="compliance-card">
                  <div className="compliance-icon"><img src={assets.rera} alt="RERA approved" /></div>
                  <div>
                    <small>RERA Registration</small>
                    <strong>{project.rera}</strong>
                  </div>
                </div>
                <div className="compliance-card funding-card">
                  <div className="funding-pill">Funding</div>
                  <div>
                    <small>Project funding support</small>
                    <strong>Mortgaged & funded by Bajaj Housing Finance Limited</strong>
                  </div>
                </div>
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
            <button className="btn dark" type="submit">Get price sheet & arrange site visit</button>
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
        <div className="portal-login-header">
          <img src={assets.logo} alt="Trivik Signature logo" />
          <div className="portal-icon"><Icon name="lock" /></div>
        </div>
        <SectionLabel>Customer Portal</SectionLabel>
        <h1 className="display">Secure customer login</h1>
        <p>Enter your registered email and password to view your personal flat details, construction progress, payment summary, pending dues and documents.</p>
        <form onSubmit={login}>
          <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" /></label>
          <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" /></label>
          <button className="btn dark full" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login & view customer details"}</button>
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
            <div className="doc-grid">{documents.map((item) => <div className="doc-card" key={item.name}><div className="category-icon"><Icon name="shield" /></div><strong>{item.name}</strong><span>{item.status}</span></div>)}</div>
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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src={assets.logoWhite} alt="Trivik Signature logo" className="footer-logo" />
          <p>Building tomorrow's communities today — where every detail is crafted with purpose, elegance and enduring quality.</p>
        </div>
        <div>
          <strong>Contact</strong>
          <p>{project.phone}<br />{project.email}<br />{project.address}</p>
        </div>
        <div>
          <strong>Compliance</strong>
          <p>RERA: {project.rera}<br />Mortgaged & funded by Bajaj Housing Finance Limited.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingContactRail() {
  return (
    <div className="floating-rail">
      <a href={project.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
      <a href={project.phoneLink} aria-label="Call"><Icon name="phone" /></a>
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

      // Make already-visible top-of-page content appear immediately on route changes.
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          node.classList.add("is-visible");
        }
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
      }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

      nodes.forEach((node) => observer.observe(node));

      // Safety fallback: never leave page content invisible if the observer misses a route render.
      fallbackTimer = window.setTimeout(() => {
        nodes.forEach((node) => node.classList.add("is-visible"));
      }, 900);
    };

    // Wait one frame so React Router has mounted the new page before we query elements.
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
