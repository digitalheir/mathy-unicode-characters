export interface MathVariant {
    name: "bold" |
        "italic" |
        "bold-italic" |
        "double-struck" |
        "script" |
        "bold-script" |
        "fraktur" |
        "bold-fraktur" |
        "sans-serif" |
        "bold-sans-serif" |
        "sans-serif-italic" |
        "sans-serif-bold-italic" |
        "monospace";
    description: string;
}

export const mathvariants: MathVariant[] = [
        {
            "name": "bold",
            "description": "Bold (Serif)"
        },
        {
            "name": "italic",
            "description": "Italic or Slanted"
        },
        {
            "name": "bold-italic",
            "description": "Bold Italic or Slanted"
        },
        {
            "name": "double-struck",
            "description": "Double Struck (Open Face, Blackboard Bold)"
        },
        {
            "name": "script",
            "description": "Script (or Calligraphic)"
        },
        {
            "name": "bold-script",
            "description": "Bold Script"
        },
        {
            "name": "fraktur",
            "description": "Fraktur"
        },
        {
            "name": "bold-fraktur",
            "description": "Bold Fraktur"
        },
        {
            "name": "sans-serif",
            "description": "Sans Serif"
        },
        {
            "name": "bold-sans-serif",
            "description": "Bold Sans Serif"
        },
        {
            "name": "sans-serif-italic",
            "description": "Slanted Sans Serif"
        },
        {
            "name": "sans-serif-bold-italic",
            "description": "Slanted Bold Sans Serif"
        },
        {
            "name": "monospace",
            "description": "Monospace"
        }
    ]
;