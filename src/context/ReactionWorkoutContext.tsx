import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ReactionType } from "../reaction_type/ReactionTypeEnum";

export enum ReactionKind {
  ON_CLICK,
  TIME,
}

export const ReactionWorkoutContext = React.createContext({
  type: 0,
  area: ["0", "2"],
  kind: 0,
  time: 0,
  repeat: 0,
  setType: (type: number) => {},
  setArea: (area: string[]) => {},
  setKind: (kind: number) => {},
  setTime: (time: number) => {},
  setRepeat: (repeat: number) => {},
});

const getTypeOrDefault = (typeToVerify: number) => {
  return ReactionType[typeToVerify] ? typeToVerify : 0;
};

const getKindOrDefault = (kindToVerify: number) => {
  return ReactionKind[kindToVerify] ? kindToVerify : 0;
};

function getInitialValues(
  search: string
): [number, string[][], number, number, number] {
  const searchParams = new URLSearchParams(search);

  const type: number =
    getTypeOrDefault(parseInt(searchParams.get("type") || "0")) ||
    ReactionType.NUMBER;
  const numberArea: string[] = (type === 0 &&
    (searchParams.get("area") || "0_2").split("_")) || ["0", "2"];
  const colorArea: string[] = (type === 1 &&
    (searchParams.get("area") || "blue_red").split("_")) || ["blue", "red"];
  const nameArea: string[] = (type === 2 &&
    (searchParams.get("area") || "left_right").split("_")) || ["left", "right"];
  const directionArea: string[] = (type === 3 &&
    (searchParams.get("area") || "⭠_⭢").split("_")) || ["⭠", "⭢"];
  const reactionWithTime = (searchParams.get("kind") || "0").split("_");
  const kind: number =
    getKindOrDefault(parseInt(reactionWithTime[0])) || ReactionKind.ON_CLICK;
  const time: number =
    parseInt(reactionWithTime.length > 1 ? reactionWithTime[1] : "0") || 0;
  const repeat: number = parseInt(searchParams.get("repeat") || "0");
  return [
    type,
    [numberArea, colorArea, nameArea, directionArea],
    kind,
    time,
    repeat,
  ];
}

export const ReactionWorkoutContextProvider: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();

  const initialValues: [number, string[][], number, number, number] = (() =>
    getInitialValues(location.search))();

  const [type, setType] = useState<number>(initialValues[0]);
  const [areas, setAreas] = useState<string[][]>(initialValues[1]);
  const [area, setArea] = useState<string[]>(areas[type]);
  const [kind, setKind] = useState<number>(initialValues[2]);
  const [time, setTime] = useState<number>(initialValues[3]);
  const [repeat, setRepeat] = useState<number>(initialValues[4]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (area.join("_") !== (searchParams.get("area") || "0_2")) {
      const newAreas = [...areas];
      newAreas[getTypeOrDefault(type)] = area;
      setAreas(newAreas);
    }
    if (type !== getTypeOrDefault(parseInt(searchParams.get("type") || "0"))) {
      setArea(areas[type]);
    }

    searchParams.set("type", `${getTypeOrDefault(type)}`);
    searchParams.set("area", `${area.join("_")}`);
    searchParams.set(
      "kind",
      getKindOrDefault(kind) === 0
        ? `${getKindOrDefault(kind)}`
        : `${kind}_${time}`
    );
    searchParams.set("repeat", `${repeat}`);

    console.log(history.location);
    history.push(`?${searchParams.toString()}`);
  }, [type, area, areas, kind, time, repeat, history, location.search]);

  return (
    <ReactionWorkoutContext.Provider
      value={{
        type: type,
        area: area,
        kind: kind,
        time: time,
        repeat: repeat,
        setType: setType,
        setArea: setArea,
        setKind: setKind,
        setTime: setTime,
        setRepeat: setRepeat,
      }}
    >
      {props.children}
    </ReactionWorkoutContext.Provider>
  );
};
