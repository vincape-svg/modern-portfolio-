const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(15, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.05 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 40;

let mX = 0, mY = 0, cX = 0, cY = 0, dX = 0, dY = 0;
let tX = 0, tY = 0;

window.addEventListener('mousemove', (e) => {
    mX = e.clientX; mY = e.clientY;
    tX = (e.clientX - window.innerWidth / 2) / 100;
    tY = (e.clientY - window.innerHeight / 2) / 100;
});

function animate() {
    cX += (mX - cX) * 0.1; cY += (mY - cY) * 0.1;
    dX += (mX - dX) * 0.25; dY += (mY - dY) * 0.25;
    
    const circle = document.querySelector('.cursor-circle');
    const dot = document.querySelector('.cursor-dot');
    if(circle) { circle.style.left = `${cX}px`; circle.style.top = `${cY}px`; }
    if(dot) { dot.style.left = `${dX}px`; dot.style.top = `${dY}px`; }

    mesh.rotation.x += 0.001; mesh.rotation.y += 0.001;
    mesh.position.x += (tX - mesh.position.x) * 0.05;
    mesh.position.y += (-tY - mesh.position.y) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

document.querySelectorAll('.hover-target').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const c = document.querySelector('.cursor-circle');
        c.style.width = '80px'; c.style.height = '80px';
        c.style.borderColor = '#ff003c';
        c.style.background = 'rgba(255,0,60,0.05)';
    });
    el.addEventListener('mouseleave', () => {
        const c = document.querySelector('.cursor-circle');
        c.style.width = '40px'; c.style.height = '40px';
        c.style.borderColor = 'rgba(255,255,255,0.2)';
        c.style.background = 'transparent';
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
