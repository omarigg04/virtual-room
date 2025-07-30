# Tutorial: Creación de Objetos 3D

Esta guía te enseñará paso a paso cómo crear objetos 3D personalizados para tu mundo virtual usando React Three Fiber.

## 📋 Índice

1. [Conceptos Básicos](#conceptos-básicos)
2. [Estructura de un Objeto](#estructura-de-un-objeto)
3. [Geometrías Disponibles](#geometrías-disponibles)
4. [Materiales y Texturas](#materiales-y-texturas)
5. [Física y Colisiones](#física-y-colisiones)
6. [Iluminación y Sombras](#iluminación-y-sombras)
7. [Ejemplos Prácticos](#ejemplos-prácticos)
8. [Mejores Prácticas](#mejores-prácticas)

## Conceptos Básicos

### ¿Qué es un Objeto 3D?

Un objeto 3D en React Three Fiber está compuesto por:
- **Mesh**: El contenedor principal
- **Geometry**: La forma del objeto (cubo, esfera, etc.)
- **Material**: Cómo se renderiza la superficie (color, textura, etc.)
- **Position**: Ubicación en el espacio 3D
- **Rotation**: Orientación del objeto
- **Scale**: Tamaño del objeto

### Imports Necesarios

```jsx
import { useBox } from '@react-three/cannon'  // Para física
import { useTexture } from '@react-three/drei' // Para texturas
```

## Estructura de un Objeto

### Plantilla Básica

```jsx
export function MiObjeto({ position = [0, 0, 0], color = "#ffffff" }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
```

### Con Física

```jsx
export function MiObjetoConFisica({ position = [0, 0, 0] }) {
  const [ref] = useBox(() => ({ 
    position, 
    args: [1, 1, 1],
    type: 'Static' // o 'Dynamic' para objetos que se mueven
  }))
  
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )
}
```

## Geometrías Disponibles

### Formas Básicas

#### Cubo (Box)
```jsx
<boxGeometry args={[ancho, alto, profundidad]} />
// Ejemplo: args={[2, 1, 1]} = cubo rectangular
```

#### Esfera
```jsx
<sphereGeometry args={[radio, segmentosHorizontales, segmentosVerticales]} />
// Ejemplo: args={[1, 32, 32]} = esfera suave
```

#### Cilindro
```jsx
<cylinderGeometry args={[radioTop, radioBottom, altura, segmentosRadiales]} />
// Ejemplo: args={[1, 1, 2, 8]} = cilindro
// args={[0, 1, 2, 8]} = cono
```

#### Plano
```jsx
<planeGeometry args={[ancho, alto]} />
// Ejemplo: args={[5, 5]} = plano cuadrado
```

#### Círculo
```jsx
<circleGeometry args={[radio, segmentos]} />
// Ejemplo: args={[1, 32]} = círculo suave
```

#### Anillo
```jsx
<ringGeometry args={[radioInterior, radioExterior, segmentos]} />
// Ejemplo: args={[0.5, 1, 32]} = anillo
```

## Materiales y Texturas

### Tipos de Materiales

#### Material Básico
```jsx
<meshBasicMaterial color="#ff0000" />
// No reacciona a luces
```

#### Material Estándar (Recomendado)
```jsx
<meshStandardMaterial 
  color="#ff0000" 
  roughness={0.5}    // 0 = espejo, 1 = mate
  metalness={0.1}    // 0 = no metálico, 1 = metálico
/>
```

#### Material Físico
```jsx
<meshPhysicalMaterial 
  color="#ff0000"
  roughness={0.3}
  metalness={0.8}
  clearcoat={1}      // Barniz brillante
  transmission={0.5} // Transparencia
/>
```

### Usando Texturas

#### Cargar Textura
```jsx
export function ObjetoConTextura({ position = [0, 0, 0] }) {
  const texture = useTexture('/mi-imagen.jpg')
  
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
```

#### Configurar Repetición de Textura
```jsx
const texture = useTexture('/patron.jpg')
texture.wrapS = texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(2, 2) // Repetir 2x2 veces

<meshStandardMaterial map={texture} />
```

## Física y Colisiones

### Tipos de Cuerpos Físicos

#### Estático (Static)
- No se mueve
- Usado para paredes, suelos, muebles

```jsx
const [ref] = useBox(() => ({ 
  type: 'Static',
  position: [0, 0, 0],
  args: [1, 1, 1]
}))
```

#### Dinámico (Dynamic)
- Se mueve y reacciona a fuerzas
- Usado para objetos que caen, pelotas, etc.

```jsx
const [ref, api] = useBox(() => ({ 
  type: 'Dynamic',
  mass: 1,
  position: [0, 5, 0],
  args: [1, 1, 1]
}))
```

#### Cinemático (Kinematic)
- Se mueve pero no reacciona a fuerzas
- Controlado manualmente

```jsx
const [ref] = useBox(() => ({ 
  type: 'Kinematic',
  position: [0, 0, 0],
  args: [1, 1, 1]
}))
```

### Formas de Colisión

```jsx
// Caja
const [ref] = useBox(() => ({ args: [1, 2, 1] }))

// Esfera
const [ref] = useSphere(() => ({ args: [1] }))

// Cilindro
const [ref] = useCylinder(() => ({ args: [1, 1, 2, 8] }))

// Plano
const [ref] = usePlane(() => ({ rotation: [-Math.PI/2, 0, 0] }))
```

## Iluminación y Sombras

### Habilitar Sombras

En el objeto que proyecta sombras:
```jsx
<mesh castShadow>
```

En el objeto que recibe sombras:
```jsx
<mesh receiveShadow>
```

En ambos casos:
```jsx
<mesh castShadow receiveShadow>
```

### Luces que Generan Sombras

```jsx
// Luz direccional (como el sol)
<directionalLight 
  position={[5, 5, 5]} 
  castShadow 
  shadow-mapSize={[2048, 2048]}
/>

// Luz puntual (como una bombilla)
<pointLight 
  position={[0, 2, 0]} 
  castShadow 
  intensity={1}
  distance={10}
/>

// Luz foco (como un reflector)
<spotLight 
  position={[5, 5, 5]} 
  castShadow 
  angle={Math.PI / 4}
  penumbra={0.5}
/>
```

## Ejemplos Prácticos

### Ejemplo 1: Caja Simple

```jsx
export function Caja({ position = [0, 0, 0], size = [1, 1, 1], color = "#ff6b6b" }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Uso:
<Caja position={[2, 0, 0]} size={[1, 2, 1]} color="#00ff00" />
```

### Ejemplo 2: Mesa de Madera

```jsx
export function Mesa({ position = [0, 0, 0] }) {
  const maderaColor = "#8B4513"
  const pataColor = "#654321"
  
  return (
    <group position={position}>
      {/* Superficie de la mesa */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color={maderaColor} />
      </mesh>
      
      {/* Patas */}
      {[
        [-0.8, 0.375, -0.4], [0.8, 0.375, -0.4],
        [-0.8, 0.375, 0.4],  [0.8, 0.375, 0.4]
      ].map((pos, index) => (
        <mesh key={index} position={pos} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.75]} />
          <meshStandardMaterial color={pataColor} />
        </mesh>
      ))}
    </group>
  )
}
```

### Ejemplo 3: Objeto con Textura

```jsx
export function Cuadro({ position = [0, 0, 0], imagePath }) {
  const texture = useTexture(imagePath)
  
  return (
    <group position={position}>
      {/* Marco */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Imagen */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[1, 0.6]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  )
}

// Uso:
<Cuadro position={[0, 1.5, -1]} imagePath="/mi-cuadro.jpg" />
```

### Ejemplo 4: Objeto con Física

```jsx
export function PelotaSaltarina({ position = [0, 5, 0] }) {
  const [ref] = useSphere(() => ({ 
    mass: 1,
    position,
    args: [0.5],
    material: {
      friction: 0.1,
      restitution: 0.9 // Rebote alto
    }
  }))
  
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ff0066" />
    </mesh>
  )
}
```

## Mejores Prácticas

### 1. Organización del Código

```jsx
// ✅ Bueno: Un componente por objeto
export function Silla({ position, color }) { /* ... */ }
export function Mesa({ position, size }) { /* ... */ }

// ❌ Malo: Todo en un componente gigante
export function TodosLosMuebles() { /* 500 líneas... */ }
```

### 2. Props Configurables

```jsx
// ✅ Bueno: Props con valores por defecto
export function Lampara({ 
  position = [0, 0, 0], 
  intensity = 1, 
  color = "#FFF8DC",
  height = 2 
}) {
  // ...
}

// ❌ Malo: Valores hardcodeados
export function Lampara() {
  return (
    <pointLight position={[2, 2, 0]} intensity={0.5} color="#ffffff" />
  )
}
```

### 3. Reutilización

```jsx
// ✅ Bueno: Componente reutilizable
export function Columna({ position, height = 3, radius = 0.2, color = "#cccccc" }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Uso múltiple:
<Columna position={[2, 1.5, 0]} />
<Columna position={[-2, 1.5, 0]} />
<Columna position={[0, 1.5, 2]} height={2.5} color="#ff0000" />
```

### 4. Optimización de Rendimiento

```jsx
// ✅ Bueno: Geometrías con LOD apropiado
<sphereGeometry args={[1, 16, 16]} /> // Para objetos lejanos
<sphereGeometry args={[1, 32, 32]} /> // Para objetos cercanos

// ✅ Bueno: Texturas optimizadas
const texture = useTexture('/imagen-512x512.jpg') // Tamaño apropiado

// ❌ Malo: Demasiados polígonos para objetos simples
<sphereGeometry args={[1, 64, 64]} /> // Innecesario para una pelota simple
```

### 5. Colisiones Eficientes

```jsx
// ✅ Bueno: Colisión simple para objeto complejo
const [chairRef] = useBox(() => ({ 
  position: [0, 0.5, 0], 
  args: [0.5, 1, 0.5], // Caja simple
  type: 'Static'
}))

return (
  <group>
    {/* Colisión invisible */}
    <mesh ref={chairRef} visible={false} />
    
    {/* Visual complejo */}
    <ChairVisual />
  </group>
)
```

## Agregando el Objeto a la Escena

1. **Exporta** tu objeto desde `Objects.jsx`:
```jsx
export function MiNuevoObjeto({ position }) {
  // tu código aquí
}
```

2. **Importa** en `Scene.jsx`:
```jsx
import { Room, Chair, Lamp, Table, Vinyl, MiNuevoObjeto } from './Objects.jsx'
```

3. **Úsalo** en la escena:
```jsx
<MiNuevoObjeto position={[1, 0, -2]} />
```

---

¡Con estos conocimientos ya puedes crear cualquier objeto 3D para tu mundo virtual! 🚀

**Próximos pasos:**
- Experimenta combinando diferentes geometrías
- Prueba con texturas personalizadas
- Crea objetos interactivos con física
- Añade animaciones con `useFrame`

¿Necesitas ayuda con algún objeto específico? ¡Consulta los ejemplos o crea un issue en el repositorio!