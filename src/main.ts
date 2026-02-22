// style
import "./styles/main.css";
// scene
import { createRenderer } from './scene/renderer'
import { createGlobe } from './scene/globe'
import { createMoon } from './scene/moon'
// ui/hud
import { createButton } from './ui/controls'

// this bitch just coordintes shit


// ---------- Setup ----------
const { scene, camera, renderer } = createRenderer()

// create globe / background space
const globe = createGlobe()
scene.add(globe)

// create moon
// const moon = createMoon()
// scene.add(moon)


// ---------- UI ----------
createButton(() => {
    camera.rotation.set(0, camera.rotation.y + 0.01, 0)
})


// ---------- Loop ----------
function animate() {
    requestAnimationFrame(animate)

    // rotate the globe arounf the y-axis
    // globe.rotation.y += 0.0001; 

    // essentially refresh with new scene
    renderer.render(scene, camera)
}

animate()

