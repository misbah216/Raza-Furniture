import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';

export default function RealFurnitureModel({ url, scale = 1, rotationX = 0, autoRotate = false }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={scale} rotation={[rotationX, 0, 0]} />
      </Center>
    </group>
  );
}