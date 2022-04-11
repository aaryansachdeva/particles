import './style.css'

import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Debug
const gui = new dat.GUI();

//Initialize Scene, Camera and Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

//Init render settings
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Set Camera position

camera.position.setZ(30);

//Adding Geometry

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347,
});
const torus = new THREE.Mesh(geometry, material);
//scene.add(torus);

//Adding Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

//Adding Light and Grid Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

//Init Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);

//Star Experiment 

function addStar() {
  const geometryStar = new THREE.SphereGeometry(0.25, 24, 24);
  const materialStar = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometryStar, materialStar);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//Call the render method

function animate() {
  requestAnimationFrame(animate);

  //Animate properties here

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //Update Controls every frame
  
  controls.update();

  renderer.render(scene, camera);
}

animate();

