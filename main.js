import * as THREE from 'three';
import  './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
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
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

const sphere = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
  color: "#00ff83"});
 const material1 = new THREE.MeshStandardMaterial({
   map: new THREE.TextureLoader().load('eu.jpg')
 });
const mesh = new THREE.Mesh(sphere, material1);
scene.add(mesh);
const controls = new OrbitControls(camera, renderer.domElement);
const Loader = new GLTFLoader();
///add in loader glb file
Loader.load('3dpea.glb', function(gltf){
  scene.add(gltf.scene);
});
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
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  //camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * 0.004;
  mesh.rotation.y += 0.01;  
  //mesh.position.y += t* -0.00006;
}
document.body.onscroll = moveCamera;
function animate() {
  requestAnimationFrame(animate);
  //mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  //mesh.rotation.z += 0.01;
  controls.update(); 
  renderer.render(scene, camera);

}
animate();