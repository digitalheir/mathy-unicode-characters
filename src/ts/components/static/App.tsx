import * as React from "react";
import {PureComponent, ReactNode, StatelessComponent} from "react";

import * as _ from "lodash-es";
import {getAsString, normalizeStrings} from "../../char-util";
import {copyShowDetailsOptions, defaultOptions, ShowDetailsOptions} from "../../default-options";
import {Surrogate, UnicodeCharacter} from "../../mathy-unicode-characters/UnicodeCharacter";
import {unicodeList} from "../../mathy-unicode-characters/character-lists/unicodeLists";

export interface WrappedUnicodeCharacter {
    char: UnicodeCharacter;
    normalizedStrings: string[];
}

const wrappedCharacters: WrappedUnicodeCharacter[] = unicodeList/*.slice(0, 50)*/.map(char => {
    return {
        normalizedStrings: normalizeStrings(char),
        char
    };
});


function prettyPrintCodePoints(u: UnicodeCharacter): string[] {
    return prettyPrintCodePointsFromId(u._);
}

function prettyPrintCodePointsFromId(u: string): string[] {
    return u.split("-")
        .map(function (s) {
            return "U+" + (s.charAt(0) === "U" ? s.substring(1) : s);
        });
}

export const List: StatelessComponent<{
    display: boolean,
    showOptions: ShowDetailsOptions,
    filter: string
}> = ({showOptions, filter, display}) => {
    const idsVisible: Set<string> =
        filterObjects(
            filter.split(/\s+/)
                .map(s => s.trim())
                .filter(s => s !== "")
        );

    // const shownChars = wrappedCharacters
    //     .filter(
    //         unicodeChar => idsVisible.has(unicodeChar.char._id)
    //             &&
    //             (unicodeChar.char.latex
    //                 || unicodeChar.char.mathlatex
    //                 || unicodeChar.char.varlatex
    //             )
    //     )
    //     .map(
    //         unicodeChar => {
    //             const hexaDecimals: number[] =
    //                 unicodeChar.char._id
    //                     .replace(StartingU, "")
    //                     .split("-")
    //                     .map(x => parseInt("0x" + x, 16));
    //             const str = getAsString(hexaDecimals);
    //             return [
    //                 str,
    //                 unicodeChar.char.latex
    //                 || unicodeChar.char.mathlatex
    //                 || unicodeChar.char.varlatex
    //             ];
    //         }
    //     );
    // console.log(
    //     JSON.stringify(
    //         shownChars
    //     )
    // );

    return <ul
        style={{display: (display ? "none" : "block")}}
        className="unicode-character-list">
        {
            wrappedCharacters.map(
                unicodeChar => <ListRow
                    showOptions={showOptions}
                    visible={!!idsVisible
                        ? idsVisible.has(unicodeChar.char._)
                        : true}
                    char={unicodeChar.char}
                    key={unicodeChar.char._}/>
            )
        }
    </ul>;
};

// noinspection JSUnusedLocalSymbols
function isArray(x: number | number[]): x is number[] {
    return x.constructor === Array;
}

// noinspection JSUnusedLocalSymbols
function isString(x: any): x is string {
    return typeof x === "string";
}

const StartingU = /^U/;

function asUnicodeCharacter(n: string): keyof UnicodeCharacter {
    switch (n) {
        case "l":
        case "latex":
            return "l";
        case "wolfram":
            return "wolfram";
        case "aip":
            return "aip";
        case "acs":
            return "acs";
        case "afii":
            return "afii";
        case "ams":
            return "ams";
        case "aps":
            return "aps";
        case "bmp":
            return "bmp";
        case "ieee":
            return "ieee";
        case "springer":
            return "springer";
        default:
            throw new Error(":(");
    }
}

