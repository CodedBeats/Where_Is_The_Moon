// dependencies
import * as THREE from "three";
// interface types
import {
    type OrientationResult,
} from "../interfaces/orientation";
// helpers
import { deviceEulerToQuaternion } from "../utility/helpers";



let baselineQuaternion: THREE.Quaternion | null = null;
let smoothedQuaternion = new THREE.Quaternion();
let hasInitialised = false;


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
    // order: sensor → quaternion → smoothing → euler → clamp pitch


    const { alpha, beta, gamma } = event;
    if (alpha == null || beta == null || gamma == null) return;

    // get saved by stackoverflow funcs
    const rawQ = deviceEulerToQuaternion(alpha, beta, gamma);

    // set forward origin if not yet set
    if (!baselineQuaternion) {
        baselineQuaternion = rawQ.clone().invert();
    }
    const correctedQ = baselineQuaternion.clone().multiply(rawQ);

    // first frame -> snap instantly
    if (!hasInitialised) {
        smoothedQuaternion.copy(correctedQ);
        hasInitialised = true;
    }

    // SMOOTHING (spherical interpolation)
    // 0.05 = very smooth (and heavy), 0.15 = balanced, 0.25 = responsive, 0.4 = almost raw :)
    const SMOOTH_FACTOR = 0.15; 
    smoothedQuaternion.slerp(correctedQ, SMOOTH_FACTOR);

    // convert to Euler for logging / clamping
    const euler = new THREE.Euler().setFromQuaternion(
        smoothedQuaternion!,
        // YXZ because it matches: Yaw, Pitch Roll
        "YXZ"
    );

    let pitch = THREE.MathUtils.radToDeg(euler.x);
    const yaw = THREE.MathUtils.radToDeg(euler.y);
    const roll = THREE.MathUtils.radToDeg(euler.z);

    // clamp after smoothing
    pitch = Math.max(-85, Math.min(85, pitch));

    const result: OrientationResult = { yaw, pitch, roll };

    onUpdate(result);
};


// helper for UX
export function recenter() {
    baselineQuaternion = null;
    // reset smoothing too
    hasInitialised = false;
}
