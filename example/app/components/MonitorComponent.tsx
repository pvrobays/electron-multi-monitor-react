import React from "react";
import { LayoutComponent } from "./layout/LayoutComponent";
import { PictureComponent } from "./picture/PictureComponent";
import { PicturesListComponent } from "./pictures-list/PicturesListComponent";

export interface IMonitorComponentProps {
    monitorRank: number;
    numberOfMonitors: number;
    currentWindow: Window;
}

export class MonitorComponent extends React.Component<IMonitorComponentProps> {

    constructor(props: IMonitorComponentProps) {
        super(props);
        
        const { currentWindow, monitorRank, numberOfMonitors } = props;
        currentWindow.document.title = `Picture app ${monitorRank === 1 ? "list" : `- window #${monitorRank}/${numberOfMonitors}`}`;
    }
    
    render() {
        const { monitorRank, numberOfMonitors } = this.props;

        let monitorComponent: JSX.Element;
        switch (monitorRank) {
            // Choose which monitor should show which component...
            case 1:
                monitorComponent = <PicturesListComponent/>;
                break;
            default:
                monitorComponent = <PictureComponent type={ monitorRank - 1 }/>;
        }

        return <LayoutComponent rank={ monitorRank } numberOfMonitors={ numberOfMonitors }>
            { monitorComponent }
        </LayoutComponent>;
    }
}