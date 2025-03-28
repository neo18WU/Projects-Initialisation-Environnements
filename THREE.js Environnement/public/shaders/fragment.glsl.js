export default /* glsl */`
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uTexture;
uniform float uTime;
uniform float uRadius;
uniform vec2 u_resolution;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

float drawCircle(vec2 position, vec2 center, float radius) {
	return step(radius, distance(position, center));
}

float sdEquilateralTriangle( in vec2 p, in float r ) {
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
}

float sdBox( in vec2 p, in vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}


void main() {

//vec3(step(uRadius,length(uv)))
//fract(vUv.x*10.0)
//step(uRadius,mod(vUv.x*10.0, 3.0))
//mix(0.5, 1.0, vUv.x)
//vec3 viewDirection = normalize(cameraPosition - vPosition);
//float fresnel = dot(viewDirection, vNormal);

//line
// vec3(step(0.99,1.0 - abs(vUv.y - 0.5)))

//circle
//vec3(length(vUv))
// vec3(step(uRadius, length(vUv - 0.5)))
// vec3(drawCircle(vUv, vec2(0.5), uRadius)),1);

//box
//vec3(sdBox(vUv - 0.5, vec2(0.1))),1);
//vec3(step(0.9, 1.0 - sdBox(vUv - 0.5, vec2(uRadius))))

//Perlin noise
//vec3(noise(vPosition))

//texture
//vec4 color = texture2D(uTexture, vUv);
//	gl_FragColor = vec4(vec3(color.xyz), 1.0);

//Desaturate
const vec3 DESATURATE = vec3(0.2126, 0.7152, 0.0722);
vec3 color = texture2D(uTexture, vUv).xyz;
float finalColor = dot(DESATURATE, color);

	gl_FragColor = vec4(vec3(finalColor), 1.0);
}

`;
