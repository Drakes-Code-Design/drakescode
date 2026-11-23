/* Drakes Code & Design — site script */
"use strict";
/* ================= CONTENT (verbatim from drakescode.com) ================= */
const IMG = "images/";
const D = {
  nav: [
    ["work", "Work"],
    ["services", "Services"],
    ["process", "Process"],
    ["pricing", "Pricing"],
    ["about", "About"],
  ],
  eyebrow: "Custom web design + development",
  lede: "Drakes Code & Design builds custom, mobile-friendly websites for small businesses—designed to look professional, load fast, and turn visitors into calls, bookings, and inquiries.",
  points: [
    "Mobile-friendly design",
    "Hand-coded, no templates",
    "Support after launch",
  ],
  trust: [
    "Custom built",
    "Mobile friendly",
    "Search-ready structure",
    "Ongoing support",
    "Flexible payments",
  ],
  work: {
    label: "Selected work",
    h: "Small business websites built to win customers.",
    p: "Every project starts with your customer’s journey—not a template—so visitors quickly understand what you offer and how to take the next step.",
  },
  projects: [
    {
      n: "01",
      t: "ElevateHer Coaching",
      url: "https://drakescode-commits.github.io/elevateher.github.io/",
      lab: "elevateher.co",
      img: "elevateHER.jpg",
      alt: "ElevateHer Coaching website homepage design with a professional portrait of the coach",
      tags: ["Coaching", "Lead generation"],
      p: "A polished coaching website that builds authority, explains the offer in plain language, and guides qualified visitors toward an application.",
      li: [
        "Conversion-focused page flow",
        "Responsive visual system",
        "Streamlined application path",
      ],
    },
    {
      n: "02",
      t: "Apex Mobile Detailing",
      url: "https://drakescode-commits.github.io/Mobile-Detailing/",
      lab: "dripdetailing.com",
      img: "detail.jpg",
      alt: "Close-up of a freshly detailed vehicle on the Apex Mobile Detailing website",
      tags: ["Local service", "Booking"],
      p: "A local service website that earns trust fast, makes detailing packages easy to compare, and moves customers straight to booking.",
      li: [
        "Service-first navigation",
        "Mobile booking path",
        "Local business positioning",
      ],
    },
    {
      n: "03",
      t: "Fit For U",
      url: "https://drakescode-commits.github.io/FitForU/",
      lab: "fitforu.com",
      img: "fit-for-u-concept.png",
      alt: "Athlete training in a modern gym on the Fit For U fitness landing page",
      tags: ["Fitness", "Landing page"],
      p: "A high-energy fitness landing page that organizes training programs clearly and makes it easy for new clients to sign up.",
      li: [
        "High-energy art direction",
        "Program-led content",
        "Inquiry-focused calls to action",
      ],
    },
    {
      n: "04",
      t: "Crown Theory Grooming",
      url: "https://drakescode-commits.github.io/Crown-Theory-Care/",
      lab: "crown theory / preview",
      img: "crown-theory-grooming.png",
      alt: "Crown Theory Grooming online store concept featuring premium hair and scalp-care products",
      tags: ["Men's grooming", "Brand concept"],
      p: "An upscale online grooming brand for African American hair care, pairing premium hair and scalp products with clean packaging, rich earthy tones, and textured-hair imagery.",
      li: [
        "Premium product positioning",
        "Warm, masculine art direction",
        "Product-led shopping journey",
      ],
    },
    {
      n: "05",
      t: "Southern Oak",
      url: "https://drakescode-commits.github.io/Southern-Oak/",
      lab: "southern oak / preview",
      img: "southern-oak.png",
      alt: "Southern Oak lifestyle brand website with natural oak furniture, neutral decor, and greenery",
      tags: ["Southern lifestyle", "Small business"],
      p: "A warm, refined Southern lifestyle brand with an upscale rustic feel—natural wood textures, earthy neutrals, and subtle greenery that make visitors feel at home.",
      li: [
        "Warm editorial art direction",
        "Elevated natural palette",
        "Welcoming brand experience",
      ],
    },
  ],
  svc: {
    label: "Services",
    h: "Web design services for growing businesses.",
    p: "Whether you need your first website or a better one, you get the right scope for today—with room to grow tomorrow.",
  },
  services: [
    [
      "Custom web design",
      "Layouts and visuals built around your brand, your customers, and the action you want them to take.",
      "Ask about custom web design",
    ],
    [
      "Website development",
      "Fast, responsive, accessible sites hand-coded in clean HTML, CSS, and JavaScript.",
      "Ask about website development",
    ],
    [
      "Website redesign & support",
      "Modernize an outdated site and keep it running smoothly with maintenance and guidance after launch.",
      "Ask about website redesign and support",
    ],
  ],
  why: {
    label: "Why Drakes",
    h: "A web designer who puts your business first.",
    p: "You work directly with the person designing and building your site—no account managers, no runaround. Every decision ties back to your goals.",
    cta: "Meet the developer",
  },
  benefits: [
    [
      "Custom, not cookie-cutter",
      "Your content and customers shape the design—not a prebuilt theme.",
    ],
    [
      "Built for every screen",
      "Your site looks sharp and works smoothly on phones, tablets, and desktops.",
    ],
    [
      "Clear communication",
      "A straightforward scope, regular updates, and revisions you can actually follow.",
    ],
    [
      "Support after launch",
      "Maintenance options keep your site current as your business changes.",
    ],
  ],
  proc: {
    label: "Process",
    h: "A simple path from first call to launch day.",
    p: "No guesswork. Five clear stages, with your feedback built in at every step.",
  },
  steps: [
    [
      "Discovery",
      "Understand your business",
      "We pin down your audience, services, goals, and content—and what a successful website looks like for you.",
    ],
    [
      "Design",
      "Shape the experience",
      "Page layout, visual direction, and the path from visitor to customer come together.",
    ],
    [
      "Development",
      "Build it right",
      "The approved design becomes a fast, responsive, search-ready website.",
    ],
    [
      "Review",
      "Refine the details",
      "We test everything, gather your feedback, and complete your included revision rounds.",
    ],
    [
      "Launch",
      "Go live with confidence",
      "Final checks, domain and hosting help, and a clean handoff get you online.",
    ],
  ],
  price: {
    label: "Pricing",
    h: "Affordable website packages with clear pricing.",
    p: "Every package includes professional design, mobile-friendly development, and a structure built to bring in customers.",
  },
  plans: [
    {
      nm: "Booking Site",
      amt: "300",
      d: "A simple one-page website where customers can see what you offer and book with you.",
      li: [
        "One custom page",
        "Looks great on phones and computers",
        "Your services, prices & policies",
        "Photo gallery",
        "Online booking connected",
        "Social media & contact links",
        "Help getting it live",
        "Two rounds of changes",
      ],
      del: "$150 deposit to start",
      s: "booking-site",
      b: "300",
      btn: "Choose Booking Site",
    },
    {
      nm: "Launch Site",
      amt: "600",
      d: "A professional website that helps a new business get found on Google and look trustworthy from day one.",
      li: [
        "Up to 5 pages",
        "Looks great on phones and computers",
        "Contact form so customers can reach you",
        "Basic setup to help you show up on Google",
        "Help getting it live",
        "Two rounds of changes",
      ],
      del: "7–10 business days",
      s: "launch-site",
      b: "600",
      btn: "Choose Launch Site",
    },
    {
      nm: "Business Site",
      amt: "1,000",
      d: "A larger website for growing businesses that want more customers calling, booking, and reaching out.",
      li: [
        "Up to 8 pages",
        "Custom page designs",
        "Forms that bring in new leads",
        "Online booking or scheduling",
        "Google Maps, visitor tracking & stronger Google setup",
        "Three rounds of changes",
      ],
      del: "2–3 weeks",
      s: "business-site",
      b: "1000",
      btn: "Choose Business Site",
      feat: true,
    },
    {
      nm: "Custom/Revamp",
      amt: "1,200",
      d: "A complete redesign of your current website, or a fully custom site built around exactly what you need.",
      li: [
        "Fresh new look for an outdated site",
        "Custom features built to your needs",
        "Your existing content moved over and cleaned up",
        "Looks great on phones and computers",
        "Help getting it live",
        "Guidance after launch",
      ],
      del: "Timeline based on your project",
      s: "custom-revamp",
      b: "1200",
      btn: "Choose Custom/Revamp",
    },
  ],
  custom: {
    h: "Not sure which package fits?",
    p: "Tell me a little about your business and I’ll recommend the right option—no pressure, no obligation.",
    btn: "Help Me Choose",
  },
  pay: [
    "Flexible payment options are available.",
    "A deposit is required before work begins.",
  ],
  about: {
    label: "About",
    h: "Web design with a business-first mindset.",
    p1: "Drakes Code & Design was founded in 2022 to help small businesses show up online with clarity and confidence. The goal isn’t just a good-looking website—it’s one that brings in customers.",
    p2: "Every project balances design with usability, mobile performance, clear messaging, and clean, maintainable code. You get direct communication, honest recommendations, and a site shaped around how your business actually works.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive design",
      "Accessibility",
      "SEO structure",
    ],
  },
  faq: {
    label: "FAQ",
    h: "Common questions about getting a website.",
    p: "Still deciding what your business needs? Reach out and we’ll figure it out together.",
    cta: "Ask a question",
  },
  faqs: [
    [
      "How long does it take to build a small business website?",
      "Most small business websites take about one to three weeks. Larger custom projects can take longer depending on pages, content, and integrations.",
    ],
    [
      "Do I need a domain and hosting first?",
      "No. I’ll explain what you need and walk you through choosing a domain and the right hosting before launch.",
    ],
    [
      "Will my website work on mobile phones?",
      "Yes. Every website is built and tested for desktops, tablets, and modern mobile devices.",
    ],
    [
      "Can you update my website after launch?",
      "Yes. Ongoing maintenance can cover content updates, technical support, minor design changes, backups, and general website care.",
    ],
    [
      "Can you add online booking or payments to my website?",
      "Yes. Most third-party booking, ordering, scheduling, and payment platforms can be connected directly to your site.",
    ],
  ],
  contact: {
    label: "Get a quote",
    h: "Ready for a website that brings in more customers?",
    p: "Tell me where your business is today and what you want your website to do. I’ll review the details and recommend the best next step.",
    steps: [
      "Share your goals and project needs.",
      "Get a no-pressure recommendation.",
      "Receive a clear scope and price before work begins.",
    ],
  },
  footer:
    "Custom web design and development for small businesses, wherever they are.",
  github: "https://github.com/drakescode-commits",
};
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const ext = 'target="_blank" rel="noopener noreferrer"';
const amt = (p) => `<sup>$</sup>${p.amt}${p.plus ? "<sup>+</sup>" : ""}`;
const yr = new Date().getFullYear();
const navLinks = (list) =>
  list.map(([h, l]) => `<a href="#${h}">${l}</a>`).join("");
