import React from "react";
import ReactDOM from "react-dom";

export interface MonitorProps {
    monitorRank: number;
    currentWindow: Window;
    numberOfMonitors: number;
}

export interface IMonitorsProps {
    monitorRenderer: (props: MonitorProps) => JSX.Element | JSX.Element[] | string | null | undefined;
}

export class Monitors extends React.Component<IMonitorsProps> {
    private readonly _mainWindow: Window;

    constructor(props) {
        super(props);

        this._mainWindow = window;
        const { electronMultiMonitor } = this;
        
        if (electronMultiMonitor) {
            const { otherMonitors } = electronMultiMonitor;
            
            //Remove all child elements from the htmlRoot; React Portal doesn't remove those by default
            for (const otherMonitor of otherMonitors) {
                const { htmlRoot } = otherMonitor;
                while (htmlRoot.firstChild) {
                    htmlRoot.removeChild(htmlRoot.firstChild);
                }
            }
        }
    }

    private get electronMultiMonitor(): IElectronMultiMonitor | null {
        return this._mainWindow.electronMultiMonitor ?? null;
    }

    render() {
        const { electronMultiMonitor, props } = this;
        if (!electronMultiMonitor) {
            console.debug("🔳🔳 electron-multi-monitor: this does not seem like the main monitor. Not rendering anything here.");
            return null;
        }

        const { monitorRenderer } = props;
        const { otherMonitors, numberOfMonitors } = electronMultiMonitor;

        const mainMonitorComponent = monitorRenderer({
            currentWindow: window,
            monitorRank: 1,
            numberOfMonitors: numberOfMonitors
        });

        const otherMonitorComponents = otherMonitors.map((value, index) =>
            ReactDOM.createPortal(monitorRenderer({
                currentWindow: value.window,
                monitorRank: index + 2,
                numberOfMonitors: numberOfMonitors
            }), value.htmlRoot)
        );

        return [
            mainMonitorComponent,
            ...otherMonitorComponents
        ];
    }
}