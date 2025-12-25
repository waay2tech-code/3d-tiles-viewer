import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';

const Steps3D = () => {
  // Define realistic steps dimensions in mm (market standard)
  const roomWidth = 2000;   // 2m (standard width)
  const roomHeight = 1800;  // 1.8m (standard height)
  const roomDepth = 3000;   // 3m (standard depth)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create floor base with modern finish
  const floor = (
    <Box position={[0, -normalizedRoomHeight/2, 0]} args={[normalizedRoomWidth, 0.1, normalizedRoomDepth]}>
      <meshStandardMaterial color="#eceff1" roughness={0.3} metalness={0.6} />
    </Box>
  );

  // Steps elements with modern design
  const elements = [];
  
  // Create modern steps
  const stepHeight = 0.15; // 150mm per step
  const stepDepth = 0.3;   // 300mm per step
  const numberOfSteps = 5;
  
  // Create steps with tile color for consistency
  for (let i = 0; i < numberOfSteps; i++) {
    elements.push(
      <Box 
        key={`step-${i}`} 
        position={[0, -normalizedRoomHeight/2 + (i * stepHeight) + stepHeight/2, -(i * stepDepth) + (numberOfSteps * stepDepth)/2]} 
        args={[1, stepHeight, stepDepth]}
      >
        <meshStandardMaterial color="#4a90e2" roughness={0.2} metalness={0.1} />
      </Box>
    );
  }
  
  // Wall skirting with modern finish
  elements.push(
    <Box 
      key="skirting" 
      position={[0, -normalizedRoomHeight/2 + 0.05, -normalizedRoomDepth/2 + 0.02]} 
      args={[normalizedRoomWidth, 0.1, 0.04]}
    >
      <meshStandardMaterial color="#90a4ae" roughness={0.6} metalness={0.2} />
    </Box>
  );
  
  // Handrail posts with chrome finish
  for (let i = 0; i < numberOfSteps; i++) {
    elements.push(
      <Cylinder 
        key={`handrail-post-${i}`} 
        position={[0.4, -normalizedRoomHeight/2 + (i * stepHeight) + stepHeight + 0.4, -(i * stepDepth) + (numberOfSteps * stepDepth)/2]} 
        args={[0.02, 0.02, 0.8, 16]}
      >
        <meshStandardMaterial color="#eceff1" roughness={0.4} metalness={0.8} />
      </Cylinder>
    );
  }
  
  // Handrail with modern design
  elements.push(
    <Box 
      key="handrail" 
      position={[0.4, -normalizedRoomHeight/2 + numberOfSteps * stepHeight + 0.8, 0]} 
      args={[0.05, 0.05, normalizedRoomDepth]}
    >
      <meshStandardMaterial color="#eceff1" roughness={0.4} metalness={0.8} />
    </Box>
  );
  
  // Ambient lighting with modern LED
  elements.push(
    <Sphere 
      key="steps-light" 
      position={[0, 2, 0]} 
      args={[0.1, 8, 8]}
    >
      <meshStandardMaterial color="#e1f5fe" roughness={0.8} metalness={0.1} emissive="#80deea" emissiveIntensity={0.7} />
    </Sphere>
  );
  
  // Decorative step lighting with bright LEDs
  for (let i = 0; i < numberOfSteps; i++) {
    elements.push(
      <Box 
        key={`step-light-${i}`} 
        position={[0, -normalizedRoomHeight/2 + (i * stepHeight) + stepHeight - 0.01, -(i * stepDepth) + (numberOfSteps * stepDepth)/2]}
        args={[0.05, 0.01, 0.05]}
      >
        <meshStandardMaterial color="#bbdefb" roughness={0.8} metalness={0.2} emissive="#4fc3f7" emissiveIntensity={0.3} />
      </Box>
    );
  }

  return (
    <>
      {floor}
      {elements}
    </>
  );
};

export default Steps3D;