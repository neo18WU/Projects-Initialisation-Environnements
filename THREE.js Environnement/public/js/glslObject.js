import * as THREE from "three";
import vertexPars from '../shaders/vertex_pars.glsl.js';
import vertexMain from '../shaders/vertex_main.glsl.js';
import fragmentPars from '../shaders/fragment_pars.glsl.js';
import fragmentMain from '../shaders/fragment_main.glsl.js';

function getGLSLObject() {
    const geometry = new THREE.IcosahedronGeometry(1, 200);
    const material = new THREE.MeshStandardMaterial({

        onBeforeCompile: (shader) => {
            // storing a reference to shader object
            material.userData.shader = shader

            const parsVertexString = /* glsl */`#include <displacementmap_pars_vertex>`
            shader.vertexShader = shader.vertexShader.replace(parsVertexString, parsVertexString + vertexPars)

            const mainVertexString = /* glsl */`#include <displacementmap_vertex>`
            shader.vertexShader = shader.vertexShader.replace(mainVertexString, mainVertexString + vertexMain)

            const mainFragmentString = /* glsl */`#include <normal_fragment_maps>`
            shader.fragmentShader = shader.fragmentShader.replace(mainFragmentString, mainFragmentString + fragmentMain)

            const parsFragmentString = /* glsl */`#include <bumpmap_pars_fragment>`
            shader.fragmentShader = shader.fragmentShader.replace(parsFragmentString, parsFragmentString + fragmentPars)

            //uniforms
            shader.uniforms.uTime = { value: 1.0 }
            shader.uniforms.uFrequency = { value: 0.5 }


        }
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.5,0.5,0.5)
    return { mesh }
}


export { getElemental }
