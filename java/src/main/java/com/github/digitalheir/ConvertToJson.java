package com.github.digitalheir;

import com.github.digitalheir.simple.CharacterInformation;
import com.github.digitalheir.unicode.Character;
import com.github.digitalheir.unicode.Charlist;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.lang.Boolean.FALSE;
import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toMap;
import static java.util.stream.Collectors.toSet;


public class ConvertToJson {
    public static void main(String[] args) {
        System.out.println("Extruding JSON");
        try {
            JAXBContext jc = JAXBContext.newInstance("com.github.digitalheir.unicode");

            XMLInputFactory xif = XMLInputFactory.newFactory();
            xif.setProperty(XMLInputFactory.SUPPORT_DTD, false);

            InputStream unicodeStream = ConvertToJson.class.getClassLoader().getResourceAsStream(
                    "unicode.xml"
            );

            XMLStreamReader xsr = xif.createXMLStreamReader(unicodeStream);

            Unmarshaller unmarshaller = jc.createUnmarshaller();
            Charlist parsedObject = (Charlist) unmarshaller.unmarshal(xsr);

            countdoubleids(parsedObject);

            List<Character> characters = parsedObject.character;

            for (Character character : characters) {
                if (character.getComment() != null) {
                    throw new Error();
                }
            }


            writeGsonFile("unicode", parsedObject);

//            writeGsonFileForExtraInformation(characters);

            writeGsonFilesForWolfram(characters);
            writeGsonFilesForImage(characters);
            writeGsonFilesForDec(characters);
            writeGsonFilesForDescription(characters);
            writeGsonFilesForSurrogate(characters);
            writeGsonFilesForBmp(characters);

            // combines latex, varlatex, mathlatex and ams codes
            mapAndWriteLatex(characters);

            mapAndWriteGsonFiles(characters, "elsevierDesc", Character::getElsevierDesc);
            mapAndWriteGsonFiles(characters, "aps", Character::getAPS);
            mapAndWriteGsonFiles(characters, "acs", Character::getACS);
            mapAndWriteGsonFiles(characters, "aip", Character::getAIP);
            mapAndWriteGsonFiles(characters, "ieee", Character::getIEEE);
            mapAndWriteGsonFiles(characters, "afii", Character::getAfii);
            mapAndWriteGsonFiles(characters, "mode", Character::getMode);
            mapAndWriteGsonFiles(characters, "type", Character::getType);
            mapAndWriteGsonFiles(characters, "springer", Character::getSpringer);

        } catch (JAXBException | XMLStreamException | IOException je) {
            je.printStackTrace();
        }
    }

//    private static void writeGsonFileForExtraInformation(List<Character> characters) throws IOException {
//        Map<String, CharacterInformation> idToChar = characters.stream()
//                .collect(
//                        Collectors.toMap(
//                                Character::getId,
//                                CharacterInformation::new
//                        )
//                );
//
//        writeGsonFile(
//                "unicodeIdentification",
//                idToChar
//        );
//    }

    private static void writeGsonFile(String filename, Object object) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        final String json = gson.toJson(object);

        Files.write(
                Paths.get("../json/" + filename + ".json"),
                json.getBytes()
        );

