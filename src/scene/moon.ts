import * as THREE from "three";

export function createMoon() {
    const geometry = new THREE.CircleGeometry(3, 32);
    const material = new THREE.MeshBasicMaterial({
        // use solar texture
        color: 0xffffff,
        side: THREE.DoubleSide
    });

    // create moon mesh
    const moon = new THREE.Mesh(geometry, material);

    return moon 
}
