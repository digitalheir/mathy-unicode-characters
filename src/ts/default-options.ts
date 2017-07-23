export interface ShowDetailsOptions {
    latex: boolean;
    wolfram: boolean;
    aip: boolean;
    acs: boolean;
    afii: boolean;
    ams: boolean;
    aps: boolean;
    bmp: boolean;
    ieee: boolean;
    springer: boolean;
    ["hide characters with none of selected representations"]: boolean;
}

export const defaultOptions: ShowDetailsOptions = {
    latex: true,
    ams: false,
    springer: false,
    wolfram: true,
    acs: false,
    aip: false,
    afii: false,
    aps: false,
    bmp: false,
    ieee: false,
    ["hide characters with none of selected representations"]: true
};

export function copyShowDetailsOptions(src: ShowDetailsOptions) {
    return {
        latex: src.latex,
        ams: src.ams,
        springer: src.springer,
        wolfram: src.wolfram,
        acs: src.acs,
        aip: src.aip,
        afii: src.afii,
        aps: src.aps,
        bmp: src.bmp,
        ieee: src.ieee,
        ["hide characters with none of selected representations"]: src["hide characters with none of selected representations"]
    };
}
