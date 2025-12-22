import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Tile component with proper orientation for floors and walls
const Tile3D = ({
  dimensions,
  position,
  color = "#4a90e2",
  isSelected = false,
  isFloor = false,
  rotation = null,
}) => {
  const { width, height } = dimensions;

  // mm → meters
  const w = width / 1000;
  const h = height / 1000;

  // Tile thickness (Z axis only – ALWAYS)
  const thickness = isFloor ? 0.005 : 0.01;

  const meshRef = useRef();

  useFrame((state) => {
    if (isSelected && meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  // ✅ CORRECT ROTATION LOGIC
  const finalRotation =
    rotation ??
    (isFloor ? [-Math.PI / 2, 0, 0] : [0, 0, 0]);

  return (
    <Box
      ref={meshRef}
      position={position}
      rotation={finalRotation}
      args={[w, h, thickness]} // ✅ NEVER swap dimensions
    >
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.1}
        emissive={isSelected ? color : "#000"}
        emissiveIntensity={isSelected ? 0.03 : 0}
        side={THREE.DoubleSide}
      />
    </Box>
  );
};

// Professional tile layout calculator with advanced features
export const calculateTileLayout = (surfaceWidth, surfaceHeight, tileWidth, tileHeight, pattern = 'straight', isFloor = false) => {
  // Add 2mm grout spacing to each tile dimension
  const effectiveTileWidth = tileWidth + 2;   // 2mm grout spacing
  const effectiveTileHeight = tileHeight + 2; // 2mm grout spacing
  
  // Calculate number of tiles that fit (round down to avoid partial tiles)
  const tilesX = Math.floor(surfaceWidth / effectiveTileWidth);
  const tilesY = Math.floor(surfaceHeight / effectiveTileHeight);
  
  // Calculate actual coverage
  const coverageWidth = tilesX * effectiveTileWidth;
  const coverageHeight = tilesY * effectiveTileHeight;
  
  // Calculate starting position to center the tile grid
  const startX = -(coverageWidth / 2) / 1000 + (effectiveTileWidth / 2) / 1000; // Convert to meters and center
  const startY = -(coverageHeight / 2) / 1000 + (effectiveTileHeight / 2) / 1000; // Convert to meters and center
  
  // Pattern variations
  let patternOffsetX = 0;
  let patternOffsetY = 0;
  
  if (pattern === 'brick') {
    patternOffsetX = (effectiveTileWidth) / 2000; // Half tile offset for brick pattern
  } else if (pattern === 'herringbone' && isFloor) {
    // Special herringbone pattern for floors
    patternOffsetX = 0;
    patternOffsetY = 0;
  }
  
  return {
    tilesX,
    tilesY,
    startX,
    startY,
    coverageWidth,
    coverageHeight,
    patternOffsetX,
    patternOffsetY,
    effectiveTileWidth,
    effectiveTileHeight
  };
};

// Professional measurement display
export const MeasurementDisplay = ({ position, text, color = "#ff0000" }) => {
  return (
    <Text
      position={position}
      color={color}
      fontSize={0.1}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

// Surface orientation helper for consistent tile application
export const getSurfaceOrientation = (surfaceType) => {
  switch (surfaceType) {
    case 'back_wall':
      return {
        rotation: [0, Math.PI, 0], // 180° on Y axis
        isFloor: false
      };
    case 'left_wall':
      return {
        rotation: [0, Math.PI / 2, 0], // 90° on Y axis
        isFloor: false
      };
    case 'right_wall':
      return {
        rotation: [0, -Math.PI / 2, 0], // -90° on Y axis
        isFloor: false
      };
    case 'floor':
    default:
      return {
        rotation: null, // Will use default floor rotation [-Math.PI/2, 0, 0]
        isFloor: true
      };
  }
};

// Ultra-Realistic Bathroom 3D Model
export const Bathroom3D = ({ tileDimensions, tileColor = "#4a90e2", areaType, pattern = 'straight' }) => {
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

  // Apply tiles to appropriate surfaces with precise calculations
  const tiledSurfaces = [];
  const measurements = [];
  
  if (tileDimensions && tileDimensions.width && tileDimensions.height) {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number') ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number') ? tileDimensions.height : 300;
    const isFloorArea = (areaType === 'floor');
    
    const layout = calculateTileLayout(
      isFloorArea ? roomWidth : roomWidth,
      isFloorArea ? roomDepth : roomHeight,
      tileWidth, 
      tileHeight,
      pattern,
      isFloorArea
    );
    
    // Apply tiles to floor
    if (isFloorArea) {
      for (let x = 0; x < layout.tilesX; x++) {
        for (let z = 0; z < layout.tilesY; z++) {
          // Apply pattern variations for floors
          let posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
          let posZ = layout.startY + (z * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
          
          // Special pattern handling for floors
          if (pattern === 'brick' && z % 2 === 1) {
            posX += (layout.effectiveTileWidth) / 2000; // Half tile offset for brick pattern
          }
          
          // Position tiles flush with floor surface (accounting for tile thickness after rotation)
          // Tile thickness is 0.005m, so half thickness is 0.0025m
          const posY = -normalizedRoomHeight/2 + 0.0025; // Half tile thickness above floor base
          
          const floorOrientation = getSurfaceOrientation('floor');
          tiledSurfaces.push(
            <Tile3D 
              key={`floor-${x}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={floorOrientation.isFloor}
              rotation={floorOrientation.rotation}
            />
          );
        }
      }
      
      // Add floor measurements
      measurements.push(
        <MeasurementDisplay 
          key="floor-width" 
          position={[0, -normalizedRoomHeight/2 + 0.1, normalizedRoomDepth/2 + 0.5]} 
          text={`Width: ${roomWidth}mm`} 
        />
      );
      measurements.push(
        <MeasurementDisplay 
          key="floor-depth" 
          position={[normalizedRoomWidth/2 + 0.5, -normalizedRoomHeight/2 + 0.1, 0]} 
          text={`Depth: ${roomDepth}mm`} 
        />
      );
    }
    
    // Apply tiles to walls
    if (!isFloorArea) {
      // Apply tiles to back wall
      for (let x = 0; x < layout.tilesX; x++) {
        for (let y = 0; y < layout.tilesY; y++) {
          const posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
          const posY = layout.startY + (y * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
          const posZ = -normalizedRoomDepth/2 + 0.06; // Slightly in front of wall
          
          const backWallOrientation = getSurfaceOrientation('back_wall');
          tiledSurfaces.push(
            <Tile3D 
              key={`back-wall-${x}-${y}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={backWallOrientation.isFloor}
              rotation={backWallOrientation.rotation}
            />
          );
        }
      }
      
      // Apply tiles to left wall
      // Recalculate layout for left wall (height x depth)
      // Swap tile dimensions for side walls: tileHeight for vertical placement, tileWidth for horizontal placement
      const leftWallLayout = calculateTileLayout(
        roomHeight,
        roomDepth, // Apply to full wall depth
        tileHeight, // Swapped: Height dimension for vertical placement
        tileWidth,  // Swapped: Width dimension for horizontal placement
        pattern,
        false
      );
      
      for (let y = 0; y < leftWallLayout.tilesX; y++) {
        for (let z = 0; z < leftWallLayout.tilesY; z++) {
          // Position tiles on the left wall (X = -width/2)
          // Y axis represents height, Z axis represents depth
          const posX = -normalizedRoomWidth/2 + 0.06; // Slightly in front of left wall
          const posY = leftWallLayout.startX + (y * (leftWallLayout.effectiveTileWidth) / 1000); // Height position (centered)
          const posZ = leftWallLayout.startY + (z * (leftWallLayout.effectiveTileHeight) / 1000); // Depth position (centered)
          
          const leftWallOrientation = getSurfaceOrientation('left_wall');
          // Rotate tiles 90 degrees around Y axis to match left wall orientation
          tiledSurfaces.push(
            <Tile3D 
              key={`left-wall-${y}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={leftWallOrientation.isFloor}
              rotation={leftWallOrientation.rotation}
            />
          );
        }
      }
      
      // Apply tiles to right wall
      for (let y = 0; y < leftWallLayout.tilesX; y++) {
        for (let z = 0; z < leftWallLayout.tilesY; z++) {
          // Position tiles on the right wall (X = width/2)
          // Y axis represents height, Z axis represents depth
          const posX = normalizedRoomWidth/2 - 0.06; // Slightly in front of right wall
          const posY = leftWallLayout.startX + (y * (leftWallLayout.effectiveTileWidth) / 1000); // Height position (centered)
          const posZ = leftWallLayout.startY + (z * (leftWallLayout.effectiveTileHeight) / 1000); // Depth position (centered)
          
          const rightWallOrientation = getSurfaceOrientation('right_wall');
          // Rotate tiles 90 degrees around Y axis to match right wall orientation
          tiledSurfaces.push(
            <Tile3D 
              key={`right-wall-${y}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={rightWallOrientation.isFloor}
              rotation={rightWallOrientation.rotation}
            />
          );
        }
      }
      
      // Add wall measurements
      measurements.push(
        <MeasurementDisplay 
          key="wall-width" 
          position={[0, normalizedRoomHeight/2 + 0.5, -normalizedRoomDepth/2 - 0.2]} 
          text={`Width: ${roomWidth}mm`} 
        />
      );
      measurements.push(
        <MeasurementDisplay 
          key="wall-height" 
          position={[normalizedRoomWidth/2 + 0.5, 0, -normalizedRoomDepth/2 - 0.2]} 
          text={`Height: ${roomHeight}mm`} 
        />
      );
      
      // Add tile count information
      // Wall area - show detailed breakdown
      const backWallTileCount = layout.tilesX * layout.tilesY;
      const sideWallTileCount = leftWallLayout.tilesX * leftWallLayout.tilesY;
      const totalTileCount = backWallTileCount + (sideWallTileCount * 2);
      
      measurements.push(
        <MeasurementDisplay 
          key="tile-count" 
          position={[0, normalizedRoomHeight/2 + 1, 0]} 
          text={`Tiles: ${layout.tilesX} × ${layout.tilesY} (Back: ${backWallTileCount})`} 
          color="#00ff00"
        />
      );
      
      measurements.push(
        <MeasurementDisplay 
          key="side-wall-tile-count" 
          position={[0, normalizedRoomHeight/2 + 1.5, 0]} 
          text={`Side Walls: ${leftWallLayout.tilesX} × ${leftWallLayout.tilesY} (Each: ${sideWallTileCount}, Total: ${sideWallTileCount * 2})`} 
          color="#00ffff"
        />
      );
      
      measurements.push(
        <MeasurementDisplay 
          key="total-tile-count" 
          position={[0, normalizedRoomHeight/2 + 2, 0]} 
          text={`Total Tiles: ${totalTileCount}`} 
          color="#ffff00"
        />
      );
    } else {
      // Floor area - show simple count
      const floorTileCount = layout.tilesX * layout.tilesY;
      measurements.push(
        <MeasurementDisplay 
          key="tile-count" 
          position={[0, normalizedRoomHeight/2 + 1, 0]} 
          text={`Floor Tiles: ${layout.tilesX} × ${layout.tilesY} = ${floorTileCount}`} 
          color="#00ff00"
        />
      );
    }
  }

  return (
    <>
      {floor}
      {walls}
      {elements}
      {tiledSurfaces}
      {measurements}
    </>
  );
};

// Modular Realistic Kitchen 3D Model
export const Kitchen3D = ({ tileDimensions, tileColor = "#4a90e2", areaType, pattern = 'straight' }) => {
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

  // Apply tiles to appropriate surfaces with precise calculations
  const tiledSurfaces = [];
  const measurements = [];
  
  if (tileDimensions && tileDimensions.width && tileDimensions.height) {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number') ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number') ? tileDimensions.height : 300;
    const isFloorArea = (areaType === 'floor');
    
    const layout = calculateTileLayout(
      isFloorArea ? roomWidth : roomWidth,
      isFloorArea ? roomDepth : roomHeight,
      tileWidth, 
      tileHeight,
      pattern,
      isFloorArea
    );
    
    // Apply tiles to floor
    if (isFloorArea) {
      for (let x = 0; x < layout.tilesX; x++) {
        for (let z = 0; z < layout.tilesY; z++) {
          // Apply pattern variations for floors
          let posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
          let posZ = layout.startY + (z * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
          
          // Special pattern handling for floors
          if (pattern === 'brick' && z % 2 === 1) {
            posX += (layout.effectiveTileWidth) / 2000; // Half tile offset for brick pattern
          }
          
          // Position tiles flush with floor surface (accounting for tile thickness after rotation)
          // Tile thickness is 0.005m, so half thickness is 0.0025m
          const posY = -normalizedRoomHeight/2 + 0.0025; // Half tile thickness above floor base
          
          const floorOrientation = getSurfaceOrientation('floor');
          tiledSurfaces.push(
            <Tile3D 
              key={`floor-${x}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={floorOrientation.isFloor}
              rotation={floorOrientation.rotation}
            />
          );
        }
      }
      
      // Add floor measurements
      measurements.push(
        <MeasurementDisplay 
          key="floor-width" 
          position={[0, -normalizedRoomHeight/2 + 0.1, normalizedRoomDepth/2 + 0.5]} 
          text={`Width: ${roomWidth}mm`} 
        />
      );
      measurements.push(
        <MeasurementDisplay 
          key="floor-depth" 
          position={[normalizedRoomWidth/2 + 0.5, -normalizedRoomHeight/2 + 0.1, 0]} 
          text={`Depth: ${roomDepth}mm`} 
        />
      );
    }
    
    // Apply tiles to walls
    if (!isFloorArea) {
      // Apply tiles to back wall
      for (let x = 0; x < layout.tilesX; x++) {
        for (let y = 0; y < layout.tilesY; y++) {
          const posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
          const posY = layout.startY + (y * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
          const posZ = -normalizedRoomDepth/2 + 0.06; // Slightly in front of wall
          
          const backWallOrientation = getSurfaceOrientation('back_wall');
          tiledSurfaces.push(
            <Tile3D 
              key={`back-wall-${x}-${y}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={backWallOrientation.isFloor}
              rotation={backWallOrientation.rotation}
            />
          );
        }
      }
      
      // Apply tiles to left wall
      // Recalculate layout for left wall (height x depth)
      // Swap tile dimensions for side walls: tileHeight for vertical placement, tileWidth for horizontal placement
      const leftWallLayout = calculateTileLayout(
        roomHeight,
        roomDepth,
        tileHeight, // Swapped: Height dimension for vertical placement
        tileWidth,  // Swapped: Width dimension for horizontal placement
        pattern,
        false
      );
      
      for (let y = 0; y < leftWallLayout.tilesX; y++) {
        for (let z = 0; z < leftWallLayout.tilesY; z++) {
          // Position tiles on the left wall (X = -width/2)
          // Y axis represents height, Z axis represents depth
          const posX = -normalizedRoomWidth/2 + 0.06; // Slightly in front of left wall
          const posY = leftWallLayout.startX + (y * (leftWallLayout.effectiveTileWidth) / 1000); // Height position
          const posZ = leftWallLayout.startY + (z * (leftWallLayout.effectiveTileHeight) / 1000); // Depth position
          
          const leftWallOrientation = getSurfaceOrientation('left_wall');
          // Rotate tiles 90 degrees around Y axis to match left wall orientation
          tiledSurfaces.push(
            <Tile3D 
              key={`left-wall-${y}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={leftWallOrientation.isFloor}
              rotation={leftWallOrientation.rotation}
            />
          );
        }
      }
      
      // Apply tiles to right wall
      for (let y = 0; y < leftWallLayout.tilesX; y++) {
        for (let z = 0; z < leftWallLayout.tilesY; z++) {
          // Position tiles on the right wall (X = width/2)
          // Y axis represents height, Z axis represents depth
          const posX = normalizedRoomWidth/2 - 0.06; // Slightly in front of right wall
          const posY = leftWallLayout.startX + (y * (leftWallLayout.effectiveTileWidth) / 1000); // Height position
          const posZ = leftWallLayout.startY + (z * (leftWallLayout.effectiveTileHeight) / 1000); // Depth position
          
          const rightWallOrientation = getSurfaceOrientation('right_wall');
          // Rotate tiles 90 degrees around Y axis to match right wall orientation
          tiledSurfaces.push(
            <Tile3D 
              key={`right-wall-${y}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={rightWallOrientation.isFloor}
              rotation={rightWallOrientation.rotation}
            />
          );
        }
      }
      
      // Add wall measurements
      measurements.push(
        <MeasurementDisplay 
          key="wall-width" 
          position={[0, normalizedRoomHeight/2 + 0.5, -normalizedRoomDepth/2 - 0.2]} 
          text={`Width: ${roomWidth}mm`} 
        />
      );
      measurements.push(
        <MeasurementDisplay 
          key="wall-height" 
          position={[normalizedRoomWidth/2 + 0.5, 0, -normalizedRoomDepth/2 - 0.2]} 
          text={`Height: ${roomHeight}mm`} 
        />
      );
      
      // Add tile count information
      // Wall area - show detailed breakdown
      const backWallTileCount = layout.tilesX * layout.tilesY;
      const sideWallTileCount = leftWallLayout.tilesX * leftWallLayout.tilesY;
      const totalTileCount = backWallTileCount + (sideWallTileCount * 2);
      
      measurements.push(
        <MeasurementDisplay 
          key="tile-count" 
          position={[0, normalizedRoomHeight/2 + 1, 0]} 
          text={`Tiles: ${layout.tilesX} × ${layout.tilesY} (Back: ${backWallTileCount})`} 
          color="#00ff00"
        />
      );
      
      measurements.push(
        <MeasurementDisplay 
          key="side-wall-tile-count" 
          position={[0, normalizedRoomHeight/2 + 1.5, 0]} 
          text={`Side Walls: ${leftWallLayout.tilesX} × ${leftWallLayout.tilesY} (Each: ${sideWallTileCount}, Total: ${sideWallTileCount * 2})`} 
          color="#00ffff"
        />
      );
      
      measurements.push(
        <MeasurementDisplay 
          key="total-tile-count" 
          position={[0, normalizedRoomHeight/2 + 2, 0]} 
          text={`Total Tiles: ${totalTileCount}`} 
          color="#ffff00"
        />
      );
    } else {
      // Floor area - show simple count
      const floorTileCount = layout.tilesX * layout.tilesY;
      measurements.push(
        <MeasurementDisplay 
          key="tile-count" 
          position={[0, normalizedRoomHeight/2 + 1, 0]} 
          text={`Floor Tiles: ${layout.tilesX} × ${layout.tilesY} = ${floorTileCount}`} 
          color="#00ff00"
        />
      );
    }
  }

  return (
    <>
      {floor}
      {walls}
      {elements}
      {tiledSurfaces}
      {measurements}
    </>
  );
};

// Realistic Bedroom 3D Model
export const Bedroom3D = ({ tileDimensions, tileColor = "#4a90e2", areaType, pattern = 'straight' }) => {
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

  // Apply tiles to appropriate surfaces with precise calculations
  const tiledSurfaces = [];
  const measurements = [];
  
  if (tileDimensions && tileDimensions.width && tileDimensions.height) {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number') ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number') ? tileDimensions.height : 300;
    const isFloorArea = (areaType === 'floor');
    
    const layout = calculateTileLayout(
      isFloorArea ? roomWidth : roomWidth,
      isFloorArea ? roomDepth : roomHeight,
      tileWidth, 
      tileHeight,
      pattern,
      isFloorArea
    );
    
    // Apply tiles to floor
    if (isFloorArea) {
      for (let x = 0; x < layout.tilesX; x++) {
        for (let z = 0; z < layout.tilesY; z++) {
          // Apply pattern variations for floors
          let posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
          let posZ = layout.startY + (z * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
          
          // Special pattern handling for floors
          if (pattern === 'brick' && z % 2 === 1) {
            posX += (layout.effectiveTileWidth) / 2000; // Half tile offset for brick pattern
          }
          
          // Position tiles flush with floor surface (accounting for tile thickness after rotation)
          // Tile thickness is 0.005m, so half thickness is 0.0025m
          const posY = -normalizedRoomHeight/2 + 0.0025; // Half tile thickness above floor base
          
          const floorOrientation = getSurfaceOrientation('floor');
          tiledSurfaces.push(
            <Tile3D 
              key={`floor-${x}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={floorOrientation.isFloor}
              rotation={floorOrientation.rotation}
            />
          );
        }
      }
      
      // Add floor measurements
      measurements.push(
        <MeasurementDisplay 
          key="floor-width" 
          position={[0, -normalizedRoomHeight/2 + 0.1, normalizedRoomDepth/2 + 0.5]} 
          text={`Width: ${roomWidth}mm`} 
        />
      );
      measurements.push(
        <MeasurementDisplay 
          key="floor-depth" 
          position={[normalizedRoomWidth/2 + 0.5, -normalizedRoomHeight/2 + 0.1, 0]} 
          text={`Depth: ${roomDepth}mm`} 
        />
      );
    }
    
    // Apply tiles to walls
    if (!isFloorArea) {
      // Apply tiles to back wall
      for (let x = 0; x < layout.tilesX; x++) {
        for (let y = 0; y < layout.tilesY; y++) {
          const posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
          const posY = layout.startY + (y * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
          const posZ = -normalizedRoomDepth/2 + 0.06; // Slightly in front of wall
          
          const backWallOrientation = getSurfaceOrientation('back_wall');
          tiledSurfaces.push(
            <Tile3D 
              key={`back-wall-${x}-${y}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={backWallOrientation.isFloor}
              rotation={backWallOrientation.rotation}
            />
          );
        }
      }
      
      // Apply tiles to left wall
      // Recalculate layout for left wall (height x depth)
      // Swap tile dimensions for side walls: tileHeight for vertical placement, tileWidth for horizontal placement
      const leftWallLayout = calculateTileLayout(
        roomHeight,
        roomDepth,
        tileHeight, // Swapped: Height dimension for vertical placement
        tileWidth,  // Swapped: Width dimension for horizontal placement
        pattern,
        false
      );
      
      for (let y = 0; y < leftWallLayout.tilesX; y++) {
        for (let z = 0; z < leftWallLayout.tilesY; z++) {
          // Position tiles on the left wall (X = -width/2)
          // Y axis represents height, Z axis represents depth
          const posX = -normalizedRoomWidth/2 + 0.06; // Slightly in front of left wall
          const posY = leftWallLayout.startX + (y * (leftWallLayout.effectiveTileWidth) / 1000); // Height position
          const posZ = leftWallLayout.startY + (z * (leftWallLayout.effectiveTileHeight) / 1000); // Depth position
          
          const leftWallOrientation = getSurfaceOrientation('left_wall');
          // Rotate tiles 90 degrees around Y axis to match left wall orientation
          tiledSurfaces.push(
            <Tile3D 
              key={`left-wall-${y}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={leftWallOrientation.isFloor}
              rotation={leftWallOrientation.rotation}
            />
          );
        }
      }
      
      // Apply tiles to right wall
      for (let y = 0; y < leftWallLayout.tilesX; y++) {
        for (let z = 0; z < leftWallLayout.tilesY; z++) {
          // Position tiles on the right wall (X = width/2)
          // Y axis represents height, Z axis represents depth
          const posX = normalizedRoomWidth/2 - 0.06; // Slightly in front of right wall
          const posY = leftWallLayout.startX + (y * (leftWallLayout.effectiveTileWidth) / 1000); // Height position
          const posZ = leftWallLayout.startY + (z * (leftWallLayout.effectiveTileHeight) / 1000); // Depth position
          
          const rightWallOrientation = getSurfaceOrientation('right_wall');
          // Rotate tiles 90 degrees around Y axis to match right wall orientation
          tiledSurfaces.push(
            <Tile3D 
              key={`right-wall-${y}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={rightWallOrientation.isFloor}
              rotation={rightWallOrientation.rotation}
            />
          );
        }
      }
      
      // Add wall measurements
      measurements.push(
        <MeasurementDisplay 
          key="wall-width" 
          position={[0, normalizedRoomHeight/2 + 0.5, -normalizedRoomDepth/2 - 0.2]} 
          text={`Width: ${roomWidth}mm`} 
        />
      );
      measurements.push(
        <MeasurementDisplay 
          key="wall-height" 
          position={[normalizedRoomWidth/2 + 0.5, 0, -normalizedRoomDepth/2 - 0.2]} 
          text={`Height: ${roomHeight}mm`} 
        />
      );
      
      // Add tile count information
      // Wall area - show detailed breakdown
      const backWallTileCount = layout.tilesX * layout.tilesY;
      const sideWallTileCount = leftWallLayout.tilesX * leftWallLayout.tilesY;
      const totalTileCount = backWallTileCount + (sideWallTileCount * 2);
      
      measurements.push(
        <MeasurementDisplay 
          key="tile-count" 
          position={[0, normalizedRoomHeight/2 + 1, 0]} 
          text={`Tiles: ${layout.tilesX} × ${layout.tilesY} (Back: ${backWallTileCount})`} 
          color="#00ff00"
        />
      );
      
      measurements.push(
        <MeasurementDisplay 
          key="side-wall-tile-count" 
          position={[0, normalizedRoomHeight/2 + 1.5, 0]} 
          text={`Side Walls: ${leftWallLayout.tilesX} × ${leftWallLayout.tilesY} (Each: ${sideWallTileCount}, Total: ${sideWallTileCount * 2})`} 
          color="#00ffff"
        />
      );
      
      measurements.push(
        <MeasurementDisplay 
          key="total-tile-count" 
          position={[0, normalizedRoomHeight/2 + 2, 0]} 
          text={`Total Tiles: ${totalTileCount}`} 
          color="#ffff00"
        />
      );
    } else {
      // Floor area - show simple count
      const floorTileCount = layout.tilesX * layout.tilesY;
      measurements.push(
        <MeasurementDisplay 
          key="tile-count" 
          position={[0, normalizedRoomHeight/2 + 1, 0]} 
          text={`Floor Tiles: ${layout.tilesX} × ${layout.tilesY} = ${floorTileCount}`} 
          color="#00ff00"
        />
      );
    }
  }

  return (
    <>
      {floor}
      {walls}
      {elements}
      {tiledSurfaces}
      {measurements}
    </>
  );
};

// Photorealistic Floor Tiles 3D Model
export const Floor3D = ({ tileDimensions, tileColor = "#4a90e2", areaType, pattern = 'straight' }) => {
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

  // Apply tiles to floor with precise calculations
  const tiledSurfaces = [];
  const measurements = [];
  
  // Completely rebuilt floor tile application logic with validation
  if (tileDimensions && areaType === 'floor') {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number' && tileDimensions.width > 0) ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number' && tileDimensions.height > 0) ? tileDimensions.height : 300;
    
    // Validate that we have positive dimensions
    if (tileWidth > 0 && tileHeight > 0) {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number') ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number') ? tileDimensions.height : 300;
    
    const layout = calculateTileLayout(
      roomWidth,
      roomDepth,
      tileWidth, 
      tileHeight,
      pattern,
      true // isFloor
    );
    
    // Apply tiles to floor
    for (let x = 0; x < layout.tilesX; x++) {
      for (let z = 0; z < layout.tilesY; z++) {
        // Apply pattern variations for floors
        let posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
        let posZ = layout.startY + (z * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
        
        // Special pattern handling for floors
        if (pattern === 'brick' && z % 2 === 1) {
          posX += (layout.effectiveTileWidth) / 2000; // Half tile offset for brick pattern
        }
        
        // Position tiles flush with floor surface (accounting for tile thickness after rotation)
        // Tile thickness is 0.005m, so half thickness is 0.0025m
        // Place tiles slightly above floor surface to prevent z-fighting
        const posY = -normalizedRoomHeight/2 + 0.01; // Slightly above floor surface to prevent z-fighting
        
        const floorOrientation = getSurfaceOrientation('floor');
        tiledSurfaces.push(
          <Tile3D 
            key={`floor-${x}-${z}`} 
            dimensions={{width: tileWidth, height: tileHeight}}
            position={[posX, posY, posZ]} 
            color={tileColor}
            isFloor={true}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        );
      }
    }
    
    // Add floor measurements
    measurements.push(
      <MeasurementDisplay 
        key="floor-width" 
        position={[0, -normalizedRoomHeight/2 + 0.1, normalizedRoomDepth/2 + 0.5]} 
        text={`Width: ${roomWidth}mm`} 
      />
    );
    measurements.push(
      <MeasurementDisplay 
        key="floor-depth" 
        position={[normalizedRoomWidth/2 + 0.5, -normalizedRoomHeight/2 + 0.1, 0]} 
        text={`Depth: ${roomDepth}mm`} 
      />
    );
    
    // Add tile count information
    measurements.push(
      <MeasurementDisplay 
        key="tile-count" 
        position={[0, 1, 0]} 
        text={`Tiles: ${layout.tilesX} × ${layout.tilesY} = ${layout.tilesX * layout.tilesY}`} 
        color="#00ff00"
      />
    );
  }

  return (
    <>
      {floor}
      {elements}
      {tiledSurfaces}
      {measurements}
    </>
  );
};

// Realistic Parking Area 3D Model
export const Parking3D = ({ tileDimensions, tileColor = "#4a90e2", areaType, pattern = 'straight' }) => {
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

  // Apply tiles to floor with precise calculations
  const tiledSurfaces = [];
  const measurements = [];
  
  // Completely rebuilt floor tile application logic with validation
  if (tileDimensions && areaType === 'floor') {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number' && tileDimensions.width > 0) ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number' && tileDimensions.height > 0) ? tileDimensions.height : 300;
    
    // Validate that we have positive dimensions
    if (tileWidth > 0 && tileHeight > 0) {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number') ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number') ? tileDimensions.height : 300;
    
    const layout = calculateTileLayout(
      roomWidth,
      roomDepth,
      tileWidth, 
      tileHeight,
      pattern,
      true // isFloor
    );
    
    // Apply tiles to floor
    for (let x = 0; x < layout.tilesX; x++) {
      for (let z = 0; z < layout.tilesY; z++) {
        // Apply pattern variations for floors
        let posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
        let posZ = layout.startY + (z * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
        
        // Special pattern handling for floors
        if (pattern === 'brick' && z % 2 === 1) {
          posX += (layout.effectiveTileWidth) / 2000; // Half tile offset for brick pattern
        }
        
        // Position tiles flush with floor surface (accounting for tile thickness after rotation)
        // Tile thickness is 0.005m, so half thickness is 0.0025m
        // Place tiles slightly above floor surface to prevent z-fighting
        const posY = -normalizedRoomHeight/2 + 0.01; // Slightly above floor surface to prevent z-fighting
        
        const floorOrientation = getSurfaceOrientation('floor');
        tiledSurfaces.push(
          <Tile3D 
            key={`floor-${x}-${z}`} 
            dimensions={{width: tileWidth, height: tileHeight}}
            position={[posX, posY, posZ]} 
            color={tileColor}
            isFloor={true}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        );
      }
    }
    
  
    
    // Add floor measurements
    measurements.push(
      <MeasurementDisplay 
        key="floor-width" 
        position={[0, -normalizedRoomHeight/2 + 0.1, normalizedRoomDepth/2 + 0.5]} 
        text={`Width: ${roomWidth}mm`} 
      />
    );
    measurements.push(
      <MeasurementDisplay 
        key="floor-depth" 
        position={[normalizedRoomWidth/2 + 0.5, -normalizedRoomHeight/2 + 0.1, 0]} 
        text={`Depth: ${roomDepth}mm`} 
      />
    );
    
    // Add tile count information
    measurements.push(
      <MeasurementDisplay 
        key="tile-count" 
        position={[0, 1, 0]} 
        text={`Tiles: ${layout.tilesX} × ${layout.tilesY} = ${layout.tilesX * layout.tilesY}`} 
        color="#00ff00"
      />
    );
  }

  return (
    <>
      {floor}
      {elements}
      {tiledSurfaces}
      {measurements}
    </>
  );
};

// Detailed Stairs 3D Model with Flexible Tile Support
export const Steps3D = ({ tileDimensions, tileColor = "#4a90e2", areaType, pattern = 'straight' }) => {
  // Define realistic steps dimensions in mm (market standard)
  const roomWidth = 2000;   // 2m (standard width)
  const roomHeight = 1800;  // 1.8m (standard height)
  const roomDepth = 3000;   // 3m (standard depth)

  // Convert to meters for 3D rendering
  const normalizedRoomWidth = roomWidth / 1000;
  const normalizedRoomHeight = roomHeight / 1000;
  const normalizedRoomDepth = roomDepth / 1000;

  // Create floor base with modern finish (slightly lowered to create gap for steps)
  const floor = (
    <Box position={[0, -normalizedRoomHeight/2 - 0.05, 0]} args={[normalizedRoomWidth, 0.1, normalizedRoomDepth]}>
      <meshStandardMaterial color="#eceff1" roughness={0.3} metalness={0.6} />
    </Box>
  );

  // Steps elements with modern design
  const elements = [];
  
  // Create modern steps with realistic dimensions
  const stepRiserHeight = 0.17; // 170mm riser height (more realistic)
  const stepTreadDepth = 0.28;  // 280mm tread depth (more realistic)
  const stepWidth = 1.0;         // 1m step width
  const numberOfSteps = 6;       // More steps for better visualization
  
  // Create steps with subtle base color to avoid overlay issues with tiles
  for (let i = 0; i < numberOfSteps; i++) {
    // Step tread (horizontal part where you step)
    elements.push(
      <Box 
        key={`step-tread-${i}`} 
        position={[0, -normalizedRoomHeight/2 - 0.05 + (i * stepRiserHeight) + stepRiserHeight, -(i * stepTreadDepth) + (numberOfSteps * stepTreadDepth)/2 - stepTreadDepth/2]} 
        args={[stepWidth, 0.02, stepTreadDepth]}
      >
        <meshStandardMaterial color="#eceff1" roughness={0.8} metalness={0.1} opacity={0.7} transparent={true} />
      </Box>
    );
    
    // Step riser (vertical part at front of step)
    if (i < numberOfSteps - 1) { // No riser for the top step
      elements.push(
        <Box 
          key={`step-riser-${i}`} 
          position={[0, -normalizedRoomHeight/2 - 0.05 + (i * stepRiserHeight) + stepRiserHeight/2, -(i * stepTreadDepth) + (numberOfSteps * stepTreadDepth)/2 - stepTreadDepth]}
          args={[stepWidth, stepRiserHeight, 0.02]}
        >
          <meshStandardMaterial color="#cfd8dc" roughness={0.7} metalness={0.1} opacity={0.6} transparent={true} />
        </Box>
      );
    }
  }
  
  // Wall skirting with modern finish
  elements.push(
    <Box 
      key="skirting" 
      position={[0, -normalizedRoomHeight/2 - 0.05 + 0.05, -normalizedRoomDepth/2 + 0.02]} 
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
        position={[0.45, -normalizedRoomHeight/2 - 0.05 + (i * stepRiserHeight) + stepRiserHeight + 0.4, -(i * stepTreadDepth) + (numberOfSteps * stepTreadDepth)/2 - stepTreadDepth/2]} 
        args={[0.015, 0.015, 0.8, 16]}
      >
        <meshStandardMaterial color="#eceff1" roughness={0.4} metalness={0.8} />
      </Cylinder>
    );
  }
  
  // Handrail with modern design
  elements.push(
    <Box 
      key="handrail" 
      position={[0.45, -normalizedRoomHeight/2 - 0.05 + numberOfSteps * stepRiserHeight + 0.8, 0]} 
      args={[0.03, 0.03, normalizedRoomDepth]}
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
        position={[0, -normalizedRoomHeight/2 - 0.05 + (i * stepRiserHeight) + stepRiserHeight + 0.01, -(i * stepTreadDepth) + (numberOfSteps * stepTreadDepth)/2 - stepTreadDepth/2]}
        args={[0.03, 0.01, 0.03]}
      >
      <meshStandardMaterial color="#bbdefb" roughness={0.8} metalness={0.2} emissive="#4fc3f7" emissiveIntensity={0.3} />
      </Box>
    );
  }

  // Apply tiles to steps with precise calculations based on tile dimensions
  const tiledSurfaces = [];
  const measurements = [];
  let totalTileCount = 0;
  
  // Completely rebuilt floor tile application logic with validation
  if (tileDimensions && areaType === 'floor') {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number' && tileDimensions.width > 0) ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number' && tileDimensions.height > 0) ? tileDimensions.height : 300;
    
    // Validate that we have positive dimensions
    if (tileWidth > 0 && tileHeight > 0) {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number') ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number') ? tileDimensions.height : 300;
    
    // Validate tile dimensions
    if (tileWidth <= 0 || tileHeight <= 0) {
      return (
        <>
          {floor}
          {elements}
          {measurements}
        </>
      );
    }
    
    // Special handling for specific tile sizes commonly used for steps
    // 300mm×300mm, 900mm×300mm, 1200mm×300mm
    let effectiveTileWidth = tileWidth;
    let effectiveTileHeight = tileHeight;
    
    // Step tread dimensions in mm (1000mm width × 280mm depth)
    const stepSurfaceWidth = 1000; // 1m in mm
    const stepSurfaceDepth = 280;  // 280mm in mm (tread depth)
    
    // Handle specific tile sizes for optimal step tiling
    if (tileWidth === 300 && tileHeight === 300) {
      // 300mm×300mm tiles - perfect fit for step tread depth, 3 tiles wide
      effectiveTileWidth = 300;
      effectiveTileHeight = 300;
    } else if (tileWidth === 900 && tileHeight === 300) {
      // 900mm×300mm tiles - can fit 1 tile per step with small gaps
      effectiveTileWidth = 900;
      effectiveTileHeight = 300;
    } else if (tileWidth === 1200 && tileHeight === 300) {
      // 1200mm×300mm tiles - need to be cut to fit step width
      effectiveTileWidth = 1000; // Fit to step width
      effectiveTileHeight = 280; // Fit to tread depth
    } else {
      // Generic handling for other tile sizes
      if (tileWidth > stepSurfaceWidth) {
        // If tile is wider than step, adjust to fit
        effectiveTileWidth = Math.min(tileWidth, stepSurfaceWidth);
      }
      
      if (tileHeight > stepSurfaceDepth) {
        // If tile is deeper than step tread, adjust to fit
        effectiveTileHeight = Math.min(tileHeight, stepSurfaceDepth);
      }
    }
    
    // Calculate layout for step tread with proper 2mm grout spacing
    const layout = calculateTileLayout(
      stepSurfaceWidth,
      stepSurfaceDepth,
      effectiveTileWidth, 
      effectiveTileHeight,
      pattern,
      true // isFloor
    );
    
    // Calculate total tile count
    const tilesPerStep = layout.tilesX * layout.tilesY;
    totalTileCount = tilesPerStep * numberOfSteps;
    
    // Display measurements for step tiling
    measurements.push(
      <Text 
        key="step-measurement"
        position={[0, -normalizedRoomHeight/2 + 0.5, 0]}
        fontSize={0.1}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {`${Math.floor(layout.tilesX)}×${Math.floor(layout.tilesY)} tiles (${effectiveTileWidth}×${effectiveTileHeight}mm)`}
      </Text>
    );
    
    // If no tiles fit, don't try to create them
    if (tilesPerStep === 0) {
      return (
        <>
          {floor}
          {elements}
          {measurements}
        </>
      );
    }
    
    // Apply tiles to each step

    for (let i = 0; i < numberOfSteps; i++) {
      // Apply tiles to step tread
      for (let x = 0; x < layout.tilesX; x++) {
        for (let z = 0; z < layout.tilesY; z++) {
          // Calculate precise positioning with grout spacing
          let posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000); // Convert to meters with grout spacing
          let posZ = layout.startY + (z * (layout.effectiveTileHeight) / 1000); // Convert to meters with grout spacing
          
          // Special pattern handling for floors
          if (pattern === 'brick' && z % 2 === 1) {
            posX += (layout.effectiveTileWidth) / 2000; // Half tile offset for brick pattern
          }
          
          // Position on the specific step tread (ensure tiles are on top of steps, not embedded)
          const stepPosY = -normalizedRoomHeight/2 - 0.05 + (i * stepRiserHeight) + stepRiserHeight + 0.01; // Slightly above step tread surface
          const stepPosX = posX;
          const stepPosZ = -(i * stepTreadDepth) + (numberOfSteps * stepTreadDepth)/2 - stepTreadDepth/2 + posZ;
          
          // Ensure tiles are properly aligned with step surface
          const tilePosition = [stepPosX, stepPosY, stepPosZ];
          

          const floorOrientation = getSurfaceOrientation('floor');
          tiledSurfaces.push(
            <Tile3D 
              key={`step-${i}-tile-${x}-${z}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={tilePosition} 
              color={tileColor}
              isFloor={floorOrientation.isFloor}
              rotation={floorOrientation.rotation}
            />
          );
        }
      }
    }
    
    // Add measurements
    measurements.push(
      <MeasurementDisplay 
        key="steps-width" 
        position={[0, -normalizedRoomHeight/2 - 0.05 + 0.1, normalizedRoomDepth/2 + 0.5]} 
        text={`Width: ${roomWidth}mm`} 
      />
    );
    measurements.push(
      <MeasurementDisplay 
        key="steps-depth" 
        position={[normalizedRoomWidth/2 + 0.5, -normalizedRoomHeight/2 - 0.05 + 0.1, 0]} 
        text={`Depth: ${roomDepth}mm`} 
      />
    );
    
    // Add step count and tile information
    measurements.push(
      <MeasurementDisplay 
        key="step-count" 
        position={[0, 1, 0]} 
        text={`Steps: ${numberOfSteps}`} 
        color="#00ff00"
      />
    );
    
    // Add tile size information
    measurements.push(
      <MeasurementDisplay 
        key="tile-size" 
        position={[0, 1.5, 0]} 
        text={`Tile Size: ${tileWidth}mm × ${tileHeight}mm`} 
        color="#00ffff"
      />
    );
    
    // Add total tile count information
    measurements.push(
      <MeasurementDisplay 
        key="tile-count" 
        position={[0, 3, 0]} 
        text={`Total Tiles: ${totalTileCount}`} 
        color="#ffff00"
      />
    );
    
    // Add tiles per step information
    measurements.push(
      <MeasurementDisplay 
        key="tiles-per-step" 
        position={[0, 3.5, 0]} 
        text={`Tiles per Step: ${tilesPerStep}`} 
        color="#ff9900"
      />
    );
    
    // Add effective tile size information if different from original
    if (effectiveTileWidth !== tileWidth || effectiveTileHeight !== tileHeight) {
      measurements.push(
        <MeasurementDisplay 
          key="effective-tile-size" 
          position={[0, 4, 0]} 
          text={`Effective Size: ${effectiveTileWidth}mm × ${effectiveTileHeight}mm`} 
          color="#ff66cc"
        />
      );
    }
  }

  return (
    <>
      {floor}
      {elements}
      {tiledSurfaces}
      {measurements}
    </>
  );
};

// Professional Building Elevation 3D Model with Market Standard Features
export const Elevation3D = ({ tileDimensions, tileColor = "#4a90e2", pattern = 'straight' }) => {
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
  
  // Professional lighting setup with realistic sun and ambient lighting
  // Note: Lights are now managed by the Scene component to avoid conflicts
  // elements.push(
  //   <directionalLight
  //     key="sun-light"
  //     position={[10, 10, 5]}
  //     intensity={1.2}
  //     castShadow
  //     shadow-mapSize-width={2048}
  //     shadow-mapSize-height={2048}
  //   />
  // );
  // 
  // elements.push(
  //   <ambientLight key="ambient-light" intensity={0.6} />
  // );

  // Apply tiles to wall with precise calculations using standard layout function
  const tiledSurfaces = [];
  const measurements = [];
  
  if (tileDimensions && tileDimensions.width && tileDimensions.height) {
    // Ensure tile dimensions are properly defined with fallback values
    const tileWidth = (tileDimensions.width && typeof tileDimensions.width === 'number') ? tileDimensions.width : 300;
    const tileHeight = (tileDimensions.height && typeof tileDimensions.height === 'number') ? tileDimensions.height : 300;
    
    // Use standard calculateTileLayout function for consistent tile positioning
    const layout = calculateTileLayout(
      roomWidth,
      roomHeight,
      tileWidth, 
      tileHeight,
      pattern,
      false // isFloor = false for wall
    );
    
    // Define door area to exclude from tiling (in meters)
    // Door positioned at [0, -0.7, ...] with dimensions 0.9m wide x 2m tall
    const doorXStart = -0.45;  // -0.9/2
    const doorXEnd = 0.45;      // 0.9/2
    const doorYStart = -1.7;    // -0.7 - 2/2
    const doorYEnd = 0.3;       // -0.7 + 2/2
    
    // Convert tile dimensions to meters for overlap checking
    const tileWidthM = tileWidth / 1000;
    const tileHeightM = tileHeight / 1000;
    
    // Apply tiles to wall using standard layout positioning
    let tileCount = 0;
    for (let x = 0; x < layout.tilesX; x++) {
      for (let y = 0; y < layout.tilesY; y++) {
        // Calculate tile position using standard layout (centered)
        const posX = layout.startX + (x * (layout.effectiveTileWidth) / 1000);
        const posY = layout.startY + (y * (layout.effectiveTileHeight) / 1000);
        const posZ = normalizedRoomDepth/2 + 0.01; // Slightly in front of wall for visibility
        
        // Check if tile overlaps with door area
        const tileLeft = posX - (tileWidthM / 2);
        const tileRight = posX + (tileWidthM / 2);
        const tileBottom = posY - (tileHeightM / 2);
        const tileTop = posY + (tileHeightM / 2);
        
        // Check for door overlap
        const doorOverlap = tileLeft <= doorXEnd && tileRight >= doorXStart && 
                           tileBottom <= doorYEnd && tileTop >= doorYStart;
        
        // Only add tile if it doesn't overlap with door exclusion zone
        if (!doorOverlap) {
          const backWallOrientation = getSurfaceOrientation('back_wall');
          tiledSurfaces.push(
            <Tile3D 
              key={`wall-${x}-${y}`} 
              dimensions={{width: tileWidth, height: tileHeight}}
              position={[posX, posY, posZ]} 
              color={tileColor}
              isFloor={backWallOrientation.isFloor}
              rotation={backWallOrientation.rotation}
            />
          );
          tileCount++;
        }
      }
    }
    
    // Add wall measurements
    measurements.push(
      <MeasurementDisplay 
        key="wall-width" 
        position={[0, normalizedRoomHeight/2 + 0.5, normalizedRoomDepth/2 + 0.2]} 
        text={`Width: ${roomWidth}mm`} 
      />
    );
    measurements.push(
      <MeasurementDisplay 
        key="wall-height" 
        position={[normalizedRoomWidth/2 + 0.5, 0, normalizedRoomDepth/2 + 0.2]} 
        text={`Height: ${roomHeight}mm`} 
      />
    );
    
    // Add tile count information
    measurements.push(
      <MeasurementDisplay 
        key="tile-count" 
        position={[0, normalizedRoomHeight/2 + 1, 0]} 
        text={`Tiles: ${tileCount}`} 
        color="#00ff00"
      />
    );
  }

  return (
    <>
      {wall}
      {elements}
      {tiledSurfaces}
      {measurements}
    </>
  );
};
