﻿import React from "react";
import { LayoutComponent } from "./layout/LayoutComponent";
import { PictureComponent } from "./picture/PictureComponent";
import { PicturesListComponent } from "./pictures-list/PicturesListComponent";

export interface IMonitorComponentProps {
    rank: number;
    numberOfMonitors: number;
    currentWindow: Window;
}

export class MonitorComponent extends React.Component<IMonitorComponentProps> {

    constructor(props: IMonitorComponentProps) {
        super(props);
        
        const { currentWindow, rank, numberOfMonitors } = props;
        currentWindow.document.title = `Picture app ${rank === 1 ? "list" : `- window #${rank}/${numberOfMonitors}`}`;
    }
    
    render() {
        const { rank, numberOfMonitors } = this.props;

        let monitorComponent: JSX.Element;
        switch (rank) {
            // Choose which monitor should show which component...
            case 1:
                monitorComponent = <PicturesListComponent/>;
                break;
            default:
                monitorComponent = <PictureComponent type={ rank - 1 }/>;
        }

        return <LayoutComponent rank={ rank } numberOfMonitors={ numberOfMonitors }>
            { monitorComponent }
        </LayoutComponent>;
    }
}