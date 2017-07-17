export interface IdHaving {
    id: string;
}

export interface ValueHaving {
    value: string;
}

export type Wolfram = string | (IdHaving & ValueHaving);


export interface Entity {
    id: string;
    set: string;
    desc: string;
}

export interface Surrogate {
    mathvariant: string; // todo see mathviarants
    ref: SurrogateRef;
}

export interface SurrogateRef {
    id: string;
    dec: string;
    mode: string;
    type: string;
    latex: string;
    description: string;
}

export interface Font {
    name: string;
    post: number;
}
export interface BmpEntity {


            id: string;
            set: string;
            desc: string;


}
export interface BmpRef {
        id: string;
        dec: string;
        mode: string;
        type: string;
        entity: BmpEntity[];
        description: string;
}

export interface Bmp {
    ref: BmpRef;
}

export interface Elsevier {
    grid: string;
    ent: string;
    desc: string;
    elsrender: string;
}

export interface Character {
    id: string;
    dec: number | [number] | [number, number] | [number, number, number];
    description: string;


    mode?: string ;
    type?: string ;
    image?: string ;
    afii?: string ;
    latex?: string ;
    varlatex?: string ;
    mathlatex?: string ;
    elsevier?: Elsevier ;
    ams?: string ;
    aps?: string ;
    acs?: string ;
    aip?: string ;
    ieee?: string ;
    wolfram?: Wolfram ;
    springer?: string ;
    entity?: Entity[] ;
    font?: Font | Font[] ;
    comment?: string ;
    surrogate?: Surrogate ;
    bmp?: Bmp ;
}