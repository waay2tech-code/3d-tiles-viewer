import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';

const Parking3D = () => {
  // Define realistic parking area dimensions in mm (market standard)
  const roomWidth = 6000;   // 6m (standard parking width)
  const roomHeight = 100;   // 100mm (floor thickness)
  const roomDepth = 5000;   // 5m (standard parking depth)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create floor with modern concrete texture
  const floor = (
    <Box position={[0, -normalizedRoomHeight/2, 0]} args={[normalizedRoomWidth, 0.1, normalizedRoomDepth]}>
      <meshStandardMaterial color="#cfd8dc" roughness={0.3} metalness={0.6} />
    </Box>
  );

  // Parking elements with modern design
  const elements = [];
  
  // Modern parking lines with vibrant color
  for (let i = 0; i < 3; i++) {
    elements.push(
      <Box 
        key={`parking-line-${i}`} 
        position={[i * 1.5 - 1.5, -normalizedRoomHeight/2 + 0.01, 0]} 
        args={[0.1, 0.01, normalizedRoomDepth]}
      >
        <meshStandardMaterial color="#4fc3f7" roughness={0.8} metalness={0.2} />
      </Box>
    );
  }
  
  // Modern parking signage with LED effect
  elements.push(
    <Box 
      key="parking-sign-1" 
      position={[-2, -normalizedRoomHeight/2 + 0.5, normalizedRoomDepth/2 - 0.1]} 
      args={[0.1, 0.3, 0.02]}
    >
      <meshStandardMaterial color="#69f0ae" roughness={0.6} metalness={0.4} emissive="#00e676" emissiveIntensity={0.2} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="parking-sign-2" 
      position={[2, -normalizedRoomHeight/2 + 0.5, normalizedRoomDepth/2 - 0.1]} 
      args={[0.1, 0.3, 0.02]}
    >
      <meshStandardMaterial color="#69f0ae" roughness={0.6} metalness={0.4} emissive="#00e676" emissiveIntensity={0.2} />
    </Box>
  );
  
  // Weathering effects (stains) with subtle coloring
  for (let i = 0; i < 5; i++) {
    elements.push(
      <Box 
        key={`stain-${i}`} 
        position={[
          (Math.random() - 0.5) * (normalizedRoomWidth - 0.5),
          -normalizedRoomHeight/2 + 0.02,
          (Math.random() - 0.5) * (normalizedRoomDepth - 0.5)
        ]} 
        args={[0.2 + Math.random() * 0.3, 0.01, 0.2 + Math.random() * 0.3]}
      >
        <meshStandardMaterial color="#b0bec5" roughness={0.9} metalness={0.1} />
      </Box>
    );
  }
  
  // Modern parking barriers with reflective strips
  elements.push(
    <Box 
      key="barrier-1" 
      position={[-2, -normalizedRoomHeight/2 + 0.2, -normalizedRoomDepth/2 + 0.1]} 
      args={[0.1, 0.4, 0.1]}
    >
      <meshStandardMaterial color="#f44336" roughness={0.5} metalness={0.5} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="barrier-2" 
      position={[2, -normalizedRoomHeight/2 + 0.2, -normalizedRoomDepth/2 + 0.1]} 
      args={[0.1, 0.4, 0.1]}
    >
      <meshStandardMaterial color="#f44336" roughness={0.5} metalness={0.5} />
    </Box>
  );
  
  // Outdoor lighting simulation with modern LED
  elements.push(
    <Sphere 
      key="sun-light" 
      position={[3, 5, 3]} 
      args={[0.2, 8, 8]}
    >
      <meshStandardMaterial color="#ffecb3" roughness={0.8} metalness={0.1} emissive="#ffd54f" emissiveIntensity={0.8} />
    </Sphere>
  );
  
  // Modern LED parking lights with bright illumination
  elements.push(
    <Box 
      key="led-light-1" 
      position={[-1.5, normalizedRoomHeight/2 - 0.1, 0]} 
      args={[0.1, 0.02, 0.1]}
    >
      <meshStandardMaterial color="#bbdefb" roughness={0.8} metalness={0.2} emissive="#4fc3f7" emissiveIntensity={0.3} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="led-light-2" 
      position={[1.5, normalizedRoomHeight/2 - 0.1, 0]} 
      args={[0.1, 0.02, 0.1]}
    >
      <meshStandardMaterial color="#bbdefb" roughness={0.8} metalness={0.2} emissive="#4fc3f7" emissiveIntensity={0.3} />
    </Box>
  );

  return (
    <>
      {floor}
      {elements}
    </>
  );
};

export default Parking3D;