import * as THREE from "three";
// helper func
import { moonToXYZ } from "../utility/helpers";
// temp seed data
import { tempMoonData } from "../api/fetchMoonPosition";

export function trackMoon(moonMesh: THREE.Mesh) {
    // fetch moon location with api

    // calculate relative postion to center of globe
    const { x, y, z} = moonToXYZ(
        tempMoonData.data.moon.altitude,
        tempMoonData.data.moon.azimuth,
        tempMoonData.data.moon.distance,
    )

    // move moon to that location
    moonMesh.position.set(x, y, z);
    
    // temp
    // moonMesh.position.set(0, 0, -10);

    // rotate moon to apropriate angle
    // temp
    moonMesh.rotation.set(0, 0, 20);
}