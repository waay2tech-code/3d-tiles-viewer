import React from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';

const Bedroom3D = () => {
  // Define realistic bedroom dimensions in mm (market standard)
  const roomWidth = 4000;   // 4m (standard bedroom width)
  const roomHeight = 2700;  // 2.7m (standard ceiling height)
  const roomDepth = 3600;   // 3.6m (standard depth)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create floor with modern finish
  const floor = (
    <Box position={[0, -normalizedRoomHeight/2, 0]} args={[normalizedRoomWidth, 0.1, normalizedRoomDepth]}>
      <meshStandardMaterial color="#f5f5f5" roughness={0.3} metalness={0.6} />
    </Box>
  );

  // Create walls with vibrant modern colors
  const walls = [];
  
  // Back wall with warm accent
  walls.push(
    <Box 
      key="back-wall" 
      position={[0, 0, -normalizedRoomDepth/2]} 
      args={[normalizedRoomWidth, normalizedRoomHeight, 0.1]}
    >
      <meshStandardMaterial color="#ffccbc" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Left wall with rich purple tone
  walls.push(
    <Box 
      key="left-wall" 
      position={[-normalizedRoomWidth/2, 0, 0]} 
      args={[0.1, normalizedRoomHeight, normalizedRoomDepth]}
    >
      <meshStandardMaterial color="#ce93d8" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Right wall with fresh aqua tone
  walls.push(
    <Box 
      key="right-wall" 
      position={[normalizedRoomWidth/2, 0, 0]} 
      args={[0.1, normalizedRoomHeight, normalizedRoomDepth]}
    >
      <meshStandardMaterial color="#80deea" roughness={0.4} metalness={0.1} />
    </Box>
  );

  // Bedroom elements
  const elements = [];
  
  // Bed base with modern design
  elements.push(
    <Box 
      key="bed-base" 
      position={[0, -normalizedRoomHeight/2 + 0.15, normalizedRoomDepth/2 - 1]} 
      args={[2, 0.3, 1.5]}
    >
      <meshStandardMaterial color="#7e57c2" roughness={0.4} metalness={0.2} />
    </Box>
  );
  
  // Bed mattress with luxurious finish
  elements.push(
    <Box 
      key="bed-mattress" 
      position={[0, -normalizedRoomHeight/2 + 0.3, normalizedRoomDepth/2 - 1]} 
      args={[1.9, 0.1, 1.4]}
    >
      <meshStandardMaterial color="#eceff1" roughness={0.8} metalness={0.1} />
    </Box>
  );
  
  // Bed headboard with vibrant color
  elements.push(
    <Box 
      key="headboard" 
      position={[0, -normalizedRoomHeight/2 + 0.6, normalizedRoomDepth/2 - 1.8]} 
      args={[2.2, 0.8, 0.1]}
    >
      <meshStandardMaterial color="#ff4081" roughness={0.5} metalness={0.2} />
    </Box>
  );
  
  // Decorative pillows with contrasting colors
  elements.push(
    <Box 
      key="pillow-1" 
      position={[-0.5, -normalizedRoomHeight/2 + 0.4, normalizedRoomDepth/2 - 1]} 
      args={[0.4, 0.15, 0.6]}
    >
      <meshStandardMaterial color="#40c4ff" roughness={0.7} metalness={0.1} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="pillow-2" 
      position={[0.5, -normalizedRoomHeight/2 + 0.4, normalizedRoomDepth/2 - 1]} 
      args={[0.4, 0.15, 0.6]}
    >
      <meshStandardMaterial color="#18ffff" roughness={0.7} metalness={0.1} />
    </Box>
  );
  
  // Wardrobe with modern finish
  elements.push(
    <Box 
      key="wardrobe" 
      position={[-normalizedRoomWidth/2 + 0.6, -normalizedRoomHeight/2 + 0.9, -normalizedRoomDepth/2 + 0.6]} 
      args={[1, 1.8, 1]}
    >
      <meshStandardMaterial color="#64b5f6" roughness={0.3} metalness={0.2} />
    </Box>
  );
  
  // Wardrobe decorative trim
  elements.push(
    <Box 
      key="wardrobe-trim" 
      position={[-normalizedRoomWidth/2 + 0.6, -normalizedRoomHeight/2 + 1.85, -normalizedRoomDepth/2 + 0.6]} 
      args={[1.1, 0.1, 1.1]}
    >
      <meshStandardMaterial color="#2196f3" roughness={0.5} metalness={0.3} />
    </Box>
  );
  
  // Wardrobe doors with modern handles
  elements.push(
    <Box 
      key="wardrobe-door-left" 
      position={[-normalizedRoomWidth/2 + 0.35, -normalizedRoomHeight/2 + 0.9, -normalizedRoomDepth/2 + 0.15]} 
      args={[0.45, 1.8, 0.02]}
    >
      <meshStandardMaterial color="#90caf9" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="wardrobe-door-right" 
      position={[-normalizedRoomWidth/2 + 0.85, -normalizedRoomHeight/2 + 0.9, -normalizedRoomDepth/2 + 0.15]} 
      args={[0.45, 1.8, 0.02]}
    >
      <meshStandardMaterial color="#90caf9" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Decorative wall art with geometric shapes
  elements.push(
    <Box 
      key="wall-art-1" 
      position={[-normalizedRoomWidth/2 + 0.06, 0.2, -0.5]} 
      args={[0.02, 0.6, 0.12]}
    >
      <meshStandardMaterial color="#ff4081" roughness={0.6} metalness={0.2} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="wall-art-2" 
      position={[0, normalizedRoomHeight/2 - 0.8, -normalizedRoomDepth/2 + 0.06]} 
      args={[1.2, 0.02, 0.02]}
    >
      <meshStandardMaterial color="#536dfe" roughness={0.6} metalness={0.2} />
    </Box>
  );
  
  // Nightstand with modern design
  elements.push(
    <Box 
      key="nightstand" 
      position={[1.2, -normalizedRoomHeight/2 + 0.35, normalizedRoomDepth/2 - 0.3]} 
      args={[0.5, 0.7, 0.4]}
    >
      <meshStandardMaterial color="#b0bec5" roughness={0.4} metalness={0.2} />
    </Box>
  );
  
  // Nightstand top with marble effect
  elements.push(
    <Box 
      key="nightstand-top" 
      position={[1.2, -normalizedRoomHeight/2 + 0.75, normalizedRoomDepth/2 - 0.3]} 
      args={[0.55, 0.02, 0.45]}
    >
      <meshStandardMaterial color="#cfd8dc" roughness={0.6} metalness={0.1} />
    </Box>
  );
  
  // Nightstand drawer handles
  elements.push(
    <Box 
      key="nightstand-handle-1" 
      position={[1.4, -normalizedRoomHeight/2 + 0.25, normalizedRoomDepth/2 - 0.12]} 
      args={[0.02, 0.05, 0.02]}
    >
      <meshStandardMaterial color="#455a64" roughness={0.7} metalness={0.3} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="nightstand-handle-2" 
      position={[1.4, -normalizedRoomHeight/2 + 0.45, normalizedRoomDepth/2 - 0.12]} 
      args={[0.02, 0.05, 0.02]}
    >
      <meshStandardMaterial color="#455a64" roughness={0.7} metalness={0.3} />
    </Box>
  );
  
  // Table lamp with modern design
  elements.push(
    <Cylinder 
      key="lamp-base" 
      position={[1.2, -normalizedRoomHeight/2 + 0.75, normalizedRoomDepth/2 - 0.3]} 
      args={[0.03, 0.03, 0.3, 16]}
    >
      <meshStandardMaterial color="#ffd54f" roughness={0.2} metalness={0.8} />
    </Cylinder>
  );
  
  elements.push(
    <Sphere 
      key="lamp-shade" 
      position={[1.2, -normalizedRoomHeight/2 + 0.95, normalizedRoomDepth/2 - 0.3]} 
      args={[0.1, 16, 16]}
    >
      <meshStandardMaterial color="#ffecb3" roughness={0.8} metalness={0.1} emissive="#ffd54f" emissiveIntensity={0.6} />
    </Sphere>
  );
  
  // Decorative bedside plant
  elements.push(
    <Cylinder 
      key="plant-pot" 
      position={[1.2, -normalizedRoomHeight/2 + 0.8, normalizedRoomDepth/2 - 0.6]} 
      args={[0.08, 0.08, 0.1, 16]}
    >
      <meshStandardMaterial color="#81c784" roughness={0.4} metalness={0.2} />
    </Cylinder>
  );
  
  elements.push(
    <Cylinder 
      key="plant-leaves" 
      position={[1.2, -normalizedRoomHeight/2 + 1.1, normalizedRoomDepth/2 - 0.6]} 
      args={[0.15, 0, 0.3, 8]}
    >
      <meshStandardMaterial color="#4caf50" roughness={0.6} metalness={0.1} />
    </Cylinder>
  );
  
  // Soft ambient lighting with warm glow
  elements.push(
    <Sphere 
      key="ambient-light" 
      position={[0, normalizedRoomHeight/2 - 0.2, 0]} 
      args={[0.1, 8, 8]}
    >
      <meshStandardMaterial color="#ffccbc" roughness={0.8} metalness={0.1} emissive="#ffab91" emissiveIntensity={0.2} />
    </Sphere>
  );
  
  // Decorative ceiling light with modern design
  elements.push(
    <Sphere 
      key="ceiling-light" 
      position={[0, normalizedRoomHeight/2 - 0.05, 0]} 
      args={[0.15, 16, 16]}
    >
      <meshStandardMaterial color="#ffecb3" roughness={0.8} metalness={0.1} emissive="#ffd54f" emissiveIntensity={0.3} />
    </Sphere>
  );

  return (
    <>
      {floor}
      {walls}
      {elements}
    </>
  );
};

export default Bedroom3D;