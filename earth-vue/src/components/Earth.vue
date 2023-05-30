<template>
  <canvas id="earth"></canvas>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { onMounted } from "vue";
import earthUrl from "../assets/earth.jpg";
import bumpUrl from "../assets/elevate.jpg";
onMounted(() => {
  const scene = new THREE.Scene(); //create scene
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

  const geometry = new THREE.SphereGeometry(5, 50, 50);
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(earthUrl),
    bumpMap: new THREE.TextureLoader().load(bumpUrl),
  });
  const earth = new THREE.Mesh(geometry, material);

  // ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  // create light
  const light = new THREE.PointLight(0xffffff, 0.9);
  light.position.set(5, 3, 5);
  
  const group = new THREE.Group();
  group.add(earth);
  group.add(light);
  group.add(ambientLight);
  scene.add(group);

  function animate() {
    group.rotation.y -= 0.001;
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
  }
  animate();
});
</script>
