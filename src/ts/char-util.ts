import {determineHex, prettyPrintCodePoint, UnicodeCharacter} from "./mathy-unicode-characters/UnicodeCharacter";

export const fromCodePoint = function (...argz: (string | number)[]) {
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

export function getAsString(hexaDecimals: number[]): string {
    return fromCodePoint(
        ...hexaDecimals
    );
}

export function normalizeStrings(c: UnicodeCharacter): string[] {
    const base: string[] = [];

    const id = "id";
    const unicode = "unicode";
    const codepoint = "codepoint";
    base.push(
        id,
        unicode,
        codepoint,
        c._id,
        determineHex(c, true),
        determineHex(c, false),
        prettyPrintCodePoint(c),
    );

    if (!!c.dec) {
        base.push("decimal", "dec");
        base.push(...c.dec.map(c => c.toString()));
    }

    if (!!c.description) base.push("description", c.description);
    if (!!c.descriptionUnicodeVersion) base.push("version", c.descriptionUnicodeVersion);
    if (!!c.mode) base.push("mode", c.mode);
    if (!!c.type) base.push("type", c.type);
    if (!!c.image) base.push("image", c.image);
    if (!!c.afii) base.push("afii", c.afii);
    if (!!c.latex) base.push("latex", c.latex);
    if (!!c.varlatex) base.push("varlatex", c.varlatex);
    if (!!c.mathlatex) base.push("mathlatex", c.mathlatex);
    if (!!c.ams) base.push("ams", c.ams);
    if (!!c.aps) base.push("aps", c.aps);
    if (!!c.acs) base.push("acs", c.acs);
    if (!!c.aip) base.push("aip", c.aip);
    if (!!c.ieee) base.push("ieee", c.ieee);
    if (!!c.springer) base.push("springer", c.springer);
    if (!!c.wolfram) base.push("wolfram", c.wolfram);
    if (!!c.wolframId) base.push("wolfram", c.wolframId);
    if (!!c.elsevierGrid) base.push("elsevier", "grid", c.elsevierGrid);
    if (!!c.elsevierElsrender) base.push("elsevier", "elsrender", c.elsevierElsrender);
    if (!!c.elsevierEnt) base.push("elsevier", "ent", c.elsevierEnt);
    if (!!c.elsevierDesc) base.push("elsevier", "description", c.elsevierDesc);
    if (!!c.comment) base.push("comment", c.comment);
    if (!!c.bmp) base.push("bmp", c.bmp);

    if (!!c.entity) {
        base.push("entity");
        base.push(...c.entity.map(e => e.id));
        // todo more string for entity
    }

    if (!!c.font) {
        base.push("font");
        base.push(...c.font.map(e => e.name));
        base.push(...c.font.map(e => e.pos.toString()));
    }

    if (!!c.surrogate) {
        base.push("surrogate");
        if (c.surrogate.mathvariant) base.push(c.surrogate.mathvariant);
        // todo also index ref?
    }

    return base.map(s => s.toLowerCase());
}