export const ListRow: StatelessComponent<{
    char: UnicodeCharacter,
    visible: boolean,
    showOptions: ShowDetailsOptions
}> = ({char, showOptions, visible}) => {
    // const decimal = char.dec;
    // const latex = char.l;
    // const aip = char.aip;
    // const acs = char.acs;
    // const afii = char.afii;
    // const ams = char.ams;
    // const aps = char.aps;
    // const bmp = char.bmp;
    const elsevierDesc = char.elsevierDesc;
    // TODO elsevier etc
    // const ieee = char.ieee;
    const imageNone = char.image;
    // const mathlatex = char.mathlatex;
    const mode = char.mode;
    // const springer = char.springer;
    const type = char.type;
    // const varlatex = char.varlatex;
    // const wolfram = char.wolfram;
    // const wolframId = char.wolframId;

    const description = char.d;
    // TODO
    // const descriptionUnicodeVersion = char.descriptionUnicodeVersion;

    // if (imageNone !== undefined && typeof imageNone !== "string") throw new Error(imageNone);
    // if (wolfram !== undefined && typeof wolfram !== "string") throw new Error(wolfram);

    // TODO from util?
    const hexaDecimals: number[] = char._.replace(StartingU, "").split("-").map(x => parseInt("0x" + x, 16));
//     const rows = getDetailRows(
//         showOptions,
//         description,
//         elsevierDesc,
//         type,
//         mode,
//         latex,
//         mathlatex,
//         varlatex,
//         wolfram,
//         wolframId,
//         aip,
//         acs,
//         afii,
//         ams,
//         aps,
//         bmp,
//         ieee,
//         springer
//     );
    const showCharacter = (visible &&
        (
            !showOptions["hide characters with none of selected representations"]
            || [
                "latex",
                "wolfram",
                "aip",
                "acs",
                "afii",
                "ams",
                "aps",
                "bmp",
                "ieee",
                "springer",
            ].some(
                n => showOptions[n as keyof ShowDetailsOptions]
                    && char[asUnicodeCharacter(n)] !== undefined
            )
        )
    );
    const children: ReactNode[] = [];
    children.push(<header property="name" key="header"
                          className="unicode-character">{getAsString(hexaDecimals)}</header>);
    children.push(<div key="show" className="unicode-character-codepoint" property="identifier">{
        prettyPrintCodePoints(char).join(" ")
    }</div>);
    if (description) children.push(<div key="description" property="description"
                                        className="description">{description}</div>);
    if (elsevierDesc) children.push(<div property="description" key="elsevierDesc"
                                         className="elsevier-description">{elsevierDesc}</div>);
    if (type) children.push(<div property="disambiguatingDescription" key="type " className="type">{type}</div>);
    if (mode) children.push(<div property="disambiguatingDescription"
                                 key="mode"
                                 className="mode">
        {mode}
    </div>);
    children.push(<UnicodeCharacterDefinitionList key="list" char={char} showOptions={showOptions}/>);
    return <li
        typeof="Intangible"
        key={char._}
        style={{
            display:
                showCharacter
                    ? "block" : "none"
        }}
        data-image={imageNone}
        id={char._}
        className="unicode-character-row"
    >
        {children}
    </li>;
};

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


const UnicodeCharacterDefinitionList: StatelessComponent<{ char: UnicodeCharacter, showOptions: ShowDetailsOptions }> = ({char, showOptions}) => {
    const elements = getDetailsAsDefinedTerms(char, showOptions);
    return <dl className="character-details">
        {elements}
    </dl>;
};

function addIfDefined(k: ReactNode, value: string | undefined, visible: boolean, array: ReactNode[]) {
    if (!!value) {
        array.push(<dt style={{display: visible ? "block" : "none"}} className="detail-name">{k}</dt>);
        array.push(<dd style={{display: visible ? "block" : "none"}} className="detail-value"
                       property="identifier">{value}</dd>);
    }
}

function addIfDefinedWolfram(value: string | undefined, wolframId: string | undefined,
                             visible: boolean, array: ReactNode[]) {
    if (!!value) {
        const wname: ReactNode[] = [
            <span key="wolf">Wolfram (Mathematica)</span>
        ];
        if (!!wolframId) wname.push(
            <span key="wolfid"> (<span property="identifier" className="wolfram-id">{wolframId}</span>)</span>
        );
        array.push(<dt style={{display: visible ? "block" : "none"}} className="detail-name">{wname}</dt>);
        array.push(<dd style={{display: visible ? "block" : "none"}} className="detail-value"
                       property="identifier">{value}</dd>);
    }
}

function addIfDefinedSurrogate(value: Surrogate | undefined, array: ReactNode[]) {
    if (!!value) {
        const surr: ReactNode[] = [];
        if (!!value.mathvariant) surr.push(
            <span key="mathvariant"><span property="disambiguatingDescription"
                                          className="mathvariant">{value.mathvariant}</span><span> version of </span></span>
        );
        surr.push(<a href={"#" + value.ref} key="surrogate">{prettyPrintCodePointsFromId(value.ref)}</a>);
        array.push(<dt className="detail-name">surrogate</dt>);
        array.push(<dd className="detail-value">
            {surr}
        </dd>);
    }
}

