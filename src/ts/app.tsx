import * as React from "react";
import {render} from "react-dom";

import {UnicodeApp} from "./components/static/App";
import {defaultOptions} from "./default-options";

const mountPoint = document.getElementById("mount-point");

function parseUrlParams(): any {
    const urlParams: any = {};

    const regex = /([^&=]+)=?([^&]*)/g;
    const decode = (s: string) => decodeURIComponent(s.replace(/\s+/g, ""));
    const query = window.location.search.substring(1);

    let match;
    while (match = regex.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);

    return urlParams;
}

const urlParams = parseUrlParams();

const defaultShowOptions = defaultOptions;

if (urlParams.latex) defaultShowOptions.latex = urlParams.latex !== "false";
if (urlParams.wolfram) defaultShowOptions.wolfram = urlParams.wolfram !== "false";
if (urlParams.aip) defaultShowOptions.aip = urlParams.aip !== "false";
if (urlParams.acs) defaultShowOptions.acs = urlParams.acs !== "false";
if (urlParams.afii) defaultShowOptions.afii = urlParams.afii !== "false";
if (urlParams.aps) defaultShowOptions.aps = urlParams.aps !== "false";
if (urlParams.bmp) defaultShowOptions.bmp = urlParams.bmp !== "false";
// if (urlParams.ams) defaultShowOptions.ams = urlParams.ams !== "false";
// if (urlParams.ieee) defaultShowOptions.ieee = urlParams.ieee !== "false";
// if (urlParams.springer) defaultShowOptions.springer = urlParams.springer !== "false";


if (mountPoint) {
    if (urlParams.q) {
        const input = document.getElementById("filter-query") as HTMLInputElement;
        if (input) input.value = urlParams.q;
    }
    render(
        <UnicodeApp defaultShowOptions={defaultShowOptions}
                    q={urlParams.q}/>,
        mountPoint
    );
}
