# Electron Multi Monitor React


## Introduction
This package provides a React wrapper around [electron-multi-monitor](https://github.com/pvrobays/electron-multi-monitor); a repo which provides web developers with the ability to create applications which cover multiple browser windows via [Electron](https://electronjs.org/).


The library will create linked JavaScript `window` objects for you. Meaning you only need to worry about one window object. No need for special communication between the different windows; just pure JavaScript!

To see the library in action, clone the repository and run the example:

    $ git clone https://github.com/pvrobays/electron-multi-monitor-react.git
    $ cd electron-multi-monitor-react
    $ npm i
    $ npm run example

## Demo
<img src="https://raw.githubusercontent.com/pvrobays/electron-multi-monitor/HEAD/misc/demo-2-monitor.gif" />

## Getting Started
You can always check out the code from the demo, found in the `example` folder.

### 1. Installation & Import
Easiest way to install it is via [npm](https://www.npmjs.com/get-npm):
```
npm install electron-multi-monitor electron-multi-monitor-react
```
Next you'll be able to import the MultiMonitor object inside your [Electron](https://electronjs.org/) app:
```
import { MultiMonitor } from "electron-multi-monitor";
```

P.s. If you're new to electron, [Electron Forge](https://www.electronforge.io/) is a great starting point. They even have a [guide](https://www.electronforge.io/guides/framework-integration/react-with-typescript) on how to enable TypeScript & React.

### 2. Create a MultiMonitor instance
There are 2 ways of creating  MultiMonitor instance:

1. Use the default instance
```
const multiMonitor = MultiMonitor.instance;
```
2. or, Create your own via the MultiMonitorFactory
```
const multiMonitor = new MultiMonitorFactory().create();
```
The `multiMonitor` object can be used to adapt, move, interact with the opened windows within your Main process:
```
interface IMultiMonitor {
    readonly monitors: BrowserWindow[];
    openUrl(url: string, numberOfMonitors: number): Promise<void>;
    destroyAllMonitors(): void;
}
```

### 3. Launch multiple monitors
Now you can open your multi-monitor page via the MultiMonitor instance:
```
multiMonitor.openUrl(url, numberOfWindowsToOpen)
.then(() => {
    console.log("Monitor windows are opened have your URL loaded!");
});
```

This will open your url inside the number of windows you've defined.

### 4. Adapt your web application
Inside your web application where you start rendering your initial React component:
```
import ReactDOM from "react-dom";
import { isThisTheMainWindow } from "electron-multi-monitor-react";

if (!isThisTheMainWindow()) {
    // don't render anything. Other windows should get renderd by the main window
    return;
} else {
    // render your initial component:
    ReactDOM.render(<AppComponent app={ app }/>, document.body);
}
```

### 5. Create your own Monitor component
Render the `<Monitors>` React component in your app. This exposes a monitorRenderer property which accepts a function that returns your own monitor component.
```
<Monitors monitorRenderer={
    (props) => <MyMonitorComponent {...props} /* someOtherProp={"abc"} */ /> 
} />
```

Create your `<MyMonitorComponent>`, which accepts the `MonitorProps`:
```
export interface IMyMonitorComponentProps {
    monitorRank: number;
    numberOfMonitors: number;
    currentWindow: Window;
}

export interface IMyMonitorComponentState {
    //... some state props if you want
}

export class MonitorComponent extends React.Component<IMonitorComponentProps, IMyMonitorComponentState> {
    
    render() {
        const { monitorRank, numberOfMonitors } = this.props;

        let monitorComponent: JSX.Element;
        switch (monitorRank) {
            // Choose which monitor should show which component...
            case 1:
                monitorComponent = <MyMainMonitorComponent />; //Your main monitor component
                break;
            case 2:
                monitorComponent = <MySecondMonitorComponent />
                break;
            case 3:
                //...
            default:
                monitorComponent = <OtherMonitorComponent />;
        }

        return { monitorComponent };
    }
}
```
And off you go! So you'll just have to implement your own `<MyMonitorComponent/>` which can accept the `MonitorProps` and show different components according to the `monitorRank`.

## Contribute
Yes please! I'm looking for motivated contributors to help me. If you're interested don't hesitate to contact me.

## Thanks
* [Picsum Photos](https://picsum.photos/) - Hosting the images for the example app