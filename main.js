import './style.css'

import * as THREE from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Testing mouseX position output
window.addEventListener('mousemove', (event) => {
  console.log(event.clientX);
});

//Adding resize feature

window.addEventListener('resize', (event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {

  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
  if(!fullscreenElement) {

    if(renderer.domElement.requestFullscreen) {
      renderer.domElement.requestFullscreen();
    }

    else if(renderer.domElement.webkitRequestFullScreen) {
      renderer.domElement.webkitRequestFullScreen();
    }
  }
  else {

    if(document.exitFullscreen) {
      document.exitFullscreen();
    }

    else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    
  }
});

//Debug
const gui = new dat.GUI();

//Initialize Scene, Camera and Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

//Init render settings
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

//Set Camera position

camera.position.setZ(30);

//Adding Geometry

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347,
});
const torus = new THREE.Mesh(geometry, material);
torus.position.x = 6;
torus.position.y = 15;
scene.add(torus);

camera.lookAt(new THREE.Vector3(200,2,2));
//Adding Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

//Adding Light and Grid Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper(20);

scene.add(lightHelper, gridHelper, axesHelper);

//Init Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

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

const clock = new THREE.Clock();

//Call the render method

gsap.to(torus.position, {
  duration: 2,
  delay: 1,
  x: 300
});
gsap.to(torus.position, {
  duration: 2,
  delay: 3,
  x: 0
});

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime()
  
  //Animate properties here
  
  torus.rotation.x = elapsedTime*2*Math.PI;
  torus.rotation.y = elapsedTime;
  torus.rotation.z = elapsedTime;

  torus.position.y = Math.sin(elapsedTime) * 10;
  
  //torus.position.x = Math.cos(elapsedTime) * 10;
  camera.lookAt(torus.position);

  //Update Controls every frame
  
  controls.update();

  renderer.render(scene, camera);
  return elapsedTime;
}

animate();



