import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';

const Kitchen3D = () => {
  // Define realistic kitchen dimensions in mm (market standard)
  const roomWidth = 3600;   // 3.6m (standard kitchen width)
  const roomHeight = 2700;  // 2.7m (standard ceiling height)
  const roomDepth = 3000;   // 3m (standard depth)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create floor with modern textured finish
  const floor = (
    <Box position={[0, -normalizedRoomHeight/2, 0]} args={[normalizedRoomWidth, 0.1, normalizedRoomDepth]}>
      <meshStandardMaterial color="#bbdefb" roughness={0.3} metalness={0.6} />
    </Box>
  );

  // Create walls with modern textured finishes
  const walls = [];
  
  // Back wall with warm modern tone
  walls.push(
    <Box 
      key="back-wall" 
      position={[0, 0, -normalizedRoomDepth/2]} 
      args={[normalizedRoomWidth, normalizedRoomHeight, 0.1]}
    >
      <meshStandardMaterial color="#ffd54f" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Left wall with soft pastel tone
  walls.push(
    <Box 
      key="left-wall" 
      position={[-normalizedRoomWidth/2, 0, 0]} 
      args={[0.1, normalizedRoomHeight, normalizedRoomDepth]}
    >
      <meshStandardMaterial color="#ce93d8" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Right wall with cool modern tone
  walls.push(
    <Box 
      key="right-wall" 
      position={[normalizedRoomWidth/2, 0, 0]} 
      args={[0.1, normalizedRoomHeight, normalizedRoomDepth]}
    >
      <meshStandardMaterial color="#4fc3f7" roughness={0.4} metalness={0.1} />
    </Box>
  );

  // Kitchen elements
  const elements = [];
  
  // Granite countertop
  elements.push(
    <Box 
      key="countertop" 
      position={[0, -normalizedRoomHeight/2 + 0.45, -normalizedRoomDepth/2 + 0.3]} 
      args={[normalizedRoomWidth - 0.4, 0.05, 0.6]}
    >
      <meshStandardMaterial color="#8d6e63" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Modern kitchen backsplash with vibrant color
  elements.push(
    <Box 
      key="backsplash" 
      position={[0, normalizedRoomHeight/2 - 1.2, -normalizedRoomDepth/2 + 0.06]} 
      args={[normalizedRoomWidth - 0.5, 0.8, 0.02]}
    >
      <meshStandardMaterial color="#64ffda" roughness={0.3} metalness={0.6} />
    </Box>
  );
  
  // Decorative kitchen island with modern finish
  elements.push(
    <Box 
      key="kitchen-island" 
      position={[0, -normalizedRoomHeight/2 + 0.4, 0]} 
      args={[1.2, 0.8, 0.8]}
    >
      <meshStandardMaterial color="#7e57c2" roughness={0.5} metalness={0.3} />
    </Box>
  );
  
  // Island countertop with marble effect
  elements.push(
    <Box 
      key="island-top" 
      position={[0, -normalizedRoomHeight/2 + 0.85, 0]} 
      args={[1.3, 0.05, 0.9]}
    >
      <meshStandardMaterial color="#eceff1" roughness={0.7} metalness={0.2} />
    </Box>
  );
  
  // Decorative pendant lights with modern design
  elements.push(
    <Sphere 
      key="pendant-light-1" 
      position={[-0.8, normalizedRoomHeight/2 - 0.4, 0]} 
      args={[0.1, 16, 16]}
    >
      <meshStandardMaterial color="#ff4081" roughness={0.9} metalness={0.1} emissive="#f50057" emissiveIntensity={0.3} />
    </Sphere>
  );
  
  elements.push(
    <Sphere 
      key="pendant-light-2" 
      position={[0.8, normalizedRoomHeight/2 - 0.4, 0]} 
      args={[0.1, 16, 16]}
    >
      <meshStandardMaterial color="#ff4081" roughness={0.9} metalness={0.1} emissive="#f50057" emissiveIntensity={0.3} />
    </Sphere>
  );
  
  // Kitchen cabinets below with modern color
  elements.push(
    <Box 
      key="cabinets-below" 
      position={[0, -normalizedRoomHeight/2 + 0.2, -normalizedRoomDepth/2 + 0.3]} 
      args={[normalizedRoomWidth - 0.4, 0.4, 0.6]}
    >
      <meshStandardMaterial color="#5c6bc0" roughness={0.5} metalness={0.2} />
    </Box>
  );
  
  // Kitchen cabinets above with contrasting color
  elements.push(
    <Box 
      key="cabinets-above" 
      position={[0, normalizedRoomHeight/2 - 0.6, -normalizedRoomDepth/2 + 0.15]} 
      args={[normalizedRoomWidth - 0.4, 1.2, 0.3]}
    >
      <meshStandardMaterial color="#3949ab" roughness={0.5} metalness={0.2} />
    </Box>
  );
  
  // Gas stove with modern finish
  elements.push(
    <Box 
      key="stove" 
      position={[-0.5, -normalizedRoomHeight/2 + 0.5, -normalizedRoomDepth/2 + 0.31]} 
      args={[0.6, 0.02, 0.5]}
    >
      <meshStandardMaterial color="#37474f" roughness={0.7} metalness={0.8} />
    </Box>
  );
  
  // Stove burners with glowing effect
  for (let i = 0; i < 4; i++) {
    const row = Math.floor(i / 2);
    const col = i % 2;
    elements.push(
      <Cylinder 
        key={`burner-${i}`} 
        position={[-0.5 + (col - 0.5) * 0.2, -normalizedRoomHeight/2 + 0.52, -normalizedRoomDepth/2 + 0.31 + (row - 0.5) * 0.2]} 
        args={[0.03, 0.03, 0.01, 16]}
      >
        <meshStandardMaterial color="#ff5252" roughness={0.9} metalness={0.8} emissive="#ff1744" emissiveIntensity={0.2} />
      </Cylinder>
    );
  }
  
  // Kitchen sink with stainless steel effect
  elements.push(
    <Box 
      key="sink" 
      position={[0.5, -normalizedRoomHeight/2 + 0.5, -normalizedRoomDepth/2 + 0.31]} 
      args={[0.5, 0.02, 0.4]}
    >
      <meshStandardMaterial color="#eceff1" roughness={0.2} metalness={0.8} />
    </Box>
  );
  
  // Sink faucet with chrome finish
  elements.push(
    <Cylinder 
      key="sink-faucet" 
      position={[0.65, -normalizedRoomHeight/2 + 0.6, -normalizedRoomDepth/2 + 0.31]} 
      args={[0.01, 0.01, 0.2, 16]}
    >
      <meshStandardMaterial color="#b0bec5" roughness={0.1} metalness={0.9} />
    </Cylinder>
  );
  
  // Chimney hood with modern design
  elements.push(
    <Box 
      key="chimney" 
      position={[0, normalizedRoomHeight/2 - 0.3, -normalizedRoomDepth/2 + 0.06]} 
      args={[1, 0.5, 0.3]}
    >
      <meshStandardMaterial color="#546e7a" roughness={0.6} metalness={0.4} />
    </Box>
  );
  
  // Under-cabinet LED lighting with bright effect
  elements.push(
    <Box 
      key="under-cabinet-led" 
      position={[0, -normalizedRoomHeight/2 + 0.46, -normalizedRoomDepth/2 + 0.05]} 
      args={[normalizedRoomWidth - 0.5, 0.01, 0.02]}
    >
      <meshStandardMaterial color="#64ffda" roughness={0.9} metalness={0.1} emissive="#00e5ff" emissiveIntensity={0.3} />
    </Box>
  );
  
  // Refrigerator with modern stainless steel finish
  elements.push(
    <Box 
      key="fridge" 
      position={[-normalizedRoomWidth/2 + 0.4, -normalizedRoomHeight/2 + 0.9, normalizedRoomDepth/2 - 0.4]} 
      args={[0.7, 1.8, 0.7]}
    >
      <meshStandardMaterial color="#cfd8dc" roughness={0.2} metalness={0.7} />
    </Box>
  );
  
  // Refrigerator handle with contrasting color
  elements.push(
    <Box 
      key="fridge-handle" 
      position={[-normalizedRoomWidth/2 + 0.78, -normalizedRoomHeight/2 + 0.9, normalizedRoomDepth/2 - 0.4]} 
      args={[0.02, 0.8, 0.02]}
    >
      <meshStandardMaterial color="#455a64" roughness={0.8} metalness={0.3} />
    </Box>
  );

  return (
    <>
      {floor}
      {walls}
      {elements}
    </>
  );
};

export default Kitchen3D;