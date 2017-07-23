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
    ieee: false,
    springer: false,
    ams: false,
    wolfram: true,
    acs: false,
    aip: false,
    afii: false,
    aps: false,
    bmp: false,
    ["hide characters with none of selected representations"]: true
};

export function copyShowDetailsOptions(src: ShowDetailsOptions) {
    return {
        latex: src.latex,
        ieee: src.ieee,
        springer: src.springer,
        ams: src.ams,
        wolfram: src.wolfram,
        acs: src.acs,
        aip: src.aip,
        afii: src.afii,
        aps: src.aps,
        bmp: src.bmp,
        ["hide characters with none of selected representations"]: src["hide characters with none of selected representations"]
    };
}
