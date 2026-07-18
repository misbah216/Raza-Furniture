import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Bounds, Html } from '@react-three/drei';
import { Suspense } from 'react';
import FurnitureModel3D from './FurnitureModel3D';
import RealFurnitureModel from './RealFurnitureModel';

export default function Scene3D({
  shape,
  woodTone,
  accentTone,
  modelUrl,
  modelScale = 1,
  modelRotationX = 0,
  allowDrag = false,
  className = '',
}) {
  const rotationRadians = (modelRotationX * Math.PI) / 180;

  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [3, 1.5, 3.5], fov: 40 }}
        dpr={[1, 1.5]}
      >
        <Suspense
          fallback={
            <Html center>
              <span className="text-sm text-walnut/50 whitespace-nowrap">Loading...</span>
            </Html>
          }
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[4, 6, 3]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#B08D57" />

          {modelUrl ? (
            <Bounds fit clip observe margin={1.3}>
              <RealFurnitureModel
                url={modelUrl}
                scale={modelScale}
                rotationX={rotationRadians}
                autoRotate={!allowDrag}
              />
            </Bounds>
          ) : (
            <FurnitureModel3D
              shape={shape}
              woodTone={woodTone}
              accentTone={accentTone}
              autoRotate={!allowDrag}
            />
          )}

          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.45}
            scale={8}
            blur={2.2}
            far={2}
          />
          <Environment preset="apartment" />

          {allowDrag && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate={false}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}