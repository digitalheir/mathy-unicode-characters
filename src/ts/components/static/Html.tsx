import * as React from "react";
import {StatelessComponent} from "react";
import {renderToString} from "react-dom/server";
import {UnicodeApp} from "./App";
import {defaultOptions} from "../../default-options";

export const Html: StatelessComponent<{}> = () => <html lang="en">
    <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <title>Unicode to LaTeX / Mathematica / Elsevier / etc.</title>
        <meta name="description"
              content="Converter tool for converting LaTeX to Unicode and Unicode to LaTex. Also supports Wolfram to Uncicode, aip, acs, afii, AMS-LaTeX, aps, bmp, ieee and springer."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link rel="stylesheet" href="css/normalize.css"/>
        <link rel="stylesheet" href="css/main.css"/>
        <link rel="stylesheet" href="css/material-components-web.css"/>
        <link rel="stylesheet" href="css/app.css"/>

    </head>
    <body>

    <div id="mount-point"
         dangerouslySetInnerHTML={{
             __html: renderToString(
                 <UnicodeApp
                     defaultShowOptions={defaultOptions}
                     staticRender={true}
                 />
             )
         }}
    >

    </div>

    <a className="github-corner"
       href="https://github.com/digitalheir/mathy-unicode-characters/" title="Fork me on GitHub">
        <svg width="80" height="80"
             viewBox="0 0 250 250"/>
    </a>

    <script async={true} src="js/app.js"/>

    </body>
    </html>
;
