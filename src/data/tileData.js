// Tile data with predefined dimensions based on client requirements
// All dimensions are in millimeters (mm)
export const TILE_DIMENSIONS = {
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
      { name: "300 X 300", width: 300, height: 300 },
      { name: "600 X 600", width: 600, height: 600 },
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

export default TILE_DIMENSIONS;