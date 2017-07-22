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
    wolfram: true,
    aip: false,
    acs: false,
    afii: false,
    ams: false,
    aps: false,
    bmp: false,
    ieee: false,
    springer: false,
    ["hide characters with none of selected representations"]: true
};

export function copyShowDetailsOptions(src: ShowDetailsOptions) {
    return {
        latex: src.latex,
        wolfram: src.wolfram,
        aip: src.aip,
        acs: src.acs,
        afii: src.afii,
        ams: src.ams,
        aps: src.aps,
        bmp: src.bmp,
        ieee: src.ieee,
        springer: src.springer,
        ["hide characters with none of selected representations"]: src["hide characters with none of selected representations"]
    };
}
