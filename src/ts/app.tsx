import * as React from "react";
import {render} from "react-dom";
import {} from "material-components-web";

import {defaultOptions, UnicodeApp} from "./components/static/App";
import {normalizeStrings, unicodeList} from "mathy-unicode-characters";

const mountPoint = document.getElementById("mount-point");

if (mountPoint)
    render(
        <UnicodeApp defaultShowOptions={defaultOptions} chars={unicodeList/*.slice(0, 50)*/.map(char => {
            return {
                normalizedStrings: normalizeStrings(char),
                char
            };
        })}/>,
        mountPoint
    );
