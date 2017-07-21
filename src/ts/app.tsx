import * as React from "react";
import {render} from "react-dom";
import {} from "material-components-web";

import {defaultOptions, UnicodeApp} from "./components/static/App";
import {normalizeStrings, unicodeList} from "mathy-unicode-characters";

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

if(urlParams.latex) defaultShowOptions.latex = urlParams.latex !== "false"
if(urlParams.wolfram) defaultShowOptions.wolfram = urlParams.wolfram !== "false"
if(urlParams.aip) defaultShowOptions.aip = urlParams.aip !== "false"
if(urlParams.acs) defaultShowOptions.acs = urlParams.acs !== "false"
if(urlParams.afii) defaultShowOptions.afii = urlParams.afii !== "false"
if(urlParams.ams) defaultShowOptions.ams = urlParams.ams !== "false"
if(urlParams.aps) defaultShowOptions.aps = urlParams.aps !== "false"
if(urlParams.bmp) defaultShowOptions.bmp = urlParams.bmp !== "false"
if(urlParams.ieee) defaultShowOptions.ieee = urlParams.ieee !== "false"
if(urlParams.springer) defaultShowOptions.springer = urlParams.springer !== "false"


if (mountPoint)
    render(
        <UnicodeApp defaultShowOptions={defaultShowOptions} query={urlParams.q} chars={unicodeList/*.slice(0, 50)*/.map(char => {
            return {
                normalizedStrings: normalizeStrings(char),
                char
            };
        })}/>,
        mountPoint
    );
