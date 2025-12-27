// Shared tile management system

import { TILE_TYPES } from "../core/constants";
import { calculateTileLayout } from "../core/calculateTileLayout";

/* ------------------------------------------------------------------ */
/* TILE CATALOG (SOURCE OF TRUTH)                                      */
/* ------------------------------------------------------------------ */

let tiles = [
  // Bathroom
  { id: 1, name: "Bathroom Wall 450x300", roomType: "bathroom", areaType: "wall", dimensions: "450 X 300", type: TILE_TYPES.CERAMIC },
  { id: 2, name: "Bathroom Wall 600x300", roomType: "bathroom", areaType: "wall", dimensions: "600 X 300", type: TILE_TYPES.CERAMIC },
  { id: 3, name: "Bathroom Floor 300x300", roomType: "bathroom", areaType: "floor", dimensions: "300 X 300", type: TILE_TYPES.CERAMIC },

  // Kitchen
  { id: 4, name: "Kitchen Wall 600x300", roomType: "kitchen", areaType: "wall", dimensions: "600 X 300", type: TILE_TYPES.PORCELAIN },
  { id: 5, name: "Kitchen Wall 450x399", roomType: "kitchen", areaType: "wall", dimensions: "450 X 399", type: TILE_TYPES.PORCELAIN },
  { id: 6, name: "Kitchen Floor 600x600", roomType: "kitchen", areaType: "floor", dimensions: "600 X 600", type: TILE_TYPES.PORCELAIN },
  { id: 10, name: "Kitchen Floor 300x300", roomType: "kitchen", areaType: "floor", dimensions: "300 X 300", type: TILE_TYPES.PORCELAIN },
  { id: 11, name: "Kitchen Floor 1200x600", roomType: "kitchen", areaType: "floor", dimensions: "1200 X 600", type: TILE_TYPES.PORCELAIN },

  // Bedroom
  { id: 7, name: "Bedroom Wall 450x300", roomType: "bedroom", areaType: "wall", dimensions: "450 X 300", type: TILE_TYPES.WOOD },
  { id: 8, name: "Bedroom Floor 800x800", roomType: "bedroom", areaType: "floor", dimensions: "800 X 800", type: TILE_TYPES.WOOD },
  { id: 12, name: "Bedroom Wall 600x300", roomType: "bedroom", areaType: "wall", dimensions: "600 X 300", type: TILE_TYPES.WOOD },
  { id: 13, name: "Bedroom Floor 600x600", roomType: "bedroom", areaType: "floor", dimensions: "600 X 600", type: TILE_TYPES.WOOD },
  { id: 14, name: "Bedroom Floor 1200x600", roomType: "bedroom", areaType: "floor", dimensions: "1200 X 600", type: TILE_TYPES.WOOD },

  // Floor
  { id: 15, name: "Floor 600x600", roomType: "floor", areaType: "floor", dimensions: "600 X 600", type: TILE_TYPES.PORCELAIN },
  { id: 16, name: "Floor 1200x600", roomType: "floor", areaType: "floor", dimensions: "1200 X 600", type: TILE_TYPES.PORCELAIN },
  
  // Elevation
  { id: 19, name: "Elevation Wall 450x300", roomType: "elevation", areaType: "wall", dimensions: "450 X 300", type: TILE_TYPES.PORCELAIN },
  { id: 20, name: "Elevation Wall 600x300", roomType: "elevation", areaType: "wall", dimensions: "600 X 300", type: TILE_TYPES.PORCELAIN },
  
  // Steps
  { id: 21, name: "Steps Floor 300x300", roomType: "steps", areaType: "floor", dimensions: "300 X 300", type: TILE_TYPES.CERAMIC },
  { id: 22, name: "Steps Floor 900x300", roomType: "steps", areaType: "floor", dimensions: "900 X 300", type: TILE_TYPES.CERAMIC },
  { id: 23, name: "Steps Floor 1200x300", roomType: "steps", areaType: "floor", dimensions: "1200 X 300", type: TILE_TYPES.CERAMIC },
  
  // Parking
  { id: 9, name: "Parking Floor 400x400", roomType: "parking", areaType: "floor", dimensions: "400 X 400", type: TILE_TYPES.CONCRETE },
  { id: 17, name: "Parking Floor 300x300", roomType: "parking", areaType: "floor", dimensions: "300 X 300", type: TILE_TYPES.CONCRETE },
  { id: 18, name: "Parking Floor 500x500", roomType: "parking", areaType: "floor", dimensions: "500 X 500", type: TILE_TYPES.CONCRETE }
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                            */
/* ------------------------------------------------------------------ */

export const parseDimensions = (str) => {
  if (!str) return { width: 300, height: 300 };
  const [w, h] = str.split("X").map(v => parseInt(v.trim(), 10));
  return {
    width: w || 300,
    height: h || 300
  };
};

/* ------------------------------------------------------------------ */
/* TILE CRUD                                                          */
/* ------------------------------------------------------------------ */

export const getTiles = () => tiles;

export const addTile = (tileData) => {
  const id = Math.max(0, ...tiles.map(t => t.id)) + 1;
  const newTile = { id, ...tileData };
  tiles = [...tiles, newTile];
  return newTile;
};

export const deleteTile = (id) => {
  tiles = tiles.filter(t => t.id !== id);
};

/* ------------------------------------------------------------------ */
/* FILTERING                                                          */
/* ------------------------------------------------------------------ */

export const getTilesByRoomAndArea = (roomType, areaType) => {
  if (!roomType || !areaType) return [];

  if (areaType === "wall") {
    return tiles.filter(
      t => t.roomType === roomType && t.areaType === "wall"
    );
  }

  return tiles.filter(
    t => t.roomType === roomType && t.areaType === areaType
  );
};

/* ------------------------------------------------------------------ */
/* TILE GENERATION (3D PLACEMENT DATA)                                 */
/* ------------------------------------------------------------------ */

export function generateTiles({
  room,
  tile,
  areaType,
  pattern = "straight",
  roomType = ""
}) {
  if (!room || !tile) return [];

  const result = [];
  const tileSize = parseDimensions(tile.dimensions);

  // Special handling for steps model - only apply to step surfaces
  if (roomType === "steps") {
    // Steps have 5 steps, each with specific dimensions
    // Each step surface is 1000mm wide and 300mm deep
    const stepSurfaceWidth = 1000; // 1m step width
    const stepSurfaceDepth = 300;  // 300mm step depth
    const numberOfSteps = 5;
    
    // Calculate layout for a single step surface
    const layout = calculateTileLayout(
      stepSurfaceWidth,
      stepSurfaceDepth,
      tileSize.width,
      tileSize.height,
      pattern,
      true // is floor
    );
    
    // Apply tiles to each step surface
    for (let step = 0; step < numberOfSteps; step++) {
      for (let row = 0; row < layout.tilesY; row++) {
        for (let col = 0; col < layout.tilesX; col++) {
          // Calculate position for this tile on this step
          // X: position within the step surface
          // Y: depth position within the step surface (negative because Z in 3D)
          // Z: position along the step stack
          let x = layout.startX + col * (layout.effectiveTileWidth / 1000);
          let y = layout.startY + row * (layout.effectiveTileHeight / 1000);
          
          // Brick offset only for floor
          if (pattern === "brick" && row % 2 === 1) {
            x += layout.patternOffsetX;
          }

          // Convert from meters to millimeters for consistency with positionMM naming
          result.push({
            surface: "floor", // Steps are treated as floor surfaces
            positionMM: { 
              x: x * 1000,  // Convert meters to mm
              y: y * 1000   // Convert meters to mm
            },
            isFloor: true,
            stepIndex: step // Track which step this tile belongs to
          });
        }
      }
    }
    
    return result;
  }
  
  const surfaces = {
    floor: { w: room.width, h: room.depth },
    back_wall: { w: room.width, h: room.height },
    left_wall: { w: room.depth, h: room.height },
    right_wall: { w: room.depth, h: room.height }
  };

  const applySurface = (key) => {
    const surface = surfaces[key];
    if (!surface) return;

    const layout = calculateTileLayout(
      surface.w,
      surface.h,
      tileSize.width,
      tileSize.height,
      pattern,
      key === "floor"
    );

    for (let row = 0; row < layout.tilesY; row++) {
      for (let col = 0; col < layout.tilesX; col++) {
        // Convert effective tile dimensions from mm to meters for position calculation
        let x = layout.startX + col * (layout.effectiveTileWidth / 1000);
        let y = layout.startY + row * (layout.effectiveTileHeight / 1000);

        // Brick offset only for floor
        if (pattern === "brick" && key === "floor" && row % 2 === 1) {
          x += layout.patternOffsetX;
        }

        // Convert from meters to millimeters for consistency with positionMM naming
        result.push({
          surface: key,
          positionMM: { 
            x: x * 1000,  // Convert meters to mm
            y: y * 1000   // Convert meters to mm
          },
          isFloor: key === "floor"
        });
      }
    }
  };

  /* ---------------- AREA RULES ---------------- */

  if (areaType === "floor") {
    applySurface("floor");
  }

  // Apply all walls together
  if (areaType === "wall") {
    // For elevation model (thin depth), only apply to main wall
    if (room.depth <= 300) {  // Elevation has depth of 300mm
      applySurface("back_wall");
    } else {
      applySurface("back_wall");
      applySurface("left_wall");
      applySurface("right_wall");
    }
  }

  return result;
}

/* ------------------------------------------------------------------ */
/* DEFAULT EXPORT                                                      */
/* ------------------------------------------------------------------ */

export default {
  getTiles,
  addTile,
  deleteTile,
  getTilesByRoomAndArea,
  parseDimensions,
  generateTiles
};
