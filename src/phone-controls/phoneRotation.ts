// interface types
import { type OrientationClassification, type OrientationData } from "../interfaces/phoneRotation"

// get device permission and show logs on device orientation change
export const startOrientationLogs = async (): Promise<void> => {
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
    window.addEventListener(
        "deviceorientation",
        handleOrientation as EventListener,
        true,
    );
}

// handle determining what orientation of phone is
const handleOrientation = (event: DeviceOrientationEvent): void => {
    const { alpha, beta, gamma } = event;

    const classification = classifyOrientation({ alpha, beta, gamma });

    const data: OrientationData = {
        classification,
        alpha: alpha !== null ? Number(alpha.toFixed(2)) : null,
        beta: beta !== null ? Number(beta.toFixed(2)) : null,
        gamma: gamma !== null ? Number(gamma.toFixed(2)) : null,
    };

    document.body.innerText = JSON.stringify(data, null, 2);
}

// classify orientation from aplpha, beta and gamma values
const classifyOrientation = ({
    beta = 0,
    gamma = 0,
}: {
    alpha?: number | null;
    beta?: number | null;
    gamma?: number | null;
}): OrientationClassification => {
    const absB = Math.abs(beta ?? 0);
    const absG = Math.abs(gamma ?? 0);

    const VERTICAL = 60;
    const FLAT = 30;
    const SIDE = 45;

    if (absB > VERTICAL && absB < 120) return "wall-ish";

    if (absB < FLAT) {
        if ((beta ?? 0) > 0) return "sky-ish";
        if ((beta ?? 0) < 0) return "floor-ish";
    }

    if (absG > SIDE)
        return (gamma ?? 0) > 0 ? "right-wall-ish" : "left-wall-ish";

    return "unknown";
}
