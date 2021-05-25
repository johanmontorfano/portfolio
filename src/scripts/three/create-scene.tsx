//here there is the essentials to build a 3d scene
//react importations
import { CSSProperties, useRef } from "react";
import { PerspectiveCamera, WebGLRenderer } from "three";
import { Scene } from "three";
import { JSONToArray } from "../../data/manipulation";
import { ThreeContext, ThreeContextProp } from "./context";

export const ThreeScene = (props: {
  style?: CSSProperties;
  //name attribute is used to define a unique canvas identifier in classname
  //take care of name attributions to avoid having 2 scenes with the same name
  name: string;
  className?: string;
  children?: any[] | any;
  perspectiveCameraSettings: {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    position: {
      x: number;
      y: number;
      z: number;
    };
  };
  rendererSettings: {
    pixelRatio: number;
    size: number[];
  };
}) => {
  //store the canvas here to be used on the whole script
  const CanvasElement = useRef<any>();

  //this value stores the renderer, the scene and the camera objects
  const ThreeData = {
    renderer: new WebGLRenderer({
      canvas: CanvasElement.current,
    }),
    scene: new Scene(),
    //perspective camera data is as a json form for better readability that's why it's converted to an array to spread args
    camera: new PerspectiveCamera(
      ...JSONToArray(props.perspectiveCameraSettings)
    ),
  };

  //store the context data
  const ContextData: ThreeContextProp = {
    lights: [],
    shapes: [],
    //scene is pushed here to let mesh elements add elements to the scene
    scene: ThreeData.scene,
    pushShape: (element) => {
      ContextData.shapes.push(element);
    },
    pushLight: (element) => {
      ContextData.lights.push(element);
    },
  };

  //this funtion handles props update in animation frame
  const handlePropsUpdates = () => {
    //update the camera data
    ThreeData.camera.position.set(
      props.perspectiveCameraSettings.position.x,
      props.perspectiveCameraSettings.position.y,
      props.perspectiveCameraSettings.position.z
    );
    //update the renderer data
    ThreeData.renderer.setPixelRatio(props.rendererSettings.pixelRatio);
    ThreeData.renderer.setSize(
      props.rendererSettings.size[0],
      props.rendererSettings.size[1],
      true
    );
  };

  //"game loop"
  const animate = () => {
    requestAnimationFrame(animate);
    ThreeData.renderer.render(ThreeData.scene, ThreeData.camera);
  };

  //start game loop
  animate();

  //return the canva
  // ! : if the ThreeScene Component returns something else than a canva, it can be that something went wrong
  return (
    <ThreeContext.Provider value={ContextData}>
      <canvas style={props.style} ref={CanvasElement}>
        {props.children}
      </canvas>
    </ThreeContext.Provider>
  );
};
