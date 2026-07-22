document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn'), pages = document.querySelectorAll('.page'), b = document.body;
    navBtns.forEach(btn => btn.addEventListener('click', (e) => {
        navBtns.forEach(b => b.classList.remove('active')); pages.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active'); document.getElementById(e.currentTarget.dataset.target)?.classList.add('active');
    }));
    const SHAPE_COUNT = 20, TYPES = ['circle', 'triangle', 'square'], BAND_WIDTH = innerWidth * 0.3; let shapes = [];
    for (let i = 0; i < SHAPE_COUNT; i++) {
        const el = document.createElement('div'); el.className = `shape ${TYPES[i % 3]}`;
        el.style.left = `${(Math.random() < 0.5 ? 0 : innerWidth - BAND_WIDTH) + Math.random() * BAND_WIDTH}px`;
        el.style.top = `${Math.random() * innerHeight}px`; b.appendChild(el);
        shapes.push({el, ix: parseFloat(el.style.left), iy: parseFloat(el.style.top), cx: 0, cy: 0, ns: Math.random() * 100});
    }
    let nOff = 0, mouse = {x: innerWidth / 2, y: innerHeight / 2}; document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    function animate() {
        nOff += 0.05; shapes.forEach(s => {
            let gX = Math.sin(nOff + s.ns) * 15, gY = Math.cos(nOff + s.ns * 2) * 15;
            let dX = mouse.x - s.ix, dY = mouse.y - s.iy, distSq = dX * dX + dY * dY;
            let pullX = (distSq < 300000 ? 1 - (distSq / 300000) : 0) * dX * 0.2, pullY = (distSq < 300000 ? 1 - (distSq / 300000) : 0) * dY * 0.2;
            s.cx += (gX + pullX - s.cx) * 0.04; s.cy += (gY + pullY - s.cy) * 0.04; s.el.style.transform = `translate(${s.cx}px, ${s.cy}px)`;
        }); requestAnimationFrame(animate);
    } animate();
});
```[cite: 3]

### How to cut code from the bottom to change modes:

* **To have No Mouse Following:** Delete just the last line (`animate();`).
* **To make shapes Static (No movement or following):** Delete from `function animate()` down to the end.
* **To Remove Shapes completely:** Delete everything from `const SHAPE_COUNT = 20` down to the end (keeping only the navigation block at the top).
