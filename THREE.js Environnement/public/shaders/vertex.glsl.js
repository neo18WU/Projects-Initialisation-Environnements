
export default /* glsl */`

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	// transform -> position, scale, rotation
	// modelMatrix -> position, scale, rotation of our model
	// viewMatrix -> position, orientation camera
	// proctionMatrix -> project our object onto the screen (aspect ration, perspective)
	//MVP
	vPosition = position;
	vNormal = normal;
	vUv = uv;
	
	vec4 modelViewPosition = modelViewMatrix * vec4( position, 1.0 );
	vec4 projectedPosition = projectionMatrix * modelViewPosition;

	gl_Position = projectedPosition; 
}

`;