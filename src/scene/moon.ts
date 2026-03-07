import * as THREE from "three";

export function createMoon() {
    const geometry = new THREE.CircleGeometry(3, 32);
    
    // texture of moon
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("src/assets/8k_moon.jpg"); 

    // set center of rotation to middle of texture
    texture.center.set(0.5, 0.5);

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    // create moon mesh
    const moon = new THREE.Mesh(geometry, material);

    return moon 
}
