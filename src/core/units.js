/**
 * Utility functions for unit conversion and measurements
 */

// Conversion factors
const METERS_TO_FEET = 3.28084;
const FEET_TO_METERS = 0.3048;
const INCHES_TO_METERS = 0.0254;
const METERS_TO_INCHES = 39.3701;

// Unit conversion functions
export const metersToFeet = (meters) => meters * METERS_TO_FEET;
export const feetToMeters = (feet) => feet * FEET_TO_METERS;
export const inchesToMeters = (inches) => inches * INCHES_TO_METERS;
export const metersToInches = (meters) => meters * METERS_TO_INCHES;

// Area conversions
export const squareMetersToSquareFeet = (sqMeters) => sqMeters * METERS_TO_FEET * METERS_TO_FEET;
export const squareFeetToSquareMeters = (sqFeet) => sqFeet * FEET_TO_METERS * FEET_TO_METERS;

// Volume conversions
export const cubicMetersToCubicFeet = (cubicMeters) => cubicMeters * METERS_TO_FEET * METERS_TO_FEET * METERS_TO_FEET;
export const cubicFeetToCubicMeters = (cubicFeet) => cubicFeet * FEET_TO_METERS * FEET_TO_METERS * FEET_TO_METERS;

// Tile-specific calculations
export const calculateTileArea = (tileWidth, tileHeight, unit = 'm') => {
  const widthInMeters = unit === 'in' ? inchesToMeters(tileWidth) : 
                       unit === 'ft' ? feetToMeters(tileWidth) : tileWidth;
  const heightInMeters = unit === 'in' ? inchesToMeters(tileHeight) : 
                        unit === 'ft' ? feetToMeters(tileHeight) : tileHeight;
  
  return widthInMeters * heightInMeters;
};

export const calculateTilesNeeded = (area, tileWidth, tileHeight, unit = 'm', wastePercentage = 10) => {
  const tileArea = calculateTileArea(tileWidth, tileHeight, unit);
  const baseTiles = area / tileArea;
  const withWaste = baseTiles * (1 + wastePercentage / 100);
  
  return Math.ceil(withWaste);
};

// Formatting functions
export const formatMeasurement = (value, unit = 'm', decimals = 2) => {
  const formattedValue = value.toFixed(decimals);
  const unitSymbols = {
    'm': 'm',
    'ft': 'ft',
    'in': 'in',
    'cm': 'cm',
    'mm': 'mm'
  };
  
  return `${formattedValue}${unitSymbols[unit] || unit}`;
};

export const formatArea = (area, unit = 'm²', decimals = 2) => {
  const formattedArea = area.toFixed(decimals);
  return `${formattedArea}${unit}`;
};

// Validate measurement inputs
export const isValidMeasurement = (value) => {
  return typeof value === 'number' && isFinite(value) && value >= 0;
};