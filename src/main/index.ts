import electron, { app, BrowserWindow, ipcMain } from 'electron';
import { watchProcess } from './watch';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

// 중복실행 방지
if (app.requestSingleInstanceLock() === false) {
  app.exit(0);
}

const createWindow = (): void => {
  // 윈도우 생성
  const mainWindow = new BrowserWindow({
    minHeight: 720,
    minWidth: 1440,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (process.env.NODE_ENV === 'development') {
    // devtool 이 열려있으면 transparent 동작안함
    mainWindow.webContents.openDevTools();
  }

  // ipc
  ipcMain.on('MAIN_WINDOW', (event, args) => {
    const arg: IPCValue = args;
    switch (arg.type) {
      case 'onClickMinimize':
        mainWindow.minimize();
        break;
      case 'onClickMaximize':
        // 이미 maximize 면 원래 크기로 복귀
        if (mainWindow.isMaximized() === true) {
          mainWindow.unmaximize();
          mainWindow.webContents.send(
            'RENDERER_TOPBAR',
            {
              type: 'isMaximized',
              value: false,
            });
        }
        else {
          mainWindow.maximize();
          mainWindow.webContents.send(
            'RENDERER_TOPBAR',
            {
              type: 'isMaximized',
              value: true,
            });
        }
        break;
      case 'onClickClose':
        mainWindow.close();
        break;
      case 'onClickLogo':
        // default 브라우저로 오픈
        electron.shell.openExternal('https://op.gg');
        break;
    }
  });

  // 프로세스 실행감지
  watchProcess(mainWindow);
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
