import React, { useState } from 'react';

const DimensionInput = ({ onDimensionsChange, initialDimensions = { width: 5, height: 5 } }) => {
  const [dimensions, setDimensions] = useState(initialDimensions);
  
  const handleChange = (field, value) => {
    const newDimensions = {
      ...dimensions,
      [field]: parseFloat(value) || 0
    };
    setDimensions(newDimensions);
    onDimensionsChange(newDimensions);
  };
  
  return (
    <div className="dimension-input">
      <h3>Room Dimensions</h3>
      <div className="input-group">
        <label htmlFor="width">Width (m):</label>
        <input
          id="width"
          type="number"
          min="0.1"
          step="0.1"
          value={dimensions.width}
          onChange={(e) => handleChange('width', e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="height">Height (m):</label>
        <input
          id="height"
          type="number"
          min="0.1"
          step="0.1"
          value={dimensions.height}
          onChange={(e) => handleChange('height', e.target.value)}
        />
      </div>
      
      <style jsx>{`
        .dimension-input {
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .input-group {
          margin-bottom: 12px;
        }
        
        label {
          display: block;
          margin-bottom: 4px;
          font-weight: bold;
          color: #333;
        }
        
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 16px;
        }
        
        input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default DimensionInput;