/**
 * Export service for 3D tile projects
 */

import { exportBOQJSON, exportBOQCSV } from './boqService';

// Export project as JSON
export const exportProjectJSON = (projectData) => {
  const exportData = {
    ...projectData,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  return JSON.stringify(exportData, null, 2);
};

// Export project as GLB (placeholder - would need actual 3D model export)
export const exportProjectGLB = (scene, filename) => {
  // This would require additional libraries like three.js GLTFExporter
  // For now, returning a placeholder
  console.warn('GLB export requires additional setup with GLTFExporter');
  return null;
};

// Export project as image
export const exportProjectImage = (canvas, filename = 'tile-project.png') => {
  if (!canvas) {
    console.error('No canvas provided for image export');
    return null;
  }
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
  
  return true;
};

// Export project with multiple formats
export const exportProject = (projectData, exportType, scene = null) => {
  switch(exportType) {
    case 'json':
      return exportProjectJSON(projectData);
    case 'boq-json':
      return exportBOQJSON(projectData.boq);
    case 'boq-csv':
      return exportBOQCSV(projectData.boq);
    case 'glb':
      return exportProjectGLB(scene, projectData.name);
    case 'image':
      // This would need to be called with a canvas reference
      console.warn('Image export requires canvas reference');
      return null;
    default:
      throw new Error(`Unsupported export type: ${exportType}`);
  }
};

// Prepare project data for export
export const prepareExportData = (projectState) => {
  const exportData = {
    name: projectState.name || 'Untitled Project',
    description: projectState.description || '',
    createdDate: projectState.createdDate || new Date().toISOString(),
    lastModified: new Date().toISOString(),
    dimensions: projectState.dimensions,
    tileSpecs: projectState.tileSpecs,
    pattern: projectState.pattern,
    rooms: projectState.rooms || [],
    boq: projectState.boq || null,
    settings: projectState.settings || {}
  };
  
  return exportData;
};

// Import project from JSON
export const importProjectJSON = (jsonString) => {
  try {
    const projectData = JSON.parse(jsonString);
    
    // Validate the imported data
    if (!projectData.name || !projectData.dimensions) {
      throw new Error('Invalid project data format');
    }
    
    return projectData;
  } catch (error) {
    console.error('Error importing project:', error);
    throw new Error('Failed to import project: Invalid JSON format');
  }
};

// Upload project file
export const uploadProjectFile = (file, onProgress = null) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    };
    
    reader.onload = (event) => {
      try {
        const projectData = JSON.parse(event.target.result);
        resolve(projectData);
      } catch (error) {
        reject(new Error('Invalid project file format'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};