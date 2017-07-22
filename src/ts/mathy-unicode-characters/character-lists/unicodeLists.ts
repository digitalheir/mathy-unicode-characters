import {unicodeList_math_1} from "./unicodeList_math_1";
import {unicodeList_math_2} from "./unicodeList_math_2";
import {unicodeList_mixed} from "./unicodeList_mixed";
import {unicodeList_null} from "./unicodeList_null";
import {unicodeList_text} from "./unicodeList_text";
import {unicodeList_unknown} from "./unicodeList_unknown";
import {UnicodeCharacter} from "../UnicodeCharacter";


const base: UnicodeCharacter[] = [];

//noinspection JSUnusedGlobalSymbols
export const unicodeList: UnicodeCharacter[] = base.concat(
    unicodeList_math_1,
    unicodeList_math_2,
    unicodeList_mixed,
    unicodeList_null,
    unicodeList_text,
    unicodeList_unknown
);
