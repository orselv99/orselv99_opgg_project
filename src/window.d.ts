declare global {
  interface Window {
    ipcRenderer: {
      on(
        channel: string,
        callback: (event: Electron.IpcRendererEvent, args: IPCValue) => void
      ): Electron.IpcRenderer;
      once(
        channel: string,
        callback: (event: Electron.IpcRendererEvent, args: IPCValue) => void
      ): Electron.IpcRenderer;
      send(
        channel: string,
        args: IPCValue
      ): void;
      sendSync(
        channel: string,
        args: IPCValue
      ): any;
      invoke(
        channel: string,
        args: IPCValue
      ): Promise<any>;
    };
  }
}

export { };
