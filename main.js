import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import Block from "./block";

let blocks = [];
let blockWidth = 5;
let gap = blockWidth;
// let offSet = gap / 10;
// let totalWidth = blockWidth * 3 + gap * 3;

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x050505 );
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(30, 30, 30);


const light1 = new THREE.PointLight( 0xffffff, 5, 100 );
light1.position.set( -50, 50, 50 );

const light2 = new THREE.PointLight( 0xffffff, 5, 100 );
light2.position.set( 50, -50, 50 );

const light3 = new THREE.PointLight( 0xffffff, 5, 100 );
light3.position.set( 50, 50, -50 );

// const light4 = new THREE.PointLight( 0xffffff, 5, 100 );
// light4.position.set( 50, 50, -100 );
scene.add( light1, light2, light3 );

// const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
// scene.add( light );

const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

for (let z = 0; z < 3; z++) {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      let block = new Block(x, y, z);
      blocks.push(block);
    }
  }
}

blocks.forEach(drawBlock);

function drawBlock(block) {
  const geometry = new RoundedBoxGeometry(
    blockWidth,
    blockWidth,
    blockWidth,
    1,
    0.5
  );
  const materials = [
    new THREE.MeshLambertMaterial({ color: 0x009b48 }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
    new THREE.MeshLambertMaterial({ color: 0xb71234 }),
    new THREE.MeshLambertMaterial({ color: 0xffd500 }),
    new THREE.MeshLambertMaterial({ color: 0x0046ad }),
    new THREE.MeshLambertMaterial({ color: 0xff5800 }),
  ];
  const cube = new THREE.Mesh(geometry, materials);
  cube.cursor = 'pointer';
  cube.position.set(block.x * gap, block.y * gap, block.z * gap);
  scene.add(cube);
}

function animation() {
  requestAnimationFrame(animation);

  renderer.render(scene, camera);
}

animation();
