/**
 * ═══════════════════════════════════════════════════════════════
 *  CCCSS GIS Dashboard — Secure Node.js/Express Backend
 *  Centre for Climate Change & Sustainability Studies
 *  Shivaji University, Kolhapur
 * ═══════════════════════════════════════════════════════════════
 *
 *  Security features:
 *    • Helmet — sets strict CSP, X-Frame, HSTS, referrer-policy
 *    • Rate-limiting — prevents brute-force / scraping
 *    • CORS — locked to same-origin only
 *    • No directory listing, no source-map exposure
 *    • Custom headers to discourage archiving / caching
 */

'use strict';

const express     = require('express');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');
const compression = require('compression');
const cors        = require('cors');
const path        = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ─── COMPRESSION ─── */
app.use(compression());

/* ─── CORS — same origin only ─── */
app.use(cors({ origin: false }));

/* ─── HELMET — Security Headers ─── */
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://unpkg.com",
        "https://cdn.jsdelivr.net"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://unpkg.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "blob:",
        "https://server.arcgisonline.com",
        "https://mt0.google.com",
        "https://mt1.google.com",
        "https://mt2.google.com",
        "https://mt3.google.com",
        "https://*.basemaps.cartocdn.com",
        "https://services.arcgisonline.com"
      ],
      connectSrc: [
        "'self'",
        "https://raw.githubusercontent.com",
        "https://*.basemaps.cartocdn.com",
        "https://server.arcgisonline.com",
        "https://mt0.google.com",
        "https://mt1.google.com",
        "https://mt2.google.com",
        "https://mt3.google.com",
        "https://services.arcgisonline.com",
        "https://api.thingspeak.com"
      ],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["'self'"],
      frameSrc: ["'self'", "https://satwikcccss-crypto.github.io"],
      frameAncestors: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,   // needed for external tiles
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  referrerPolicy: { policy: 'no-referrer' },
  xFrameOptions: { action: 'sameorigin' },
  hsts: { maxAge: 31536000, includeSubDomains: true }
}));

/* ─── RATE LIMITING ─── */
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 300,                   // 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' }
}));

/* ─── ANTI-CACHING / ANTI-ARCHIVING HEADERS ─── */
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

/* ─── BLOCK SOURCE MAP & DOT FILES ─── */
app.use((req, res, next) => {
  if (req.path.match(/\.(map|env|git|DS_Store)$/i) || req.path.includes('/.')) {
    return res.status(404).end();
  }
  next();
});

/* ─── SERVE STATIC (public folder) ─── */
app.use(express.static(path.join(__dirname, 'public'), {
  dotfiles: 'deny',
  index: 'index.html',
  extensions: ['html'],
  maxAge: 0
}));

/* ─── FALLBACK ─── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* ─── START ─── */
app.listen(PORT, () => {
  console.log(`\n  ╔═══════════════════════════════════════════════════╗`);
  console.log(`  ║  CCCSS GIS Dashboard — Secure Server              ║`);
  console.log(`  ║  Centre for Climate Change & Sustainability        ║`);
  console.log(`  ║  Shivaji University, Kolhapur                      ║`);
  console.log(`  ╠═══════════════════════════════════════════════════╣`);
  console.log(`  ║  🌐  http://localhost:${PORT}                        ║`);
  console.log(`  ║  🔒  Helmet + CSP + Rate Limiting active           ║`);
  console.log(`  ╚═══════════════════════════════════════════════════╝\n`);
});
