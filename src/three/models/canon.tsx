import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Material, MeshStandardMaterial, Vector3 } from "three";
import { useDispatch, useSelector } from "react-redux";
import { boardsActions } from "../../redux/boards/boards.slice";
import { RocketLauncher } from "./RocketLauncher";
import { Rocket } from "./Rocket";
import { boardsSelectors } from "../../redux/boards/boards.selectors";

export const Cannon = ({
  bulletRef,
  bulletFired,
  setBulletFired,
  isPlayer,
  isSecondAnimation
}) => {
  const cannonRef: any = useRef();
  const dispatch = useDispatch();
  const secondAnimationXandY = useSelector(boardsSelectors.getSecondAnimationXandY)

  const cannonGeometry: any = [0.2, 0.2, 1, 16];


  let canonPosition;
  let rocketPosition;
  const canonRotation: any = [0, 0, Math.PI * 0.5];

  if(!isSecondAnimation){
    if (isPlayer) {
      canonPosition = [-2.8, -2.8, 2.5];
      rocketPosition = [-2.4, -1.5, 0.70];
    } else {
      canonPosition = [2.0, -2.8, 2.5];
      rocketPosition = [2.4, -1.5, 0.70];
    }
  } else {
    if (isPlayer) {
      canonPosition = [-2.8, -2.8, 2.5];
      rocketPosition = [secondAnimationXandY.x, 5, 0.10];
    } else {
      canonPosition = [2.0, -2.8, 2.5];
      rocketPosition = [secondAnimationXandY.x, 5, 0.10];
    }
  }
 



  // Ustawianie rotacji armaty w kierunku strzału
  //   useFrame(({ camera }) => {
  //     if (bulletRef.current) {
  //       const direction = new Vector3();
  //       direction.subVectors(
  //         bulletRef.current.position,
  //         cannonRef.current.position
  //       );
  //       cannonRef.current.rotation.z =
  //         Math.atan2(direction.y, direction.x) - Math.PI / 2;
  //     }
  //   });

  const material = new MeshStandardMaterial({ color: "black" });
  return (
    <>
      {/* Model armaty */}
      <mesh ref={cannonRef} scale={1}>
        {/* <cylinderGeometry args={cannonGeometry} />
        <meshStandardMaterial color="gray" /> */}
        <RocketLauncher
          scale={[20, 35, 35]}
          position={canonPosition}
          rotation={canonRotation}
        />
      </mesh>

      {/* Kula */}
      {bulletFired && <Rocket isSecondAnimation={isSecondAnimation} isPlayer={isPlayer} bulletFired={bulletFired} setBulletFired={setBulletFired} bulletRef={bulletRef} position={rocketPosition} />}

      {/* Przycisk strzału */}
    </>
  );
};
