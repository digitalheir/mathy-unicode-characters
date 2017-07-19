package com.github.digitalheir.simple;

import com.github.digitalheir.unicode.Surrogate;

import static java.util.Objects.requireNonNull;

public class SimpleSurrogate {
  protected String mathvariant;
  protected String ref;


  public SimpleSurrogate(Surrogate e) {
    mathvariant = requireNonNull(e.getMathvariant());
    ref = ((com.github.digitalheir.unicode.Character) e.getRef()).getId();
  }
}
