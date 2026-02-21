import * as THREE from "three";

export function createGlobe() {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -0.5;

    return mesh;
}
