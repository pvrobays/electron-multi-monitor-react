interface Window {
    electronMultiMonitor?: IElectronMultiMonitor
}

interface IElectronMultiMonitor {
    readonly mainWindow: Window;
    readonly otherMonitors: IOtherMonitor[];
    readonly numberOfMonitors: number;
}

interface IOtherMonitor {
    readonly htmlRoot: HTMLElement;
    readonly window: Window;
}