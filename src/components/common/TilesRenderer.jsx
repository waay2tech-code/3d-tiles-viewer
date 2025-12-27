import React from "react";
import Tile3D from "./Tile3D";
import { getSurfaceOrientation } from "../../core/surfaceOrientation";

export default function TilesRenderer({ tiles, tile, roomDimensions }) {
  const room = roomDimensions || {
    width: 3000,
    depth: 2500,
    height: 2700
  };

  const roomWidthM = room.width / 1000;
  const roomDepthM = room.depth / 1000;
  const roomHeightM = room.height / 1000;

  // Check if this is an elevation model (thin depth)
  const isElevation = room.depth <= 300;

  const tileDimensions =
    tile && tile.width && tile.height
      ? { width: tile.width, height: tile.height }
      : { width: 300, height: 300 };

  const tileWidthM = tileDimensions.width / 1000;
  const tileHeightM = tileDimensions.height / 1000;

  return tiles.map((t, i) => {
    let position = [0, 0, 0];

    const x = t.positionMM.x / 1000;
    const y = t.positionMM.y / 1000;

    switch (t.surface) {
      /* ============ FLOOR ============ */
      case "floor":
        position = [
          x,
          -roomHeightM / 2 + 0.05 + 0.0025,
          y
        ];
        break;

      /* ============ BACK WALL ============ */
      case "back_wall":
        if (isElevation) {
          // For elevation model, place tiles on the front face of the wall
          position = [
            x,
            -roomHeightM / 50 + y,  // Start from floor and move up
            0.15 + 0.005  // Front face of elevation wall + tile offset
          ];
        } else {
          position = [
            x,
            -roomHeightM / 50 + y,  // Start from floor and move up
            -roomDepthM / 2 + 0.05 + 0.005  // Wall surface + tile offset
          ];
        }
        break;

      /* ============ LEFT WALL ============ */
      case "left_wall":
        position = [
          -roomWidthM / 2 + 0.05 + 0.005,  // Wall surface + tile offset
          -roomHeightM / 50 + y,  // Start from floor and move up
          x
        ];
        break;

      /* ============ RIGHT WALL ============ */
      case "right_wall":
        position = [
          roomWidthM / 2 - 0.05 - 0.005,  // Wall surface - tile offset
          -roomHeightM / 50 + y,  // Start from floor and move up
          x
        ];
        break;

      default:
        position = [x, 0, y];
    }

    const { rotation, isFloor } = getSurfaceOrientation(t.surface);

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