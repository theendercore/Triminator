// @ts-ignore
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const radi = 0.01745329
const mainArmorUrl = "./models/main_armor.glb"
const leggingArmorUrl = "./models/leggings.glb"

const loaderGLTF = new GLTFLoader() as GLTFLoader

export {radi, mainArmorUrl, leggingArmorUrl, loaderGLTF}