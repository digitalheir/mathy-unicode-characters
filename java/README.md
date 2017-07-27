# Unicode Characters for Math / Java

This repository exists to make it easier to map between Unicode characters and various other markup languages when typing math, most notably LaTeX and Mathematica. Also see the [top-level project description](https://github.com/digitalheir/mathy-unicode-characters).

This subfolder contains [the source file in XML](https://github.com/digitalheir/mathy-unicode-characters/blob/master/java/src/main/resources/unicode.xml), an unmarshaller that converts XML to [plain old Java objects](https://en.wikipedia.org/wiki/Plain_old_Java_object) and some Java classes that parse the XML and [emit JSON files](https://github.com/digitalheir/mathy-unicode-characters/tree/master/json) that map Unicode characters to Math markup languages and vice versa.
