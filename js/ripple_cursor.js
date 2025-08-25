(function injectRippleSVGFilter() {
  if (document.getElementById('ripple-svg-filter')) return;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('id', 'ripple-svg-filter');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.innerHTML = `
    <filter id="ripple-distort">
      <feTurbulence type="turbulence" baseFrequency="0.18 0.22" numOctaves="3" seed="7" result="turb"/>
      <feDisplacementMap in2="turb" in="SourceGraphic" scale="60" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  `;
  document.body.appendChild(svg);
})();

(function() {
  const isBlog = /\/blog(_|\b)|blog\//.test(window.location.pathname);
  if (isBlog) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  document.body.style.cursor = 'none';


  let hoveringLink = false;

  document.addEventListener('mousemove', (e) => {
    let el = document.elementFromPoint(e.clientX, e.clientY);
    let isInteractive = false;
    while (el) {
      if (el.tagName) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'a' || tag === 'button') {
          isInteractive = true;
          break;
        }
      }
      el = el.parentElement;
    }
    hoveringLink = isInteractive;
    if (hoveringLink) {
      cursor.style.display = 'none';
      document.body.style.cursor = 'none';
    } else {
      cursor.style.display = '';
      document.body.style.cursor = 'none';
    }
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });

  const style = document.createElement('style');
  style.innerHTML = 'a, a:hover, a:active, button, button:hover, button:active { cursor: none !important; }';
  document.head.appendChild(style);

  let lastRippleTime = 0;
  document.addEventListener('click', (e) => {
    const now = Date.now();
    if (now - lastRippleTime < 500) return;
    lastRippleTime = now;
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.top = e.clientY + 'px';
    ripple.style.left = e.clientX + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });
})();
