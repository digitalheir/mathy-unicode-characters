import {unicodeList_math} from "./unicodeList_math";
import {unicodeList_mixed} from "./unicodeList_mixed";
import {unicodeList_null} from "./unicodeList_null";
import {unicodeList_text} from "./unicodeList_text";
import {unicodeList_unknown} from "./unicodeList_unknown";
import {UnicodeCharacter} from "../UnicodeCharacter";


const base: UnicodeCharacter[] = [];

//noinspection JSUnusedGlobalSymbols
export const unicodeList: UnicodeCharacter[] = base.concat(
    unicodeList_math,
    unicodeList_mixed,
    unicodeList_null,
    unicodeList_text,
    unicodeList_unknown
);
