import * as THREE from 'three';
import {ThreeJSOverlayView} from '@googlemaps/three';
const scene = new THREE.Scene(); //create scene 
// create camera with perspective  ( fov , aspect ratio , near , far )
// fov => angle of view
// aspect ratio => width / height
// near => near clipping plane 
// far => far clipping plane
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// create renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );
 
// create sphere 
const geometry = new THREE.SphereGeometry( 5, 50, 50);
const texture = new THREE.TextureLoader().load( "earth.jpg" );
const material = new THREE.MeshBasicMaterial( { map: texture  } );
const sphere = new THREE.Mesh( geometry, material );

// create group
const group = new THREE.Group();
group.add(sphere);
scene.add(group);


camera.position.z = 14;

// set camera position of z axis 
const mouse = {
	x: undefined,
	y: undefined
}

function animate() {
	requestAnimationFrame( animate );
	//sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.001;
	renderer.render( scene, camera );
	group.rotation.y = mouse.x * 0.5;
	group.rotation.x = mouse.y * 0.5;
}

animate();

// mouse listener
addEventListener("mousemove", (e) => {
	mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

})