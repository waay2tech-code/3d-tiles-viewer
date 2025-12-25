/**
 * Bill of Quantities (BOQ) service for tile projects
 */

import { calculateTileArea, calculateTilesNeeded } from '../core/units';

// Calculate material requirements for a project
export const calculateBOQ = (roomDimensions, tileSpecs, wastePercentage = 10) => {
  const { width, height } = roomDimensions;
  const area = width * height;
  
  const tilesPerSquareMeter = 1 / (tileSpecs.size.width * tileSpecs.size.height);
  const baseTiles = area * tilesPerSquareMeter;
  const tilesWithWaste = calculateTilesNeeded(area, tileSpecs.size.width, tileSpecs.size.height, 'm', wastePercentage);
  
  // Calculate material costs
  const materialCost = tilesWithWaste * (tileSpecs.price || 0);
  const laborCost = area * (tileSpecs.laborRate || 0);
  const totalCost = materialCost + laborCost;
  
  return {
    area: area,
    tileType: tileSpecs.name || tileSpecs.type,
    tileSize: tileSpecs.size,
    baseTiles: Math.ceil(baseTiles),
    tilesRequired: tilesWithWaste,
    wastePercentage: wastePercentage,
    materialCost: materialCost,
    laborCost: laborCost,
    totalCost: totalCost,
    unit: 'm²'
  };
};

// Generate detailed BOQ report
export const generateBOQReport = (projectData) => {
  const report = {
    projectName: projectData.name || 'Untitled Project',
    date: new Date().toISOString().split('T')[0],
    rooms: [],
    totals: {
      totalArea: 0,
      totalTiles: 0,
      totalCost: 0
    }
  };
  
  projectData.rooms.forEach(room => {
    const roomBOQ = calculateBOQ(room.dimensions, room.tileSpecs, room.wastePercentage);
    report.rooms.push({
      name: room.name,
      ...roomBOQ
    });
    
    // Update totals
    report.totals.totalArea += roomBOQ.area;
    report.totals.totalTiles += roomBOQ.tilesRequired;
    report.totals.totalCost += roomBOQ.totalCost;
  });
  
  return report;
};

// Export BOQ as JSON
export const exportBOQJSON = (boqData) => {
  return JSON.stringify(boqData, null, 2);
};

// Export BOQ as CSV
export const exportBOQCSV = (boqData) => {
  let csv = 'Room Name,Area (m²),Tile Type,Tile Size (m),Base Tiles,Tiles Required,Waste %,Material Cost,Labor Cost,Total Cost\n';
  
  boqData.rooms.forEach(room => {
    csv += `${room.name},${room.area.toFixed(2)},${room.tileType},"${room.tileSize.width}x${room.tileSize.height}",${room.baseTiles},${room.tilesRequired},${room.wastePercentage}%,${room.materialCost.toFixed(2)},${room.laborCost.toFixed(2)},${room.totalCost.toFixed(2)}\n`;
  });
  
  csv += `TOTALS,${boqData.totals.totalArea.toFixed(2)},,,,,,${boqData.totals.totalTiles},${boqData.totals.totalCost.toFixed(2)}\n`;
  
  return csv;
};

// Validate BOQ data
export const validateBOQData = (data) => {
  if (!data.rooms || !Array.isArray(data.rooms) || data.rooms.length === 0) {
    return { valid: false, message: 'No rooms specified' };
  }
  
  for (const room of data.rooms) {
    if (!room.dimensions || !room.tileSpecs) {
      return { valid: false, message: `Room ${room.name || 'unnamed'} is missing dimensions or tile specs` };
    }
    
    if (room.dimensions.width <= 0 || room.dimensions.height <= 0) {
      return { valid: false, message: `Room ${room.name || 'unnamed'} has invalid dimensions` };
    }
  }
  
  return { valid: true, message: 'BOQ data is valid' };
};