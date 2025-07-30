import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene.jsx'
import './App.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{
          position: [0, 5, 10],
          fov: 60,
        }}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default App