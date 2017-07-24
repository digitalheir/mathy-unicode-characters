const m = require("mathy-unicode-characters");
const fs = require("fs");


const normalized = m.unicodeList/*.slice(0, 50)*/.map(char => {
    return {
        normalizedStrings: m.normalizeStrings(char),
        char
    };
});


fs.writeFile("wrappedList",
    JSON.stringify(normalized),
    function (err) {
        if (err) {
            return console.log(err);
        }

        console.log(normalized.length);
        console.log("The file was saved!");
    });
