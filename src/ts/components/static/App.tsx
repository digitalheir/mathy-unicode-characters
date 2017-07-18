import * as React from "react";
import {
    unicode2description, Unicode2description, unicode2latex,
    unicodeIdentification
} from "mathy-unicode-characters/ts-compiled";
import {StatelessComponent} from "react";
import {
    unicode2acs, Unicode2acs, unicode2afii, Unicode2afii, unicode2aip, Unicode2aip, unicode2ams, Unicode2ams,
    unicode2aps,
    Unicode2aps,
    unicode2bmp,
    Unicode2bmp,
    unicode2decimal,
    Unicode2decimal, Unicode2elsevierDesc, unicode2elsevierDesc, Unicode2ieee, unicode2ieee, Unicode2imageNone,
    unicode2imageNone,
    Unicode2latex, Unicode2mathlatex, unicode2mathlatex, Unicode2mode, unicode2mode, Unicode2springer, unicode2springer,
    Unicode2surrogate,
    unicode2surrogate,
    Unicode2type, unicode2type,
    Unicode2varlatex,
    unicode2varlatex,
    Unicode2wolfram, unicode2wolfram
} from "mathy-unicode-characters";

export const List: StatelessComponent<{}> = () => <ul className="unicode-character-list">
    {
        Object.keys(unicodeIdentification)
            .map(
                unicodeId => <ListRow unicodeId={unicodeId} key={unicodeId}/>
            )
    }
</ul>;

function castt(x: any): x is Unicode2description {
    return ("a".length === 1);
}

function isArray(x: number | number[]): x is number[] {
    return x.constructor === Array;
}
function isString(x: any): x is string {
    return typeof x === "string";
}

const StartingU = /^U/;

const fromCodePoint = function (...argz: (string | number)[]) {
    const MAX_SIZE = 0x4000;
    const codeUnits = [];
    let highSurrogate;
    let lowSurrogate;
    let index = -1;
    const length = arguments.length;
    if (!length) {
        return "";
    }
    let result = "";
    while (++index < length) {
        let codePoint: number = Number(arguments[index]);
        if (
            !isFinite(codePoint) ||       // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 ||              // not a valid Unicode code point
            codePoint > 0x10FFFF ||       // not a valid Unicode code point
            Math.floor(codePoint) != codePoint // not an integer
        ) {
            throw RangeError("Invalid code point: " + codePoint);
        }
        if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint);
        } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = (codePoint % 0x400) + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += String.fromCharCode.apply(undefined, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};

function getAsString(hexaDecimals: number[]): string {
    return fromCodePoint(
        ...hexaDecimals
    );
}

