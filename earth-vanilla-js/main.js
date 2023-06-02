import * as THREE from 'three';
const scene = new THREE.Scene(); //create scene 
// create camera with perspective  ( fov , aspect ratio , near , far )
// fov => angle of view
// aspect ratio => width / height
// near => near clipping plane 
// far => far clipping plane
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 14;

// create renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );
 
// create sphere 
const geometry = new THREE.SphereGeometry( 5, 50, 50);
const texture = new THREE.TextureLoader().load( "img/earth.jpg" );
const bump = new THREE.TextureLoader().load( "img/elevate.jpg" );
const material = new THREE.MeshStandardMaterial( { map: texture } );
const sphere = new THREE.Mesh( geometry, material );

// ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
// create light
const light = new THREE.PointLight( 0xffffff, 0.9 );
light.position.set( 5, 3, 5 );

// create group
const group = new THREE.Group();
group.add(sphere);
group.add(light);
group.add(ambientLight);
scene.add(group);


// set camera position of z axis 


 function animate() {
	requestAnimationFrame( animate );
// 	sphere.rotation.x += 0.01;
// 	sphere.rotation.y += 0.001;
	renderer.render( scene, camera );

 }

animate();