function addIfDefinedBmp(value: string | undefined, visible: boolean, array: ReactNode[]) {
    if (!!value) {
        array.push(
            <dt style={{display: visible ? "block" : "none"}} className="detail-name">
                <BmpAbbr key="bmp"/>
            </dt>
        );
        array.push(
            <dd style={{display: visible ? "block" : "none"}} className="detail-value"
                property="identifier">
                <a href={"#" + value} key="ref">{prettyPrintCodePointsFromId(value)}</a>
            </dd>
        );
    }

}

function getDetailsAsDefinedTerms(char: UnicodeCharacter, showOptions: ShowDetailsOptions): ReactNode[] {
    const arr: ReactNode[] = [];

    addIfDefinedSurrogate(char.surrogate, arr);

    addIfDefined("LaTeX", char.l, showOptions.latex, arr);
    addIfDefined("LaTeX (math mode)", char.mathlatex, showOptions.latex, arr);
    addIfDefined("LaTeX (variant)", char.varlatex, showOptions.latex, arr);
    addIfDefined("LaTeX (Springer)", char.springer, showOptions.latex, arr);
    addIfDefined(<IeeeAbbr/>, char.ieee, showOptions.latex, arr);
    addIfDefined(<AmsAbbr/>, char.ams, showOptions.latex, arr);

    addIfDefinedWolfram(char.wolfram, char.wolframId, showOptions.wolfram, arr);
    addIfDefined(<AipAbbr/>, char.aip, showOptions.aip, arr);
    addIfDefined(<AcsAbbr/>, char.acs, showOptions.acs, arr);
    addIfDefined(<AfiiAbbr/>, char.afii, showOptions.afii, arr);
    addIfDefined(<ApsAbbr/>, char.aps, showOptions.aps, arr);
    addIfDefinedBmp(char.bmp, showOptions.bmp, arr);
    // todo bmp is a reference to another unicode char

    return arr;
}


// <!--<link rel="apple-touch-icon" href="apple-touch-icon.png">-->
// <!--[if lt IE 8]>
//  <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
// <![endif]-->

function isIsolatedWordIn(word: string, objectWord: string): boolean {
    const iOf = objectWord.indexOf(word);
    return iOf >= 0
        && (
            (iOf === 0 && (objectWord.length === 1 || objectWord.charAt(iOf + 1) === " "))
            || (iOf === (objectWord.length - 1) && (objectWord.length === 1 || objectWord.charAt(iOf - 1) === " "))
            || (objectWord.charAt(iOf - 1) === " "
                && objectWord.charAt(iOf + 1) === " ")
        );
}

function filterObjects(words: string[]): Set<string> | undefined {
    if (words.length === 0) {
        return undefined;
    }

    return new Set(wrappedCharacters.filter(
        obj => words.every(word =>
            obj.normalizedStrings
                .some(
                    (objectWord: string) => word.length === 1
                        ? (isIsolatedWordIn(word, objectWord))
                        : (objectWord.indexOf(word) >= 0)
                )
        )
        )
            .map(c => c.char._)
    )
        ;
}

export interface UAState {
    firstRender: boolean;
    query: string;
    filter: string;
    showOptions: ShowDetailsOptions;
    showOptionsToggle: boolean;
}

export interface UAProps {
    q?: string;
    staticRender?: boolean;
    defaultShowOptions: ShowDetailsOptions;
}

export const AfiiAbbr: StatelessComponent<{}> = ({}) => <span><abbr
    title="Association for Font Information Interchange">
    AFII
</abbr></span>;

export const ApsAbbr: StatelessComponent<{}> = ({}) => <span><abbr
    title="American Physical Society">
    APS
</abbr></span>;

export const AipAbbr: StatelessComponent<{}> = ({}) => <span><abbr
    title="American Institute of Physics">
    AIP
</abbr></span>;

export const AcsAbbr: StatelessComponent<{}> = ({}) => <span><abbr
    title="American Chemical Society">
    ACS
</abbr></span>;

export const AmsAbbr: StatelessComponent<{}> = ({}) => <span><abbr
    title="American Mathematical Society">
    AMS
</abbr>-LaTeX</span>;

export const IeeeAbbr: StatelessComponent<{}> = ({}) => <span>LaTeX (<abbr
    title="Institute of Electrical and Electronic Engineers">
    IEEE
</abbr>)</span>;


