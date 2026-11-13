// Background circles that drift and bounce slowly, plus a cursor trail on desktop.
// Add data-trail="off" to the script tag to skip the trail on a page.
(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = document.createElement('style');
    style.textContent =
        '.fx-layer{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}' +
        '.fx-c{position:absolute;left:0;top:0;border-radius:50%;will-change:transform}' +
        '.fx-trail{position:fixed;width:8px;height:8px;border-radius:50%;background:#B3D380;pointer-events:none;opacity:0;transition:opacity .3s ease;z-index:9999}';
    document.head.appendChild(style);

    // ----- bouncing circles -----
    const layer = document.createElement('div');
    layer.className = 'fx-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.prepend(layer);

    let W = window.innerWidth, H = window.innerHeight;
    const scale = Math.min(1, W / 900 + 0.4);
    const specs = [
        { d: 260, c: '#CCCCFF', o: 0.50, x: 0.80, y: 0.05 },
        { d: 150, c: '#CCCCFF', o: 0.35, x: 0.05, y: 0.60 },
        { d: 190, c: '#B3D380', o: 0.25, x: 0.55, y: 0.70 },
        { d: 90,  c: '#B3D380', o: 0.40, x: 0.25, y: 0.20 },
        { d: 60,  c: '#CCCCFF', o: 0.50, x: 0.65, y: 0.40 }
    ];
    const circles = specs.map((s, i) => {
        const d = s.d * scale, el = document.createElement('div');
        el.className = 'fx-c';
        el.style.cssText = `width:${d}px;height:${d}px;background:${s.c};opacity:${s.o}`;
        layer.appendChild(el);
        const speed = 10 + i * 2.5, a = 0.7 + i * 1.9;        // px per second, fixed headings
        return { el, d, x: s.x * (W - d), y: s.y * (H - d), vx: Math.cos(a) * speed, vy: Math.sin(a) * speed };
    });
    const place = c => { c.el.style.transform = `translate3d(${c.x.toFixed(1)}px,${c.y.toFixed(1)}px,0)`; };
    circles.forEach(place);

    window.addEventListener('resize', () => { W = window.innerWidth; H = window.innerHeight; });

    if (!reduce) {
        let last = performance.now();
        const tick = now => {
            const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now;
            if (!document.hidden) for (const c of circles) {
                c.x += c.vx * dt; c.y += c.vy * dt;
                const mx = Math.max(0, W - c.d), my = Math.max(0, H - c.d);
                if (c.x < 0) { c.x = 0; c.vx = Math.abs(c.vx); } else if (c.x > mx) { c.x = mx; c.vx = -Math.abs(c.vx); }
                if (c.y < 0) { c.y = 0; c.vy = Math.abs(c.vy); } else if (c.y > my) { c.y = my; c.vy = -Math.abs(c.vy); }
                place(c);
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    // ----- cursor trail (mouse only) -----
    const me = document.currentScript;
    const wantTrail = !(me && me.dataset.trail === 'off');
    if (wantTrail && !reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const dots = [];
        for (let i = 0; i < 10; i++) {
            const t = document.createElement('div');
            t.className = 'fx-trail';
            document.body.appendChild(t);
            dots.push(t);
        }
        let n = 0;
        document.addEventListener('mousemove', e => {
            const t = dots[n];
            t.style.left = e.clientX - 4 + 'px';
            t.style.top = e.clientY - 4 + 'px';
            t.style.opacity = '0.8';
            setTimeout(() => { t.style.opacity = '0'; }, 300);
            n = (n + 1) % dots.length;
        });
    }
})();
