import * as React from "react";
import {PureComponent, StatelessComponent} from "react";
import {
    Unicode2description,
    unicodeList,
    UnicodeCharacter,
    normalizeStrings
} from "mathy-unicode-characters";

import {getAsString} from "../../char-util";

export function prettyPrintCodePoints(u: UnicodeCharacter): string[] {
    return u._id.split("-")
        .map(function (s) {
            return "U+" + (s.charAt(0) === "U" ? s.substring(1) : s);
        });
}

export const List: StatelessComponent<{ items: WrappedUnicodeCharacter[], idsVisible: Set<string> }> = ({items, idsVisible}) =>
    <ul
        className="unicode-character-list">
        {
            items.map(
                unicodeChar => <ListRow
                    visible={idsVisible.has(unicodeChar.char._id)}
                    char={unicodeChar.char}
                    key={unicodeChar.char._id}/>
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


export const DetailsRow: StatelessComponent<{
    name: string,
    keyName: string,
    value: string,
    property: string
}> = ({name, keyName, value, property}) => {
    //  className={"" + name}
    // TODO semantic markup
    return <tr>
        <td>{keyName}</td>
        <td property={property}>{value}</td>
    </tr>;
};

export const ListRow: StatelessComponent<{ char: UnicodeCharacter, visible: boolean }> = ({char, visible}) => {
    const decimal = char.dec;
    const latex = char.latex;
    const aip = char.aip;
    const acs = char.acs;
    const afii = char.afii;
    const ams = char.ams;
    const aps = char.aps;
    const bmp = char.bmp;
    const elsevierDesc = char.elsevierDesc;
    // TODO elsevier etc
    const ieee = char.ieee;
    const imageNone = char.image;
    const mathlatex = char.mathlatex;
    const mode = char.mode;
    const springer = char.springer;
    // const surrogate = unicode2surrogate[unicodeId as Unicode2surrogate];
    // {surrogate ? <div className="unicode-character-row-surrogate">
    //     {surrogate.mathvariant}
    //     {surrogate.ref}
    // </div> : ""}
    const type = char.type;
    const varlatex = char.varlatex;
    const wolfram = char.wolfram;
    const wolframId = char.wolframId;

    if (aip !== undefined && typeof aip !== "string") throw new Error(aip);
    if (acs !== undefined && typeof acs !== "string") throw new Error(acs);
    if (afii !== undefined && typeof afii !== "string") throw new Error(afii);
    if (ams !== undefined && typeof ams !== "string") throw new Error(ams);
    if (aps !== undefined && typeof aps !== "string") throw new Error(aps);
    if (bmp !== undefined && typeof bmp !== "string") throw new Error(bmp);
    if (elsevierDesc !== undefined && typeof elsevierDesc !== "string") throw new Error(elsevierDesc);
    if (ieee !== undefined && typeof ieee !== "string") throw new Error(ieee);
    if (mathlatex !== undefined && typeof mathlatex !== "string") throw new Error(mathlatex);
    if (mode !== undefined && typeof mode !== "string") throw new Error(mode);
    if (springer !== undefined && typeof springer !== "string") throw new Error(springer);
    if (type !== undefined && typeof type !== "string") throw new Error(type);
    if (varlatex !== undefined && typeof varlatex !== "string") throw new Error(varlatex);
    const description = char.description;
    const descriptionUnicodeVersion = char.descriptionUnicodeVersion;

    // if (imageNone !== undefined && typeof imageNone !== "string") throw new Error(imageNone);
    // if (surrogate !== undefined && typeof surrogate !== "string") throw new Error(surrogate);
    // if (wolfram !== undefined && typeof wolfram !== "string") throw new Error(wolfram);

    // TODO from util?
    const hexaDecimals: number[] = char._id.replace(StartingU, "").split("-").map(x => parseInt("0x" + x, 16));

    return <li
        property="itemListElement"
        typeof="ListItem"
        key={char._id}
        style={{display: visible ? "block" : "none"}}
        data-image={imageNone}
        id={char._id}
        className="unicode-character-row"
    >
        <header property="name" className="unicode-character">{getAsString(hexaDecimals)}</header>
        <div className="unicode-character-codepoint" property="identifier">{
            prettyPrintCodePoints(char).join(" ")
        }</div>

        <table>
            <tbody>
            {!!description ? <DetailsRow property="description" name="description" keyName={"description"}
                                         value={description}/> : ""}
            {!!elsevierDesc ? <DetailsRow property="description" name="elsevierDesc" keyName={"elsevier description"}
                                          value={elsevierDesc}/> : ""}
            {!!type ? <DetailsRow property="disambiguatingDescription" name="type" keyName={"type"} value={type}/> : ""}
            {!!mode ? <DetailsRow property="disambiguatingDescription" name="mode" keyName={"mode"} value={mode}/> : ""}
            {!!latex ? <DetailsRow property="identifier" name="latex" keyName={"latex"} value={latex}/> : ""}
            {!!mathlatex ?
                <DetailsRow property="identifier" name="mathlatex" keyName={"mathlatex"} value={mathlatex}/> : ""}
            {!!varlatex ?
                <DetailsRow property="identifier" name="varlatex" keyName={"varlatex"} value={varlatex}/> : ""}
            {!!wolfram ? <DetailsRow property="identifier" name="wolfram" keyName={"wolfram"} value={wolfram}/> : ""}
            {!!wolframId ?
                <DetailsRow property="identifier" name="wolframId" keyName={"wolfram id"} value={wolframId}/> : ""}
            {!!aip ? <DetailsRow property="identifier" name="aip" keyName={"aip"} value={aip}/> : ""}
            {!!acs ? <DetailsRow property="identifier" name="acs" keyName={"acs"} value={acs}/> : ""}
            {!!afii ? <DetailsRow property="identifier" name="afii" keyName={"afii"} value={afii}/> : ""}
            {!!ams ? <DetailsRow property="identifier" name="ams" keyName={"ams"} value={ams}/> : ""}
            {!!aps ? <DetailsRow property="identifier" name="aps" keyName={"aps"} value={aps}/> : ""}
            {!!bmp ? <DetailsRow property="identifier" name="bmp" keyName={"bmp"} value={bmp}/> : ""}
            {!!ieee ? <DetailsRow property="identifier" name="ieee" keyName={"ieee"} value={ieee}/> : ""}
            {!!springer ?
                <DetailsRow property="identifier" name="springer" keyName={"springer"} value={springer}/> : ""}
            </tbody>
        </table>
    </li>;
};

// <!--<link rel="apple-touch-icon" href="apple-touch-icon.png">-->
// <!--[if lt IE 8]>
//  <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
// <![endif]-->

export interface WrappedUnicodeCharacter {
    char: UnicodeCharacter;
    normalizedStrings: string[];
}

function filterObjects(arr: WrappedUnicodeCharacter[], words: string[]): Set<string> {
    if (words.length === 0)
        return new Set(arr.map(c => c.char._id));

    return new Set(arr.filter(
        obj => words.every(word =>
            obj.normalizedStrings
                .some(
                    (objectWord) => (objectWord.indexOf(word) >= 0)
                )
        )
        )
            .map(c => c.char._id)
    )
        ;
}

export interface UAState {
    query: string;
}

export interface UAProps {
    staticRender?: boolean;
    chars: WrappedUnicodeCharacter[];
}

export class UnicodeApp extends PureComponent<UAProps, UAState> {
    constructor(props: UAProps) {
        super(props);
        this.state = {
            query: ""
        };
    }

    setQuery(query: string) {
        this.setState({query});
    }

    render() {
        const staticRender = this.props.staticRender;
        return <div
            vocab="http://schema.org/"
            typeof="ItemList"
        >

            <input
                placeholder={"filter by search term, LaTeX command, etc" + (staticRender ? " (loading)" : "")}
                disabled={staticRender}
                style={{
                    width: "100%",
                    margin: 0,
                    padding: 0
                }}
                type="text"
                name="q"
                value={
                    this.state.query.toLowerCase()
                }
                onChange={(e) => {
                    this.setQuery(e.target.value);
                }}

            />

            <span property="numberOfItems">315</span>

            <List items={this.props.chars}
                  idsVisible={
                      filterObjects(
                          this.props.chars,
                          this.state.query.split(/\s+/)
                              .map(s => s.trim())
                              .filter(s => s !== "")
                      )
                  }/>

        </div>;
    }

}

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

    <div id="mount-point">
        <UnicodeApp staticRender={true} chars={unicodeList.map(char => {
            return {
                normalizedStrings: normalizeStrings(char),
                char
            };
        })}/>
    </div>

    <script src="js/app.js"/>

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
