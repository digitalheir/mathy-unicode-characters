package com.github.digitalheir;

import com.github.digitalheir.simple.UnicodeCharacter;
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
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toSet;


public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello!");
        try {
            JAXBContext jc = JAXBContext.newInstance("com.github.digitalheir.unicode");

            XMLInputFactory xif = XMLInputFactory.newFactory();
            xif.setProperty(XMLInputFactory.SUPPORT_DTD, false);
            XMLStreamReader xsr = xif.createXMLStreamReader(
                    HelloWorld.class.getClassLoader().getResourceAsStream(
                            "unicode.xml"
                    )
            );

            Unmarshaller unmarshaller = jc.createUnmarshaller();
            Charlist customer = (Charlist) unmarshaller.unmarshal(xsr);

            countdoubleids(customer);

            List<Character> characters = customer.character;

            writeGsonFilesForWolfram(characters);

            writeGsonFilesForStringMap(characters, "ams", entry -> nonNull(entry.getAMS()), Character::getAMS);
            writeGsonFilesForStringMap(characters, "aps", entry -> nonNull(entry.getAPS()), Character::getAPS);
            writeGsonFilesForStringMap(characters, "acs", entry -> nonNull(entry.getACS()), Character::getACS);
            writeGsonFilesForStringMap(characters, "aip", entry -> nonNull(entry.getAIP()), Character::getAIP);
            writeGsonFilesForStringMap(characters, "ieee", entry -> nonNull(entry.getIEEE()), Character::getIEEE);
            writeGsonFilesForStringMap(characters, "latex", entry -> nonNull(entry.getLatex()), Character::getLatex);
            writeGsonFilesForStringMap(characters, "varlatex", entry -> nonNull(entry.getVarlatex()), Character::getVarlatex);
            writeGsonFilesForStringMap(characters, "matlatex", entry -> nonNull(entry.getMathlatex()), Character::getMathlatex);
            writeGsonFilesForStringMap(characters, "afii", entry -> nonNull(entry.getAfii()), Character::getAfii);
            writeGsonFilesForStringMap(characters, "mode", entry -> nonNull(entry.getMode()), Character::getMode);
            writeGsonFilesForStringMap(characters, "type", entry -> nonNull(entry.getType()), Character::getType);



            Map<String, UnicodeCharacter> idToChar = characters.stream()
                    .collect(
                            Collectors.toMap(
                                    Character::getId,
                                    UnicodeCharacter::new
                            )
                    );

            Files.write(
                    Paths.get("unicode.json"),
                    new Gson().toJson(idToChar).getBytes()
            );


        } catch (JAXBException | XMLStreamException | IOException je) {
            je.printStackTrace();
        }
    }

    private static void writeGsonFilesForWolfram(List<Character> characters) throws IOException {
        writeGsonFiles("wolfram2unicode.json", mapXtoY(
                characters, entry -> nonNull(entry.getWolfram()),
                key -> key.getWolfram().getvalue(),
                mapping(Character::getId, toSet())
        ), "unicode2wolfram.json", mapXtoY(
                characters,
                entry -> nonNull(entry.getWolfram()),
                Character::getId,
                mapping(Character::getNormalizedWolfram, toSet())
        ));
    }

    private static void writeGsonFiles(String filename, Map<String, Set<Object>> object, String filename2, Map<String, Set<Object>> object2) throws IOException {
        writeGsonFile(filename, object);
        writeGsonFile(filename2, object2);
    }

    private static void writeGsonFilesForStringMap(List<Character> characters, String string, Predicate<Character> filter, Function<Character, String> getValue) throws IOException {
        writeGsonFiles("unicode2"+string+".json", mapXtoY(
                characters,
                filter,
                Character::getId,
                mapping(getValue, toSet())
        ), string+"2unicode.json", mapXtoY(
                characters,
                filter,
                getValue,
                mapping(Character::getId, toSet())
        ));
    }

    private static Map<String, Set<Object>> mapXtoY(List<Character> characters, Predicate<Character> filter, Function<Character, String> keyMap, Collector<Character, ?, Set<Object>> valueMap) {
        return characters.stream()
                .filter(filter)
                .collect(
                        groupingBy(
                                keyMap,
                                valueMap
                        )
                );
    }

    private static void writeGsonFile(String filename, Object object) throws IOException {
        Files.write(
                Paths.get(filename),
                new Gson().toJson(object).getBytes()
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
