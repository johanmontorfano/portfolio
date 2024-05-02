import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { 
    DARK_BACKGROUND,
    DARK_LIGHTING,
    DARK_LOGO,
    LIGHT_BACKGROUND,
    LIGHT_LIGHTING,
    LIGHT_LOGO,
    NULL_COLOR
} from "./src/constants";
import { useThemeLifecycle } from "./src/theme";
import { addEventListeners } from "./src/batch_events";

let lock_rotation = false;
const { onThemeChange } = useThemeLifecycle();
const drag_text = document.createElement("p");
const {innerWidth: width, innerHeight: height} = window;
const scene = new THREE.Scene();
const gltf_loader = new GLTFLoader();
const ambient_light = new THREE.AmbientLight(NULL_COLOR);
const camera_spotlight = new THREE.SpotLight(NULL_COLOR, 10000);
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const logo = (await gltf_loader.loadAsync("logo.glb")).scene;

drag_text.textContent = "You can drag the logo horizontally";
drag_text.classList.add("tip");
camera.position.z = 95;
camera_spotlight.position.z = 75;
logo.scale.x = 10;
logo.scale.y = 10;
logo.scale.z = 10;
scene.add(logo);
scene.add(ambient_light);
scene.add(camera_spotlight);
renderer.setSize(width, height);

document.body.append(drag_text);
document.body.append(renderer.domElement)
onThemeChange((is_dark) => {
    camera_spotlight.color = is_dark ? DARK_LIGHTING : LIGHT_LIGHTING;
    ambient_light.color = is_dark ? DARK_LIGHTING : LIGHT_LIGHTING;
    scene.background = is_dark ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    (logo.children[0] as any).material.color = is_dark ? DARK_LOGO : LIGHT_LOGO;
    document.querySelector('meta[name="theme"]')
        ?.setAttribute("content", is_dark ? "black" : "white");
    document.body.style
        .setProperty("background", is_dark ? "#141414" : "#CCCCCC");
});

addEventListeners(renderer.domElement, ["mousedown", "touchstart"], () => {
    lock_rotation = true;
    drag_text.classList.add("active");
});
addEventListeners(renderer.domElement, ["mouseup", "touchend"], () => {
    lock_rotation = false;
    drag_text.classList.remove("active");
});
renderer.domElement.addEventListener("mousemove", (ev) => {
    if (lock_rotation) logo.rotation.y = ev.screenX / 40;
});
renderer.domElement.addEventListener("touchmove", (ev) => {
    if (lock_rotation) logo.rotation.y = 
        ev.touches.item(ev.touches.length - 1)?.screenX as 1 / 40;
});

(function animate() {
    const {innerWidth: width, innerHeight: height} = window;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (!lock_rotation) logo.rotation.y -= 0.03; 
    renderer.setSize(width, height);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}());
