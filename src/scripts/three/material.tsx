import { MeshBasicMaterial, MeshBasicMaterialParameters } from "three"
export const BasicMaterial = (args: MeshBasicMaterialParameters) => {
    //material is stored here
    const material = new MeshBasicMaterial(args);

    return material;
}