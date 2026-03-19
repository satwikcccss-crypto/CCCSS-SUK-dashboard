'use strict';

/* ─────────────────────────────────────
   GLOBAL SECURITY & UTILITIES (CCCSS)
───────────────────────────────────── */
const SID = 'SESS-' + Math.random().toString(36).substr(2,9).toUpperCase();

document.addEventListener('DOMContentLoaded', () => {
  // Display Session ID if element exists
  const sidEl = document.getElementById('sid-disp');
  if (sidEl) sidEl.textContent = SID;

  // Header Date Time
  const dateEl = document.getElementById('hdr-date');
  if (dateEl) {
    const setDate = () => {
      const d = new Date();
      dateEl.textContent = d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) +
      '  ' + d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
    };
    setDate(); setInterval(setDate, 30000);
  }

  // Terms Modal Check
  if (!sessionStorage.getItem('cccss_terms')) {
    const modal = document.getElementById('terms-modal');
    if (modal) modal.style.display = 'flex';
  }

  // Fade-in Observer
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e,i)=>{ 
      if(e.isIntersecting) { 
        setTimeout(()=>e.target.classList.add('vis'), i*70); 
        io.unobserve(e.target); 
      } 
    });
  },{threshold:0.08});
  document.querySelectorAll('.fi:not(.vis)').forEach(el=>io.observe(el));
});

window.acceptTerms = function() {
  const modal = document.getElementById('terms-modal');
  if (modal) modal.style.display = 'none';
  sessionStorage.setItem('cccss_terms', '1');
}

/* ─────────────────────────────────────
   ANTI-THEFT PROTECTIONS
───────────────────────────────────── */
document.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); return false; }, true);
window.oncontextmenu = () => false;

document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart',   e => e.preventDefault());

document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase(), ctrl = e.ctrlKey || e.metaKey;
  if (ctrl && ['s','p','u','a','i'].includes(k)) { e.preventDefault(); return; }
  if (e.key === 'F12') { e.preventDefault(); return; }
  if (ctrl && e.shiftKey && ['i','j','c'].includes(k)) { e.preventDefault(); return; }
  if (['PrintScreen','Print'].includes(e.key) || e.code === 'PrintScreen') {
    e.preventDefault(); blurScreen('PrintScreen key');
  }
}, true);

document.addEventListener('keyup', e => {
  if (['PrintScreen','Print'].includes(e.key) || e.code === 'PrintScreen') {
    try { navigator.clipboard.writeText(''); } catch(_){}
    blurScreen('PrintScreen key');
  }
}, true);

let bTimer;
window.addEventListener('blur', () => {
  bTimer = setTimeout(() => blurScreen('Window focus lost (possible screen capture)'), 250);
});
window.addEventListener('focus', () => {
  clearTimeout(bTimer);
  try { navigator.clipboard.writeText('[CCCSS Protected — Session: ' + SID + ']'); } catch(_){}
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) blurScreen('Tab hidden');
  else setTimeout(unBlur, 2200);
});

document.addEventListener('copy', e => {
  e.clipboardData.setData('text/plain', '[CCCSS Kolhapur — Content Protected — ' + SID + ']');
  e.preventDefault();
});

setInterval(() => {
  if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
    document.body.innerHTML = `<div style="position:fixed;inset:0;background:#faf9f6;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;gap:1rem"><div style="font-size:3rem">🔒</div><div style="font-size:1.5rem;font-weight:bold;color:#c0392b">Session Terminated</div><p>DevTools detected · Session ${SID}</p></div>`;
  }
}, 1800);

function blurScreen(reason) {
  document.body.classList.add('blurred');
  setTimeout(unBlur, 4000);
}
function unBlur() { document.body.classList.remove('blurred'); }

window.addEventListener('beforeprint', () => {
  document.body.style.visibility = 'hidden';
  document.body.innerHTML = '';
});
window.addEventListener('afterprint', () => location.reload());
try { Object.defineProperty(window, 'print', { value: () => { blurScreen('Print blocked'); }, writable: false }); } catch(_) {}

/* ─────────────────────────────────────
   GLOBAL WATERMARK
───────────────────────────────────── */
function drawWM() {
  const canvas = document.getElementById('wm-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.globalAlpha = 0.055;
  ctx.font = '12px DM Mono, monospace';
  ctx.fillStyle = '#1e4d3a';
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(-0.32);
  const msg = `© CCCSS — Shivaji University, Kolhapur  ·  ${SID}  ·  All Rights Reserved`;
  for (let y=-canvas.height; y<canvas.height; y+=90)
    for (let x=-canvas.width; x<canvas.width; x+=420)
      ctx.fillText(msg, x, y);
  ctx.restore();
  document.getElementById('watermark').classList.add('on');
}

window.addEventListener('resize', drawWM);
window.addEventListener('load', drawWM);
setInterval(drawWM, 8000);

/* CSS Injection Protection */
const secStyle = document.createElement('style');
secStyle.textContent = `*{-webkit-user-select:none!important;-moz-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}img,canvas#wm-canvas{pointer-events:none!important;-webkit-user-drag:none!important}`;
document.head.appendChild(secStyle);

const secObserver = new MutationObserver((mutations) => {
  mutations.forEach(m => {
    if (m.type === 'childList') {
      m.removedNodes.forEach(node => {
        if (node === secStyle || (node.id && ['watermark','sec-overlay'].includes(node.id))) {
          blurScreen('Security tampered'); location.reload();
        }
      });
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  secObserver.observe(document.head, { childList: true });
  secObserver.observe(document.body, { childList: true });
});
