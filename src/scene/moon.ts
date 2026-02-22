import * as THREE from "three";

export function createMoon() {
    const geometry = new THREE.CircleGeometry(1, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    return new THREE.Mesh(geometry, material);
}

/**
 * PLANS
 * 
 * get user location
 * get moon location
 * 
 * aproximate place on globe to place moon model given the user and moon location
 * 
 * ...sounds easy enough
 */