        /*
        Files.write(
                Paths.get("../ts/" + filename + ".ts"),
                ("export const " + filename + " = " + json + ";\n\nexport type " + java.lang.Character.toUpperCase(filename.charAt(0))
                        + filename.substring(1) + " = keyof typeof " + filename).getBytes()
        );
        */
    }

    private static void writeGsonFilesForWolfram(List<Character> characters) throws IOException {
        writeGsonFile("wolfram2unicode", mapOneToMany(
                characters, entry -> nonNull(entry.getWolfram()),
                key -> key.getWolfram().getvalue(),
                mapping(Character::getId, toSet())
        ));

        writeGsonFile("unicode2wolfram", mapOneToMany(
                characters,
                entry -> nonNull(entry.getWolfram()),
                Character::getId,
                mapping(Character::getNormalizedWolfram, toSet())
        ));
    }

    private static void writeGsonFilesForImage(List<Character> characters) throws IOException {
        Map<String, Boolean> map = characters.stream()
                .filter(c -> nonNull(c.getImage()))
                .peek(c -> {
                    if (!"none".equals(c.getImage())) {
                        throw new Error("expected 'none'");
                    }
                })
                .collect(toMap(
                        Character::getId,
                        c -> FALSE
                ));

        writeGsonFile(
                "unicode2imageNone",
                map
        );
    }

    private static void writeGsonFilesForDescription(List<Character> characters) throws IOException {

        writeGsonFile(
                "unicode2description",
                characters.stream()
                        .filter(c -> !c.getDescription().getvalue().trim().isEmpty())
                        .collect(
                                toMap(
                                        Character::getId,
                                        Character::getNormalizedDescription
                                )
                        )
        );

        writeGsonFile(
                "description2unicode",
                mapOneToMany(
                        characters,
                        c -> !c.getDescription().getvalue().trim().isEmpty() || c.getDescription().getUnicode() != null,
                        c -> c.getDescription().getvalue(),
                        mapping(Character::getId, toSet())
                )
        );
    }

    private static void writeGsonFilesForDec(List<Character> characters) throws IOException {

        writeGsonFile(
                "unicode2decimal",
                characters.stream()
                        .collect(
                                toMap(
                                        Character::getId,
                                        Character::getNormalizedDec
                                )
                        )
        );

        writeGsonFile(
                "decimal2unicode",
                characters.stream()
                        .collect(
                                toMap(
                                        Character::getDec,
                                        Character::getId
                                )
                        )
        );
    }

    private static void writeGsonFilesForSurrogate(List<Character> characters) throws IOException {
        Map<String, Object> map = characters.stream()
                .filter(c -> nonNull(c.getSurrogate()))
                .collect(
                        toMap(
                                Character::getId,
                                Character::createSimpleSurrogate
                        )
                );

        writeGsonFile(
                "unicode2surrogate",
                map
        );
    }

    private static void writeGsonFilesForBmp(List<Character> characters) throws IOException {
        Map<String, String> map = characters.stream()
                .filter(c -> nonNull(c.getBmp()))
                .collect(
                        toMap(
                                Character::getId,
                                Character::getBmpRef
                        )
                );

        writeGsonFile(
                "unicode2bmp",
                map
        );
    }

    private static void mapAndWriteGsonFiles(List<Character> characters, String string, Function<Character, String> getValue) throws IOException {
        writeGsonFile("unicode2" + string + "",
                mapOneToMany(
                        characters,
                        entry -> nonNull(getValue.apply(entry)),
                        Character::getId,
                        mapping(getValue, toSet())
                ));

        writeGsonFile(string + "2unicode", mapOneToMany(
                characters,
                entry -> nonNull(getValue.apply(entry)),
                getValue,
                mapping(Character::getId, toSet())
        ));
    }


    private static Map<String, Object> mapOneToMany(
            List<Character> characters, Predicate<Character> filter,
            Function<Character, String> keyMap,
            Collector<Character, ?, Set<Object>> valueMap
    ) {
        return characters.stream()
                .filter(filter)
                .collect(
                        groupingBy(
                                keyMap,
                                valueMap
                        )
                )
                .entrySet()
                .stream()
                .collect(
                        toMap(
                                Map.Entry::getKey,
                                s -> s.getValue().size() == 1
                                        ? s.getValue().iterator().next()
                                        : s.getValue()
                        )
                );
    }

    public static <T, U, A, R>
    Collector<T, ?, R> flatMapping(Function<? super T, U[]> mapper,
                                   Collector<? super U, A, R> downstream) {
        BiConsumer<A, ? super U> downstreamAccumulator = downstream.accumulator();
        return Collector.of(downstream.supplier(),
                (r, t) -> Arrays.stream(mapper.apply(t)).sequential().forEach(u -> downstreamAccumulator.accept(r, u)),
                downstream.combiner(),
                downstream.finisher(),
                downstream.characteristics().stream().toArray(Collector.Characteristics[]::new));
    }


    private static void mapAndWriteLatex(List<Character> characters) throws IOException {
        writeGsonFile("unicode2latex",
                mapOneToMany(
                        characters,
                        entry -> entry.getLatexCodes().length > 0,
                        Character::getId,
                        flatMapping(Character::getLatexCodes, toSet())
                ));

        writeGsonFile("latex2unicode",
                mapManyToMany(
                        characters,
                        Character::getProperLatexCodes,
                        Character::getId
                ));
    }

    private static Map<String, Object> mapManyToMany(
            List<Character> characters,
            Function<Character, String[]> keyMap,
            Function<Character, Object> valueMap
    ) {
        return characters.stream()
                .flatMap(item -> Arrays.stream(keyMap.apply(item)).map(key -> new AbstractMap.SimpleEntry<>(key, valueMap.apply(item))))
                .collect(
                        groupingBy(
                                Map.Entry::getKey,
                                mapping(Map.Entry::getValue, toSet())
                        )
                )
                .entrySet().stream()
                .collect(
                        toMap(
                                Map.Entry::getKey,
                                s -> s.getValue().size() == 1
                                        ? s.getValue().iterator().next()
                                        : s.getValue()
                        )
                );
    }

    private static void countdoubleids(Charlist customer) {
        List<List<String>> meme = customer.character.stream()
                .map(Character::getId)
                .collect(groupingBy(str -> str))
                .values()
                .stream()
                .filter(l -> l.size() > 1)
                .collect(Collectors.toList());
        System.out.println(
                meme.size()
        );
    }
}
