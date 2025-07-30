export function Box({ position = [0, 0, 0], color = "#ff6b6b", size = [1, 1, 1] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export function Sphere({ position = [0, 0, 0], color = "#4ecdc4", radius = 0.5 }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export function Cylinder({ position = [0, 0, 0], color = "#45b7d1", radiusTop = 0.5, radiusBottom = 0.5, height = 3 }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[radiusTop, radiusBottom, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export function Ground({ size = [100, 100], color = "#4a5d3a" }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

import { useBox } from '@react-three/cannon'
import { useTexture } from '@react-three/drei'

export function Room({ width = 16, height = 3.3, depth = 16}) {
  const wallThickness = 0.2
  
  // Invisible collision walls and floor
  const [floorRef] = useBox(() => ({ 
    position: [0, -0.1, 0], 
    args: [width, 0.2, depth],
    type: 'Static'
  }))
  const [backWallRef] = useBox(() => ({ 
    position: [0, height/2, -depth/2], 
    args: [width, height, wallThickness],
    type: 'Static'
  }))
  const [leftWallRef] = useBox(() => ({ 
    position: [-width/2, height/2, 0], 
    args: [wallThickness, height, depth],
    type: 'Static'
  }))
  const [rightWallRef] = useBox(() => ({ 
    position: [width/2, height/2, 0], 
    args: [wallThickness, height, depth],
    type: 'Static'
  }))
  const [frontWallRef] = useBox(() => ({ 
    position: [0, height/2, depth/2], 
    args: [width, height, wallThickness],
    type: 'Static'
  }))
  
  return (
    <group>
      {/* Invisible collision bodies */}
      <mesh ref={floorRef} visible={false} />
      <mesh ref={backWallRef} visible={false} />
      <mesh ref={leftWallRef} visible={false} />
      <mesh ref={rightWallRef} visible={false} />
      <mesh ref={frontWallRef} visible={false} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[0, height/2, -depth/2]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#E6E6FA" />
      </mesh>
      
      {/* Left wall */}
      <mesh rotation={[0, Math.PI/2, 0]} position={[-width/2, height/2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#E6E6FA" />
      </mesh>
      
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI/2, 0]} position={[width/2, height/2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#E6E6FA" />
      </mesh>
    </group>
  )
}


export function Chair({ position = [0, 0, 0] }) {
  
  const [chairRef] = useBox(() => ({ 
    position: [position[0], position[1] + 0.27, position[2]], 
    args: [0.47, 0.53, 0.4],
    type: 'Static'
  }))
  
  return (
    <group position={position}>
      {/* Invisible collision box */}
      <mesh ref={chairRef} visible={false} />
      
      {/* Seat */}
      <mesh position={[0, 0.33, 0]} castShadow>
        <boxGeometry args={[0.4, 0.033, 0.33]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Backrest */}
      <mesh position={[0, 0.6, -0.133]} castShadow>
        <boxGeometry args={[0.4, 0.5, 0.033]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Front left leg */}
      <mesh position={[-0.167, 0.167, 0.133]} castShadow>
        <cylinderGeometry args={[0.017, 0.017, 0.33]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Front right leg */}
      <mesh position={[0.167, 0.167, 0.133]} castShadow>
        <cylinderGeometry args={[0.017, 0.017, 0.33]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Back left leg */}
      <mesh position={[-0.167, 0.167, -0.133]} castShadow>
        <cylinderGeometry args={[0.017, 0.017, 0.33]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Back right leg */}
      <mesh position={[0.167, 0.167, -0.133]} castShadow>
        <cylinderGeometry args={[0.017, 0.017, 0.33]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  )
}

export function Lamp({ position = [0, 0, 0] }) {
  
  const [lampRef] = useBox(() => ({ 
    position: [position[0], position[1] + 0.5, position[2]], 
    args: [0.27, 1, 0.27],
    type: 'Static'
  }))
  
  return (
    <group position={position}>
      {/* Invisible collision box */}
      <mesh ref={lampRef} visible={false} />
      
      {/* Base */}
      <mesh position={[0, 0.033, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.133, 0.067]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      
      {/* Pole */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.933]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      
      {/* Lampshade */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.133, 0.267]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      
      
      {/* Light source inside lampshade */}
      <pointLight
        position={[0, 0.933, 0]}
        intensity={1}
        distance={10}
        color="#FFF8DC"
        castShadow
      />
    </group>
  )
}

export function Table({ position = [0, 0, 0] }) {
  const tableHeight = 0.375 // Reduced by half
  
  const [tableRef] = useBox(() => ({ 
    position: [position[0], position[1] + tableHeight/2, position[2]], 
    args: [1.2, tableHeight, 0.8],
    type: 'Static'
  }))
  
  return (
    <group position={position}>
      {/* Invisible collision box */}
      <mesh ref={tableRef} visible={false} />
      
      {/* Table top */}
      <mesh position={[0, tableHeight, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Table legs */}
      <mesh position={[-0.5, tableHeight/2, -0.3]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, tableHeight]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[0.5, tableHeight/2, -0.3]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, tableHeight]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[-0.5, tableHeight/2, 0.3]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, tableHeight]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[0.5, tableHeight/2, 0.3]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, tableHeight]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  )
}

export function Vinyl({ position = [0, 0, 0], imagePath = null }) {
  // Load texture properly
  const albumTexture = imagePath ? useTexture(imagePath) : null
  
  // Debug logging
  console.log('Vinyl - imagePath:', imagePath)
  console.log('Vinyl - albumTexture:', albumTexture)
  
  // Random position and rotation for the album cover
  const tableWidth = 1.2 // From Table component
  const albumSize = tableWidth / 5 // Made bigger - 1/5 instead of 1/20
  
  // Generate random position on table (within bounds)
  const randomX = (Math.random() - 0.5) * (tableWidth * 0.6) // Stay within 60% of table
  const randomZ = (Math.random() - 0.5) * (0.8 * 0.6) // Table depth is 0.8
  const randomRotationY = Math.random() * Math.PI * 2 // Random rotation 0-360 degrees
  
  return (
    <group position={position}>
      {/* Album cover as thin square */}
      <mesh 
        position={[randomX, 0.03, randomZ]} 
        rotation={[0, randomRotationY, 0]} 
        castShadow
      >
        <boxGeometry args={[albumSize, 0.003, albumSize]} />
        {albumTexture ? (
          <meshStandardMaterial 
            map={albumTexture}
            transparent={false}
            side={2}
          />
        ) : (
          // Fallback color if no texture
          <meshStandardMaterial color="#ff0000" />
        )}
      </mesh>
    </group>
  )
}