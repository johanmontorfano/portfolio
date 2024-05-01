import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const {innerWidth: width, innerHeight: height} = window;
const scene = new THREE.Scene();
const gltf_loader = new GLTFLoader();
const ambient_light = new THREE.AmbientLight(0xFFFFFF);
const camera_spotlight = new THREE.SpotLight(0xFFFFFF, 10000);
camera_spotlight.position.z = 75;
camera_spotlight.castShadow = true;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 95;
const renderer = new THREE.WebGLRenderer();
const logo = (await gltf_loader.loadAsync("logo.glb")).scene;

logo.scale.x = 10;
logo.scale.y = 10;
logo.scale.z = 10;
scene.background = new THREE.Color(0xCCCCCC);
scene.add(logo);
scene.add(ambient_light);
scene.add(camera_spotlight);
renderer.setSize(width, height);

document.body.append(renderer.domElement);

(function animate() {
    const {innerWidth: width, innerHeight: height} = window;
    camera.aspect = width / height;
    logo.rotation.y -= 0.03;

    renderer.setSize(width, height);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})()
