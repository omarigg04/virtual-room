import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'

export function PlayerController() {
  const { camera } = useThree()
  const [, get] = useKeyboardControls()
  
  const [playerRef, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [-6, 1.6, -6],
    args: [0.3],
    fixedRotation: true,
    material: {
      friction: 0.1,
      restitution: 0.0
    }
  }))
  
  const velocity = useRef([0, 0, 0])
  const position = useRef([-6, 1.6, -6])
  
  // Subscribe to physics body position and velocity
  api.position.subscribe((p) => {
    position.current = p
    camera.position.set(p[0], p[1] + 0.6, p[2])
  })
  
  api.velocity.subscribe((v) => velocity.current = v)
  
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward, jump } = get()
    
    const direction = new THREE.Vector3()
    const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward))
    const sideVector = new THREE.Vector3(Number(rightward) - Number(leftward), 0, 0)
    
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(8)
    direction.applyEuler(camera.rotation)
    
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    
    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], 5, velocity.current[2])
    }
  })
  
  return (
    <mesh ref={playerRef} visible={false}>
      <sphereGeometry args={[0.3]} />
    </mesh>
  )
}