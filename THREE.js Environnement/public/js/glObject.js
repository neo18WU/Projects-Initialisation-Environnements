import * as THREE from "three";
import { FBXLoader } from '../three/examples/jsm/loaders/FBXLoader.js';

function loadObjectFBX() {
    const loader = new FBXLoader();

    return loader.loadAsync('./models/capsuleSmooth.fbx', function (object) {

        return object;
    });
}

let objectFBX = await loadObjectFBX();


function getObjectFBX() {
    let FBXobject = objectFBX.clone();
    FBXobject.position.set(0, 0, 0);

    FBXobject.children[0].receiveShadow = true;

    return { mesh }

}

function getCube() {
    let geometry = new THREE.BoxGeometry(1, 1, 1,);
    let material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0
    });

    let cube = new THREE.Mesh(geometry, material);

    return { cube }
}


export { getCube, getObjectFBX }
