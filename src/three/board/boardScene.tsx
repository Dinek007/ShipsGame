import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import CustomOrbitControls from "../orbitControls";
import { Cube } from "../models/cube";
import { useDispatch, useSelector } from "react-redux";
import { informationsSelectors } from "../../redux/informations/informations.selectors";
import { Float } from "@react-three/drei";
import { Model } from "../models/Ship";
import {
  FillCubes,
  shipsScales,
  shipRotationBoard,
} from "../../redux/boards/boardConstructor";
import { boardsSelectors } from "../../redux/boards/boards.selectors";
import {
  BoardDataType,
  ShipsDataType,
  boardsActions,
  cubeStatuses,
  gameStatuses,
  shipStatuses,
} from "../../redux/boards/boards.slice";
import { ModelAnimation } from "./modelAnimation";
import { Cannon } from "../models/canon";
import { Plane } from "../models/plane";
import { MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";

export const BoardScene: React.FC<{
  boardData: BoardDataType;
  playerShips: ShipsDataType;
  isPlayer: boolean;
  bulletRef: any;
  bulletFired;
  setBulletFired;
  fireBullet;
  isSecondAnimation: boolean;
  flameTexture
}> = ({
  boardData,
  playerShips,
  isPlayer,
  bulletRef,
  bulletFired,
  setBulletFired,
  fireBullet,
  isSecondAnimation,
  flameTexture
}) => {
  const boardLength = useSelector(informationsSelectors.gameOptions).boardSize;
  const shipToFill = useSelector(boardsSelectors.shipToFill);
  const shipDirection = useSelector(boardsSelectors.shipToFillDirection);
  const gameStatus = useSelector(boardsSelectors.gameStatus);
  const cubeRefs = useRef<{ [key: string]: THREE.Mesh }>({});

  const dispatch = useDispatch();

  const cubeOnclickHandler = (id) => {
    //shipsFill
    if (shipToFill && isPlayer) {
      let cubes;
      cubes = FillCubes(id, shipToFill, shipDirection, boardLength);
      dispatch(
        boardsActions.setPlayerShips({
          cubeNames: cubes,
          direction: shipDirection,
        })
      );
    }

    //player turn
    if (gameStatus === gameStatuses.playerTurn) {
      const cubeData = boardData.find((cubeName) => {
        return cubeName.id === id;
      });

      if (
        cubeData.status !== cubeStatuses.New &&
        cubeData.status !== cubeStatuses.aiFilled
      )
        return;
      dispatch(boardsActions.playerHit(id));
    }
  };

  const handlePointerEnter = (cubeId: string, cubes) => {
    //player turn

    // Zmień kolor wybranej kostki
    const selectedCube: any = cubeRefs.current[cubeId];
    const cubeData = boardData.find((cubeData) => {
      return cubeData.id === cubeId;
    });
    if (
      (shipToFill && isPlayer) ||
      (!isPlayer && gameStatus === gameStatuses.playerTurn)
    ) {
      if (
        cubeData.status !== cubeStatuses.New &&
        cubeData.status !== cubeStatuses.aiFilled
      )
        return;
      if (selectedCube) selectedCube.material.color.set(0x77cc22);
    }

    if (isPlayer) {
      // Zmień kolor sąsiadujących kostek
      const adjacentCubes = cubes; // Implementacja funkcji getAdjacentCubes() zależy od układu kostek
      adjacentCubes.forEach((adjacentId) => {
        const cubeData = boardData.find((cubeData) => {
          return cubeData.id === adjacentId;
        });
        if (cubeData.status !== cubeStatuses.New) return;
        const adjacentCube: any = cubeRefs.current[adjacentId];
        if (adjacentCube) adjacentCube.material.color.set(0x77ee22);
      });
    }
  };

  const handlePointerLeave = (cubeId, cubes) => {
    // Przywróć pierwotny kolor wszystkich kostek

    if (isPlayer) {
      cubes.forEach((cube) => {
        const cubeData = boardData.find((cubeData) => {
          return cubeData.id === cube;
        });
        if (cubeData.status !== cubeStatuses.New) return;
        const adjacentCube: any = cubeRefs.current[cube];
        if (cube) adjacentCube.material.color.set(0xffffff);
      });
    } else {
      if (gameStatus === gameStatuses.playerTurn) {
        const cubeData = boardData.find((cubeName) => {
          return cubeName.id === cubeId;
        });
        if (
          cubeData.status !== cubeStatuses.New &&
          cubeData.status !== cubeStatuses.aiFilled
        )
          return;
        const cube: any = cubeRefs.current[cubeId];
        if (cubeId) cube.material.color.set(0xffffff);
      }
    }
  };

  return (
    <Canvas>
      <mesh position={[0, 0.5, 0]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 1.5]} intensity={1.1} />
        <CustomOrbitControls />
        <Float speed={0} rotationIntensity={0} floatIntensity={0}>
          <Plane />
          {boardData.map((cube) => {
            let material;
            switch (cube.status) {
              case cubeStatuses.New:
                material = new MeshStandardMaterial({ color: 0xffffff });
                break;
              case cubeStatuses.aiFilled:
                material = new MeshStandardMaterial({ color: 0xffffff });
                break;
              case cubeStatuses.filled:
                material = new MeshStandardMaterial({ color: 0x00e8cf });
                break;
              case cubeStatuses.hit:
                 material = new MeshStandardMaterial({ color: 0xff2525, emissive: 0xff0000 });
                // material = new MeshStandardMaterial({
                //   color: 0xff2525,
                //   emissiveMap: flameTexture,
                //   emissive: 0xffaa00,
                //   emissiveIntensity: 1.2,
                // });
                break;
              case cubeStatuses.missed:
                material = new MeshStandardMaterial({ color: 0x888888 });
                break;
            }

            return (
              <mesh key={cube.id}>
                <Cube
                  status={cube.status}
                  reff={(ref) => (cubeRefs.current[cube.id] = ref)}
                  id={cube.id}
                  material={material}
                  position={[cube.x, cube.y, 0]}
                  scale={0.4}
                  onClick={
                    shipToFill || (gameStatus === gameStatuses.playerTurn && !isPlayer)
                      ? () => cubeOnclickHandler(cube.id)
                      : () => {}
                  }
                  onPointerLeave={handlePointerLeave}
                  onPointerEnter={handlePointerEnter}
                  isPlayer={isPlayer}
                  shipToFill={shipToFill}
                  shipDirection={shipDirection}
                  boardLength={boardLength}
                />
              </mesh>
            );
          })}

          {playerShips.length &&
            playerShips.map((ship) => {
              return ship.status === shipStatuses.Arrived ? (
                <Model
                  scale={shipsScales[`ship${ship.length}`]}
                  rotation={shipRotationBoard[ship.direction]}
                  position={[ship.x, ship.y, 0.06]}
                />
              ) : (
                isPlayer && ship.status === shipStatuses.New && (
                  <ModelAnimation ship={ship} />
                )
              );
            })}
        </Float>
      </mesh>
      <Cannon
        bulletRef={bulletRef}
        bulletFired={bulletFired}
        setBulletFired={setBulletFired}
        isPlayer={isPlayer}
        isSecondAnimation={isSecondAnimation}
      />
    </Canvas>
  );
};
