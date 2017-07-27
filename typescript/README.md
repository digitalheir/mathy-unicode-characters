[![npm version](https://badge.fury.io/js/mathy-unicode-characters.svg)](https://badge.fury.io/js/mathy-unicode-characters)
![License](https://img.shields.io/npm/l/mathy-unicode-characters.svg)
[![Code Climate](https://codeclimate.com/github/digitalheir/mathy-unicode-characters/badges/gpa.svg)](https://codeclimate.com/github/digitalheir/mathy-unicode-characters)

# Unicode Characters for Math / JavaScript

This repository exists to make it easier to map between Unicode characters and various other markup languages when typing math, most notably LaTeX and Mathematica. Also see the [top-level project description](https://github.com/digitalheir/mathy-unicode-characters).

This subfolder contains the source for the JavaScript / TypeScript utility to translate the Unicode characters to LaTeX, Mathematica or Wolfram or vice versa.

## Usage

published on npm under package name [`mathy-unicode-characters`](https://www.npmjs.com/package/mathy-unicode-characters)
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
