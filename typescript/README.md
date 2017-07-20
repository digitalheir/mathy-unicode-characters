# Mathy Unicode characters

JavaScript / TypeScript utility to translate mathy Unicode characters to LaTeX, Mathematica or Wolfram 

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
