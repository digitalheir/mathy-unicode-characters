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

            <style> .github-corner svg{
                position:absolute;right:0;bottom:0;transform:scale(1,-1);mix-blend-mode:darken;color:#ffffff;fill:#000000;
            }
                .github-corner:hover .octo-arm{animation:octocat-wave .56s;}
                                       @keyframes octocat-wave{
                                           0%, 100%{transform:rotate(0);}20%, 60%{transform:rotate(-20deg);}40%, 80%{transform:rotate(10deg);}
                                       }
            </style>
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

    <a className="github-corner" href="https://github.com/digitalheir/mathy-unicode-characters/" title="Fork me on GitHub">
        <svg width="80" height="80" viewbox="0 0 250 250">
            <title>Fork me on GitHub</title>
<path d="M0 0h250v250"></path>
<path class="octo-arm" d="M127.4 110c-14.6-9.2-9.4-19.5-9.4-19.5 3-7 1.5-11 1.5-11-1-6.2 3-2 3-2 4 4.7 2 11 2 11-2.2 10.4 5 14.8 9 16.2" fill="currentColor" style="transform-origin:130px 110px"></path><path class="octo-body" d="M113.2 114.3s3.6 1.6 4.7.6l15-13.7c3-2.4 6-3 8.2-2.7-8-11.2-14-25 3-41 4.7-4.4 10.6-6.4 16.2-6.4.6-1.6 3.6-7.3 11.8-10.7 0 0 4.5 2.7 6.8 16.5 4.3 2.7 8.3 6 12 9.8 3.3 3.5 6.7 8 8.6 12.3 14 3 16.8 8 16.8 8-3.4 8-9.4 11-11.4 11 0 5.8-2.3 11-7.5 15.5-16.4 16-30 9-40 .2 0 3-1 7-5.2 11l-13.3 11c-1 1 .5 5.3.8 5z" fill="currentColor"></path>
    </svg>
</a>

    <script async={true} src="js/app.js"/>

    </body>
    </html>
;
