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
    ["hide characters with no representation selected above"]: boolean;
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
    ["hide characters with no representation selected above"]: true
};
