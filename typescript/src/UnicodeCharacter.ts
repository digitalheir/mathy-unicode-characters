import {decimal2unicode} from "./characters/decimal2unicode";
import {UnicodeIdentification} from "./characters/unicodeIdentification";

export interface Surrogate {
    mathvariant: string;
    ref: string;
}

export interface Entity {
    id: string;
    set: string;
    desc?: string;
    multipleShapesExcluded?: boolean;
    xref?: string;
}

export interface Font {
    name: string;
    pos: number | "40)";
}

export const startingU = /^U/;

export function determineHex(u: UnicodeCharacter, withPrefix: boolean = true): string {
    return u._id.replace(startingU, withPrefix ? "0x" : "");
}

export function prettyPrintCodePoint(u: UnicodeCharacter): string {
    return u._id.replace(startingU, "U+");
}

export interface UnicodeCharacter {
    _id: string;
    description: string;
    dec: [number] | [number, number] | [number, number, number];

    descriptionUnicodeVersion?: string;
    mode?: string ;
    type?: string ;
    image?: string ;
    afii?: string ;
    latex?: string ;
    varlatex?: string ;
    mathlatex?: string ;
    ams?: string ;
    aps?: string ;
    acs?: string ;
    aip?: string ;
    ieee?: string ;
    springer?: string ;
    wolfram?: string ;
    wolframId?: string ;
    elsevierGrid?: string ;
    elsevierElsrender?: string ;
    elsevierEnt?: string ;
    elsevierDesc?: string ;
    comment?: string;
    bmp?: string ;

    entity?: Entity[] ;
    font?: Font[] ;
    surrogate?: Surrogate ;

}


export function normalizeStrings(c: UnicodeCharacter): string[]{
    const base: string[] = [];

    base.push(
        "id",
        "unicode",
        "codepoint",
        c._id,
        determineHex(c, true),
        determineHex(c, false),
        prettyPrintCodePoint(c),
    );

    if(!!c.dec) {
        base.push("decimal", "dec");
        base.push(...c.dec.map(c=>c.toString()));
    }

    if(!!c.description) base.push("description", c.description);
    if(!!c.descriptionUnicodeVersion) base.push("version", c.descriptionUnicodeVersion);
    if(!!c.mode) base.push("mode", c.mode);
    if(!!c.type) base.push("type", c.type);
    if(!!c.image) base.push("image", c.image);
    if(!!c.afii) base.push("afii", c.afii);
    if(!!c.latex) base.push("latex", c.latex);
    if(!!c.varlatex) base.push("varlatex", c.varlatex);
    if(!!c.mathlatex) base.push("mathlatex", c.mathlatex);
    if(!!c.ams) base.push("ams", c.ams);
    if(!!c.aps) base.push("aps", c.aps);
    if(!!c.acs) base.push("acs", c.acs);
    if(!!c.aip) base.push("aip", c.aip);
    if(!!c.ieee) base.push("ieee", c.ieee);
    if(!!c.springer) base.push("springer", c.springer);
    if(!!c.wolfram) base.push("wolfram", c.wolfram);
    if(!!c.wolframId) base.push("wolfram", c.wolframId);
    if(!!c.elsevierGrid) base.push("elsevier","grid", c.elsevierGrid);
    if(!!c.elsevierElsrender) base.push("elsevier","elsrender", c.elsevierElsrender);
    if(!!c.elsevierEnt) base.push("elsevier","ent", c.elsevierEnt);
    if(!!c.elsevierDesc) base.push("elsevier", "description", c.elsevierDesc);
    if(!!c.comment) base.push("comment", c.comment);
    if(!!c.bmp) base.push("bmp", c.bmp);

    if(!!c.entity){
        base.push("entity");
        base.push(...c.entity.map(e => e.id));
        // todo more string for entity
    }

    if(!!c.font){
        base.push("font");
        base.push(...c.font.map(e => e.name));
        base.push(...c.font.map(e => e.pos.toString()));
    }

    if(!!c.surrogate){
        base.push("surrogate");
        if(c.surrogate.mathvariant) base.push(c.surrogate.mathvariant);
        // todo also index ref?
    }

    return base.map(s => s.toLowerCase());
}


export function getUnicodeIdentifierFromDecimal(...codepoints: number[]): UnicodeIdentification | undefined {
    return <UnicodeIdentification>decimal2unicode[codepoints.join("-")];
}
