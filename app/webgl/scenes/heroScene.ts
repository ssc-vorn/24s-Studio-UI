import * as THREE from 'three'
import { createParticleField } from '../geometries/particleField'
import { createParticleMaterial, createWireframeMaterial } from '../materials/atmosphere'
import { getSafeDpr } from '../utilities/dpr'
import { clamp, lerp } from '~/utils/animation'

interface HeroSceneOptions {
  simplified?: boolean
  maxDpr?: number
}

export function createHeroScene(canvas: HTMLCanvasElement, options: HeroSceneOptions = {}) {
  const { simplified = false, maxDpr = 2 } = options

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !simplified,
    powerPreference: 'high-performance'
  })
  renderer.setPixelRatio(getSafeDpr(maxDpr))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 8

  const group = new THREE.Group()
  scene.add(group)

  const primaryColor = 0xadc1e1
  const accentColor = 0xffffff

  const icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.4, simplified ? 0 : 1),
    createWireframeMaterial(primaryColor)
  )
  group.add(icosahedron)

  const innerCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 0),
    createWireframeMaterial(accentColor)
  )
  group.add(innerCore)

  const particleCount = simplified ? 140 : 420
  const particles = new THREE.Points(
    createParticleField(particleCount, 5.5),
    createParticleMaterial(accentColor, simplified ? 0.035 : 0.045)
  )
  scene.add(particles)

  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)

  const pointer = { targetX: 0, targetY: 0, x: 0, y: 0 }
  let scrollProgress = 0

  function setPointer(x: number, y: number) {
    pointer.targetX = x
    pointer.targetY = y
  }

  function setScrollProgress(progress: number) {
    scrollProgress = clamp(progress, 0, 1)
  }

  function resize(width: number, height: number) {
    if (width === 0 || height === 0) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }

  function render(elapsed: number, delta: number) {
    pointer.x = lerp(pointer.x, pointer.targetX, 0.045)
    pointer.y = lerp(pointer.y, pointer.targetY, 0.045)

    group.rotation.y = elapsed * 0.06 + pointer.x * 0.35
    group.rotation.x = elapsed * 0.03 + pointer.y * 0.25
    innerCore.rotation.y -= delta * 0.25
    innerCore.rotation.x += delta * 0.15
    particles.rotation.y = elapsed * 0.015

    camera.position.x = lerp(camera.position.x, pointer.x * 0.6, 0.05)
    camera.position.y = lerp(camera.position.y, -pointer.y * 0.4 - scrollProgress * 1.4, 0.05)
    camera.lookAt(0, -scrollProgress * 0.6, 0)

    const fade = 1 - clamp(scrollProgress * 1.3, 0, 1)
    scene.scale.setScalar(1 - scrollProgress * 0.12)
    ;(icosahedron.material as THREE.Material).opacity = 0.5 * fade
    ;(innerCore.material as THREE.Material).opacity = 0.5 * fade
    ;(particles.material as THREE.Material).opacity = 0.55 * fade

    renderer.render(scene, camera)
  }

  function dispose() {
    icosahedron.geometry.dispose()
    innerCore.geometry.dispose()
    particles.geometry.dispose()
    ;(icosahedron.material as THREE.Material).dispose()
    ;(innerCore.material as THREE.Material).dispose()
    ;(particles.material as THREE.Material).dispose()
    renderer.dispose()
    renderer.forceContextLoss()
  }

  return { setPointer, setScrollProgress, resize, render, dispose }
}

export type HeroScene = ReturnType<typeof createHeroScene>
