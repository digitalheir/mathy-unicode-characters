package com.github.digitalheir.simple;

import com.github.digitalheir.unicode.Bmp;
import com.github.digitalheir.unicode.Description;
import com.github.digitalheir.unicode.Elsevier;
import com.github.digitalheir.unicode.Entity;
import com.github.digitalheir.unicode.Surrogate;
import com.github.digitalheir.unicode.Wolfram;

import java.util.List;
import java.util.stream.Stream;

import static java.util.Objects.requireNonNull;
import static java.util.stream.Collectors.toList;

public class CharacterInformation {
  // number | [number] | [number, number] | [number, number, number]
  //    public final Object dec;
  //    public final String mode;
  //    public final String type;
  //    public final String image;
  //    public final String afii;
  //    public final String latex;
  //    public final String varlatex;
  //    public final String mathlatex;
  //    public final String ams;
  //    public final String aps;
  //    public final String acs;
  //    public final String aip;
  //    public final String ieee;
  // string | (IdHaving & ValueHaving)
  //    public final Object wolfram;
  //    public final String springer;
  //    public final String comment;
  //  public final SimpleSurrogate surrogate;
  //  public final Bmp bmp;

  public final String elsevierGrid;
  private final String elsevierElsrender;
  private final String elsevierEnt;

  public final List<SimpleEntity> entity;

  // Font | Font[]
  public final Object font;

  // string | Description
//  public final Object description;

  public CharacterInformation(
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
      List<SimpleFont> font,
      String comment,
      Surrogate surrogate,
      Bmp bmp,
      Description description) {
//        this.dec = requireNonNull(dec);
//        this.mode = mode;
//        this.type = type;
//        this.image = image;
//        this.afii = (afii);
//        this.latex = (latex);
//        this.varlatex = (varlatex);
//        this.mathlatex = (mathlatex);
    elsevierGrid = (elsevier == null ? null : elsevier.getGrid());
    elsevierElsrender = (elsevier == null ? null : elsevier.getElsrender());
    elsevierEnt = (elsevier == null ? null : elsevier.getEnt());
//        this.ams = (ams);
//        this.aps = (aps);
//        this.acs = (acs);
//        this.aip = (aip);
//        this.ieee = (ieee);
//        this.wolfram = nonNull(wolfram) && isNull(wolfram.getId()) ? wolfram.getvalue() : wolfram;
//        this.springer = (springer);
    this.entity = entity != null ? entity.stream().map(SimpleEntity::new).collect(toList()) : null;
    this.font = font != null && font.size() == 1 ? font.get(0) : null;
//        this.comment = (comment);
//    this.surrogate = surrogate != null ? new SimpleSurrogate(surrogate) : null;
//    this.bmp = (bmp);
    requireNonNull(description);
    //this.description = isNull(description.getUnicode()) ? description.getvalue() : description;
  }

  public CharacterInformation(com.github.digitalheir.unicode.Character c) {
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
        c.font == null ? null : c.font.stream().map(SimpleFont::new).collect(toList()),
        c.comment,
        c.surrogate,
        c.bmp,
        c.description
    );
  }
}
