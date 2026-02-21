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

const globe = createGlobe()
scene.add(globe)

const moon = createMoon()
scene.add(moon)

// ---------- UI ----------
createButton(() => {
    moon.rotation.z += 0.2
})

// ---------- Loop ----------
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()

