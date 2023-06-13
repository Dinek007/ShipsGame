import React, { useEffect, useRef, useState } from "react";
import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { boardsActions, cubeStatuses } from "../../redux/boards/boards.slice";
import { useDispatch, useSelector } from "react-redux";
import { informationsSelectors } from "../../redux/informations/informations.selectors";
import { FillCubes } from "../../redux/boards/boardConstructor";
import { boardsSelectors } from "../../redux/boards/boards.selectors";

export const Plane: React.FC<any> = ({}) => {
  const material = new MeshStandardMaterial({ color: 0xffffff });
  const geometry = new BoxGeometry(1, 1, 1);
  const size = useSelector(informationsSelectors.gameOptions).boardSize;
  let scale;
let position;
  switch (size) {
    case 8:
      scale = 3.2;
      position = -0.2
      break;
    case 9:
      scale = 3.6;
      position = -0.2
      break;
    case 10:
      scale = 4;
      position = -0.2
      break;
    case 11:
      scale = 4.8;
      position = 0
      break;
  }

  return (
    <mesh
      material={material}
      geometry={geometry}
      position={[position, position, 0]}
      scale={[scale, scale, 0.000001]}
    />
  );
};
