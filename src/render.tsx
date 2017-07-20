import * as React from "react";
import {renderToStaticMarkup, renderToString} from "react-dom/server";
import {App} from "./ts/components/static/App";

// Client render (optional):
if (typeof document !== "undefined") {
    // Client render code goes here...
    console.log("...");
}

function splitPath(path: string): string[] {
    const match = path.match(/\//g);
    if (!match) throw new Error("!!!");
    else return match;
}

function getComponent(path: string) {
    const relativePath = splitPath(path).slice(1).map(a => "../").join("");
    switch (path) {
        case "/":
            return <App/>;
        default:
            throw new Error("Could not find component for path " + path);
    }
}

export default (locals: any, callback: any) => {
    callback(undefined, "<!DOCTYPE html>\n" + renderToString(getComponent(locals.path)).replace("</li>", "</li>\n"));
};
