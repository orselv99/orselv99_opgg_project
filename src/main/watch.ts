import { exec } from 'child_process';
import { BrowserWindow } from 'electron';

let watchDatas: WatchData[] = [
  {
    type: 'LEAGUE_OF_LEGENDS',
    processName: 'leagueclientux',
    isRunning: false,
  },
  {
    type: 'VALORANT',
    processName: 'valorant-win64-shipping',
    isRunning: false,
  },
];

export const watchProcess = (window: BrowserWindow) => {
  // process 감지 (1초당)
  setInterval(() => {
    // tasklist 결과값에서 실행 process 를 확인 
    // tasklist /NH /FI "IMAGENAME eq notepad.exe" 다중검색은 안되는듯
    // session name 이 services 가 아닌 일반 프로세스로 한정
    exec('tasklist /NH /FI "SESSIONNAME ne Services"', (error, stdout, stderr) => {
      // 실행확인
      watchDatas.map((value) => {
        value.isRunning = stdout.toLowerCase().includes(value.processName);
        window.webContents.send(
          'RENDERER_COMMON',
          {
            type: 'isGameRunning',
            value: value
          });
      });
    });
  }, 3000);
}
