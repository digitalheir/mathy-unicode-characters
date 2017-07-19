# Unicode Characters for Math

This repository exists to make it easier to map between Unicode characters and various other markup languages when typing math, most notably LaTeX and Mathematica.

It is based on an XML file [published by W3C](https://www.w3.org/TR/unicode-xml/). The document has been withdrawn since 2016 but is still tremendously useful. (XML mirrored [here](https://github.com/digitalheir/mathy-unicode-characters/blob/master/java/src/main/resources/unicode.xml).)

## Website
The full list of Unicode characters and their conversions is searchable on [a related website](https://digitalheir.github.io/mathy-unicode-characters/).

![Example](https://raw.githubusercontent.com/digitalheir/mathy-unicode-characters/gh-pages/img/less%20than%20nor%20equal%20to.png)

## API
The repository consists of multiple sub-projects for different languages:

* [`java`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/java) contains the source file in XML, an unmarshaller that converts XML to [plain old Java objects](https://en.wikipedia.org/wiki/Plain_old_Java_object) and writes JSON files.
* [`json`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/json) contains mappings from and to Unicode.
* [`typescript`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/typescript) contains the maps as typed JavaScript objects, published on npm under package name [`mathy-unicode-characters`](https://www.npmjs.com/package/mathy-unicode-characters)

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
