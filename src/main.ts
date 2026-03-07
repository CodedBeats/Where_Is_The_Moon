// dependencies
import * as THREE from "three";
// style
import "./styles/main.css";
// scene
import { createRenderer } from './scene/renderer'
import { createGlobe } from './scene/globe'
import { createMoon } from './scene/moon'
import { trackMoon } from "./scene/trackMoon";
// ui/hud
import { rotateCameraBtn, allowPhoneOrientationBtn, recenterBtn, logDataBtn } from './ui/btns'
import { logDataHelper } from "./ui/logHelper";
// phone orientation controls
import { startOrientationTracking, recenter } from "./phone-controls/orientationTracker"

// this bitch just coordintes shit


// ---------- Setup ----------
const { scene, camera, renderer } = createRenderer()

// create globe / background space
const globe = createGlobe()
scene.add(globe)

// create moon
const moon = createMoon()
scene.add(moon)
// track moon
const xyzCoords = trackMoon(moon)



// ---------- UI ----------
rotateCameraBtn(() => {
    camera.rotation.set(0, camera.rotation.y + 0.01, 0)
})
recenterBtn(() => {
    recenter()
})
allowPhoneOrientationBtn(() => {
    startOrientationTracking((o) => {
        camera.rotation.set(
            THREE.MathUtils.degToRad(o.pitch),
            THREE.MathUtils.degToRad(o.yaw),
            THREE.MathUtils.degToRad(o.roll)
        );
    })
})
logDataBtn(() => {
    logDataHelper(xyzCoords)
})


// ---------- Loop ----------
function animate() {
    requestAnimationFrame(animate)

    // constantly track the moon? probably not

    // essentially refresh with new scene
    renderer.render(scene, camera)
}

animate()

