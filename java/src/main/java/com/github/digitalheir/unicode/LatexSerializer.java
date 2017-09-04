package com.github.digitalheir.unicode;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class LatexSerializer implements JsonSerializer<Latex> {
    @Override
    public JsonElement serialize(Latex latex, Type type, JsonSerializationContext jsonSerializationContext) {
        if (latex._package == null && latex.priority == null)
            return new JsonPrimitive(latex.value);
        else
            // Perform default serialization
            return jsonSerializationContext.serialize(latex);
    }
}
