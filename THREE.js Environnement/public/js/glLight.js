import * as THREE from "three";

function getAmbientLight() {
    const ambient = new THREE.HemisphereLight(0xfefefe, 0xfefefe, 10);
    
    return { ambient }
}

function getSpotLight1() {
    const spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(-12, 25, 0); //(-12, 25, 10);
    spotlight.castShadow = true;
    spotlight.intensity = 60;
    spotlight.radius = 2;
    spotlight.sample = 10;
    spotlight.angle = 0.4;//0.8
    spotlight.penumbra = 0.5;
    spotlight.decay = 1;
    spotlight.distance = 45;
    
    
    const lightHelper = new THREE.SpotLightHelper(spotlight);
    lightHelper.color = 0x00ff00;
    lightHelper.update();

    return { spotlight, lightHelper}
}

function getSpotLight2() {
    const spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(15, 20, 0);
    spotlight.castShadow = true;
    spotlight.intensity = 40;
    spotlight.radius = 2;
    spotlight.sample = 10;
    spotlight.angle = 0.4;
    spotlight.penumbra = 0.5;
    spotlight.decay = 1;
    spotlight.distance = 45;
    
    const lightHelper = new THREE.SpotLightHelper(spotlight);
    lightHelper.color = 0xff0000;
    lightHelper.update();

    const target = new THREE.Object3D();
    //target.position.set(15,0,0);

    return { spotlight, lightHelper, target}
}

function getSpotLight3() {
    const spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(15, 15, 15);
    spotlight.castShadow = true;
    spotlight.intensity = 40;
    spotlight.radius = 2;
    spotlight.sample = 10;
    spotlight.angle = 0.4;
    spotlight.penumbra = 0.5;
    spotlight.decay = 1;
    spotlight.distance = 45;
    
    const lightHelper = new THREE.SpotLightHelper(spotlight);
    lightHelper.color = 0x0000ff;
    lightHelper.update();

    const target = new THREE.Object3D();
    //target.position.set(-15,0,0);

    return { spotlight, lightHelper, target}
}
export { getSpotLight1, getSpotLight2, getSpotLight3, getAmbientLight }

