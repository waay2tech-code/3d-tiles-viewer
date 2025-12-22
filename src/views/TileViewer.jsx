import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';
import '../App.css';
import TILE_DIMENSIONS from '../data/tileData';
// Import the tile manager instead of parseDimensions
import { getTiles, getTilesByRoomAndArea, parseDimensions } from '../data/tileManager';
// Import the new realistic room components
import { Bathroom3D, Kitchen3D, Bedroom3D, Floor3D, Parking3D, Steps3D, Elevation3D } from '../components/RealisticRooms';

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
const MeasurementDisplay = ({ position, text, color = "#ff0000" }) => {
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

const Scene = ({ selectedTile, selectedRoom, selectedArea, tileColor, pattern }) => {
  // Render the appropriate room model based on selection
  switch(selectedRoom) {
    case 'bathroom':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Bathroom3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            areaType={selectedArea}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
    case 'kitchen':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Kitchen3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            areaType={selectedArea}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
    case 'bedroom':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Bedroom3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            areaType={selectedArea}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
    case 'floor':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Floor3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            areaType={selectedArea}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
    case 'parking':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Parking3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            areaType={selectedArea}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
    case 'steps':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Steps3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            areaType={selectedArea}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
    case 'elevation':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Elevation3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
    default:
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <Bathroom3D 
            tileDimensions={selectedTile} 
            tileColor={tileColor}
            areaType={selectedArea}
            pattern={pattern}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            minDistance={2}
            maxDistance={20}
            autoRotate={false}
          />
        </>
      );
  }
};

