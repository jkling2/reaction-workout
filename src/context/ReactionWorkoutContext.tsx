import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactionType } from '../reaction_type/ReactionTypeEnum';

export enum ReactionKind {
    ON_CLICK,
    TIME,
}

export const ReactionWorkoutContext = React.createContext({
  type: 0,
  area: ['0', '2'],
  kind: 0,
  time: 0,
  repeat: true,
  setType: (type: number) => {},
  setArea: (area: string[]) => {},
  setKind: (kind: number) => {},
  setTime: (time: number) => {},
  setRepeat: (repeat: boolean) => {}, 
});

function getInitialValues(search: string): [number, string[], number, number, boolean] {
  const searchParams = new URLSearchParams(search);

  // TODO: verify that only valid numbers are given!!!
  const type: number = parseInt(searchParams.get('type') || '0') || ReactionType.NUMBER;
  const area: string[] = (searchParams.get('area') || "0_2").split('_') || ['0', '2'];
  const reactionWithTime = (searchParams.get('kind') || '0').split('_');
  const kind: number = parseInt(reactionWithTime[0]) || ReactionKind.ON_CLICK;
  const time: number = parseInt(reactionWithTime.length>1 ? reactionWithTime[1] : '0') || 0;
  const repeat: boolean = searchParams.get('repeat') === "true" ? true : false;
  return [type, area, kind, time, repeat];
}

export const ReactionWorkoutContextProvider: React.FC = props => {
  const history = useHistory();
  const location = useLocation();

  const initialValues: [number, string[], number, number, boolean] = (() => getInitialValues(location.search))();

  const [type, setType] = useState<number>(initialValues[0]);
  const [area, setArea] = useState<string[]>(initialValues[1]);
  const [kind, setKind] = useState<number>(initialValues[2]);
  const [time, setTime] = useState<number>(initialValues[3]);
  const [repeat, setRepeat] = useState<boolean>(initialValues[4]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('type', `${type}`);
    searchParams.set('area', `${area.join('_')}`);
    searchParams.set('kind', kind === 0 ? `${kind}` : `${kind}_${time}`);
    searchParams.set('repeat', `${repeat}`);

    history.push(`?${searchParams.toString()}`);
  }, [type, area, kind, time, repeat, history, location.search]);

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
