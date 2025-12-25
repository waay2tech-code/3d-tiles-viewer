/**
 * Constants used throughout the 3D Tiles Viewer application
 */

// Tile Types
export const TILE_TYPES = {
  CERAMIC: 'ceramic',
  PORCELAIN: 'porcelain',
  NATURAL_STONE: 'natural_stone',
  VINYL: 'vinyl',
  WOOD: 'wood',
  CARPET: 'carpet',
  CONCRETE: 'concrete'
};

// Tile Patterns
export const TILE_PATTERNS = {
  GRID: 'grid',
  DIAGONAL: 'diagonal',
  HERRINGBONE: 'herringbone',
  BRICK_BOND: 'brick_bond',
  HEXAGON: 'hexagon'
};

// Standard Tile Sizes (in meters)
export const STANDARD_TILE_SIZES = {
  SMALL: { width: 0.15, height: 0.15 },     // 150mm x 150mm
  MEDIUM: { width: 0.3, height: 0.3 },      // 300mm x 300mm
  LARGE: { width: 0.6, height: 0.6 },       // 600mm x 600mm
  RECTANGLE: { width: 0.3, height: 0.6 }    // 300mm x 600mm
};

// Room Types
export const ROOM_TYPES = {
  BATHROOM: 'bathroom',
  KITCHEN: 'kitchen',
  LIVING_ROOM: 'living_room',
  BEDROOM: 'bedroom',
  HALLWAY: 'hallway',
  OUTDOOR: 'outdoor'
};

// Material Properties
export const MATERIAL_PROPERTIES = {
  CERAMIC: {
    roughness: 0.7,
    metalness: 0.1,
    reflectivity: 0.2
  },
  PORCELAIN: {
    roughness: 0.5,
    metalness: 0.05,
    reflectivity: 0.4
  },
  NATURAL_STONE: {
    roughness: 0.8,
    metalness: 0.0,
    reflectivity: 0.1
  }
};

// Default Settings
export const DEFAULT_SETTINGS = {
  UNIT: 'm',
  DECIMAL_PLACES: 2,
  WASTE_PERCENTAGE: 10,
  LIGHT_INTENSITY: 1.0
};

// Colors
export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#64748b',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  BACKGROUND: '#f8fafc'
};

// Measurement Units
export const UNITS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial'
};

// Texture Mapping
export const TEXTURE_MAPPING = {
  REPEAT: 'repeat',
  CLAMP: 'clamp',
  MIRROR: 'mirror'
};

// Performance Settings
export const PERFORMANCE = {
  MAX_TILES_RENDERED: 10000,
  LOD_DISTANCE: 10,
  FRUSTUM_CULLING: true
};