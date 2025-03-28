import * as THREE from "three";
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
import { getCube } from "./glObject.js";
import { getAmbientLight, getSpotLight1, getSpotLight2, getSpotLight3 } from "./glLight.js";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';

await RAPIER.init();

class glWorld {
    constructor(canvas) {
        this.setcanvas(canvas);
        this.setScene();
        this.setCamera();
        this.setEvents();
        this.setRapierWorld();
        this.setGeometry();
        this.setLight();
        this.setControls();
        this.setRenderer();

    }

    setScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
    }

    setCamera() {
        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 180);
        this.camera.position.set(5, 2, 5);
        this.camera.lookAt((new THREE.Vector3(0, 0, 0)))
        //this.camera.up.set(0, 0, 0)
        this.helper = new THREE.CameraHelper(this.camera)
        this.scene.add(this.camera);
       // this.scene.add(this.helper)

    }

    setcanvas(canvas) {
        this.canvas = canvas;
        this.canvas.style.height = 100;

    }

    setRapierWorld() {
        this.gravity = { x: 0.0, y: -9.81, z: 0.0 };
        this.rapierWorld = new RAPIER.World(this.gravity);
    }

    setGeometry() {
        this.axeHelper = new THREE.AxesHelper(25);
        this.axeHelper.position.set(0, 1, 0);
        this.xC = new THREE.Color().setHex(0xff0000); //red
        this.yC = new THREE.Color().setHex(0x00ff00);  //green
        this.zC = new THREE.Color().setHex(0x0000ff);  //blue
        this.axeHelper.setColors(this.xC, this.yC, this.zC)
        this.scene.add(this.axeHelper)

        this.helper = new THREE.GridHelper(200, 100);
        this.helper.position.y = 1;
        this.helper.material.opacity = 0.25;
        this.helper.material.transparent = true;
        this.scene.add(this.helper);

    }

    setLight() {
        this.spotlight1 = getSpotLight1();
            this.scene.add(this.spotlight1.spotlight);
            //this.scene.add(this.spotlight1.lightHelper);
        this.spotlight2 = getSpotLight2();
            this.scene.add(this.spotlight2.spotlight);
            //this.scene.add(this.spotlight2.lightHelper);
        this.spotlight3 = getSpotLight3();
            this.scene.add(this.spotlight3.spotlight);
            //this.scene.add(this.spotlight3.lightHelper);

        this.ambiantLight = getAmbientLight();
           // this.scene.add(this.ambiantLight.ambient);
           
    }
    setControls() {
       this.controls = new OrbitControls(this.camera, this.canvas);
    }
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            stencil: false,
            depth: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    }

    windowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
    }

    setEvents() {
        window.addEventListener("resize", this.windowResize.bind(this));
    }

}

export { glWorld };