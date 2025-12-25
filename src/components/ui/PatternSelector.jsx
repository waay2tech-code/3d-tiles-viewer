import React from 'react';
import { TILE_PATTERNS } from '../../core/constants';

const PatternSelector = ({ onPatternChange, selectedPattern = 'grid' }) => {
  
  const handlePatternChange = (pattern) => {
    onPatternChange(pattern);
  };
  
  return (
    <div className="pattern-selector">
      <h3>Select Tile Pattern</h3>
      <div className="pattern-options">
        {Object.entries(TILE_PATTERNS).map(([key, value]) => (
          <button
            key={value}
            className={`pattern-btn ${selectedPattern === value ? 'active' : ''}`}
            onClick={() => handlePatternChange(value)}
          >
            {key.charAt(0) + key.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .pattern-selector {
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .pattern-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .pattern-btn {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .pattern-btn:hover {
          background: #e2e8f0;
        }
        
        .pattern-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default PatternSelector;