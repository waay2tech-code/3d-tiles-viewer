import React, { useRef } from "react";
import { Box } from "@react-three/drei";

/**
 * Dumb tile renderer
 * All rotation & position MUST come from parent
 */
const Tile3D = ({
  dimensions,
  position,
  rotation = [0, 0, 0],
  color = "#4a90e2",
  isSelected = false,
  isFloor = false
}) => {
  const { width, height } = dimensions || { width: 300, height: 300 }; // Default to 300x300mm if dimensions is undefined

  // mm → meters
  const widthM = width / 1000;
  const heightM = height / 1000;

  // thickness
  const thickness = isFloor ? 0.005 : 0.01;

  // Geometry rules:
  // floor: width × depth × thickness
  // wall: width × height × thickness
  const args = isFloor
    ? [widthM, thickness, heightM]
    : [widthM, heightM, thickness];

  const meshRef = useRef();

  return (
    <Box
      ref={meshRef}
      position={position}
      rotation={rotation}
      args={args}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.05}
        emissive={isSelected ? color : "#000"}
        emissiveIntensity={isSelected ? 0.05 : 0}
      />
    </Box>
  );
};

export default Tile3D;
