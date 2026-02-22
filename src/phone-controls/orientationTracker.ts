// dependencies
import * as THREE from "three";
// interface types
import {
    type OrientationResult,
} from "../interfaces/orientation";
// helpers
import { deviceEulerToQuaternion } from "../utility/helpers";

// === Testing === //
// alpha: Toll. left 1/4 turn = 90. right 1/4 turn = 270. 1/2 turn = 190
// beta: Pitch. stand straight = 90. sit flat down = (-)0. look straight up = (-)180
// gama: Yaw. so inconsistent, aparently it combines with beta

let baselineQuaternion: THREE.Quaternion | null = null;

// get device permission, track orientation and show logs
export const startOrientationTracking = async (onUpdate: (o: OrientationResult) => void): Promise<void> => {
    // guard
    if (typeof DeviceOrientationEvent === "undefined") {
        console.warn("No DeviceOrientationEvent support");
        return;
    }

    // iOS browser permission
    const anyDeviceOrientation = DeviceOrientationEvent as any;
    if (typeof anyDeviceOrientation.requestPermission === "function") {
        try {
            // request permission
            const res = await anyDeviceOrientation.requestPermission();
            if (res !== "granted") {
                console.warn("Permission not granted");
                return;
            }
        } catch (e) {
            console.error("Permission error", e);
            return;
        }
    }

    // listen to device orientation change
    window.addEventListener( "deviceorientation", (e) =>
        handleOrientation(e, onUpdate)
    );
};

// handle determining what orientation of phone is
const handleOrientation = (
    event: DeviceOrientationEvent,
    onUpdate: (o: OrientationResult) => void
) => {
    const { alpha, beta, gamma } = event;
    if (alpha == null || beta == null || gamma == null) return;

    // get saved by stackoverflow funcs
    const q = deviceEulerToQuaternion(alpha, beta, gamma);

    // set forward origin if not yet set
    if (!baselineQuaternion) {
        baselineQuaternion = q.clone().invert();
    }

    // apply baseline offset
    const corrected = baselineQuaternion?.clone().multiply(q);

    const euler = new THREE.Euler().setFromQuaternion(
        corrected!,
        // YXZ because it matches: Yaw, Pitch Roll
        "YXZ"
    );

    const result: OrientationResult = {
        yaw: THREE.MathUtils.radToDeg(euler.y),
        pitch: THREE.MathUtils.radToDeg(euler.x),
        roll: THREE.MathUtils.radToDeg(euler.z),
    };

    onUpdate(result);
};


// helper for UX
export function recenter() {
    baselineQuaternion = null;
}
