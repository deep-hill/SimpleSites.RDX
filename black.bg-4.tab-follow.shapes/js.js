document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const b = document.body;
    navBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.target;
        navBtns.forEach(b => b.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        document.getElementById(targetId)?.classList.add('active');
    }));

    const SHAPE_COUNT = 20;
    const TYPES = ['circle', 'triangle', 'square'];
    const BAND_WIDTH = innerWidth * 0.3;
    let shapes = [];
    for (let i = 0; i < SHAPE_COUNT; i++) {
        const type = TYPES[i % 3];
        const el = document.createElement('div');
        el.className = `shape ${type}`;
        const isLeft = Math.random() < 0.5;
        const ix = isLeft 
            ? Math.random() * BAND_WIDTH 
            : (innerWidth - BAND_WIDTH) + Math.random() * BAND_WIDTH; 
        const iy = Math.random() * innerHeight; 
        el.style.left = `${ix}px`;
        el.style.top = `${iy}px`;
        b.appendChild(el);
        shapes.push({el, ix, iy, cx: 0, cy: 0, ns: Math.random() * 100});
    }

    let nOff = 0;
    const MAX_PULL = 0.04;
    const GEL_STR = 0.05;
    let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    function animate() {
        nOff += GEL_STR;
        shapes.forEach(s => {
            const gX = Math.sin(nOff + s.ns) * 15; 
            const gY = Math.cos(nOff + s.ns * 2) * 15;
            const dX = mouse.x - s.ix;
            const dY = mouse.y - s.iy;
            const distSq = dX * dX + dY * dY;
            const influence = distSq < 300000 ? 1 - (distSq / 300000) : 0;
            const pullX = dX * influence * 0.2;
            const pullY = dY * influence * 0.2;
            s.cx += (gX + pullX - s.cx) * MAX_PULL;
            s.cy += (gY + pullY - s.cy) * MAX_PULL;
            s.el.style.transform = `translate(${s.cx}px, ${s.cy}px)`;
        });
        requestAnimationFrame(animate);
    }
    animate();
});
```[cite: 3]