export const BmpAbbr: StatelessComponent<{}> = ({}) => <span><abbr
    title={"Basic Multilingual Plane (Plane 0: \"ordinary\" Unicode)"}>
    BMP
</abbr> code</span>;

function getAbbr(name: string): ReactNode {
    switch (name) {
        case "afii":
            return <AfiiAbbr/>;
        case "bmp":
            return <BmpAbbr/>;
        case "aip":
            return <AipAbbr/>;
        case "ams":
            return <AmsAbbr/>;
        case "aps":
            return <ApsAbbr/>;
        case "acs":
            return <AcsAbbr/>;
        case "ieee":
            return <IeeeAbbr/>;
        case "springer":
            return "LaTeX (Springer)";
        case "latex":
            return "LaTeX";
        case "wolfram":
            return "Wolfram (Mathematica)";
        default:
            return name;
    }
}

export const LabelFor: StatelessComponent<{ name: string }> = ({name}) => {
    return <label htmlFor={name}>
        {getAbbr(name)}
    </label>;
};

export class UnicodeApp extends PureComponent<UAProps, UAState> {
    setQueryFilter = _.debounce((filter: string) => {
            this.setState({
                firstRender: false,
                filter
            });
        },
        200,
        {
            leading: false,
            trailing: true
        }
    );

    setQuery(query: string) {
        this.setState({query});
    }

    constructor(props: UAProps) {
        super(props);
        this.state = {
            firstRender: true,
            query: !!props.q ? props.q : "",
            filter: !!props.q ? props.q : "",
            showOptions: props.defaultShowOptions,
            showOptionsToggle: true
        };
    }

    toggleShowOptionsToggle() {
        this.setState({
            firstRender: false,
            showOptionsToggle: !this.state.showOptionsToggle
        });
    }

    changeShowOption(name: keyof ShowDetailsOptions, checked: boolean) {
        console.log();
        const showOptions = copyShowDetailsOptions(this.state.showOptions);
        showOptions[name] = checked;
        this.setState(
            {
                firstRender: false,
                showOptions
            }
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
                    padding: 0,
                    borderWidth: "1px"
                }}
                type="text"
                name="q"
                tabIndex={0}
                onChange={(e) => {
                    const normalizedInput = e.target.value.toLowerCase();
                    this.setQuery(normalizedInput);
                    this.setQueryFilter(normalizedInput);
                }}

            />

            <div className="options-toggle" style={{
                padding: 0,
                right: 0,
                top: 0,
                position: "fixed"
            }}>
                <i className={(this.state.showOptionsToggle ? "active " : "") + "mdc-icon-toggle material-icons"}
                   aria-pressed="false"
                   aria-label="Toggle filters"
                   role="button"
                   data-toggle-on='{"label": "Show filters", "content": "filter_on"}'
                   data-toggle-off='{"label": "Hide filters", "content": "filter_off"}'
                   onClick={() => this.toggleShowOptionsToggle()}
                >filter_list</i>
            </div>

            <div className="option-toggles" style={{
                display: this.state.showOptionsToggle ? "block" : "none",
                margin: "24px",
                padding: 0,
                right: 0,
                top: "50px",
                position: "fixed",
                width: "144px",
                background: "white",
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
                                <LabelFor name={name}/>
                            </div>
                        )
                }
            </div>


            <List
                display={this.state.firstRender}
                showOptions={
                    this.state.showOptions
                }
                filter={this.state.filter}
            />

        </div>;
    }
}


// <span property="numberOfItems">315</span>

// <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
// <!--<script>-->
// <!--(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=-->
// <!--function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;-->
// <!--e=o.createElement(i);r=o.getElementsByTagName(i)[0];-->
// <!--e.src='https://www.google-analytics.com/analytics.js';-->
// <!--r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));-->
// <!--ga('create','UA-XXXXX-X','auto');ga('send','pageview');-->
// <!--</script>-->


