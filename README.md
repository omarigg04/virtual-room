# Virtual World 3D
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/fc651891-c1fc-46fd-b890-b095345306e8" />
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/bdc482ed-d13c-4c8f-ba89-0435f45b6cc6" />

Un mundo virtual interactivo construido con React Three Fiber, que permite explorar una habitación en primera persona con objetos 3D y texturas personalizadas.

## 🌟 Características Principales

- **Navegación en Primera Persona**: Controles FPS completos con bloqueo de puntero
- **Física Realista**: Sistema de colisiones y gravedad usando Cannon.js
- **Objetos 3D Interactivos**: Muebles, decoraciones y elementos con física
- **Texturas Personalizadas**: Soporte para imágenes como texturas en objetos
- **Iluminación Dinámica**: Luces ambientales, direccionales y puntuales con sombras
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## 🚀 Cómo Inicializar la Escena

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]
cd virtual-world

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Estructura del Proyecto

```
src/
├── components/
│   ├── Objects.jsx      # Componentes de objetos 3D
│   ├── Scene.jsx        # Escena principal
│   └── PlayerController.jsx # Controles del jugador
├── App.jsx             # Componente raíz
└── main.jsx           # Punto de entrada
```

### Configuración Básica de una Escena

Una escena básica requiere estos elementos fundamentales:

```jsx
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

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
        {/* Iluminación */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={0.6} castShadow />
        
        {/* Controles */}
        <PointerLockControls makeDefault />
        <PlayerController />
        
        {/* Objetos de la escena */}
        <Room />
        <Chair position={[-1, 0, 1]} />
        <Table position={[0, 0, 2]} />
      </Physics>
    </KeyboardControls>
  )
}
```

## 🎮 Controles

- **WASD / Flechas**: Movimiento
- **Espacio**: Saltar
- **Mouse**: Mirar alrededor (requiere hacer clic para activar)
- **ESC**: Liberar cursor

## 🛠️ Tecnologías Utilizadas

- **React**: Framework de UI
- **Three.js**: Motor de gráficos 3D
- **React Three Fiber**: Integración de Three.js con React
- **React Three Drei**: Utilidades y componentes adicionales
- **Cannon.js**: Motor de física
- **Vite**: Build tool y servidor de desarrollo

## 📁 Recursos

- Texturas e imágenes van en la carpeta `public/`
- Los objetos 3D se definen en `src/components/Objects.jsx`
- La configuración de la escena está en `src/components/Scene.jsx`

## 🎯 Objetos Disponibles

- **Room**: Habitación con paredes, suelo y techo
- **Chair**: Silla de madera con física
- **Table**: Mesa con 4 patas
- **Lamp**: Lámpara con luz puntual
- **Vinyl**: Portada de álbum con textura personalizable

Para aprender a crear nuevos objetos, consulta: [Tutorial de Creación de Objetos](./docs/tutorial-objetos.md)

## 🔧 Personalización

### Añadir Texturas

1. Coloca tu imagen en la carpeta `public/`
2. Usa el hook `useTexture` de `@react-three/drei`
3. Aplica la textura al material del objeto

### Crear Nuevos Objetos

Cada objeto debe incluir:
- Geometría 3D
- Material con colores/texturas
- Colisiones físicas (opcional)
- Sombras (castShadow/receiveShadow)

## 📖 Documentación Adicional

- [Tutorial: Creación de Objetos 3D](./docs/tutorial-objetos.md)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)

---

Desarrollado con ❤️ usando React Three Fiber