const footNav = navLinks(D.nav.filter((n) => n[0] !== "process"));

/* Shared form (same Formspree endpoint, fields, options, honeypot as live site) */
function formHTML(topCls, btnCls) {
  return `<form id="contact-form" action="https://formspree.io/f/xgogzdab" method="POST" novalidate>
  <div class="${topCls}"><p>Request your website quote</p><span>Typically responds in 24–48 hours</span></div>
  <div class="row">
    <div class="field"><label for="name">Your name *</label><input id="name" name="name" autocomplete="name" required><small></small></div>
    <div class="field"><label for="email">Email address *</label><input type="email" id="email" name="email" autocomplete="email" required><small></small></div>
  </div>
  <div class="row">
    <div class="field"><label for="business">Business name</label><input id="business" name="business" autocomplete="organization"><small></small></div>
    <div class="field"><label for="phone">Phone number</label><input type="tel" id="phone" name="phone" autocomplete="tel"><small></small></div>
  </div>
  <div class="row">
    <div class="field"><label for="project-type">Which package? *</label><select id="project-type" name="package" required>
      <option value="">Select a package</option><option value="booking-site">Booking Site — $300</option><option value="launch-site">Launch Site — $600</option><option value="business-site">Business Site — $1,000</option><option value="custom-revamp">Custom/Revamp — $1,200</option><option value="not-sure">Help me choose</option></select><small></small></div>
    <div class="field"><label for="timeline">When do you want to launch?</label><select id="timeline" name="timeline">
      <option value="">Select a timeline</option><option value="asap">As soon as possible</option><option value="within-a-month">Within a month</option><option value="1-3-months">In 1–3 months</option><option value="flexible">I’m flexible</option></select><small></small></div>
  </div>
  <div class="field"><label for="current-site">Current website <span class="opt">(if you have one)</span></label><input type="url" id="current-site" name="current-website" inputmode="url" placeholder="https://" autocomplete="url"><small></small></div>
  <div class="field"><label for="message">Tell me about your project *</label><textarea id="message" name="message" rows="5" required placeholder="What does your business do, and what should the website help you accomplish?"></textarea><small></small></div>
  <div class="honeypot" aria-hidden="true"><label for="company-website">Leave empty</label><input id="company-website" name="company-website" tabindex="-1" autocomplete="off"></div>
  <button class="${btnCls} submit-button" type="submit">Get My Quote <span aria-hidden="true">↗</span></button>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>`;
}
const pkgBtn = (cls, s, b, label) =>
  `<button type="button" class="${cls} package-button" data-service="${s}" data-budget="${b}">${label}</button>`;
