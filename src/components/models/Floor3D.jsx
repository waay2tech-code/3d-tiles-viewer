import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';

const Floor3D = () => {
  // Define realistic floor dimensions in mm (market standard)
  const roomWidth = 6000;   // 6m (standard showroom width)
  const roomHeight = 100;   // 100mm (floor thickness)
  const roomDepth = 4500;   // 4.5m (standard showroom depth)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create floor with modern materials
  const floor = (
    <Box position={[0, -normalizedRoomHeight/2, 0]} args={[normalizedRoomWidth, 0.1, normalizedRoomDepth]}>
      <meshStandardMaterial color="#eceff1" roughness={0.3} metalness={0.6} />
    </Box>
  );

  // Floor elements
  const elements = [];
  
  // Showroom lighting
  elements.push(
    <Sphere 
      key="showroom-light-1" 
      position={[-1, 3, -1]} 
      args={[0.1, 8, 8]}
    >
      <meshStandardMaterial color="#f3e5f5" roughness={0.9} metalness={0.1} emissive="#e1bee7" emissiveIntensity={0.3} />
    </Sphere>
  );
  
  elements.push(
    <Sphere 
      key="showroom-light-2" 
      position={[1, 3, 1]} 
      args={[0.1, 8, 8]}
    >
      <meshStandardMaterial color="#f3e5f5" roughness={0.9} metalness={0.1} emissive="#e1bee7" emissiveIntensity={0.3} />
    </Sphere>
  );
  
  // Decorative ceiling elements
  elements.push(
    <Box 
      key="ceiling-panel-1" 
      position={[-1, normalizedRoomHeight/2 - 0.05, -1]} 
      args={[0.8, 0.02, 0.8]}
    >
      <meshStandardMaterial color="#bbdefb" roughness={0.7} metalness={0.3} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="ceiling-panel-2" 
      position={[1, normalizedRoomHeight/2 - 0.05, 1]} 
      args={[0.8, 0.02, 0.8]}
    >
      <meshStandardMaterial color="#bbdefb" roughness={0.7} metalness={0.3} />
    </Box>
  );
  
  // Display pedestals
  elements.push(
    <Cylinder 
      key="pedestal-1" 
      position={[-1.5, -normalizedRoomHeight/2 + 0.3, -1]} 
      args={[0.1, 0.1, 0.6, 16]}
    >
      <meshStandardMaterial color="#90a4ae" roughness={0.5} metalness={0.4} />
    </Cylinder>
  );
  
  elements.push(
    <Cylinder 
      key="pedestal-2" 
      position={[1.5, -normalizedRoomHeight/2 + 0.3, 1]} 
      args={[0.1, 0.1, 0.6, 16]}
    >
      <meshStandardMaterial color="#90a4ae" roughness={0.5} metalness={0.4} />
    </Cylinder>
  );
  
  // Decorative showcase displays
  elements.push(
    <Box 
      key="display-case-1" 
      position={[-1.5, -normalizedRoomHeight/2 + 0.65, -1]} 
      args={[0.4, 0.1, 0.4]}
    >
      <meshStandardMaterial color="#e0f2f1" roughness={0.8} metalness={0.1} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="display-case-2" 
      position={[1.5, -normalizedRoomHeight/2 + 0.65, 1]} 
      args={[0.4, 0.1, 0.4]}
    >
      <meshStandardMaterial color="#e0f2f1" roughness={0.8} metalness={0.1} />
    </Box>
  );

  return (
    <>
      {floor}
      {elements}
    </>
  );
};

export default Floor3D;