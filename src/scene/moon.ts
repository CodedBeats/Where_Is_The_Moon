import * as THREE from "three";

export function createMoon() {
    const geometry = new THREE.CircleGeometry(1, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    return new THREE.Mesh(geometry, material);
}
