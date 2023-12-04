import * as THREE from 'three';
import  './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ 
  canvas : document.querySelector('.webgl') 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(10,10, 10);
scene.add(light);
//add ambiet light
const ambientLight = new THREE.AmbientLight(0xffffff);
//scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const sphere = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
  color: "#00ff83"});
  //make the spher material rhe me.jpg image
 const material1 = new THREE.MeshStandardMaterial({
   map: new THREE.TextureLoader().load('eu.jpg')
 });
const mesh = new THREE.Mesh(sphere, material1);
scene.add(mesh);
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);

}
Array(300).fill().forEach(addStar);
function animate() {
  requestAnimationFrame(animate);
  //make the mesh rotate
  //mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  //mesh.rotation.z += 0.01;
  //update the orbit control
  controls.update(); 
  renderer.render(scene, camera);

}
animate();