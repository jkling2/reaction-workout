import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export enum ReactionWorkoutMode {
    NUMBER,
    COLOR,
    NAME,
    DIRECTION,
}

export enum Reaction {
    ON_CLICK,
    TIME,
}

export const ReactionWorkoutContext = React.createContext({
  mode: 0,
  area: ['0', '2'],
  reaction: 0,
  time: 0,
  repeat: true,
  setMode: (mode: number) => {},
  setArea: (area: string[]) => {},
  setReaction: (reaction: number) => {},
  setTime: (time: number) => {},
  setRepeat: (repeat: boolean) => {}, 
});

function getInitialValues(search: string): [number, string[], number, number, boolean] {
  const searchParams = new URLSearchParams(search);

  // TODO: verify that only valid numbers are given!!!
  const mode: number = parseInt(searchParams.get('mode') || '0') || ReactionWorkoutMode.NUMBER;
  const area: string[] = (searchParams.get('area') || "0_2").split('_') || ['0', '2'];
  const reactionWithTime = (searchParams.get('reaction') || '0').split('_');
  const reaction: number = parseInt(reactionWithTime[0]) || Reaction.ON_CLICK;
  const time: number = parseInt(reactionWithTime.length>1 ? reactionWithTime[1] : '0') || 0;
  const repeat: boolean = searchParams.get('repeat') === "true" ? true : false;
  return [mode, area, reaction, time, repeat];
}

export const ReactionWorkoutContextProvider: React.FC = props => {
  const history = useHistory();
  const location = useLocation();

  const initialValues: [number, string[], number, number, boolean] = (() => getInitialValues(location.search))();

  const [mode, setMode] = useState<number>(initialValues[0]);
  const [area, setArea] = useState<string[]>(initialValues[1]);
  const [reaction, setReaction] = useState<number>(initialValues[2]);
  const [time, setTime] = useState<number>(initialValues[3]);
  const [repeat, setRepeat] = useState<boolean>(initialValues[4]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('mode', `${mode}`);
    searchParams.set('area', `${area.join('_')}`);
    searchParams.set('reaction', reaction === 0 ? `${reaction}` : `${reaction}_${time}`);
    searchParams.set('repeat', `${repeat}`);

    history.push(`?${searchParams.toString()}`);
  }, [mode, area, reaction, time, repeat, history, location.search]);

  return (
    <ReactionWorkoutContext.Provider
      value={{
        mode: mode,
        area: area,
        reaction: reaction,
        time: time,
        repeat: repeat,
        setMode: setMode,
        setArea: setArea,
        setReaction: setReaction,
        setTime: setTime,
        setRepeat: setRepeat,
      }}
    >
      {props.children}
    </ReactionWorkoutContext.Provider>
  );
};
