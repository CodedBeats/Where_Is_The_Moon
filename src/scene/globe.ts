import * as THREE from "three";
// assets

export function createGlobe() {
    const geometry = new THREE.SphereGeometry(100, 60, 40);
    
    // texture of earth
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/textures/download/8k_stars_milky_way.jpg"); 

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide // render the inside of the sphere
    });

    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.z = -0.5;

    return mesh;
}
