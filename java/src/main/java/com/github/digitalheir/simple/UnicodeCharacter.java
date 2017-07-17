package com.github.digitalheir.simple;

import com.github.digitalheir.unicode.Bmp;
import com.github.digitalheir.unicode.Description;
import com.github.digitalheir.unicode.Elsevier;
import com.github.digitalheir.unicode.Entity;
import com.github.digitalheir.unicode.Font;
import com.github.digitalheir.unicode.Surrogate;
import com.github.digitalheir.unicode.Wolfram;

import java.util.List;

import static java.util.Objects.requireNonNull;

public class UnicodeCharacter {
    public final String id;
    // number | [number] | [number, number] | [number, number, number]
    public final Object dec;

    public final String mode;
    public final String type;
    public final String image;
    public final String afii;
    public final String latex;
    public final String varlatex;
    public final String mathlatex;
    public final Elsevier elsevier;
    public final String ams;
    public final String aps;
    public final String acs;
    public final String aip;
    public final String ieee;
    public final Wolfram wolfram;
    public final String springer;
    public final List<Entity> entity;
    public final List<Font> font;
    public final String comment;
    public final Surrogate surrogate;
    public final Bmp bmp;
    public final Description description;

    public UnicodeCharacter(String id,
                            Object dec,
                            String mode,
                            String type,
                            String image,
                            String afii,
                            String latex,
                            String varlatex,
                            String mathlatex,
                            Elsevier elsevier,
                            String ams,
                            String aps,
                            String acs,
                            String aip,
                            String ieee,
                            Wolfram wolfram,
                            String springer,
                            List<Entity> entity,
                            List<Font> font,
                            String comment,
                            Surrogate surrogate,
                            Bmp bmp,
                            Description description) {
        this.id = requireNonNull(id);
        this.dec = requireNonNull(dec);
        this.mode = mode;
        this.type = type;
        this.image = image;
        this.afii = (afii);
        this.latex = (latex);
        this.varlatex = (varlatex);
        this.mathlatex = (mathlatex);
        this.elsevier = (elsevier);
        this.ams = (ams);
        this.aps = (aps);
        this.acs = (acs);
        this.aip = (aip);
        this.ieee = (ieee);
        this.wolfram = (wolfram);
        this.springer = (springer);
        this.entity = (entity);
        this.font = (font);
        this.comment = (comment);
        this.surrogate = (surrogate);
        this.bmp = (bmp);
        this.description = requireNonNull(description);
    }
}
