import * as THREE from 'three'

export function createWireframeMaterial(color: number) {
  return new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  })
}

export function createParticleMaterial(color: number, size: number) {
  return new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
}
