// main, renderer 공용 type
type IPCValue = {
  type: string,
  value?: any,
}

type GameType =
  'NONE' |
  'LEAGUE_OF_LEGENDS' |
  'VALORANT';

type WatchData = {
  type: GameType;
  processName: string;
  isRunning: boolean;
}