import React from 'react';
import { Box, Cylinder, Sphere, Text } from '@react-three/drei';

const Elevation3D = () => {
  // Define realistic elevation dimensions in mm (market standard residential dimensions)
  const roomWidth = 4000;   // 4m (standard room width)
  const roomHeight = 3000;  // 3m (standard ceiling height)
  const roomDepth = 300;    // 300mm (standard wall thickness)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create structural wall with realistic concrete texture
  const wall = (
    <Box position={[0, 0, 0]} args={[normalizedRoomWidth, normalizedRoomHeight, normalizedRoomDepth]}>
      <meshStandardMaterial color="#a1887f" roughness={0.8} metalness={0.05} />
    </Box>
  );

  // Professional elevation elements with architectural accuracy
  const elements = [];
  
  // Professional entry door with realistic proportions
  elements.push(
    <Box key="entry-door-frame" position={[0, -0.7, normalizedRoomDepth/2 - 0.02]} args={[0.9, 2, 0.08]}>
      <meshStandardMaterial color="#5d4037" roughness={0.6} metalness={0.2} />
    </Box>
  );
  
  elements.push(
    <Box key="entry-door" position={[0, -0.7, normalizedRoomDepth/2 + 0.03]} args={[0.8, 1.9, 0.02]}>
      <meshStandardMaterial color="#8d6e63" roughness={0.6} metalness={0.2} />
    </Box>
  );
  
  // Door hardware with realistic details
  elements.push(
    <Cylinder key="door-knob" position={[0.3, -0.7, normalizedRoomDepth/2 + 0.04]} args={[0.03, 0.03, 0.01, 16]}>
      <meshStandardMaterial color="#ffd54f" roughness={0.4} metalness={0.6} />
    </Cylinder>
  );
  
  elements.push(
    <Box key="door-letterbox" position={[0, -0.95, normalizedRoomDepth/2 + 0.04]} args={[0.15, 0.01, 0.02]}>
      <meshStandardMaterial color="#bdbdbd" roughness={0.8} metalness={0.3} />
    </Box>
  );
  
  // Architectural facade details for market standard appearance
  // Decorative horizontal bands
  elements.push(
    <Box key="decorative-band-top" position={[0, 1, normalizedRoomDepth/2 - 0.01]} args={[normalizedRoomWidth, 0.05, 0.05]}>
      <meshStandardMaterial color="#5d4037" roughness={0.7} metalness={0.2} />
    </Box>
  );
  
  elements.push(
    <Box key="decorative-band-middle" position={[0, 0, normalizedRoomDepth/2 - 0.01]} args={[normalizedRoomWidth, 0.05, 0.05]}>
      <meshStandardMaterial color="#5d4037" roughness={0.7} metalness={0.2} />
    </Box>
  );
  
  elements.push(
    <Box key="decorative-band-bottom" position={[0, -1, normalizedRoomDepth/2 - 0.01]} args={[normalizedRoomWidth, 0.05, 0.05]}>
      <meshStandardMaterial color="#5d4037" roughness={0.7} metalness={0.2} />
    </Box>
  );
  
  // Cornice at roof line
  elements.push(
    <Box key="cornice" position={[0, normalizedRoomHeight/2 - 0.05, normalizedRoomDepth/2 - 0.05]} args={[normalizedRoomWidth + 0.2, 0.1, 0.1]}>
      <meshStandardMaterial color="#795548" roughness={0.7} metalness={0.1} />
    </Box>
  );
  
  // Baseboard/skirting board
  elements.push(
    <Box key="baseboard" position={[0, -normalizedRoomHeight/2 + 0.05, normalizedRoomDepth/2 - 0.02]} args={[normalizedRoomWidth, 0.1, 0.05]}>
      <meshStandardMaterial color="#795548" roughness={0.7} metalness={0.1} />
    </Box>
  );
  
  // Exterior lighting fixtures
  elements.push(
    <Cylinder key="exterior-light-fixture" position={[-1.5, -normalizedRoomHeight/2 + 0.3, normalizedRoomDepth/2 + 0.1]} args={[0.05, 0.05, 0.2, 16]}>
      <meshStandardMaterial color="#eeeeee" roughness={0.5} metalness={0.5} />
    </Cylinder>
  );
  
  elements.push(
    <Sphere key="exterior-light-bulb" position={[-1.5, -normalizedRoomHeight/2 + 0.45, normalizedRoomDepth/2 + 0.1]} args={[0.08, 16, 16]}>
      <meshStandardMaterial color="#ffecb3" roughness={0.8} metalness={0.1} emissive="#ffd54f" emissiveIntensity={0.1} />
    </Sphere>
  );

  return (
    <>
      {wall}
      {elements}
    </>
  );
};

export default Elevation3D;