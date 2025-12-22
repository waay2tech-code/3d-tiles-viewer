// Shared tile management system
let tiles = [
  // Bathroom tiles
  { id: 1, name: 'Bathroom Standard Wall 1', roomType: 'bathroom', areaType: 'wall', dimensions: '450 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 2, name: 'Bathroom Standard Wall 2', roomType: 'bathroom', areaType: 'wall', dimensions: '600 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 3, name: 'Bathroom Standard Floor', roomType: 'bathroom', areaType: 'floor', dimensions: '300 X 300', imageUrl: '/placeholder-tile.svg' },
  
  // Kitchen tiles
  { id: 4, name: 'Kitchen Standard Wall 1', roomType: 'kitchen', areaType: 'wall', dimensions: '600 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 5, name: 'Kitchen Standard Wall 2', roomType: 'kitchen', areaType: 'wall', dimensions: '450 X 399', imageUrl: '/placeholder-tile.svg' },
  { id: 6, name: 'Kitchen Standard Floor 1', roomType: 'kitchen', areaType: 'floor', dimensions: '600 X 600', imageUrl: '/placeholder-tile.svg' },
  { id: 7, name: 'Kitchen Standard Floor 2', roomType: 'kitchen', areaType: 'floor', dimensions: '300 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 8, name: 'Kitchen Large Floor', roomType: 'kitchen', areaType: 'floor', dimensions: '1200 X 600', imageUrl: '/placeholder-tile.svg' },
  
  // Bedroom tiles
  { id: 9, name: 'Bedroom Standard Wall 1', roomType: 'bedroom', areaType: 'wall', dimensions: '450 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 10, name: 'Bedroom Standard Wall 2', roomType: 'bedroom', areaType: 'wall', dimensions: '600 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 11, name: 'Bedroom Standard Floor 1', roomType: 'bedroom', areaType: 'floor', dimensions: '600 X 600', imageUrl: '/placeholder-tile.svg' },
  { id: 12, name: 'Bedroom Standard Floor 2', roomType: 'bedroom', areaType: 'floor', dimensions: '800 X 800', imageUrl: '/placeholder-tile.svg' },
  { id: 13, name: 'Bedroom Large Floor', roomType: 'bedroom', areaType: 'floor', dimensions: '1200 X 600', imageUrl: '/placeholder-tile.svg' },
  
  // Steps tiles
  { id: 14, name: 'Steps Standard 1', roomType: 'steps', areaType: 'floor', dimensions: '300 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 15, name: 'Steps Standard 2', roomType: 'steps', areaType: 'floor', dimensions: '900 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 16, name: 'Steps Large', roomType: 'steps', areaType: 'floor', dimensions: '1200 X 300', imageUrl: '/placeholder-tile.svg' },
  
  // Elevation tiles
  { id: 17, name: 'Elevation Standard 1', roomType: 'elevation', areaType: 'wall', dimensions: '450 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 18, name: 'Elevation Standard 2', roomType: 'elevation', areaType: 'wall', dimensions: '600 X 300', imageUrl: '/placeholder-tile.svg' },
  
  // Floor tiles
  { id: 19, name: 'Floor Standard', roomType: 'floor', areaType: 'floor', dimensions: '600 X 600', imageUrl: '/placeholder-tile.svg' },
  { id: 20, name: 'Floor Large', roomType: 'floor', areaType: 'floor', dimensions: '1200 X 600', imageUrl: '/placeholder-tile.svg' },
  
  // Parking tiles
  { id: 21, name: 'Parking Small', roomType: 'parking', areaType: 'floor', dimensions: '300 X 300', imageUrl: '/placeholder-tile.svg' },
  { id: 22, name: 'Parking Medium', roomType: 'parking', areaType: 'floor', dimensions: '400 X 400', imageUrl: '/placeholder-tile.svg' },
  { id: 23, name: 'Parking Large', roomType: 'parking', areaType: 'floor', dimensions: '500 X 500', imageUrl: '/placeholder-tile.svg' }
];

// Function to parse dimensions
export const parseDimensions = (dimensionsString) => {
  if (!dimensionsString) return { width: 300, height: 300 };
  
  // Handle case where dimensionsString is the name (e.g., "450 X 300")
  const parts = dimensionsString.split('X').map(part => part.trim());
  if (parts.length === 2) {
    return {
      width: parseInt(parts[0]) || 300,
      height: parseInt(parts[1]) || 300
    };
  }
  return { width: 300, height: 300 };
};

// Function to get dimension details by name
export const getDimensionDetails = (dimensionName, roomType, areaType) => {
  // Import TILE_DIMENSIONS here to avoid circular dependency issues
  const TILE_DIMENSIONS = {
    bathroom: {
      wall: [
        { name: "450 X 300", width: 450, height: 300 },
        { name: "600 X 300", width: 600, height: 300 }
      ],
      floor: [
        { name: "300 X 300", width: 300, height: 300 }
      ]
    },
    kitchen: {
      wall: [
        { name: "450 X 399", width: 450, height: 399 },
        { name: "600 X 300", width: 600, height: 300 }
      ],
      floor: [
        { name: "600 X 600", width: 600, height: 600 },
        { name: "300 X 300", width: 300, height: 300 },
        { name: "1200 X 600", width: 1200, height: 600 }
      ]
    },
    bedroom: {
      wall: [
        { name: "450 X 300", width: 450, height: 300 },
        { name: "600 X 300", width: 600, height: 300 }
      ],
      floor: [
        { name: "600 X 600", width: 600, height: 600 },
        { name: "800 X 800", width: 800, height: 800 },
        { name: "1200 X 600", width: 1200, height: 600 }
      ]
    },
    floor: {
      floor: [
        { name: "600 X 600", width: 600, height: 600 },
        { name: "1200 X 600", width: 1200, height: 600 }
      ]
    },
    parking: {
      floor: [
        { name: "300 X 300", width: 300, height: 300 },
        { name: "400 X 400", width: 400, height: 400 },
        { name: "500 X 500", width: 500, height: 500 }
      ]
    },
    steps: {
      floor: [
        { name: "300 X 300", width: 300, height: 300 },
        { name: "900 X 300", width: 900, height: 300 },
        { name: "1200 X 300", width: 1200, height: 300 }
      ]
    },
    elevation: {
      wall: [
        { name: "450 X 300", width: 450, height: 300 },
        { name: "600 X 300", width: 600, height: 300 }
      ]
    }
  };
  
  // For all rooms, use the areaType to get the correct dimensions
  const dimensions = TILE_DIMENSIONS[roomType]?.[areaType] || [];
  
  // Find the matching dimension
  return dimensions.find(dim => dim.name === dimensionName) || { width: 300, height: 300 };
};

// Get all tiles
export const getTiles = () => {
  return tiles;
};

// Add a new tile
export const addTile = (tileData) => {
  const newId = tiles.length > 0 ? Math.max(...tiles.map(t => t.id)) + 1 : 1;
  const newTile = {
    id: newId,
    ...tileData
  };
  tiles = [...tiles, newTile];
  return newTile;
};

// Delete a tile
export const deleteTile = (tileId) => {
  tiles = tiles.filter(tile => tile.id !== tileId);
};

// Get tiles by room type and area
// Fixed: Ensure proper filtering for floor areas specifically
export const getTilesByRoomAndArea = (roomType, areaType) => {
  // Ensure proper filtering for all room types and area combinations
  // Removed special handling that was interfering with bathroom floor tiles
  
  // Filter by both roomType and areaType for all room types
  return tiles.filter(tile => tile.roomType === roomType && tile.areaType === areaType);
};

export default {
  getTiles,
  addTile,
  deleteTile,
  getTilesByRoomAndArea,
  parseDimensions,
  getDimensionDetails
};