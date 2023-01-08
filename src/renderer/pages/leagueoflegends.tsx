import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export const LeagueOfLegends = () => {
  const games = useSelector((state: RootState) => state.common.games);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    games.forEach((value) => {
      if (value.type === 'LEAGUE_OF_LEGENDS') {
        setIsRunning(value.isRunning);
      }
    });
  }, [games])

  return (
    <div>
      {`League of Legends ${isRunning === true ? 'ON' : 'OFF'}`}
    </div>
  );
}