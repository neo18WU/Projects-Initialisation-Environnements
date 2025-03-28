import * as THREE from "three";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';

import { gsap } from "gsap";
import { ScrollTrigger } from "../gsap/ScrollTrigger.js";

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

import { glWorld } from "./glWorld.js";
import { getCube, getObjectFBX } from "./glObject.js";
import { getElemental } from "./glslObject.js";


import vertexShader from '../shaders/vertex.glsl.js';
import fragmentShader from '../shaders/fragment.glsl.js';

import { EffectComposer } from "../three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "../three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "../three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "../three/examples/jsm/postprocessing/ShaderPass.js";


const canvas = document.querySelector('canvas.webgl_1');
const world = new glWorld(canvas);


const stats = Stats();
document.body.appendChild(stats.dom);

let mousePos = new THREE.Vector2();

function handleMouseMove(evt) {
  mousePos.x = (evt.clientX / window.innerWidth) * 2 - 1;
  mousePos.y = -(evt.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', handleMouseMove, false);

function handleWindowResize() {

  //glowLayer.setSize(innerWidth, innerHeight);

}
window.addEventListener('resize', handleWindowResize, false);

//********************************************************************************************************* */
//                                              OBJECTS
//********************************************************************************************************* */
const group = new THREE.Group();

const meshElemental = getElemental();
group.add(meshElemental.mesh);


const meshCapsule = getObjectFBX()
group.add(meshCapsule.FBXobject);

world.scene.add(group);


/***************************************************************************************************
 * RAPIER
 ****************************************************************************************************/


/***************************************************************************************************
*                                      GSAP - ScrollTrigger
****************************************************************************************************/



/***************************************************************************************************
 *                                      GUI
 ****************************************************************************************************/
function initGUI() {

  // Set up dat.GUI to control targets
  const params = {
    Spherify: 0,
    LookAtX: 0,
    LookAtY: 0,
    LookAtZ: 0,
    MoveX: 0,
    MoveY: 25,
    MoveZ: 0,
    upX: 0,
    upY: 0,
    upZ: 0,
    threshold: 1,
    strength: 0.1,
    radius: 0
  };
  const panel = new GUI({ title: 'Controls' });
  

  const folder1 = panel.addFolder('Camera');

  folder1.add(params, 'LookAtX', -10, 10).step(0.1).onChange(function (value) {
    let x = value;
    let y = params.LookAtY;
    let z = params.LookAtZ;

    world.camera.lookAt(x, y, z);

  })
  folder1.add(params, 'LookAtY', -10, 10).step(0.1).onChange(function (value) {
    world.camera.lookAt(params.LookAtX, value, params.LookAtZ);
  })
  folder1.add(params, 'LookAtZ', -10, 10).step(0.1).onChange(function (value) {
    world.camera.lookAt(params.LookAtX, params.LookAtY, value);
  })
  folder1.add(params, 'MoveX', -10, 10).step(0.01).onChange(function (value) {
    world.camera.position.set(value, params.MoveY, params.MoveZ);
  })
  folder1.add(params, 'MoveY', 0, 50).step(0.01).onChange(function (value) {
    world.camera.position.set(params.MoveX, value, params.MoveZ);
  })
  folder1.add(params, 'MoveZ', -10, 10).step(0.01).onChange(function (value) {
  world.camera.position.set(params.MoveX, params.MoveY, value);
  })
  folder1.add(params, 'upX', -10, 10).step(0.01).onChange(function (value) {
    world.camera.up.set(value, params.upY, params.upZ);
  })
  folder1.add(params, 'upY', -10, 10).step(0.01).onChange(function (value) {
    world.camera.up.set(params.upX, value, params.upZ);
  })
  folder1.add(params, 'upZ', -10, 10).step(0.01).onChange(function (value) {
    world.camera.up.set(params.upX, params.upY, value);
    world.camera.updateProjectionMatrix();
  })

}

initGUI();

/***************************************************************************************************
 *                                      ANIMATE
 ****************************************************************************************************/
const clock = new THREE.Clock();

function animate() {

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  meshCapsule.FBXobject.rotation.x = elapsedTime / -8;
  meshCapsule.FBXobject.rotation.y = elapsedTime / 8;

  world.renderer.render(world.scene, world.camera); /* without RAPIER */
  //world.rapierWorld.step();
  // bodies.forEach(b => b.update());

  world.camera.updateProjectionMatrix();
  //world.controls.update();
  window.requestAnimationFrame(animate);
}
console.log(meshCapsule.FBXobject)

animate();
