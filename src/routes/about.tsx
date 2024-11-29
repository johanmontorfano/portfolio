import {createSignal} from "solid-js";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

// Returns the canvas element to render and the animation loop function.
async function useThreeContext(): Promise<[() => void, HTMLCanvasElement]> {
    const loader = new GLTFLoader();
    const motherboard = await loader.loadAsync("/assets/motherboard.glb");
    const camera = motherboard.cameras[0];
    const renderer = new THREE.WebGLRenderer();
    const light = new THREE.AmbientLight(0xFFFFFF);
    const mixer = new THREE.AnimationMixer(motherboard.scene);

    const loop = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(motherboard.scene, camera);
        mixer.update(1/60);
        requestAnimationFrame(loop);
    };
  
    mixer.update(1 / 60);
    mixer.clipAction(motherboard.animations[0], camera).play();
    motherboard.scene.add(light);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return [loop, renderer.domElement];
}

export default function () {
    const [canvas, setCanvas] = createSignal<HTMLCanvasElement | null>(null);

    useThreeContext().then(ctx => {
        setCanvas(ctx[1]);
        ctx[0]();
    });

    return <div>
        {canvas()}
    </div>
}
