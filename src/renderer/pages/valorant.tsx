import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export const Valorant = () => {
  const games = useSelector((state: RootState) => state.common.games);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    games.forEach((value) => {
      if (value.type === 'VALORANT') {
        setIsRunning(value.isRunning);
      }
    });
  }, [games])

  return (
    <div>
      {`Valorant ${isRunning === true ? 'ON' : 'OFF'}`}
    </div>
  );
}