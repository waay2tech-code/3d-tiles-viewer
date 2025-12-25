/**
 * Deterministic surface orientation for architectural rooms
 * DO NOT use normals or quaternions for rooms
 */

export const getSurfaceOrientation = (surface) => {
  switch (surface) {
    case "floor":
      return {
        rotation: [-Math.PI / 2, 0, 0],
        isFloor: true
      };

    case "back_wall":
      return {
        rotation: [0, 0, 0],
        isFloor: false
      };

    case "left_wall":
      return {
        rotation: [0, Math.PI / 2, 0],
        isFloor: false
      };

    case "right_wall":
      return {
        rotation: [0, -Math.PI / 2, 0],
        isFloor: false
      };

    default:
      return {
        rotation: [0, 0, 0],
        isFloor: false
      };
  }
};
