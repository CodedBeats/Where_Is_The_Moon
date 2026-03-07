// dependencies
import * as THREE from "three";

// ty stadck overflow, idk what this is
export const deviceEulerToQuaternion = (
    alpha: number,
    beta: number,
    gamma: number,
): THREE.Quaternion => {
    const degToRad = Math.PI / 180;

    const _alpha = alpha * degToRad;
    const _beta = beta * degToRad;
    const _gamma = gamma * degToRad;

    const euler = new THREE.Euler(
        _beta,
        _alpha,
        -_gamma,
        "YXZ"
    );

    const quaternion = new THREE.Quaternion().setFromEuler(euler);

    // camera looks out the back of device
    const screenTransform = new THREE.Quaternion(
        -Math.sqrt(0.5),
        0,
        0,
        Math.sqrt(0.5)
    );

    quaternion.multiply(screenTransform);

    return quaternion;
}


// convert spehrical coords from the moon API inro cartisian coords with math I (should) don't understand
export const moonToXYZ = (
    altitude: number, azimuth: number, radius: number = 90
): {
    x: number,
    y: number,
    z: number,
} => {
    const x = radius * Math.cos(altitude) * Math.sin(azimuth)
    const y = radius * Math.sin(altitude)
    const z = radius * Math.cos(altitude) * Math.cos(azimuth)

    return { x, y, z }
}
