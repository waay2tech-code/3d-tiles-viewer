import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';

const Lighting = ({ 
  intensity = 1, 
  color = '#ffffff', 
  position = [5, 10, 5], 
  showHelper = false,
  ambientIntensity = 0.3
}) => {
  const lightRef = useRef();

  // Conditionally show helper for debugging lighting
  useHelper(showHelper && lightRef, PointLightHelper, 1, 'white');

  return (
    <>
      {/* Ambient light for overall scene illumination */}
      <ambientLight 
        intensity={ambientIntensity} 
        color={color} 
      />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={intensity * 0.8}
        color={color}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-10, 15, -10]}
        intensity={intensity * 0.4}
        color={color}
      />
      
      {/* Point light for additional illumination */}
      <pointLight
        ref={lightRef}
        position={position}
        intensity={intensity}
        color={color}
        distance={30}
        decay={2}
      />
    </>
  );
};

export default Lighting;