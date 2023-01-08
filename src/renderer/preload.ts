import { contextBridge, ipcRenderer } from 'electron';

// main, renderer 통신
const ipcApis = {
  on: (channel: string, callback: (event: Electron.IpcRendererEvent, args: any) => void) => {
    return ipcRenderer.on(channel, callback);
  },
  once: (channel: string, callback: (event: Electron.IpcRendererEvent, args: any) => void) => {
    return ipcRenderer.once(channel, callback);
  },
  send: (channel: string, args: any) => {
    ipcRenderer.send(channel, args);
  },
  sendSync: (channel: string, args: any) => {
    return ipcRenderer.sendSync(channel, args);
  },
  invoke: (channel: string, args: any) => {
    return ipcRenderer.invoke(channel, args);
  },
}

contextBridge.exposeInMainWorld('ipcRenderer', ipcApis);