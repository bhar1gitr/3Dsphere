		import * as THREE from 'three';
        import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
		
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Earth texture
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('../download.jpeg'); // Replace 'path/to/earth_texture.jpg' with the actual path to your Earth texture image

const geometry = new THREE.SphereGeometry(1.3, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: earthTexture }); // Use the Earth texture
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

// Function to handle window resize
const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
};

window.addEventListener('resize', handleResize);

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};

loop();