const TileViewer = () => {
  const [selectedRoom, setSelectedRoom] = useState('bathroom');
  const [selectedArea, setSelectedArea] = useState('floor');
  const [selectedTile, setSelectedTile] = useState(null);
  const [tileColor, setTileColor] = useState('#4a90e2');
  const [pattern, setPattern] = useState('straight');
  const [showMeasurements, setShowMeasurements] = useState(true);

  const handleTileSelect = (tile) => {
    try {
      // Handle tiles that already have width and height properties
      let tileWithDimensions;
      if (tile.width && tile.height) {
        // Tile already has width and height properties
        tileWithDimensions = { ...tile };
      } else if (tile.dimensions) {
        // Parse the dimensions from the tile data
        const dimensions = parseDimensions(tile.dimensions);
        tileWithDimensions = {
          ...tile,
          width: dimensions.width,
          height: dimensions.height
        };
      } else {
        // Fallback: use default dimensions
        tileWithDimensions = {
          ...tile,
          width: 300,
          height: 300
        };
      }
      setSelectedTile(tileWithDimensions);
    } catch (error) {
      console.error('Error handling tile selection:', error);
      // Set a default tile as fallback
      setSelectedTile({
        width: 300,
        height: 300
      });
    }
  };

  // Get tiles based on room and area, combining static and dynamic tiles
  // Fixed: Improved tile selection logic with better error handling
  const getTilesForSelection = () => {
    try {
      // Get dynamic tiles from the tile manager
      const dynamicTiles = getTilesByRoomAndArea(selectedRoom, selectedArea);
      
      // If we have dynamic tiles for this room/area, use them
      if (dynamicTiles && dynamicTiles.length > 0) {
        // Parse dimensions for dynamic tiles
        const processedTiles = dynamicTiles.map(tile => {
          // Check if tile already has width and height properties
          if (tile.width && tile.height) {
            return { ...tile };
          } 
          // For tiles with dimensions property, parse the dimensions
          else if (tile.dimensions) {
            const dimensions = parseDimensions(tile.dimensions);
            return {
              ...tile,
              width: dimensions.width,
              height: dimensions.height
            };
          }
          // Fallback for tiles without proper dimensions
          else {
            return {
              ...tile,
              width: 300,
              height: 300
            };
          }
        });
        return processedTiles;
      }
      
      // Fallback to static tiles if no dynamic tiles are available
      const staticTiles = TILE_DIMENSIONS[selectedRoom]?.[selectedArea] || [];
      return staticTiles;
    } catch (error) {
      console.error('Error getting tiles for selection:', error);
      // Return empty array as fallback
      return [];
    }
  };

  // Calculate tile requirements
  const calculateTileRequirements = () => {
    if (!selectedTile) return null;
    
    // Define room dimensions in mm (matching the actual 3D component dimensions)
    let roomWidth, roomDepth;
    switch(selectedRoom) {
      case 'bathroom':
        roomWidth = 3000;  // Match Bathroom3D component
        roomDepth = 2500;  // Match Bathroom3D component
        break;
      case 'kitchen':
        roomWidth = 3600;  // Match Kitchen3D component
        roomDepth = 3000;  // Match Kitchen3D component
        break;
      case 'bedroom':
        roomWidth = 4000;  // Match Bedroom3D component
        roomDepth = 3600;  // Match Bedroom3D component
        break;
      case 'floor':
        roomWidth = 6000;  // Match Floor3D component
        roomDepth = 4500;  // Match Floor3D component
        break;
      case 'parking':
        roomWidth = 6000;  // Match Parking3D component
        roomDepth = 5000;  // Match Parking3D component
        break;
      case 'steps':
        // Steps have special dimensions: each step surface is 1000mm × 300mm
        // There are 5 steps total
        const stepSurfaceWidth = 1000; // 1m step width
        const stepSurfaceDepth = 300;  // 300mm step depth
        const numberOfSteps = 5;
        
        const { width: tileWidth, height: tileHeight } = selectedTile;
        
        // Handle specific tile sizes for optimal step tiling (matching Steps3D logic)
        let effectiveTileWidth = tileWidth;
        let effectiveTileHeight = tileHeight;
        
        if (tileWidth === 300 && tileHeight === 300) {
          // 300mm×300mm tiles - perfect fit for step depth, 3 tiles wide
          effectiveTileWidth = 300;
          effectiveTileHeight = 300;
        } else if (tileWidth === 900 && tileHeight === 300) {
          // 900mm×300mm tiles - can fit 1 tile per step with small gaps
          effectiveTileWidth = 900;
          effectiveTileHeight = 300;
        } else if (tileWidth === 1200 && tileHeight === 300) {
          // 1200mm×300mm tiles - need to be cut to fit step width
          effectiveTileWidth = 1000; // Fit to step width
          effectiveTileHeight = 300;
        } else {
          // Generic handling for other tile sizes
          if (tileWidth > stepSurfaceWidth) {
            effectiveTileWidth = Math.min(tileWidth, stepSurfaceWidth);
          }
          if (tileHeight > stepSurfaceDepth) {
            effectiveTileHeight = Math.min(tileHeight, stepSurfaceDepth);
          }
        }
        
        // Calculate tiles per step with 2mm grout spacing
        // Grout spacing is between tiles, so for n tiles we need: n * tileSize + (n-1) * grout
        // Solving for n: n = (space + grout) / (tileSize + grout)
        const groutSpacing = 2;
        const effectiveTileWidthWithGrout = effectiveTileWidth + groutSpacing;
        const effectiveTileHeightWithGrout = effectiveTileHeight + groutSpacing;
        
        // Calculate tiles that fit, accounting for grout spacing between tiles
        // Formula: n = floor((space + grout) / (tileSize + grout))
        // This correctly handles edge cases where tile fits exactly
        let tilesX = Math.floor((stepSurfaceWidth + groutSpacing) / effectiveTileWidthWithGrout);
        let tilesY = Math.floor((stepSurfaceDepth + groutSpacing) / effectiveTileHeightWithGrout);
        
        // Ensure at least 1 tile fits if tile fits within the surface
        if (effectiveTileWidth <= stepSurfaceWidth && tilesX === 0) tilesX = 1;
        if (effectiveTileHeight <= stepSurfaceDepth && tilesY === 0) tilesY = 1;
        
        const tilesPerStep = tilesX * tilesY;
        const totalTiles = tilesPerStep * numberOfSteps;
        
        // Add 10% waste factor
        const tilesWithWaste = Math.ceil(totalTiles * 1.1);
        
        // Calculate actual coverage (accounting for grout spacing between tiles)
        // Coverage = n * tileSize + (n-1) * grout, but cap at surface size
        const coverageWidth = Math.min(
          tilesX * effectiveTileWidth + (tilesX > 1 ? (tilesX - 1) * groutSpacing : 0),
          stepSurfaceWidth
        );
        const coverageDepth = Math.min(
          tilesY * effectiveTileHeight + (tilesY > 1 ? (tilesY - 1) * groutSpacing : 0),
          stepSurfaceDepth
        );
        
        return {
          tilesX,
          tilesY,
          totalTiles,
          tilesWithWaste,
          coverageWidth,
          coverageDepth,
          tilesPerStep,
          numberOfSteps
        };
      case 'elevation':
        roomWidth = 4000;  // Match Elevation3D component
        roomDepth = 3000;  // Match Elevation3D component (wall height)
        break;
      default:
        roomWidth = 3000;
        roomDepth = 2500;
    }
    
    const { width: tileWidth, height: tileHeight } = selectedTile;
    const effectiveTileWidth = tileWidth + 2; // 2mm grout
    const effectiveTileHeight = tileHeight + 2; // 2mm grout
    
    const tilesX = Math.floor(roomWidth / effectiveTileWidth);
    const tilesY = Math.floor(roomDepth / effectiveTileHeight);
    const totalTiles = tilesX * tilesY;
    
    // Add 10% waste factor
    const tilesWithWaste = Math.ceil(totalTiles * 1.1);
    
    return {
      tilesX,
      tilesY,
      totalTiles,
      tilesWithWaste,
      coverageWidth: tilesX * effectiveTileWidth,
      coverageDepth: tilesY * effectiveTileHeight
    };
  };

  const tileRequirements = calculateTileRequirements();

  return (
    <div className="tile-viewer">
      <header className="app-header">
        <div className="app-header-inner">
          <h1>NPV Visuals</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/viewer">Tile Viewer</a></li>
              <li><a href="/admin">Admin Panel</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="single-page-viewer">
        {/* Main 3D Viewer Section */}
        <div className="main-viewer-section">
          <div className="canvas-container">
            <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
              <Scene 
                selectedTile={selectedTile} 
                selectedRoom={selectedRoom} 
                selectedArea={selectedArea} 
                tileColor={tileColor}
                pattern={pattern}
              />
            </Canvas>
          </div>
          
          {/* Room and Tile Information Panel */}
          <div className="info-panel">
            <div className="room-info">
              <h3>📍 Current Room: {selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1)}</h3>
              {selectedArea && <p>Area: {selectedArea.charAt(0).toUpperCase() + selectedArea.slice(1)}</p>}
              <p>📐 Pattern: {pattern.charAt(0).toUpperCase() + pattern.slice(1)}</p>
              <p>🎨 Tile Color: <span style={{backgroundColor: tileColor, padding: '2px 8px', borderRadius: '4px', color: 'white'}}>{tileColor}</span></p>
            </div>
            
            {selectedTile && (
              <div className="tile-info-summary">
                <h3>🧱 Selected Tile</h3>
                <p>🏷️ Name: {selectedTile.name}</p>
                <p>📏 Dimensions: {selectedTile.width}mm × {selectedTile.height}mm</p>
                {/* Display tile image if available */}
                {selectedTile.imageUrl && (
                  <div className="selected-tile-image-small">
                    <img 
                      src={selectedTile.imageUrl} 
                      alt={selectedTile.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            
            {tileRequirements && (
              <div className="tile-requirements-summary">
                <h3>📋 Tile Requirements</h3>
                {selectedRoom === 'steps' && tileRequirements.tilesPerStep && tileRequirements.numberOfSteps ? (
                  <>
                    <p>🧮 Tiles Needed: {tileRequirements.totalTiles}</p>
                    <p>📦 With 10% Waste: {tileRequirements.tilesWithWaste}</p>
                    <p>📊 Tiles per Step: {tileRequirements.tilesX} × {tileRequirements.tilesY} = {tileRequirements.tilesPerStep}</p>
                    <p>🪜 Number of Steps: {tileRequirements.numberOfSteps}</p>
                    <p>📐 Coverage per Step: {tileRequirements.coverageWidth}mm × {tileRequirements.coverageDepth}mm</p>
                  </>
                ) : (
                  <>
                    <p>🧮 Tiles Needed: {tileRequirements.totalTiles}</p>
                    <p>📦 With 10% Waste: {tileRequirements.tilesWithWaste}</p>
                    <p>📐 Coverage: {tileRequirements.coverageWidth}mm × {tileRequirements.coverageDepth}mm</p>
                    <p>📏 Layout: {tileRequirements.tilesX} × {tileRequirements.tilesY} tiles</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Controls and Selection Panel */}
        <div className="controls-selection-panel">
          <div className="selection-controls">
            <div className="control-group">
              <label htmlFor="room-select">Room:</label>
              <select 
                id="room-select" 
                value={selectedRoom} 
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                <option value="bathroom">Bathroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="bedroom">Bedroom</option>
                <option value="floor">Floor</option>
                <option value="parking">Parking</option>
                <option value="steps">Steps</option>
                <option value="elevation">Elevation</option>
              </select>
            </div>
            
            {/* Area selector for all rooms */}
            <div className="control-group">
              <label htmlFor="area-select">Area:</label>
              <select 
                id="area-select" 
                value={selectedArea} 
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="wall">Wall</option>
                <option value="floor">Floor</option>
              </select>
            </div>
            
            <div className="control-group">
              <label htmlFor="pattern-select">Pattern:</label>
              <select 
                id="pattern-select" 
                value={pattern} 
                onChange={(e) => setPattern(e.target.value)}
              >
                <option value="straight">Straight</option>
                <option value="brick">Brick</option>
                <option value="herringbone">Herringbone</option>
              </select>
            </div>
            
            <div className="control-group">
              <label htmlFor="color-select">Color:</label>
              <input 
                type="color" 
                id="color-select" 
                value={tileColor} 
                onChange={(e) => setTileColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="tiles-selection">
            <h3>{selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1)} Tiles</h3>
            <div className="tiles-grid">
              {getTilesForSelection().map((tile, index) => (
                <div 
                  key={tile.id || index} 
                  className={`tile-card ${selectedTile?.id === tile.id ? 'selected' : ''}`}
                  onClick={() => handleTileSelect(tile)}
                >
                  {/* Display tile image if available */}
                  {tile.imageUrl && (
                    <div className="tile-image-preview">
                      <img 
                        src={tile.imageUrl} 
                        alt={tile.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    </div>
                  )}
                  <h4>{tile.name || `Tile ${index + 1}`}</h4>
                  <p>Width: {(tile.width || 300)}mm</p>
                  <p>Height: {(tile.height || 300)}mm</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileViewer;