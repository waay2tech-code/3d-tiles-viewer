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