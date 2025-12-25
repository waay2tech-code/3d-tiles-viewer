import React from 'react';

const MeasurementDisplay = ({ 
  width, 
  height, 
  area, 
  unit = 'm', 
  tilesCount = 0, 
  wastePercentage = 10 
}) => {
  return (
    <div className="measurement-display">
      <div className="measurements">
        <div className="measurement-item">
          <label>Width:</label>
          <span>{width.toFixed(2)} {unit}</span>
        </div>
        <div className="measurement-item">
          <label>Height:</label>
          <span>{height.toFixed(2)} {unit}</span>
        </div>
        <div className="measurement-item">
          <label>Area:</label>
          <span>{area.toFixed(2)} {unit}²</span>
        </div>
        <div className="measurement-item">
          <label>Tiles Needed:</label>
          <span>{tilesCount}</span>
        </div>
        <div className="measurement-item">
          <label>Including Waste ({wastePercentage}%):</label>
          <span>{Math.ceil(tilesCount * (1 + wastePercentage / 100))}</span>
        </div>
      </div>
      
      <style jsx>{`
        .measurement-display {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
        }
        
        .measurements {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .measurement-item {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          border-bottom: 1px solid #eee;
        }
        
        .measurement-item:last-child {
          border-bottom: none;
        }
        
        .measurement-item label {
          font-weight: bold;
          color: #333;
        }
        
        .measurement-item span {
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default MeasurementDisplay;