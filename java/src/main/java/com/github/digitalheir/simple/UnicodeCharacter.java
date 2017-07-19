package com.github.digitalheir.simple;

import com.github.digitalheir.unicode.Bmp;
import com.github.digitalheir.unicode.Character;
import com.github.digitalheir.unicode.Description;
import com.github.digitalheir.unicode.Elsevier;
import com.github.digitalheir.unicode.Entity;
import com.github.digitalheir.unicode.Surrogate;
import com.github.digitalheir.unicode.Wolfram;

import java.util.List;
import java.util.stream.Stream;

import static java.util.Objects.nonNull;
import static java.util.Objects.requireNonNull;
import static java.util.stream.Collectors.toList;

public class UnicodeCharacter {
  // [number] | [number, number] | [number, number, number]
  public final List<Integer> dec;

  public final String description;
  public final String descriptionUnicodeVersion;
  public final String mode;
  public final String type;
  public final String image;
  public final String afii;
  public final String latex;
  public final String varlatex;
  public final String mathlatex;
  public final String ams;
  public final String aps;
  public final String acs;
  public final String aip;
  public final String ieee;
  public final String springer;
  public final String comment;

  public final String wolfram;
  public final String wolframId;

  public final SimpleSurrogate surrogate;
  public final String bmp;

  public final String elsevierGrid;
  public final String elsevierElsrender;
  public final String elsevierEnt;
  public final String elsevierDesc;

  public final List<SimpleEntity> entity;

  public final List<SimpleFont> font;


  @SuppressWarnings("UnnecessaryThis")
  public UnicodeCharacter(
      List<Integer> dec,
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
      List<SimpleFont> font,
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

    this.elsevierGrid = (elsevier == null ? null : elsevier.getGrid());
    this.elsevierElsrender = (elsevier == null ? null : elsevier.getElsrender());
    this.elsevierEnt = (elsevier == null ? null : elsevier.getEnt());
    this.elsevierDesc = (elsevier == null ? null : elsevier.getDesc());

    this.ams = (ams);
    this.aps = (aps);
    this.acs = (acs);
    this.aip = (aip);
    this.ieee = (ieee);

    this.wolfram = nonNull(wolfram) ? wolfram.getvalue() : null;
    this.wolframId = nonNull(wolfram) ? wolfram.getId() : null;

    this.springer = (springer);
    this.entity = entity != null ? entity.stream().map(SimpleEntity::new).collect(toList()) : null;
    this.font = font;
    this.comment = (comment);
    this.surrogate = surrogate != null ? new SimpleSurrogate(surrogate) : null;
    this.bmp = bmp != null ? ((Character) bmp.getRef()).getId() : null;

    // requireNonNull(description);
    this.description = description.getvalue();
    this.descriptionUnicodeVersion = description.getUnicode();
  }

  public UnicodeCharacter(com.github.digitalheir.unicode.Character c) {
    this(

        Stream.of(c.dec.split("-"))
            .map(Integer::new)
            .collect(toList()),

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
        c.font == null ? null : c.font.stream().map(SimpleFont::new).collect(toList()),
        c.comment,
        c.surrogate,
        c.bmp,
        c.description
    );
  }
}
