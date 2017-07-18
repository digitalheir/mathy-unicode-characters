
export const groups = {
    "predefined": {
        "predefined": true
    },
    "iso8879": {
        "8879-isoamsa": true,
        "8879-isoamsb": true,
        "8879-isoamsc": true,
        "8879-isoamsn": true,
        "8879-isoamso": true,
        "8879-isoamsr": true,
        "8879-isobox": true,
        "8879-isocyr1": true,
        "8879-isocyr2": true,
        "8879-isodia": true,
        "8879-isogrk1": true,
        "8879-isogrk2": true,
        "8879-isogrk3": true,
        "8879-isogrk4": true,
        "8879-isolat1": true,
        "8879-isolat2": true,
        "8879-isonum": true,
        "8879-isopub": true,
        "8879-isotech": true
    }
    ,
    "iso9573-13": {
        "9573-13-isoamsa": true,
        "9573-13-isoamsb": true,
        "9573-13-isoamsc": true,
        "9573-13-isoamsn": true,
        "9573-13-isoamso": true,
        "9573-13-isoamsr": true,
        "9573-13-isogrk3": true,
        "9573-13-isogrk4": true,
        "9573-13-isomfrk": true,
        "9573-13-isomopf": true,
        "9573-13-isomscr": true,
        "9573-13-isotech": true
    }
    ,
    "mathml": {
        "8879-isobox": true,
        "8879-isocyr1": true,
        "8879-isocyr2": true,
        "8879-isodia": true,
        "8879-isolat1": true,
        "8879-isolat2": true,
        "8879-isonum": true,
        "8879-isopub": true,
        "9573-13-isoamsa": true,
        "9573-13-isoamsb": true,
        "9573-13-isoamsc": true,
        "9573-13-isoamsn": true,
        "9573-13-isoamso": true,
        "9573-13-isoamsr": true,
        "9573-13-isogrk3": true,
        "9573-13-isomfrk": true,
        "9573-13-isomopf": true,
        "9573-13-isomscr": true,
        "9573-13-isotech": true,
        "mmlextra": true,
        "mmlalias": true
    }
    ,
    "html4": {
        "html4-lat1": true,
        "html4-special": true,
        "html4-symbol": true
    }
};

export type Group = keyof typeof groups;
