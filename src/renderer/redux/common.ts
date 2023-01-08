import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import LEAGUE_OF_LEGENDS_DEFAULT from '../../../assets/images/icon-02-logo-game-24-px-lol.svg';
import LEAGUE_OF_LEGENDS_HOVER from '../../../assets/images/icon-02-logo-game-24-px-lol-hover.svg';
import VALORANT_DEFAULT from '../../../assets/images/icon-02-logo-game-24-px-valorant.svg';
import VALORANT_HOVER from '../../../assets/images/icon-02-logo-game-24-px-valorant-hover.svg';

const initialState = {
  isMaximize: false,
  currentGameType: 'NONE' as GameType,
  games: [
    {
      type: 'LEAGUE_OF_LEGENDS' as GameType,
      isRunning: false,
      isVisiting: false,
      default: String(LEAGUE_OF_LEGENDS_DEFAULT),
      hover: String(LEAGUE_OF_LEGENDS_HOVER),
    },
    {
      type: 'VALORANT' as GameType,
      isRunning: false,
      isVisiting: false,
      default: String(VALORANT_DEFAULT),
      hover: String(VALORANT_HOVER),
    }
  ]
}

const slice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setMaximizeState(state, action: PayloadAction<boolean>) {
      state.isMaximize = action.payload;
    },
    setCurrentGameType(state, action: PayloadAction<GameType>) {
      state.currentGameType = action.payload;
    },
    setIsGameRunning(state, action: PayloadAction<{ type: GameType, isRunning: boolean }>) {
      state.games.forEach((value) => {
        if (value.type === action.payload.type) {
          value.isRunning = action.payload.isRunning;
        }
      });
    },
    setVisiting(state, action: PayloadAction<GameType>) {
      state.games.forEach((value) => {
        if (value.type === action.payload) {
          value.isVisiting = true;
        }
        else {
          value.isVisiting = false;
        }
      });
    }
  },
})

const { actions, reducer } = slice;

export const {
  setMaximizeState,
  setCurrentGameType,
  setIsGameRunning,
  setVisiting,
} = actions;

export const CommonReducer = reducer;