const faqItems = () =>
  D.faqs
    .map((f) => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`)
    .join("");
const tagList = (p) => p.tags.map((t) => `<span>${t}</span>`).join("");
const lis = (a) => a.map((l) => `<li>${esc(l)}</li>`).join("");

/* ================= CONCEPT 7: COBALT INDEX ================= */
const IDX7 = [
  ["home", "Home"],
  ["work", "Work"],
  ["services", "Services"],
  ["process", "Process"],
  ["pricing", "Pricing"],
  ["about", "About"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
];
function c7() {
  const sh = (n, o) =>
    `<div class="sh rv"><div><p class="k">${n} / ${o.label}</p><h2>${o.h}</h2></div><p>${o.p}</p></div>`;
  const words = "Small business web design that"
    .split(" ")
    .map((w) => [w, false])
    .concat([
      ["earns", true],
      ["trust.", true],
    ]);
  const h1 = words
    .map(
      ([w, hl], i) =>
        `<span class="w${hl ? " hl" : ""}"><span style="animation-delay:${(0.15 + i * 0.07).toFixed(2)}s">${w}</span></span>`,
    )
    .join(" ");
  return `<header class="top"><div class="wrap">
    <a class="brand" href="#home" aria-label="Drakes Code and Design home"><span aria-hidden="true"></span>Drakes Code &amp; Design</a>
    <span class="where" aria-hidden="true">00 — Home</span>
    <nav aria-label="Primary">${navLinks(D.nav)}</nav>
    <a class="pill" href="#contact">Get a Quote ↗</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="c7-sheet">Menu</button>
  </div></header>
  <nav class="sheet" id="c7-sheet" aria-label="Mobile">${navLinks(D.nav)}<a href="#contact">Get a Quote</a></nav>
  <nav class="sidx" aria-label="Section index">${IDX7.map(([h, l], i) => `<a href="#${h}"><b>0${i}</b><span>${l}</span></a>`).join("")}</nav>
<main id="main">
  <section class="hero" id="home" data-l="Home">
    <span class="orb a" aria-hidden="true"></span><span class="orb b" aria-hidden="true"></span>
    <div class="wrap">
      <p class="k">${D.eyebrow}</p>
      <h1 aria-label="Small business web design that earns trust."><span aria-hidden="true">${h1}</span></h1>
      <div class="hrow rv"><p>${D.lede}</p><ul aria-label="Project benefits">${lis(D.points)}</ul>
        <div class="btns"><a class="pill" href="#contact">Get a Website Quote ↗</a><a class="pill o" href="#work">See Recent Work</a></div></div>
    </div>
  </section>
  <section class="mq" aria-label="Website capabilities"><div>${[...D.trust, ...D.trust, ...D.trust, ...D.trust].map((t, i) => `<span ${i >= D.trust.length ? 'aria-hidden="true"' : ""}>${t}</span>`).join("")}</div></section>
  <section class="s" id="work" data-l="${D.work.label}"><div class="wrap">${sh("01", D.work)}
    <div class="plist">${D.projects
      .map(
        (p, i) => `<article class="pr rv" data-open="${i === 0}">
      <button type="button" aria-expanded="${i === 0}" aria-controls="c7p${i}"><span class="n">${p.n}</span><span class="t">${p.t}</span><span class="tg">${tagList(p)}</span><span class="pl" aria-hidden="true">+</span></button>
      <div class="body" id="c7p${i}"><div><div class="inner">
        <a class="media" href="${p.url}" ${ext} aria-label="View ${esc(p.t)} website" tabindex="${i === 0 ? 0 : -1}"><img src="${IMG + p.img}" alt="${esc(p.alt)}" loading="lazy"><span class="lab">${p.lab}</span></a>
        <div><p>${p.p}</p><ul>${lis(p.li)}</ul><a class="pill" href="${p.url}" ${ext} tabindex="${i === 0 ? 0 : -1}">Visit project ↗</a></div>
      </div></div></div>
    </article>`,
      )
      .join("")}</div>
  </div></section>
  <section class="s dark" id="services" data-l="${D.svc.label}"><div class="wrap">${sh("02", D.svc)}
    <div class="rows">${D.services.map((s, i) => `<a class="rv" href="#contact" aria-label="${s[2]}"><span class="n">0${i + 1}</span><h3>${esc(s[0])}</h3><p>${s[1]}</p><span class="ar" aria-hidden="true">↗</span></a>`).join("")}</div>
  </div></section>
  <section class="s why"><div class="wrap">
    <div class="sh rv"><div><p class="k">${D.why.label}</p><h2>${D.why.h}</h2></div><p>${D.why.p}</p></div>
    <div class="ben">${D.benefits.map((b, i) => `<article class="rv"><b>0${i + 1}</b><h3>${b[0]}</h3><p>${b[1]}</p></article>`).join("")}</div>
    <a class="pill b" href="#about">${D.why.cta} →</a>
  </div></section>
  <section class="s" id="process" data-l="${D.proc.label}"><div class="wrap">${sh("03", D.proc)}
    <div class="proc"><div class="big" aria-hidden="true"><span class="num">01</span><span class="of">Stage <b class="cn">01</b> of 05</span><div class="bar"><i></i></div></div>
    <ol>${D.steps.map((s, i) => `<li class="${i === 0 ? "act" : ""}"><small>${String(i + 1).padStart(2, "0")} · ${s[0]}</small><h3>${s[1]}</h3><p>${s[2]}</p></li>`).join("")}</ol></div>
  </div></section>
  <section class="s pricing" id="pricing" data-l="${D.price.label}"><div class="wrap">${sh("04", D.price)}
    <div class="seg rv" role="tablist" aria-label="Packages">${D.plans.map((p, i) => `<button type="button" role="tab" id="c7t${i}" aria-controls="c7-plan" aria-selected="${!!p.feat}" tabindex="${p.feat ? 0 : -1}"><span>${p.nm}</span><b>${amt(p)}</b>${p.feat ? "<i>Recommended</i>" : ""}</button>`).join("")}</div>
    <div class="plan rv" id="c7-plan" role="tabpanel"></div>
    <aside class="custom rv"><div><h3>${D.custom.h}</h3><p>${D.custom.p}</p></div>${pkgBtn("pill", "not-sure", "", D.custom.btn)}</aside>
    <p class="pay"><strong>${D.pay[0]}</strong> ${D.pay[1]}</p>
  </div></section>
  <section class="s" id="about" data-l="${D.about.label}"><div class="wrap about">
    <figure class="duo rv"><img src="${IMG}owner.jpg" alt="Founder of Drakes Code &amp; Design, a small business web designer and developer" loading="lazy" width="683" height="911"><figcaption>Design · Develop · Deliver</figcaption></figure>
    <div class="rv"><p class="k">05 / ${D.about.label}</p><h2>${D.about.h}</h2><p>${esc(D.about.p1)}</p><p>${D.about.p2}</p><ul class="skills">${lis(D.about.skills)}</ul></div>
  </div></section>
  <section class="s faq" id="faq" data-l="${D.faq.label}"><div class="wrap g">
    <div class="rv"><p class="k">06 / ${D.faq.label}</p><h2>${D.faq.h}</h2><p>${D.faq.p}</p><a class="tl" href="#contact">${D.faq.cta} ↘</a></div>
    <div class="rv">${faqItems()}</div>
  </div></section>
  <section class="s contact" id="contact" data-l="Contact"><div class="wrap g">
    <div class="rv"><p class="k">07 / ${D.contact.label}</p><h2>${D.contact.h}</h2><p>${D.contact.p}</p><ol>${D.contact.steps.map((s, i) => `<li><span>0${i + 1}</span>${s}</li>`).join("")}</ol></div>
    <div class="rv">${formHTML("fh", "pill")}</div>
  </div></section>
</main>
<footer><div class="wrap">
  <p class="sig" aria-hidden="true">Design. Develop. <span>Deliver.</span></p>
  <div class="ft"><div><a class="brand" href="#home"><span aria-hidden="true"></span>Drakes Code &amp; Design</a><p>${D.footer}</p></div>
  <nav aria-label="Footer"><strong>Explore</strong>${footNav}</nav>
  <nav aria-label="Social"><strong>Connect</strong><a href="${D.github}" ${ext}>GitHub ↗</a><a href="#contact">Request a quote ↗</a></nav></div>
  <div class="fb"><p>© ${yr} Drakes Code &amp; Design</p><p>Design. Develop. Deliver.</p></div>
</div></footer>`;
}

/* ================= BEHAVIOR ================= */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let cleanup = [];
const on = (t, e, f, o) => {
  t.addEventListener(e, f, o);
  cleanup.push(() => t.removeEventListener(e, f, o));
};

function initCommon(root) {
  const els = root.querySelectorAll(".rv,.rv-clip");
  if (reduce || !("IntersectionObserver" in window))
    els.forEach((e) => e.classList.add("in"));
  else {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("in");
            io.unobserve(x.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -30px" },
    );
    els.forEach((e) => io.observe(e));
    cleanup.push(() => io.disconnect());
  }

  const form = document.querySelector("#contact-form");
  const project = document.querySelector("#project-type");
  const budget = document.querySelector("#budget");
  document.querySelectorAll(".package-button").forEach((button) =>
    button.addEventListener("click", () => {
      project.value = button.dataset.service;
      budget.value = button.dataset.budget;
      document
        .querySelector("#contact")
        .scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(
        () => project.focus({ preventScroll: true }),
        reduceMotion ? 0 : 550,
      );
    }),
  );

  const validate = (field) => {
    const error = field.parentElement.querySelector("small");
    let message = "";
    if (field.required && !field.value.trim())
      message = "This field is required.";
    else if (
      field.type === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
    )
      message = "Enter a valid email address.";
    else if (field.id === "message" && field.value.trim().length < 10)
      message = "Please share a little more about your project.";
    field.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
    return !message;
  };

  const fields = [...form.querySelectorAll("input, select, textarea")].filter(
    (el) => el.name !== "company-website",
  );
  fields.forEach((field) => {
    field.addEventListener("blur", () => validate(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validate(field);
    });
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      status.textContent = "Please correct the highlighted fields.";
      status.className = "form-status error";
      form.querySelector(".invalid").focus();
      return;
    }
    if (form.elements["company-website"].value) return;
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "";
    if (form.querySelector("#company-website").value) return;
    if (!check()) return;
    const btn = form.querySelector(".submit-button");
    btn.disabled = true;
    status.textContent = "Sending…";
    try {
      const r = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!r.ok) throw new Error();
      form.reset();
      status.classList.add("ok");
      status.textContent =
        "Thank you. Your quote request was sent—expect a reply within 24–48 hours.";
    } catch (err) {
      status.classList.add("bad");
      status.textContent =
        "Something went wrong. Please try again in a moment.";
    } finally {
      btn.disabled = false;
    }
  });
}

function initC7(root) {
  const top = root.querySelector(".top"),
    where = root.querySelector(".where");
  const b = root.querySelector(".burger"),
    sh = root.querySelector(".sheet");
  const close = () => {
    sh.classList.remove("open");
    b.setAttribute("aria-expanded", "false");
    b.textContent = "Menu";
  };
  on(b, "click", () => {
    const o = sh.classList.toggle("open");
    b.setAttribute("aria-expanded", o);
    b.textContent = o ? "Close" : "Menu";
  });
  sh.querySelectorAll("a").forEach((a) => on(a, "click", close));
  on(document, "keydown", (e) => {
    if (e.key === "Escape") close();
  });
  /* project rows (Index-style accordion) */
  const rows = [...root.querySelectorAll(".pr")];
  rows.forEach((r) =>
    on(r.querySelector("button"), "click", () => {
      const open = r.dataset.open !== "true";
      rows.forEach((x) => {
        const o = x === r && open;
        x.dataset.open = o;
        x.querySelector("button").setAttribute("aria-expanded", o);
        x.querySelectorAll(".body a").forEach((a) => (a.tabIndex = o ? 0 : -1));
      });
    }),
  );
  /* package tabs (Index) with Cobalt plan panel */
  const tabs = [...root.querySelectorAll(".seg button")],
    panel = root.querySelector("#c7-plan");
  const show = (i) => {
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", i === j);
      t.tabIndex = i === j ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", "c7t" + i);
    const p = D.plans[i];
    panel.innerHTML = `<div class="anim">${p.feat ? '<span class="rec">Recommended</span>' : ""}<h3>${p.nm}</h3><div class="amt">${amt(p)}</div><p class="d">${p.d}</p><span class="del">${p.del}</span><div>${pkgBtn("pill", p.s, p.b, p.btn)}</div></div><ul class="anim">${lis(p.li)}</ul>`;
  };
  tabs.forEach((t, i) => {
    on(t, "click", () => show(i));
    on(t, "keydown", (e) => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
        e.key
      ];
      if (k) {
        e.preventDefault();
        const n = (i + k + tabs.length) % tabs.length;
        show(n);
        tabs[n].focus();
      }
    });
  });
  show(
    Math.max(
      0,
      D.plans.findIndex((p) => p.feat),
    ),
  );
  /* live section index + Cobalt process counter */
  const sidx = [...root.querySelectorAll(".sidx a")],
    navA = [...root.querySelectorAll(".top nav a")];
  const secs = IDX7.map(([id]) => document.getElementById(id)).filter(Boolean);
  const items = [...root.querySelectorAll(".proc ol li")],
    num = root.querySelector(".proc .num"),
    cn = root.querySelector(".proc .cn"),
    bar = root.querySelector(".proc .bar i");
  let last = -1,
    ci = -1;
  const tick = () => {
    top.classList.toggle("sc", scrollY > 40);
    let s = 0;
    secs.forEach((x, j) => {
      if (x.getBoundingClientRect().top < innerHeight * 0.45) s = j;
    });
    if (s !== last) {
      last = s;
      const id = secs[s].id,
        label = IDX7[s][1];
      sidx.forEach((a, j) => {
        a.classList.toggle("on", j === s);
        if (j === s) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      navA.forEach((a) =>
        a.classList.toggle("on", a.getAttribute("href") === "#" + id),
      );
      where.classList.add("swap");
      setTimeout(
        () => {
          where.textContent = `0${s} — ${label}`;
          where.classList.remove("swap");
        },
        reduce ? 0 : 160,
      );
    }
    let i = 0;
    items.forEach((li, j) => {
      if (li.getBoundingClientRect().top < innerHeight * 0.55) i = j;
    });
    if (i !== ci) {
      ci = i;
      const t = String(i + 1).padStart(2, "0");
      items.forEach((li, j) => li.classList.toggle("act", j === i));
      num.classList.add("fade");
      setTimeout(
        () => {
          num.textContent = t;
          num.classList.remove("fade");
        },
        reduce ? 0 : 160,
      );
      cn.textContent = t;
      bar.style.width = ((i + 1) / items.length) * 100 + "%";
    }
  };
  let raf = 0;
  const req = () => {
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0;
        tick();
      });
  };
  on(window, "scroll", req, { passive: true });
  on(window, "resize", req);
  tick();
}

(function () {
  const app = document.getElementById("app");
  if (!app.querySelector("main")) app.innerHTML = c7();
  initC7(app);
  initCommon(app);
})();
