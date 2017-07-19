# Unicode Characters for Math

This repository exists to make it easier to map between Unicode characters and various other markup languages.

It is based on an XML file [published by W3C](https://www.w3.org/TR/unicode-xml/). The document has been withdrawn since 2016 but is still tremendously useful. (XML mirrored [here](https://github.com/digitalheir/mathy-unicode-characters/blob/master/java/src/main/resources/unicode.xml).)

## Website
The full list of Unicode characters and their conversions is searchable on [a related website](https://digitalheir.github.io/mathy-unicode-characters/).

## API
The repository consists of multiple sub-projects for different languages:

* [`java`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/java) contains the source file in XML, an unmarshaller that converts XML to [plain old Java objects](https://en.wikipedia.org/wiki/Plain_old_Java_object) and writes JSON files.
* [`json`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/json) contains mappings from and to Unicode:
  * convert acs to unicode
  * convert afii to unicode
  * convert aip to unicode
  * convert ams to unicode
  * convert aps to unicode
  * convert description to unicode
  * convert elsevier description to unicode
  * convert ieee to unicode
  * convert latex to unicode
  * convert mathlatex to unicode
  * convert unicode mode to unicode
  * convert springer to unicode
  * convert type to unicode
  * convert unicode to acs
  * convert unicode to afii
  * convert unicode to aip
  * convert unicode to ams
  * convert unicode to aps
  * convert unicode to bmp
  * convert unicode to description
  * convert unicode to elsevier description
  * convert unicode to ieee
  * convert unicode to latex
  * convert unicode to mathlatex
  * convert unicode to unicode mode
  * convert unicode to springer
  * convert unicode to surrogate
  * convert unicode to type
  * convert unicode to varlatex
  * convert unicode to wolfram
  * convert varlatex to unicode
  * convert wolfram to unicode
* [`typescript`](https://github.com/digitalheir/mathy-unicode-characters/tree/master/typescript) contains these maps as typed JavaScript objects, and publishes the mappings to npm under package name [`mathy-unicode-characters`](https://www.npmjs.com/package/mathy-unicode-characters)
