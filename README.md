(You may also be interested in [`latex-to-unicode-converter`](https://github.com/digitalheir/latex-to-unicode-converter))

# Unicode Characters for Math
[![npm version](https://badge.fury.io/js/mathy-unicode-characters.svg)](https://badge.fury.io/js/mathy-unicode-characters)
![License](https://img.shields.io/npm/l/mathy-unicode-characters.svg)

This repository exists to make it easier to map between Unicode characters and various other markup languages when typing math, most notably LaTeX and Mathematica.

It is based on an XML file [published by W3C](https://www.w3.org/TR/unicode-xml/). The document has been withdrawn since 2016 but is still tremendously useful. (XML file is mirrored [here](https://github.com/digitalheir/mathy-unicode-characters/blob/master/java/src/main/resources/unicode.xml), slightly revised to [fix errors](https://github.com/digitalheir/mathy-unicode-characters/issues?q=label%3Abug).)

## Website
The full list of Unicode characters and their conversions is searchable on [a related website](https://digitalheir.github.io/mathy-unicode-characters/).

![Example character from website](https://raw.githubusercontent.com/digitalheir/mathy-unicode-characters/gh-pages/img/pencil.png)

## Usage
The repository consists of multiple sub-projects for different languages:

* [`java`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/java) contains [the source file in XML](https://github.com/digitalheir/mathy-unicode-characters/blob/master/java/src/main/resources/unicode.xml), an unmarshaller that converts XML to [plain old Java objects](https://en.wikipedia.org/wiki/Plain_old_Java_object) and can write JSON files that map Unicode characters to math markup languages and vice versa.
* [`json`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/json) contains mappings from and to Unicode.
* [`typescript`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/typescript) contains the maps as typed JavaScript objects, published on npm under package name [`mathy-unicode-characters`](https://www.npmjs.com/package/mathy-unicode-characters)
  ```typescript
  import {
    unicodeList, // :: UnicodeCharacter[]
    prettyPrintCodePoint,
    latex2unicode // :: {[latexCommand: string]: string}
  } from "mathy-unicode-characters";
  
  console.log(unicodeList.length);
  
  console.log(prettyPrintCodePoint(unicodeList[0])); // U+000000
  
  console.log(latex2unicode["\pm"]); // U000B1 (±)
  
  console.log(Object.keys(latex2unicode).length); // all latex commands that are supported
  ```

## Supported encodings
* convert from acs to unicode
* convert from afii to unicode
* convert from aip to unicode
* convert from ams to unicode
* convert from aps to unicode
* convert from description to unicode
* convert from elsevier description to unicode
* convert from ieee to unicode
* convert from latex to unicode
* convert from mathlatex to unicode
* convert from unicode mode to unicode
* convert from springer to unicode
* convert from type to unicode
* convert from unicode to acs
* convert from unicode to afii
* convert from unicode to aip
* convert from unicode to ams
* convert from unicode to aps
* convert from unicode to bmp
* convert from unicode to description
* convert from unicode to elsevier description
* convert from unicode to ieee
* convert from unicode to latex
* convert from unicode to mathlatex
* convert from unicode to unicode mode
* convert from unicode to springer
* convert from unicode to surrogate
* convert from unicode to type
* convert from unicode to varlatex
* convert from unicode to wolfram
* convert from varlatex to unicode
* convert from wolfram to unicode
