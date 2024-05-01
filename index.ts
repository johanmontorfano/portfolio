import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const DARK_BACKGROUND = 0x141414;
const LIGHT_BACKGROUND = 0xCCCCCC;
const DARK_LIGHTING = 0x303030;
const LIGHT_LIGHTING = 0xFFFFFF;
const DARK_LOGO = 0x404040;
const LIGHT_LOGO = 0xFFFFFF;

const is_dark = window.matchMedia("(prefers-color-scheme: dark)");
let current_background = is_dark.matches ? DARK_BACKGROUND : LIGHT_BACKGROUND;
let current_lighting = is_dark.matches ? DARK_LIGHTING : LIGHT_LIGHTING;
let current_logo = is_dark.matches ? DARK_LOGO : LIGHT_LOGO;
let lock_rotation = false;
const {innerWidth: width, innerHeight: height} = window;
const scene = new THREE.Scene();
const gltf_loader = new GLTFLoader();
const ambient_light = new THREE.AmbientLight(current_lighting);
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
scene.background = new THREE.Color(current_background);
scene.add(logo);
scene.add(ambient_light);
scene.add(camera_spotlight);
renderer.setSize(width, height);
console.log(logo);

document.body.append(renderer.domElement);
document.querySelector('meta[name="theme"]')
    ?.setAttribute("content", is_dark.matches ? "black" : "white");
document.body.style
    .setProperty("background", is_dark.matches ? "#141414" : "#CCCCCC");
is_dark.addEventListener("change", (is_dark) => {
    current_lighting = is_dark.matches ? DARK_LIGHTING : LIGHT_LIGHTING;
    current_background = is_dark.matches ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    current_logo = is_dark.matches ? DARK_LOGO : LIGHT_LOGO;
    document.querySelector('meta[name="theme"]')
        ?.setAttribute("content", is_dark.matches ? "black" : "white");
    document.body.style
        .setProperty("background", is_dark.matches ? "#141414" : "#CCCCCC");
});

renderer.domElement.addEventListener("mousedown", () => {
    lock_rotation = true;
});
renderer.domElement.addEventListener("touchstart", () => {
    lock_rotation = true;
});
renderer.domElement.addEventListener("mouseup", () => {
    lock_rotation = false;
});
renderer.domElement.addEventListener("touchend", () => {
    lock_rotation = false;
});
renderer.domElement.addEventListener("mousemove", (ev) => {
    if (lock_rotation) logo.rotation.y = ev.x / 40;
});
renderer.domElement.addEventListener("touchmove", (ev) => {
    if (lock_rotation) logo.rotation.y = 
        ev.touches.item(ev.touches.length - 1)?.screenX as 1 / 40;
});

(function animate() {
    const {innerWidth: width, innerHeight: height} = window;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (!lock_rotation) logo.rotation.y += 0.03; 
    scene.background = new THREE.Color(current_background);
    ambient_light.color = new THREE.Color(current_lighting);
    (logo.children[0] as any).material.color = new THREE.Color(current_logo);

    renderer.setSize(width, height);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}());
