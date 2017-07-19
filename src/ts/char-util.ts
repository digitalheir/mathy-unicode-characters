
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
