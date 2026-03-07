import * as THREE from "three";
// helper func
import { moonToXYZ } from "../utility/helpers";
// temp seed data
import { tempMoonData } from "../api/fetchMoonPosition";

export function trackMoon(moonMesh: THREE.Mesh) {
    // fetch moon location with api

    // convert cords to cartisan plane
    const { x, y, z} = moonToXYZ(
        tempMoonData.data.moon.altitude,
        tempMoonData.data.moon.azimuth,
        tempMoonData.data.moon.distance,
    )
    // calculate relative postion to center of globe
    const moonVec = new THREE.Vector3(x, y, z);

    moonMesh.position.copy(
        moonVec.setLength(95)
    );

    // rotate moon to apropriate angle
    // temp
    // moonMesh.rotation.set(0, 0, 20);

    return `x: ${moonVec.x}, y: ${moonVec.y}, z: ${moonVec.z}`
}