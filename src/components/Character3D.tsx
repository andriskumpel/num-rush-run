
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Character3DModelProps {
  isRunning: boolean;
}

// Using any to bypass the type checking issues with THREE.js and React types
// This is safer than forcing type assertions and will allow the component to work properly
const Character3DModel: React.FC<Character3DModelProps> = ({ isRunning }) => {
  const bodyRef = useRef<any>(null);
  const leftLegRef = useRef<any>(null);
  const rightLegRef = useRef<any>(null);
  const leftArmRef = useRef<any>(null);
  const rightArmRef = useRef<any>(null);
  const laptopRef = useRef<any>(null);
  
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

    // Laptop bobbing slightly out of sync with body
    if (laptopRef.current) {
      laptopRef.current.position.y = Math.sin(t * 10 + 0.5) * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Body - Wider for Ghibli proportions */}
      <mesh ref={bodyRef} position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 0.9, 0.5]} />
        <meshStandardMaterial color="#3C3744" /> {/* Dark navy blue for sweater/hoodie */}
      </mesh>
      
      {/* Head - Larger and rounder for Ghibli style */}
      <group position={[0, 1.4, 0]}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#FFE4C8" /> {/* Soft skin tone */}
        </mesh>
        
        {/* Hair - Messy style common in Ghibli */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.43, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#5A3825" /> {/* Brown hair */}
        </mesh>
        
        {/* Bangs */}
        <mesh position={[0, 0.2, 0.2]}>
          <boxGeometry args={[0.8, 0.2, 0.3]} />
          <meshStandardMaterial color="#5A3825" /> {/* Match hair color */}
        </mesh>
        
        {/* Eyes - Larger, expressive Ghibli eyes */}
        <mesh position={[0.12, 0.05, 0.35]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[-0.12, 0.05, 0.35]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Glasses - IT student staple */}
        <mesh position={[0, 0.05, 0.38]}>
          <torusGeometry args={[0.12, 0.02, 8, 20]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        <mesh position={[0.12, 0.05, 0.38]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      </group>
      
      {/* Laptop - Essential IT student accessory */}
      <mesh ref={laptopRef} position={[0.35, 0.9, 0.15]} rotation={[0.3, -0.4, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color="#555555" />
        
        {/* Laptop screen */}
        <mesh position={[0, 0.1, 0]} rotation={[0.8, 0, 0]}>
          <boxGeometry args={[0.28, 0.18, 0.01]} />
          <meshStandardMaterial color="#88CCFF" />
        </mesh>
      </mesh>
      
      {/* Arms */}
      <mesh 
        ref={leftArmRef}
        position={[-0.45, 0.7, 0]}
        rotation={[0, 0, -Math.PI / 16]}
      >
        <boxGeometry args={[0.1, 0.6, 0.2]} />
        <meshStandardMaterial color="#FFE4C8" /> {/* Match skin tone */}
      </mesh>
      <mesh
        ref={rightArmRef}
        position={[0.45, 0.7, 0]}
        rotation={[0, 0, Math.PI / 16]}
      >
        <boxGeometry args={[0.1, 0.6, 0.2]} />
        <meshStandardMaterial color="#FFE4C8" /> {/* Match skin tone */}
      </mesh>
      
      {/* Legs - Slim, with pants */}
      <mesh
        ref={leftLegRef}
        position={[-0.2, 0.15, 0]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.6, 0.3]} />
        <meshStandardMaterial color="#2C2C44" /> {/* Dark jeans color */}
      </mesh>
      <mesh
        ref={rightLegRef}
        position={[0.2, 0.15, 0]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.6, 0.3]} />
        <meshStandardMaterial color="#2C2C44" /> {/* Dark jeans color */}
      </mesh>
      
      {/* Backpack - IT student essential */}
      <mesh position={[0, 0.7, -0.3]}>
        <boxGeometry args={[0.6, 0.7, 0.2]} />
        <meshStandardMaterial color="#D85C27" /> {/* Orange backpack */}
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
