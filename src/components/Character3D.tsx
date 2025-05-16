
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Character3DModelProps {
  isRunning: boolean;
}

const Character3DModel: React.FC<Character3DModelProps> = ({ isRunning }) => {
  // Use proper typing for the refs with THREE.Mesh
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  
  // Animation for running
  useFrame(({ clock }) => {
    if (!isRunning) return;
    
    const t = clock.getElapsedTime();
    
    // Animate legs for running
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t * 10) * 0.4;
      rightLegRef.current.rotation.x = Math.sin(t * 10 + Math.PI) * 0.4;
    }
    
    // Animate arms for running
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 10 + Math.PI) * 0.3;
      rightArmRef.current.rotation.x = Math.sin(t * 10) * 0.3;
    }
    
    // Slight body bobbing
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.7 + Math.abs(Math.sin(t * 10) * 0.05);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.7, 0]}>
        <boxGeometry args={[0.7, 1, 0.5]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>
      
      {/* Head */}
      <group position={[0, 1.4, 0]}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#FCD34D" />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[0.12, 0.05, 0.3]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[-0.12, 0.05, 0.3]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
      
      {/* Arms */}
      <mesh
        ref={leftArmRef}
        position={[-0.45, 0.7, 0]}
        rotation={[0, 0, -Math.PI / 16]}
      >
        <boxGeometry args={[0.1, 0.6, 0.2]} />
        <meshStandardMaterial color="#FCD34D" />
      </mesh>
      <mesh
        ref={rightArmRef}
        position={[0.45, 0.7, 0]}
        rotation={[0, 0, Math.PI / 16]}
      >
        <boxGeometry args={[0.1, 0.6, 0.2]} />
        <meshStandardMaterial color="#FCD34D" />
      </mesh>
      
      {/* Legs */}
      <mesh
        ref={leftLegRef}
        position={[-0.2, 0.15, 0]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.6, 0.3]} />
        <meshStandardMaterial color="#1D4ED8" />
      </mesh>
      <mesh
        ref={rightLegRef}
        position={[0.2, 0.15, 0]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.6, 0.3]} />
        <meshStandardMaterial color="#1D4ED8" />
      </mesh>
    </group>
  );
};

interface Character3DProps {
  isRunning: boolean;
}

const Character3D: React.FC<Character3DProps> = ({ isRunning }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1, 5], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Character3DModel isRunning={isRunning} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Character3D;
