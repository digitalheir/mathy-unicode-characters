package com.github.digitalheir.unicode;

import com.github.digitalheir.simple.UnicodeCharacter;
import com.google.gson.*;

import java.lang.reflect.Type;

public class CharacterReferenceSerializer implements JsonSerializer<Character>{
    @Override
    public JsonElement serialize(Character character, Type type, JsonSerializationContext jsonSerializationContext) {
        return new JsonPrimitive(character.id);
    }
}
