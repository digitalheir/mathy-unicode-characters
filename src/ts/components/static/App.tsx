import * as React from "react";
import {PureComponent, ReactNode, StatelessComponent} from "react";
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

export const List: StatelessComponent<{ showOptions: ShowDetailsOptions, items: WrappedUnicodeCharacter[], idsVisible: Set<string> }> = ({showOptions, items, idsVisible}) =>
    <ul
        className="unicode-character-list">
        {
            items.map(
                unicodeChar => <ListRow
                    showOptions={showOptions}
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
    visible?: boolean,
    name: string,
    keyName: string,
    value: string,
    property: string
}> = ({name, keyName, visible, value, property}) => {
    //  className={"" + name}
    return <tr style={{display: visible === undefined || visible ? "table-row" : "none"}}>
        <td className="key-name">{keyName}</td>
        <td property={property}>{value}</td>
    </tr>;
};

export const defaultOptions: ShowDetailsOptions = {
    latex: true,
    wolfram: true,
    aip: false,
    acs: false,
    afii: false,
    ams: false,
    aps: false,
    bmp: false,
    ieee: false,
    springer: false,
};

export interface ShowDetailsOptions {
    latex: boolean;
    wolfram: boolean;
    aip: boolean;
    acs: boolean;
    afii: boolean;
    ams: boolean;
    aps: boolean;
    bmp: boolean;
    ieee: boolean;
    springer: boolean;
}

function getDetailRows(options: ShowDetailsOptions,
                       description: string,
                       elsevierDesc: string,
                       type: string, mode: string,
                       latex: string,
                       mathlatex: string,
                       varlatex: string,
                       wolfram: string,
                       wolframId: string,
                       aip: string,
                       acs: string,
                       afii: string,
                       ams: string,
                       aps: string,
                       bmp: string,
                       ieee: string,
                       springer: string): ReactNode[] {
    const rows: ReactNode[] = [];
    // if (!!description)
    //     rows.push(<DetailsRow
    //             key="description"
    //             property="description"
    //             name="description"
    //             keyName={"description"}
    //             value={description}
    //         />
    //     );
    // if (!!elsevierDesc)
    //     rows.push(<DetailsRow
    //             key="elsevierDesc"
    //             property="description"
    //             name="elsevierDesc"
    //             keyName={"elsevier description"
    //             } value={elsevierDesc
    //         }/>
    //     );
    // if (!!type)
    //     rows.push(<DetailsRow
    //             key="type"
    //             property="disambiguatingDescription"
    //             name="type"
    //             keyName={"type"}
    //             value={type}
    //         />
    //     );
    // if (!!mode)
    //     rows.push(<DetailsRow
    //             key="mode"
    //             property="disambiguatingDescription"
    //             name="mode"
    //             keyName={"mode"}
    //             value={mode}
    //         />
    //     );
    if (!!latex)
        rows.push(<DetailsRow
                visible={options.latex}
                key="latex"
                property="identifier"
                name="latex"
                keyName={"latex"}
                value={latex}
            />
        );
    if (!!mathlatex)
        rows.push(<DetailsRow
                visible={options.latex}
                key="mathlatex"
                property="identifier"
                name="mathlatex"
                keyName={"mathlatex"}
                value={mathlatex}
            />
        );
    if (!!varlatex)
        rows.push(<DetailsRow
                visible={options.latex}
                key="varlatex"
                property="identifier"
                name="varlatex"
                keyName={"varlatex"}
                value={varlatex}
            />
        );
    if (!!wolfram)
        rows.push(<DetailsRow
                visible={options.wolfram}
                key="wolfram"
                property="identifier"
                name="wolfram"
                keyName={"wolfram"}
                value={wolfram}
            />
        );
    // todo merge with wolfram
    if (!!wolframId)
        rows.push(<DetailsRow
                visible={options.wolfram}
                key="wolframId"
                property="identifier"
                name="wolframId"
                keyName={"wolfram id"
                } value={wolframId
            }/>
        );
    if (!!aip)
        rows.push(<DetailsRow
                visible={options.aip}
                key="aip"
                property="identifier"
                name="aip"
                keyName={"aip"}
                value={aip}
            />
        );
    if (!!acs)
        rows.push(<DetailsRow
                visible={options.acs}
                key="acs"
                property="identifier"
                name="acs"
                keyName={"acs"}
                value={acs}
            />
        );
    if (!!afii)
        rows.push(<DetailsRow
                visible={options.afii}
                key="afii"
                property="identifier"
                name="afii"
                keyName={"afii"}
                value={afii}
            />
        );
    if (!!ams)
        rows.push(<DetailsRow
                visible={options.ams}
                key="ams"
                property="identifier"
                name="ams"
                keyName={"ams"}
                value={ams}
            />
        );
    if (!!aps
    )
        rows.push(<DetailsRow
                visible={options.aps}
                key="aps"
                property="identifier"
                name="aps"
                keyName={"aps"}
                value={aps}
            />
        );
    if (!!bmp
    )
        rows.push(<DetailsRow
                visible={options.bmp}
                key="bmp"
                property="identifier"
                name="bmp"
                keyName={"bmp"}
                value={bmp}
            />
        );
    if (!!ieee
    )
        rows.push(<DetailsRow
                visible={options.ieee}
                key="ieee"
                property="identifier"
                name="ieee"
                keyName={"ieee"}
                value={ieee}
            />
        );
    if (!!springer
    )
        rows.push(<DetailsRow
                visible={options.springer}
                key="springer"
                property="identifier"
                name="springer"
                keyName={"springer"}
                value={springer}
            />
        );
    return rows;
}

export const ListRow: StatelessComponent<{
    char: UnicodeCharacter,
    visible: boolean,
    showOptions: ShowDetailsOptions
}> = ({char, showOptions, visible}) => {
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
    const rows = getDetailRows(
        showOptions,
        description,
        elsevierDesc,
        type,
        mode,
        latex,
        mathlatex,
        varlatex,
        wolfram,
        wolframId,
        aip,
        acs,
        afii,
        ams,
        aps,
        bmp,
        ieee,
        springer
    );

    return <li
        typeof="Intangible"
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
        {description ? <div property="description" className="description">{description}</div> : ""}
        {elsevierDesc ? <div property="description" className="elsevier-description">{elsevierDesc}</div> : ""}
        {type ? <div property="disambiguatingDescription"
                     className="type">
            {type}
        </div> : ""}
        {mode ? <div property="disambiguatingDescription"
                     className="mode">
            {mode}
        </div> : ""}
        <table>
            <tbody>
            {rows}
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
    showOptions: ShowDetailsOptions;
}

export interface UAProps {
    staticRender?: boolean;
    chars: WrappedUnicodeCharacter[];
    defaultShowOptions: ShowDetailsOptions;
}

export class UnicodeApp extends PureComponent<UAProps, UAState> {
    constructor(props: UAProps) {
        super(props);
        this.state = {
            query: "",
            showOptions: props.defaultShowOptions
        };
    }

    setQuery(query: string) {
        this.setState({query});
    }

    changeShowOption(name: keyof ShowDetailsOptions, checked: boolean) {
        const showOptions =
            Object.assign({}, this.state.showOptions, {[name]: checked}) as ShowDetailsOptions;
        this.setState(
            {showOptions}
        );
    }

    render() {
        const staticRender = this.props.staticRender;
        return <div
            vocab="http://schema.org/"
        >

            <input
                className="filter"
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

            <div className="option-toggles" style={{
                width: "100%",
                margin: "24px",
                padding: 0,
                left: 0,
                bottom: 0,
                position: "fixed"
            }}>
                {
                    Object.keys(defaultOptions)
                        .map((name) =>
                            <div key={name}>
                                <input
                                    id={name}
                                    checked={this.state.showOptions[name as keyof ShowDetailsOptions] as boolean}
                                    type="checkbox"
                                    onChange={(e) => this.changeShowOption(
                                        name as keyof ShowDetailsOptions,
                                        e.target.checked
                                    )}
                                />
                                <label htmlFor={name}>{name}</label>
                            </div>
                        )
                }
            </div>

            <span property="numberOfItems">315</span>


            <List items={this.props.chars}
                  showOptions={
                      this.state.showOptions
                  }
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
        <UnicodeApp defaultShowOptions={defaultOptions} staticRender={true} chars={unicodeList.map(char => {
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
