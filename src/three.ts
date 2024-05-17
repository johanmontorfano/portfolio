import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

function min(value: number, current: number) {
    return current < value ? value : current;
}

let lock_rotation = false;
let width = window.innerWidth;
const scene = new THREE.Scene();
const gltf_loader = new GLTFLoader();
const ambient_light = new THREE.AmbientLight(0xFFFFFF);
const camera_spotlight = new THREE.SpotLight(0xFFFFFF, 10000);
const camera = new THREE.OrthographicCamera(
    min(2000, width) / -20, 
    min(2000, width) / 20, 
    min(2000, width) / 20, 
    min(2000, width) / -20, 
    1, 
    300
);
export const renderer = new THREE.WebGLRenderer();
const logo = (await gltf_loader.loadAsync("./assets/logo.glb")).scene;

scene.background = new THREE.Color(0x0D6900)
camera.position.z = 95;
camera_spotlight.position.z = 95;
logo.scale.x = 25;
logo.scale.y = 25;
logo.scale.z = 25;
scene.add(logo);
scene.add(ambient_light);
scene.add(camera_spotlight);

(function animate() {
    const {innerWidth: width} = window;
    if (!lock_rotation) logo.rotation.y -= 0.03; 
    renderer.setSize(min(150, width * 0.05), min(150, width * 0.05));
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}());
