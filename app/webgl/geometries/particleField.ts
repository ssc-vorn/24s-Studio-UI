import * as THREE from 'three'

/** A sparse spherical particle field — atmosphere, not noise. */
export function createParticleField(count: number, radius: number) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const r = radius * (0.6 + Math.random() * 0.4)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return geometry
}
