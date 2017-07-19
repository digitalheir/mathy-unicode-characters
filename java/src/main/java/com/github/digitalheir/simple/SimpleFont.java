package com.github.digitalheir.simple;

import com.github.digitalheir.unicode.Font;

public class SimpleFont {
  // number | 40)
  public final Object pos;
  public final String name;

  public SimpleFont(Font f) {
    name = f.getName();
    pos = "40)".equals(f.getPos()) ? "40)" : new Integer(f.getPos());
  }
}
