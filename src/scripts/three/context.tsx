import { createContext } from "react";
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DodecahedronGeometry,
  EdgesGeometry,
  ExtrudeGeometry,
  HemisphereLight,
  IcosahedronGeometry,
  LatheGeometry,
  Light,
  LightProbe,
  LightShadow,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  OctahedronGeometry,
  ParametricGeometry,
  PlaneGeometry,
  PointLight,
  PolyhedronGeometry,
  RectAreaLight,
  RingGeometry,
  Scene,
  ShapeGeometry,
  SphereGeometry,
  SpotLight,
  TetrahedronGeometry,
  TextGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  TubeGeometry,
  WebGLGeometries,
  WireframeGeometry,
} from "three";

//type of shapes
export type ThreeShape =
  | BoxGeometry
  | TubeGeometry
  | ConeGeometry
  | TextGeometry
  | RingGeometry
  | TorusGeometry
  | ShapeGeometry
  | PlaneGeometry
  | LatheGeometry
  | EdgesGeometry
  | BufferGeometry
  | CircleGeometry
  | SphereGeometry
  | ExtrudeGeometry
  | TetrahedronGeometry
  | CylinderGeometry
  | TorusKnotGeometry
  | WireframeGeometry
  | PolyhedronGeometry
  | ParametricGeometry
  | OctahedronGeometry
  | IcosahedronGeometry
  | DodecahedronGeometry;

//type of materials
export type ThreeMaterial =
  | MeshPhongMaterial
  | MeshDepthMaterial
  | MeshToonMaterial
  | MeshStandardMaterial
  | MeshDistanceMaterial
  | MeshNormalMaterial
  | MeshBasicMaterial;

//type of lights
export type ThreeLight =
  | Light
  | SpotLight
  | PointLight
  | AmbientLight
  | RectAreaLight
  | DirectionalLight
  | HemisphereLight;

//context type of a scene
export type ThreeContextProp = {
  shapes: Mesh[];
  lights: ThreeLight[];
  scene: Scene;
  pushShape: (element: Mesh) => void;
  pushLight: (element: ThreeLight) => void;
};

//this context stores the shapes and the lights in a specific scene
//every three scene should auto push a context provider at the top of the render tree
export const ThreeContext = createContext<ThreeContextProp>({
  shapes: [],
  lights: [],
  scene: new Scene(),
  pushShape: () => {},
  pushLight: () => {},
});