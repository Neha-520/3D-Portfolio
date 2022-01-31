import './style.css'

import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

const scene = new THREE.Scene();
console.log(typefaceFont)
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

// const loader = new FontLoader();

// loader.load(typefaceFont, () => {
//   console.log("font load")
// })

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
})

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera)