import React, { useEffect, useRef, useState } from "react";
import {
  BoxGeometry,
  Clock,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
} from "three";
import { boardsActions, cubeStatuses } from "../../redux/boards/boards.slice";
import { useDispatch, useSelector } from "react-redux";
import { informationsSelectors } from "../../redux/informations/informations.selectors";
import { FillCubes } from "../../redux/boards/boardConstructor";
import { boardsSelectors } from "../../redux/boards/boards.selectors";

export const Cube: React.FC<any> = ({
  shipToFill,
  shipDirection,
  boardLength,
  position,
  id,
  isPlayer,
  scale,
  material,
  onPointerLeave,
  onPointerEnter,
  onClick,
  reff,
  status,
}) => {

  const geometry = new BoxGeometry(1, 1, 1);

  const edgesGeometry = new EdgesGeometry(geometry);
  const lineMaterial = new LineBasicMaterial({ color: 0x000000 });

  let cubes;

  if (id && isPlayer) {
    cubes = FillCubes(id, shipToFill, shipDirection, boardLength);
  }

  return (
    <group>
      <mesh
        ref={reff}
        onPointerLeave={() => onPointerLeave(id, cubes)}
        onPointerMove={(event) => onPointerEnter(id, cubes, event)}
        onClick={() => onClick()}
        material={material}
        geometry={geometry}
        position={position}
        scale={[0.4, 0.4, 0.0001]}
      />
      <lineSegments
        material={lineMaterial}
        geometry={edgesGeometry}
        position={position}
        scale={[scale, scale, 0.0001]}
      />
    </group>
  );
};
