/**
 * Predefined tile presets for quick selection
 */

export const tilePresets = [
  {
    id: 'ceramic-standard',
    name: 'Standard Ceramic',
    type: 'ceramic',
    size: { width: 0.3, height: 0.3 },
    color: '#f5f5f5',
    texture: null,
    description: 'Standard ceramic tile, 30x30cm'
  },
  {
    id: 'porcelain-large',
    name: 'Large Porcelain',
    type: 'porcelain',
    size: { width: 0.6, height: 0.6 },
    color: '#e6e6fa',
    texture: null,
    description: 'Large porcelain tile, 60x60cm'
  },
  {
    id: 'wood-plank',
    name: 'Wood Plank',
    type: 'wood',
    size: { width: 0.2, height: 0.8 },
    color: '#d2b48c',
    texture: null,
    description: 'Wood plank tile, 20x80cm'
  },
  {
    id: 'stone-rectangle',
    name: 'Rectangle Stone',
    type: 'natural_stone',
    size: { width: 0.3, height: 0.6 },
    color: '#a9a9a9',
    texture: null,
    description: 'Rectangle natural stone tile, 30x60cm'
  },
  {
    id: 'vinyl-checkerboard',
    name: 'Checkerboard Vinyl',
    type: 'vinyl',
    size: { width: 0.3, height: 0.3 },
    color: '#ffffff',
    texture: null,
    description: 'Checkerboard pattern vinyl tile, 30x30cm'
  }
];

export const getTilePresetById = (id) => {
  return tilePresets.find(preset => preset.id === id);
};

export const getDefaultTilePreset = () => {
  return tilePresets[0]; // Standard ceramic as default
};