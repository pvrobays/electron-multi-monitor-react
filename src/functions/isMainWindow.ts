export function isWindowTheMainWindow(window: Window): boolean {
    return typeof(window.electronMultiMonitor) !== "undefined";
}

export function isThisTheMainWindow(): boolean {
    return isWindowTheMainWindow(window);
}