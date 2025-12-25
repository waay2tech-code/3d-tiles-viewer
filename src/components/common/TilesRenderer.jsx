import React from "react";
import Tile3D from "./Tile3D";
import { getSurfaceOrientation } from "../../core/surfaceOrientation";

export default function TilesRenderer({ tiles, tile, roomDimensions }) {
  const room = roomDimensions || {
    width: 3000,
    depth: 2500,
    height: 2700
  };

  // meters
  const roomWidthM = room.width / 1000;
  const roomDepthM = room.depth / 1000;
  const roomHeightM = room.height / 1000;

  return tiles.map((t, i) => {
    let position = [0, 0, 0];

    const x = t.positionMM.x / 1000;
    const y = t.positionMM.y / 1000;

    switch (t.surface) {
      case "floor":
        position = [
          x,
          -roomHeightM / 2 + 0.05 + 0.0025,  // Floor top surface + tile half thickness
          y
        ];
        break;

      case "back_wall":
        position = [
          x,
          -roomHeightM / 2 + y,
          -roomDepthM / 2 + 0.005
        ];
        break;

      case "left_wall":
        position = [
          -roomWidthM / 2 + 0.005,
          -roomHeightM / 2 + y,
          x
        ];
        break;

      case "right_wall":
        position = [
          roomWidthM / 2 - 0.005,
          -roomHeightM / 2 + y,
          x
        ];
        break;

      default:
        position = [
          x,
          -roomHeightM / 2 + 0.005,
          y
        ];
    }

    const { rotation, isFloor } = getSurfaceOrientation(t.surface);

    // Make sure tile has dimensions before passing to Tile3D
    const tileDimensions = tile && tile.width && tile.height 
      ? { width: tile.width, height: tile.height }
      : { width: 300, height: 300 };

    return (
      <Tile3D
        key={i}
        dimensions={tileDimensions}
        position={position}
        rotation={rotation}
        isFloor={isFloor}
        isSelected={t.isSelected}
      />
    );
  });
}
