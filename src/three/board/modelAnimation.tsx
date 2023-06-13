import { useRef, useState } from "react";
import { Model } from "../models/Ship";
import { useFrame } from "@react-three/fiber";
import {
  shipRotationBoard,
  shipRotationChosing,
  shipsScales,
} from "../../redux/boards/boardConstructor";
import { useDispatch } from "react-redux";
import { boardsActions } from "../../redux/boards/boards.slice";

export const ModelAnimation = ({ship}) => {
  const modelRef = useRef(null);
  const [animationFinished, setAnimationFinished] = useState(false);
    const dispatch = useDispatch()
  const targetPosition = [ship.x, ship.y, 0.2];

  
  const checkAnimationFinished = () => {
    if (modelRef.current) {
      const precision = 0.001;
      const positionFinished =
        Math.abs(modelRef.current.position.x - targetPosition[0]) < precision &&
        Math.abs(modelRef.current.position.y - targetPosition[1]) < precision &&
        Math.abs(modelRef.current.position.z - targetPosition[2]) < precision;

      if (positionFinished) {
        dispatch(boardsActions.setShipArrived(ship.id))
        setAnimationFinished(true);
      }
    }
  };

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x +=
        (targetPosition[0] - modelRef.current.position.x) * 0.02;
      modelRef.current.position.y +=
        (targetPosition[1] - modelRef.current.position.y) * 0.02;
      modelRef.current.position.z +=
        (targetPosition[2] - modelRef.current.position.z) * 0.02;
    }

    checkAnimationFinished();
  });

  if (animationFinished) {
    return null; // Jeśli animacja zakończona, nie renderuj komponentu
  }

  return (
    <mesh ref={modelRef} position={[-5, ship.y, 0.2]} >
      <Model
        scale={shipsScales[`ship${ship.length}`]}
        rotation={shipRotationChosing}
        position={[0, 0, 0]}
      />
    </mesh>
  );
};
