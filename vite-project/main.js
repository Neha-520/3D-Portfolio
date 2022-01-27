import './style.css'

import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

//field of view ,aspect ratio,view frustum
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
}, { antialias: true })

// renderer.physicallyCorrectLights = true;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); //set canvas size on full screen

//camera is currently at centre, now it will move along z axes for perspective
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//basic material doesnt req light source
// const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true })

const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff); //like light bulb
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight) //helps to know pointlight origin
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// //update camera position wrt dom events with mouse
// const controls = new OrbitControls(camera, renderer.domElement)

const geometry1 = new THREE.SphereGeometry(0.25, 10, 10);
const material1 = new THREE.MeshStandardMaterial({ color: 0xffffff })

function addStar() {
  const star = new THREE.Mesh(geometry1, material1);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(220).fill().forEach(addStar);

const textureLoader = new THREE.TextureLoader();

const spaceTexture = textureLoader.load('x.jfif');
scene.background = spaceTexture;

const myTexture = textureLoader.load('neha1.jpg');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: myTexture })
)

scene.add(me);

const moonTexture = textureLoader.load('moon.jpg');
const normalTexture = textureLoader.load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture //light bounce off this
  })
)

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {

  //dimension of viewport + how far we are from top of web page
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  //t is - ve
  camera.position.z = t * -0.015;
  camera.position.x = t * - 0.0002;
  camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera

//recursive function infinite loop for render method
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();