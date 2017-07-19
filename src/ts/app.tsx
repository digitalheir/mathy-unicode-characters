import * as React from "react";
import {render} from "react-dom";
import {} from "material-components-web";

import {UnicodeApp} from "./components/static/App";
import {normalizeStrings, unicodeList} from "mathy-unicode-characters";

const mountPoint = document.getElementById("mount-point");

if (mountPoint)
    render(
        <UnicodeApp chars={unicodeList.map(char => {
            return {
                normalizedStrings: normalizeStrings(char),
                char
            };
        })}/>,
        mountPoint
    );
