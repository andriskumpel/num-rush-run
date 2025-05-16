
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Character3DModelProps {
  isRunning: boolean;
}

const Character3DModel: React.FC<Character3DModelProps> = ({ isRunning }) => {
  const bodyRef = useRef<any>(null);
  const leftLegRef = useRef<any>(null);
  const rightLegRef = useRef<any>(null);
  const leftArmRef = useRef<any>(null);
  const rightArmRef = useRef<any>(null);
  const laptopRef = useRef<any>(null);
  const headRef = useRef<any>(null);
  const backpackRef = useRef<any>(null);
  
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

    // Head slight bob
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 5) * 0.03;
    }

    // Laptop bobbing slightly out of sync with body
    if (laptopRef.current) {
      laptopRef.current.position.y = Math.sin(t * 10 + 0.5) * 0.02;
    }
    
    // Backpack bobbing
    if (backpackRef.current) {
      backpackRef.current.position.y = Math.sin(t * 10 + 0.2) * 0.03;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Body - University hoodie */}
      <mesh ref={bodyRef} position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 0.9, 0.5]} />
        <meshStandardMaterial color="#3C3744" /> {/* Dark navy blue for university hoodie */}
      </mesh>
      
      {/* University logo on hoodie */}
      <mesh position={[0, 0.7, 0.26]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Head - with university student details */}
      <group position={[0, 1.4, 0]} ref={headRef}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#FFE4C8" /> {/* Soft skin tone */}
        </mesh>
        
        {/* Hair - Trendy university student style */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.43, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#5A3825" /> {/* Brown hair */}
        </mesh>
        
        {/* Bangs */}
        <mesh position={[0, 0.2, 0.2]}>
          <boxGeometry args={[0.8, 0.2, 0.3]} />
          <meshStandardMaterial color="#5A3825" /> {/* Match hair color */}
        </mesh>
        
        {/* Enhanced facial features */}
        
        {/* Eyes with eyebrows */}
        <mesh position={[0.12, 0.05, 0.35]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[-0.12, 0.05, 0.35]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Eyebrows */}
        <mesh position={[0.12, 0.15, 0.38]} rotation={[0, 0, Math.PI/6]}>
          <boxGeometry args={[0.1, 0.02, 0.01]} />
          <meshStandardMaterial color="#3A2517" /> {/* Dark brown */}
        </mesh>
        <mesh position={[-0.12, 0.15, 0.38]} rotation={[0, 0, -Math.PI/6]}>
          <boxGeometry args={[0.1, 0.02, 0.01]} />
          <meshStandardMaterial color="#3A2517" /> {/* Dark brown */}
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, -0.05, 0.4]}>
          <coneGeometry args={[0.05, 0.1, 4]} />
          <meshStandardMaterial color="#FFDEC0" /> {/* Slightly darker than skin */}
        </mesh>
        
        {/* Mouth */}
        <mesh position={[0, -0.15, 0.35]} rotation={[Math.PI/2, 0, 0]}>
          <planeGeometry args={[0.1, 0.03]} />
          <meshStandardMaterial color="#A55050" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Ears */}
        <mesh position={[0.4, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FFE4C8" /> {/* Match skin tone */}
        </mesh>
        <mesh position={[-0.4, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FFE4C8" /> {/* Match skin tone */}
        </mesh>
        
        {/* Glasses - Student classic */}
        <mesh position={[0, 0.05, 0.38]}>
          <torusGeometry args={[0.12, 0.02, 8, 20]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        <mesh position={[0.12, 0.05, 0.38]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        
        {/* Headphones - Must have for university students */}
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.42, 0.05, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
      
      {/* Laptop - Essential university student tool */}
      <mesh ref={laptopRef} position={[0.35, 0.9, 0.15]} rotation={[0.3, -0.4, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color="#555555" />
        
        {/* Laptop screen with code on it */}
        <mesh position={[0, 0.1, 0]} rotation={[0.8, 0, 0]}>
          <boxGeometry args={[0.28, 0.18, 0.01]} />
          <meshStandardMaterial color="#88CCFF" />
          
          {/* Code lines on screen */}
          <mesh position={[0, 0.02, 0.01]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.25, 0.14]} />
            <meshStandardMaterial color="#333333" opacity={0.8} transparent />
          </mesh>
        </mesh>
        
        {/* Laptop stickers - classic student decoration */}
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[0.28, 0.18]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </mesh>
      
      {/* Coffee cup - University student essential */}
      <mesh position={[-0.25, 0.9, 0.15]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.04, 0.15, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
        
        {/* Coffee */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} />
          <meshStandardMaterial color="#6F4E37" />
        </mesh>
      </mesh>
      
      {/* Arms with university sweatshirt */}
      <mesh 
        ref={leftArmRef}
        position={[-0.45, 0.7, 0]}
        rotation={[0, 0, -Math.PI / 16]}
      >
        <boxGeometry args={[0.1, 0.6, 0.2]} />
        <meshStandardMaterial color="#3C3744" /> {/* Match hoodie color */}
      </mesh>
      <mesh
        ref={rightArmRef}
        position={[0.45, 0.7, 0]}
        rotation={[0, 0, Math.PI / 16]}
      >
        <boxGeometry args={[0.1, 0.6, 0.2]} />
        <meshStandardMaterial color="#3C3744" /> {/* Match hoodie color */}
      </mesh>
      
      {/* Hand with smartphone - University student necessity */}
      <mesh position={[-0.45, 0.4, 0.15]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.12, 0.2, 0.05]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Legs - Jeans, university student classic */}
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
      
      {/* Shoes - Trendy sneakers */}
      <mesh position={[-0.2, -0.2, 0.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.2, -0.2, 0.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Backpack - University student essential */}
      <mesh ref={backpackRef} position={[0, 0.7, -0.3]}>
        <boxGeometry args={[0.6, 0.7, 0.2]} />
        <meshStandardMaterial color="#D85C27" /> {/* Orange university backpack */}
        
        {/* Backpack pocket */}
        <mesh position={[0, -0.2, 0.15]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshStandardMaterial color="#B14B21" /> {/* Darker orange for pocket */}
        </mesh>
        
        {/* Backpack straps */}
        <mesh position={[-0.25, 0.1, 0.3]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.1, 0.5, 0.05]} />
          <meshStandardMaterial color="#B14B21" />
        </mesh>
        <mesh position={[0.25, 0.1, 0.3]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.1, 0.5, 0.05]} />
          <meshStandardMaterial color="#B14B21" />
        </mesh>
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
