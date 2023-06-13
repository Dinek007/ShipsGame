import { BoardDataType, cubeStatuses } from "./boards.slice";

export const BoardConstructor = (
  boardSize: number,
  scale: number
): BoardDataType => {
  let boardPositions: BoardDataType = [];
  let row = 1;
  let column = 1;
  const length = scale * boardSize;
  const borderPosition = length / 2;

  for (let i = 0 - borderPosition; i < borderPosition; i = i + scale) {
    for (let j = 0 - borderPosition; j < borderPosition; j = j + scale) {
      const name = `box${column}_${row}`;
      boardPositions.push({ x: j, y: i, id: name, status: cubeStatuses.New });
      row++;
    }
    column++;
    row = 1;
  }

  return boardPositions;
};

export const FillCubes = (
  name: string,
  shipToFill: number,
  shipDirection: string,
  boardLength: number
): string[] => {

  let cubes = [];
  const splitedName = name.split("box");
  const splitedXandY: any = splitedName[1].split("_");
  let splitedY = Number(splitedXandY[0]);
  let splitedX = Number(splitedXandY[1]);

  if ((splitedX + shipToFill- 2 < boardLength && shipDirection ==="row") ||
   (splitedY + shipToFill - 2 < boardLength && shipDirection ==="column")) {
    for (let i = 0; i < shipToFill; i++) {
      if(shipDirection ==="row"){
        cubes.push(`box${splitedY}_${splitedX + i}`);
      } else {cubes.push(`box${splitedY+ i}_${splitedX }`)}
    }
  }
  
  else {
    for (let i = 0; i > -shipToFill; i--) {
      if(shipDirection ==="row"){
      cubes.push(`box${splitedY}_${splitedX + i}`);
      } else { cubes.push(`box${splitedY+ i}_${splitedX }`);}
    }
  }
  return cubes;
};

export const shipsScales = {
  ship1:0.08,
  ship2:0.15,
  ship3:0.22,
  ship4:0.3
}

export const shipRotationChosing:any = [Math.PI * 1.5, 0, Math.PI * 1.5];

export const shipRotationBoard:any = {
  column: [Math.PI * 2, 0, Math.PI],
  row: [Math.PI * 2, 0, Math.PI / 2]
}

export const getXandYfromCubeNames = (cubeNames:string[], direction:string, state: BoardDataType, shipLength: number) => {
  let sumOfXorY = 0;
  let secondXorY = 0;
  cubeNames.forEach((name) => {
    const cube = state.filter((item)=>{
      return item.id === name
    })
    if (direction === "row") {
      sumOfXorY += cube[0].x;
      secondXorY = cube[0].y;
    }
    if (direction === "column") {
      sumOfXorY += cube[0].y;
      secondXorY = cube[0].x;
    }
  });

  return direction === "row"
    ? { y: secondXorY, x: sumOfXorY / shipLength }
    : { x: secondXorY, y: sumOfXorY / shipLength };
}


export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
