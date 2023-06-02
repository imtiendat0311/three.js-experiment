<template>
  <canvas id="earth"></canvas>
</template>
<script setup lang="ts">
import * as THREE from "three";

import { onMounted } from "vue";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import earthUrl from "../assets/earth.jpg";
import bumpUrl from "../assets/elevate.jpg";
import backgroundUrl from "../assets/starfield.jpg";

onMounted(() => {
  const scene = new THREE.Scene(); //create scene
  // scene.background = new THREE.TextureLoader().load(backgroundUrl);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  console.log(document.getElementById("earth"));
  camera.position.z = 14;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("earth")!,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);

  const geometry = new THREE.SphereGeometry(5, 50, 50);
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(earthUrl),
    bumpMap: new THREE.TextureLoader().load(bumpUrl),
    bumpScale: 0.5,
  });
  const earth = new THREE.Mesh(geometry, material);

  const starSphere = new THREE.SphereGeometry(100, 50, 50);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(backgroundUrl),
    side: THREE.BackSide,
  });
  const star = new THREE.Mesh(starSphere, starMaterial)

  // ambient light
   const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  // create light
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(50, 50, 50);
  
  // const group = new THREE.Group();

  scene.add(earth);
  scene.add(star);
  // scene.add(group);
  scene.add(ambientLight);
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement);

  function animate() {
    earth.rotation.y -= 0.001;
    light.rotation.y -= 0.001;
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
    controls.update();
  }
  animate();
});
</script>