export const ListRow: StatelessComponent<{ unicodeId: string }> = ({unicodeId}) => {
    const decimal = unicode2decimal[unicodeId as Unicode2decimal];
    const latex = unicode2latex[unicodeId as Unicode2latex];

    const aip = unicode2aip[unicodeId as Unicode2aip];
    const acs = unicode2acs[unicodeId as Unicode2acs];
    const afii = unicode2afii[unicodeId as Unicode2afii];
    const ams = unicode2ams[unicodeId as Unicode2ams];
    const aps = unicode2aps[unicodeId as Unicode2aps];
    const bmp = unicode2bmp[unicodeId as Unicode2bmp];
    const elsevierDesc = unicode2elsevierDesc[unicodeId as Unicode2elsevierDesc];
    const ieee = unicode2ieee[unicodeId as Unicode2ieee];
    const imageNone: boolean = unicode2imageNone[unicodeId as Unicode2imageNone];
    const mathlatex = unicode2mathlatex[unicodeId as Unicode2mathlatex];
    const mode = unicode2mode[unicodeId as Unicode2mode];
    const springer = unicode2springer[unicodeId as Unicode2springer];
    // const surrogate = unicode2surrogate[unicodeId as Unicode2surrogate];
    // {surrogate ? <div className="unicode-character-row-surrogate">
    //     {surrogate.mathvariant}
    //     {surrogate.ref}
    // </div> : ""}
    const type = unicode2type[unicodeId as Unicode2type];
    const varlatex = unicode2varlatex[unicodeId as Unicode2varlatex];
    const wolfram = unicode2wolfram[unicodeId as Unicode2wolfram];

    if (aip !== undefined && typeof aip !== "string") throw new Error(aip);
    if (acs !== undefined && typeof acs !== "string") throw new Error(acs);
    if (afii !== undefined && typeof afii !== "string") throw new Error(afii);
    if (ams !== undefined && typeof ams !== "string") throw new Error(ams);
    if (aps !== undefined && typeof aps !== "string") throw new Error(aps);
    if (bmp !== undefined && typeof bmp !== "string") throw new Error(bmp);
    if (elsevierDesc !== undefined && typeof elsevierDesc !== "string") throw new Error(elsevierDesc);
    if (ieee !== undefined && typeof ieee !== "string") throw new Error(ieee);
    // if (imageNone !== undefined && typeof imageNone !== "string") throw new Error(imageNone);
    if (mathlatex !== undefined && typeof mathlatex !== "string") throw new Error(mathlatex);
    if (mode !== undefined && typeof mode !== "string") throw new Error(mode);
    if (springer !== undefined && typeof springer !== "string") throw new Error(springer);
    // if (surrogate !== undefined && typeof surrogate !== "string") throw new Error(surrogate);
    if (type !== undefined && typeof type !== "string") throw new Error(type);
    if (varlatex !== undefined && typeof varlatex !== "string") throw new Error(varlatex);
    // if (wolfram !== undefined && typeof wolfram !== "string") throw new Error(wolfram);

    const hexaDecimals: number[] = unicodeId.split("-")
        .map(s => s.replace(StartingU, "0x"))
        .map(x => parseInt(x, 16))
    ;


    const description = unicode2description[unicodeId as Unicode2description];

    return <li
        data-decimal={decimal}
        data-image={imageNone}
        id={unicodeId}
        className="unicode-character-row"
    >
        <div className="unicode-character">{getAsString(hexaDecimals)}</div>
        <div className="unicode-character-codepoint">{unicodeId.replace(StartingU, "U+")}</div>

        <dl>
            {description ? <dt className="unicode-character-row-description-term">description</dt> : ""}
            {description ? <dd className="unicode-character-row-description">{description}</dd> : ""}
            {latex ? <dt className="unicode-character-row-latex-term">latex</dt> : ""}
            {latex ? <dd className="unicode-character-row-latex">{latex}</dd> : ""}
            {aip ? <dt className="unicode-character-row-aip-term">aip</dt> : ""}
            {aip ? <dd className="unicode-character-row-aip">{aip}</dd> : ""}
            {acs ? <dt className="unicode-character-row-acs-term">acs</dt> : ""}
            {acs ? <dd className="unicode-character-row-acs">{acs}</dd> : ""}
            {afii ? <dt className="unicode-character-row-afii-term">afii</dt> : ""}
            {afii ? <dd className="unicode-character-row-afii">{afii}</dd> : ""}
            {ams ? <dt className="unicode-character-row-ams-term">ams</dt> : ""}
            {ams ? <dd className="unicode-character-row-ams">{ams}</dd> : ""}
            {aps ? <dt className="unicode-character-row-aps-term">aps</dt> : ""}
            {aps ? <dd className="unicode-character-row-aps">{aps}</dd> : ""}
            {bmp ? <dt className="unicode-character-row-bmp-term">bmp</dt> : ""}
            {bmp ? <dd className="unicode-character-row-bmp">{bmp}</dd> : ""}
            {elsevierDesc ? <dt className="unicode-character-row-elsevierDesc-term">elsevier description</dt> : ""}
            {elsevierDesc ? <dd className="unicode-character-row-elsevierDesc">{elsevierDesc}</dd> : ""}
            {ieee ? <dt className="unicode-character-row-ieee-term">ieee</dt> : ""}
            {ieee ? <dd className="unicode-character-row-ieee">{ieee}</dd> : ""}
            {mathlatex ? <dt className="unicode-character-row-mathlatex-term">mathlatex</dt> : ""}
            {mathlatex ? <dd className="unicode-character-row-mathlatex">{mathlatex}</dd> : ""}
            {mode ? <dt className="unicode-character-row-mode-term">mode</dt> : ""}
            {mode ? <dd className="unicode-character-row-mode">{mode}</dd> : ""}
            {springer ? <dt className="unicode-character-row-springer-term">springer</dt> : ""}
            {springer ? <dd className="unicode-character-row-springer">{springer}</dd> : ""}
            {type ? <dt className="unicode-character-row-type-term">type</dt> : ""}
            {type ? <dd className="unicode-character-row-type">{type}</dd> : ""}
            {varlatex ? <dt className="unicode-character-row-varlatex-term">varlatex</dt> : ""}
            {varlatex ? <dd className="unicode-character-row-varlatex">{varlatex}</dd> : ""}

            {wolfram ? <dt className="unicode-character-row-wolfram-term">wolfram</dt> : ""}
            {wolfram ? <dd className="unicode-character-row-wolfram">{isString(wolfram)
                ? wolfram
                : <span><span>{wolfram.value}</span>{" ("}<span>{wolfram.id}</span>{")"}</span>
            }</dd> : ""}
        </dl>
    </li>;
};

// <!--<link rel="apple-touch-icon" href="apple-touch-icon.png">-->
// <!--[if lt IE 8]>
//  <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
// <![endif]-->

export const App: StatelessComponent<{}> = () => <html lang="en">
    <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <title>Unicode to LaTeX / Mathematica / Elsevier / etc.</title>
        <meta name="description" content=""/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="css/normalize.css"/>
        <link rel="stylesheet" href="css/main.css"/>
        <link rel="stylesheet" href="css/material-components-web.css"/>
        <link rel="stylesheet" href="css/app.css"/>
    </head>
    <body>

    <List/>

    <div id="mount-point"></div>

    <script src="js/app.js"></script>

    </body>
    </html>
;
// <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
// <!--<script>-->
// <!--(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=-->
// <!--function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;-->
// <!--e=o.createElement(i);r=o.getElementsByTagName(i)[0];-->
// <!--e.src='https://www.google-analytics.com/analytics.js';-->
// <!--r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));-->
// <!--ga('create','UA-XXXXX-X','auto');ga('send','pageview');-->
// <!--</script>-->
