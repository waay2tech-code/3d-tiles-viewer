import React from 'react';
import { Box, Cylinder, Text } from '@react-three/drei';

const Bathroom3D = () => {
  // Define realistic bathroom dimensions in mm (market standard)
  const roomWidth = 3000;   // 3m (standard bathroom width)
  const roomHeight = 2700;  // 2.7m (standard ceiling height)
  const roomDepth = 2500;   // 2.5m (standard depth)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create floor with modern anti-skid texture
  const floor = (
    <Box position={[0, -normalizedRoomHeight/2, 0]} args={[normalizedRoomWidth, 0.1, normalizedRoomDepth]}>
      <meshStandardMaterial color="#bbdefb" roughness={0.3} metalness={0.6} />
    </Box>
  );

  // Create walls with vibrant modern colors and openings for better visibility
  const walls = [];
  
  // Back wall with light reflective tone for better tile visibility
  walls.push(
    <Box 
      key="back-wall-full" 
      position={[0, 0, -normalizedRoomDepth/2]} 
      args={[normalizedRoomWidth, normalizedRoomHeight, 0.1]}
    >
      <meshStandardMaterial color="#e1f5fe" roughness={0.3} metalness={0.2} />
    </Box>
  );
  
  // Window opening in back wall
  walls.push(
    <Box 
      key="back-wall-window" 
      position={[0, 0.5, -normalizedRoomDepth/2 + 0.06]} 
      args={[0.8, 1.2, 0.12]}
    >
      <meshStandardMaterial color="#e1f5fe" roughness={0.2} metalness={0.8} transparent opacity={0.4} />
    </Box>
  );
  
  // Left wall with soft purple tone (partial wall for better visibility)
  walls.push(
    <Box 
      key="left-wall-partial" 
      position={[-normalizedRoomWidth/2, 0, -normalizedRoomDepth/3]} 
      args={[0.1, normalizedRoomHeight, normalizedRoomDepth*2/3]}
    >
      <meshStandardMaterial color="#f3e5f5" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Right wall with soft green tone (partial wall for better visibility)
  walls.push(
    <Box 
      key="right-wall-partial" 
      position={[normalizedRoomWidth/2, 0, -normalizedRoomDepth/3]} 
      args={[0.1, normalizedRoomHeight, normalizedRoomDepth*2/3]}
    >
      <meshStandardMaterial color="#c8e6c9" roughness={0.4} metalness={0.1} />
    </Box>
  );
  
  // Open doorway in left wall (removed glass door for better tile reflection)
  walls.push(
    <Box 
      key="left-wall-doorway" 
      position={[-normalizedRoomWidth/2 + 0.06, -0.6, normalizedRoomDepth/2 - 0.5]} 
      args={[0.12, 1.2, 0.8]}
    >
      <meshStandardMaterial color="#f3e5f5" roughness={0.4} metalness={0.1} transparent opacity={0.4} />
    </Box>
  );

  // Bathroom elements with modern vibrant colors
  const elements = [];
  
  // Bathtub with light modern acrylic finish
  elements.push(
    <Box 
      key="bathtub" 
      position={[0.5, -normalizedRoomHeight/2 + 0.25, -normalizedRoomDepth/2 + 1]} 
      args={[1.7, 0.5, 0.7]}
    >
      <meshStandardMaterial color="#b3e5fc" roughness={0.3} metalness={0.4} />
    </Box>
  );
  
  // Washbasin vanity with light modern storage
  elements.push(
    <Box 
      key="vanity" 
      position={[-normalizedRoomWidth/2 + 0.4, -normalizedRoomHeight/2 + 0.4, -normalizedRoomDepth/2 + 0.3]} 
      args={[0.8, 0.8, 0.5]}
    >
      <meshStandardMaterial color="#e1bee7" roughness={0.4} metalness={0.2} />
    </Box>
  );
  
  // Sink on vanity with ceramic finish
  elements.push(
    <Cylinder 
      key="sink" 
      position={[-normalizedRoomWidth/2 + 0.4, -normalizedRoomHeight/2 + 0.85, -normalizedRoomDepth/2 + 0.3]} 
      args={[0.15, 0.15, 0.1, 32]}
    >
      <meshStandardMaterial color="#fafafa" roughness={0.7} metalness={0.1} />
    </Cylinder>
  );
  
  // Wall-mounted WC with light modern design
  elements.push(
    <Box 
      key="wc" 
      position={[normalizedRoomWidth/2 - 0.3, -normalizedRoomHeight/2 + 0.3, normalizedRoomDepth/2 - 0.5]} 
      args={[0.4, 0.6, 0.5]}
    >
      <meshStandardMaterial color="#ffecb3" roughness={0.4} metalness={0.2} />
    </Box>
  );
  
  // Toilet seat with light color for better reflection
  elements.push(
    <Box 
      key="toilet-seat" 
      position={[normalizedRoomWidth/2 - 0.3, -normalizedRoomHeight/2 + 0.65, normalizedRoomDepth/2 - 0.5]} 
      args={[0.45, 0.02, 0.4]}
    >
      <meshStandardMaterial color="#fff9c4" roughness={0.7} metalness={0.2} />
    </Box>
  );
  
  // Chrome fixtures with polished finish
  elements.push(
    <Cylinder 
      key="faucet" 
      position={[-normalizedRoomWidth/2 + 0.4, -normalizedRoomHeight/2 + 0.95, -normalizedRoomDepth/2 + 0.3]} 
      args={[0.01, 0.01, 0.1, 16]}
    >
      <meshStandardMaterial color="#ffd54f" roughness={0.2} metalness={0.8} />
    </Cylinder>
  );
  
  // LED lighting strips with bright illumination
  elements.push(
    <Box 
      key="led-light-1" 
      position={[0, normalizedRoomHeight/2 - 0.05, -normalizedRoomDepth/2 + 0.1]} 
      args={[normalizedRoomWidth - 0.2, 0.01, 0.05]}
    >
      <meshStandardMaterial color="#e1f5fe" roughness={0.8} metalness={0.1} emissive="#80deea" emissiveIntensity={0.7} />
    </Box>
  );
  
  elements.push(
    <Box 
      key="led-light-2" 
      position={[0, normalizedRoomHeight/2 - 0.05, normalizedRoomDepth/2 - 0.1]} 
      args={[normalizedRoomWidth - 0.2, 0.01, 0.05]}
    >
      <meshStandardMaterial color="#e1f5fe" roughness={0.8} metalness={0.1} emissive="#80deea" emissiveIntensity={0.7} />
    </Box>
  );
  
  // Modern geometric wall art
  // Vertical accent panel on left wall
  elements.push(
    <Box 
      key="wall-accent-1" 
      position={[-normalizedRoomWidth/2 + 0.06, 0.2, -0.5]} 
      args={[0.02, 0.6, 0.12]}
    >
      <meshStandardMaterial color="#ff4081" roughness={0.6} metalness={0.2} />
    </Box>
  );
  
  // Horizontal accent stripe on back wall
  elements.push(
    <Box 
      key="wall-accent-2" 
      position={[0, -normalizedRoomHeight/2 + 0.8, -normalizedRoomDepth/2 + 0.06]} 
      args={[1.8, 0.02, 0.02]}
    >
      <meshStandardMaterial color="#536dfe" roughness={0.6} metalness={0.2} />
    </Box>
  );
  
  // Decorative circular element
  elements.push(
    <Cylinder 
      key="wall-decor-circle" 
      position={[0.8, 0.5, -normalizedRoomDepth/2 + 0.06]} 
      args={[0.15, 0.15, 0.02, 32]}
    >
      <meshStandardMaterial color="#69f0ae" roughness={0.5} metalness={0.3} />
    </Cylinder>
  );

  return (
    <>
      {floor}
      {walls}
      {elements}
    </>
  );
};

export default Bathroom3D;