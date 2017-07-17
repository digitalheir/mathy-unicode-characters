package com.github.digitalheir.simple;

import com.github.digitalheir.unicode.*;

import java.util.List;
import java.util.stream.Stream;

import static java.util.Objects.*;

public class MinimalUnicodeCharacter {
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
    // string | (IdHaving & ValueHaving)
//    public final Object wolfram;
    public final String springer;
    public final List<Entity> entity;
    public final Object font;
    public final String comment;
    public final Surrogate surrogate;
    public final Bmp bmp;
    public final Object description;

    public MinimalUnicodeCharacter(
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
        this.springer = (springer);
        this.entity = (entity);
        this.font = (font != null && font.size() == 1 ? font.get(0) : font);
        this.comment = (comment);
        this.surrogate = (surrogate);
        this.bmp = (bmp);
        requireNonNull(description);
        this.description = isNull(description.getUnicode()) ? description.getvalue() : description;
    }

    public MinimalUnicodeCharacter(com.github.digitalheir.unicode.Character c) {
        this(
                c.dec.contains("-") ?
                        Stream.of(c.dec.split("-"))
                                .mapToInt(Integer::parseInt)
                                .toArray()
                        : new Integer(c.dec),

                c.mode,
                c.type,
                c.image,
                c.afii,
                c.latex,
                c.varlatex,
                c.mathlatex,
                c.elsevier,
                c.ams,
                c.aps,
                c.acs,
                c.aip,
                c.ieee,
                c.wolfram,
                c.springer,
                c.entity,
                c.font,
                c.comment,
                c.surrogate,
                c.bmp,
                c.description
        );
    }
}
