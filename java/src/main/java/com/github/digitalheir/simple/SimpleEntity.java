package com.github.digitalheir.simple;

import com.github.digitalheir.unicode.Entity;

import static java.util.Objects.requireNonNull;

public class SimpleEntity {
  protected String id;
  protected String set;


  protected String desc;
  protected Boolean multipleShapesExcluded;

  //  protected String optional;
  //  protected String _default;

  //  protected String htmlsdata;
  // protected String htmldesc;
  protected String xref; // may be null

  public SimpleEntity(Entity e) {
    id = requireNonNull(e.getId());
    set = requireNonNull(e.getSet());

    xref = e.getXref();
    desc = e.getDesc();

    final String eComment = e.getComment();

    if ("* multiple shapes, excluded".equals(eComment)) {
      multipleShapesExcluded = true;
    } else {
      if (eComment != null) {
        throw new Error(eComment);
      }
    }

    if (e.getHtmldesc() != null) {
      throw new Error(e.getHtmldesc());
    }
    if (e.getHtmlsdata() != null) {
      throw new Error(e.getHtmlsdata());
    }
    if (e.getDefault() != null) {
      throw new Error(e.getDefault());
    }
    if (e.getOptional() != null) {
      throw new Error(e.getOptional());
    }

  }
}
