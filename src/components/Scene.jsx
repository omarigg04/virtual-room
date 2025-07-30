import { KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Room, Chair, Lamp, Table, Vinyl } from './Objects.jsx'
import { PlayerController } from './PlayerController.jsx'

export function Scene() {
  const map = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyD'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyA'] },
    { name: 'jump', keys: ['Space'] },
  ]

  return (
    <KeyboardControls map={map}>
      <Physics gravity={[0, -9.82, 0]}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.6}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <PointerLockControls makeDefault />
        <PlayerController />
        
        <Room />
        <Chair position={[-1, 0, 1]} />
        <Lamp position={[2, 0, -2]} />
        <Table position={[0, 0, 2]} />
        <Vinyl position={[0, 0.38, 2]} imagePath="/aphex-twin-cover.jpg" />
      </Physics>
    </KeyboardControls>
  )
}