import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Parametric low-poly furniture pieces built from primitives.
 * Swap this out for real GLB/GLTF product scans later —
 * the `autoRotate` + material props keep working the same way.
 */
function WoodMaterial({ color }) {
  return <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />;
}

function Chair({ woodTone, accentTone }) {
  return (
    <group position={[0, -0.6, 0]}>
      {/* seat */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.12, 1]} />
        <WoodMaterial color={woodTone} />
      </mesh>
      {/* backrest */}
      <mesh position={[0, 1.1, -0.44]} castShadow>
        <boxGeometry args={[1, 1.1, 0.12]} />
        <WoodMaterial color={woodTone} />
      </mesh>
      {/* legs */}
      {[[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]} castShadow>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <WoodMaterial color={accentTone} />
        </mesh>
      ))}
    </group>
  );
}

function Sofa({ woodTone, accentTone }) {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.5, 1]} />
        <WoodMaterial color={accentTone} />
      </mesh>
      <mesh position={[0, 0.9, -0.42]} castShadow>
        <boxGeometry args={[2.4, 0.7, 0.16]} />
        <WoodMaterial color={woodTone} />
      </mesh>
      <mesh position={[-1.14, 0.75, 0]} castShadow>
        <boxGeometry args={[0.16, 0.9, 1]} />
        <WoodMaterial color={woodTone} />
      </mesh>
      <mesh position={[1.14, 0.75, 0]} castShadow>
        <boxGeometry args={[0.16, 0.9, 1]} />
        <WoodMaterial color={woodTone} />
      </mesh>
      {[[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.05, z]} castShadow>
          <boxGeometry args={[0.12, 0.3, 0.12]} />
          <WoodMaterial color={woodTone} />
        </mesh>
      ))}
    </group>
  );
}

function Bed({ woodTone, accentTone }) {
  return (
    <group position={[0, -0.6, 0]}>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.3, 2.6]} />
        <WoodMaterial color={accentTone} />
      </mesh>
      <mesh position={[0, 0.9, -1.3]} castShadow>
        <boxGeometry args={[2, 1, 0.15]} />
        <WoodMaterial color={woodTone} />
      </mesh>
      {[[-0.9, -1.2], [0.9, -1.2], [-0.9, 1.2], [0.9, 1.2]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.05, z]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <WoodMaterial color={woodTone} />
        </mesh>
      ))}
    </group>
  );
}

function Table({ woodTone, accentTone }) {
  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1.1]} />
        <WoodMaterial color={woodTone} />
      </mesh>
      {[[-0.9, -0.45], [0.9, -0.45], [-0.9, 0.45], [0.9, 0.45]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]} castShadow>
          <boxGeometry args={[0.12, 0.8, 0.12]} />
          <WoodMaterial color={accentTone} />
        </mesh>
      ))}
    </group>
  );
}

function Decor({ woodTone, accentTone }) {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.75, 0.08, 16, 48]} />
        <WoodMaterial color={accentTone} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.6, 48]} />
        <meshStandardMaterial color={woodTone} roughness={0.2} metalness={0.3} />
      </mesh>
    </group>
  );
}

const SHAPES = { chair: Chair, sofa: Sofa, bed: Bed, table: Table, decor: Decor };

export default function FurnitureModel3D({
  shape = 'chair',
  woodTone = '#8B5E3C',
  accentTone = '#B08D57',
  autoRotate = true,
  rotationSpeed = 0.35,
}) {
  const groupRef = useRef();
  const ShapeComponent = SHAPES[shape] || Chair;

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <ShapeComponent woodTone={woodTone} accentTone={accentTone} />
    </group>
  );
}