// function getDetailRows(options: ShowDetailsOptions,
//                        description: string,
//                        elsevierDesc: string,
//                        type: string, mode: string,
//                        latex: string,
//                        mathlatex: string,
//                        varlatex: string,
//                        wolfram: string,
//                        wolframId: string,
//                        aip: string,
//                        acs: string,
//                        afii: string,
//                        ams: string,
//                        aps: string,
//                        bmp: string,
//                        ieee: string,
//                        springer: string): ReactNode[] {
//     const rows: ReactNode[] = [];
//     // if (!!description)
//     //     rows.push(<DetailsRow
//     //             key="description"
//     //             property="description"
//     //             name="description"
//     //             keyName={"description"}
//     //             value={description}
//     //         />
//     //     );
//     // if (!!elsevierDesc)
//     //     rows.push(<DetailsRow
//     //             key="elsevierDesc"
//     //             property="description"
//     //             name="elsevierDesc"
//     //             keyName={"elsevier description"
//     //             } value={elsevierDesc
//     //         }/>
//     //     );
//     // if (!!type)
//     //     rows.push(<DetailsRow
//     //             key="type"
//     //             property="disambiguatingDescription"
//     //             name="type"
//     //             keyName={"type"}
//     //             value={type}
//     //         />
//     //     );
//     // if (!!mode)
//     //     rows.push(<DetailsRow
//     //             key="mode"
//     //             property="disambiguatingDescription"
//     //             name="mode"
//     //             keyName={"mode"}
//     //             value={mode}
//     //         />
//     //     );
//     if (!!latex)
//         rows.push(<DetailsRow
//                 visible={options.latex}
//                 key="latex"
//                 property="identifier"
//                 name="latex"
//                 keyName={"latex"}
//                 value={latex}
//             />
//         );
//     if (!!mathlatex)
//         rows.push(<DetailsRow
//                 visible={options.latex}
//                 key="mathlatex"
//                 property="identifier"
//                 name="mathlatex"
//                 keyName={"mathlatex"}
//                 value={mathlatex}
//             />
//         );
//     if (!!varlatex)
//         rows.push(<DetailsRow
//                 visible={options.latex}
//                 key="varlatex"
//                 property="identifier"
//                 name="varlatex"
//                 keyName={"varlatex"}
//                 value={varlatex}
//             />
//         );
//     if (!!wolfram) {
//         const wname: ReactNode[] = [
//             <span key="wolf">wolfram</span>
//         ];
//         if (!!wolframId) wname.push(
//             <span key="wolfid"> (<span property="identifier" className="wolfram-id">{wolframId}</span>)</span>
//         );
//
//         rows.push(<tr style={{display: options.wolfram ? "table-row" : "none"}}>
//             <td className="key-name">{wname}</td>
//             <td property="identifier">{wolfram}</td>
//             }
//         </tr>);
//         if (!!aip)
//             rows.push(<DetailsRow
//                     visible={options.aip}
//                     key="aip"
//                     property="identifier"
//                     name="aip"
//                     keyName={"aip"}
//                     value={aip}
//                 />
//             );
//         if (!!acs)
//             rows.push(<DetailsRow
//                     visible={options.acs}
//                     key="acs"
//                     property="identifier"
//                     name="acs"
//                     keyName={"acs"}
//                     value={acs}
//                 />
//             );
//         if (!!afii)
//             rows.push(<DetailsRow
//                     visible={options.afii}
//                     key="afii"
//                     property="identifier"
//                     name="afii"
//                     keyName={"afii"}
//                     value={afii}
//                 />
//             );
//         if (!!ams)
//             rows.push(<DetailsRow
//                     visible={options.ams}
//                     key="ams"
//                     property="identifier"
//                     name="ams"
//                     keyName={"ams"}
//                     value={ams}
//                 />
//             );
//         if (!!aps
//         )
//             rows.push(<DetailsRow
//                     visible={options.aps}
//                     key="aps"
//                     property="identifier"
//                     name="aps"
//                     keyName={"aps"}
//                     value={aps}
//                 />
//             );
//         if (!!bmp
//         )
//             rows.push(<DetailsRow
//                     visible={options.bmp}
//                     key="bmp"
//                     property="identifier"
//                     name="bmp"
//                     keyName={"bmp"}
//                     value={bmp}
//                 />
//             );
//         if (!!ieee
//         )
//             rows.push(<DetailsRow
//                     visible={options.ieee}
//                     key="ieee"
//                     property="identifier"
//                     name="ieee"
//                     keyName={"ieee"}
//                     value={ieee}
//                 />
//             );
//         if (!!springer
//         )
//             rows.push(<DetailsRow
//                     visible={options.springer}
//                     key="springer"
//                     property="identifier"
//                     name="springer"
//                     keyName={"springer"}
//                     value={springer}
//                 />
//             );
//         return rows;
//     }
//
// }
