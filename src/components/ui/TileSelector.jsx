import React, { useState } from 'react';
import { TILE_TYPES, STANDARD_TILE_SIZES } from '../../core/constants';

const TileSelector = ({ onTileChange, selectedTileType = 'ceramic' }) => {
  const [selectedSize, setSelectedSize] = useState('MEDIUM');
  
  const handleTileTypeChange = (type) => {
    onTileChange({
      type,
      size: STANDARD_TILE_SIZES[selectedSize]
    });
  };
  
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    onTileChange({
      type: selectedTileType,
      size: STANDARD_TILE_SIZES[size]
    });
  };
  
  return (
    <div className="tile-selector">
      <h3>Select Tile Type</h3>
      <div className="tile-type-selector">
        {Object.entries(TILE_TYPES).map(([key, value]) => (
          <button
            key={value}
            className={`tile-type-btn ${selectedTileType === value ? 'active' : ''}`}
            onClick={() => handleTileTypeChange(value)}
          >
            {key.charAt(0) + key.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      
      <h3>Select Tile Size</h3>
      <div className="tile-size-selector">
        {Object.entries(STANDARD_TILE_SIZES).map(([key, value]) => (
          <button
            key={key}
            className={`tile-size-btn ${selectedSize === key ? 'active' : ''}`}
            onClick={() => handleSizeChange(key)}
          >
            {key.charAt(0) + key.slice(1).toLowerCase()} - 
            {value.width.toFixed(2)}m x {value.height.toFixed(2)}m
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .tile-selector {
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .tile-type-selector, .tile-size-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .tile-type-btn, .tile-size-btn {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .tile-type-btn:hover, .tile-size-btn:hover {
          background: #e2e8f0;
        }
        
        .tile-type-btn.active, .tile-size-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default TileSelector;