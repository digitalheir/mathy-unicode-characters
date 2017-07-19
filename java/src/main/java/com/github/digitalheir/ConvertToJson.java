package com.github.digitalheir;

import com.github.digitalheir.simple.CharacterInformation;
import com.github.digitalheir.unicode.Character;
import com.github.digitalheir.unicode.Charlist;
import com.google.gson.Gson;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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
            XMLStreamReader xsr = xif.createXMLStreamReader(
                    ConvertToJson.class.getClassLoader().getResourceAsStream(
                            "unicode.xml"
                    )
            );

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

            writeGsonFileForExtraInformation(characters);

            writeGsonFilesForWolfram(characters);
            writeGsonFilesForImage(characters);
            writeGsonFilesForDec(characters);
            writeGsonFilesForDescription(characters);
            writeGsonFilesForSurrogate(characters);
            writeGsonFilesForBmp(characters);

            mapAndWriteGsonFiles(
                    characters,
                    "elsevierDesc",
                    entry -> nonNull(entry.getElsevier()) && nonNull(entry.getElsevier().getDesc()),
                    entry -> entry.getElsevier().getDesc()
            );

            mapAndWriteGsonFiles(characters, "ams", entry -> nonNull(entry.getAMS()), Character::getAMS);
            mapAndWriteGsonFiles(characters, "aps", entry -> nonNull(entry.getAPS()), Character::getAPS);
            mapAndWriteGsonFiles(characters, "acs", entry -> nonNull(entry.getACS()), Character::getACS);
            mapAndWriteGsonFiles(characters, "aip", entry -> nonNull(entry.getAIP()), Character::getAIP);
            mapAndWriteGsonFiles(characters, "ieee", entry -> nonNull(entry.getIEEE()), Character::getIEEE);
            mapAndWriteGsonFiles(characters, "afii", entry -> nonNull(entry.getAfii()), Character::getAfii);
            mapAndWriteGsonFiles(characters, "mode", entry -> nonNull(entry.getMode()), Character::getMode);
            mapAndWriteGsonFiles(characters, "type", entry -> nonNull(entry.getType()), Character::getType);
            mapAndWriteGsonFiles(characters, "latex", entry -> nonNull(entry.getLatex()), Character::getLatex);
            mapAndWriteGsonFiles(characters, "varlatex", entry -> nonNull(entry.getVarlatex()), Character::getVarlatex);
            mapAndWriteGsonFiles(characters, "mathlatex", entry -> nonNull(entry.getMathlatex()), Character::getMathlatex);
            mapAndWriteGsonFiles(characters, "springer", entry -> nonNull(entry.getSpringer()), Character::getSpringer);


        } catch (JAXBException | XMLStreamException | IOException je) {
            je.printStackTrace();
        }
    }

    private static void writeGsonFileForExtraInformation(List<Character> characters) throws IOException {
        Map<String, CharacterInformation> idToChar = characters.stream()
                .collect(
                        Collectors.toMap(
                                Character::getId,
                                CharacterInformation::new
                        )
                );

        writeGsonFile(
                "unicodeIdentification",
                idToChar
        );
    }

    private static void writeGsonFile(String filename, Object object) throws IOException {
        final String json = new Gson().toJson(object);
        Files.write(
                Paths.get("../json/" + filename + ".json"),
                json.getBytes()
        );

        Files.write(
                Paths.get("../ts/" + filename + ".ts"),
                ("export const " + filename + " = " + json + ";\n\nexport type " + java.lang.Character.toUpperCase(filename.charAt(0))
                        + filename.substring(1) + " = keyof typeof " + filename).getBytes()
        );
    }

    private static void writeGsonFilesForWolfram(List<Character> characters) throws IOException {
        writeGsonFiles("wolfram2unicode", mapXtoOneOrMoreYs(
                characters, entry -> nonNull(entry.getWolfram()),
                key -> key.getWolfram().getvalue(),
                mapping(Character::getId, toSet())
        ), "unicode2wolfram", mapXtoOneOrMoreYs(
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
                mapXtoOneOrMoreYs(
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

    private static void writeGsonFiles(String filename, Object object, String filename2, Object object2) throws IOException {
        writeGsonFile(filename, object);
        writeGsonFile(filename2, object2);
    }

    private static void mapAndWriteGsonFiles(List<Character> characters, String string, Predicate<Character> filter, Function<Character, String> getValue) throws IOException {
        writeGsonFiles("unicode2" + string + "",
                mapXtoOneOrMoreYs(
                        characters,
                        filter,
                        Character::getId,
                        mapping(getValue, toSet())
                ), string + "2unicode", mapXtoOneOrMoreYs(
                        characters,
                        filter,
                        getValue,
                        mapping(Character::getId, toSet())
                ));
    }

    private static Map<String, Object> mapXtoOneOrMoreYs(
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
                )
                ;
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
