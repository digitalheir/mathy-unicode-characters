import * as React from "react";
import {render} from "react-dom";
import {} from "material-components-web";

const mountPoint = document.getElementById("mount-point");

if (mountPoint)
    render(
        <div>hellop</div>,
        mountPoint
    );
