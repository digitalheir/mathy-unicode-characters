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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;


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

            Map<String, UnicodeCharacter> idToChar = customer.character.stream()
                    .collect(
                            Collectors.toMap(
                                    Character::getId,
                                    UnicodeCharacter::new
                            )
                    );

//            com.github.digitalheir.simple.Charlist list = new com.github.digitalheir.simple.Charlist(customer.entitygroups, customer.mathvariants, idToChar);
            Map<String, Set<String>> latex2Id = idToChar.entrySet().stream()
                    .filter(entry -> entry.getValue().latex != null)
                    .collect(Collectors.groupingBy(
                            key -> key.getValue().latex,
                            Collectors.mapping(
                                    Map.Entry::getKey,
                                    Collectors.toSet()
                            )
                    ));

            Map<String, Set<String>> varlatex2Id = idToChar.entrySet().stream()
                    .filter(entry -> entry.getValue().varlatex != null)
                    .collect(Collectors.groupingBy(
                            key -> key.getValue().latex,
                            Collectors.mapping(
                                    Map.Entry::getKey,
                                    Collectors.toSet()
                            )
                    ));
            Map<String, Set<String>> mathlatex2Id = idToChar.entrySet().stream()
                    .filter(entry -> entry.getValue().mathlatex != null)
                    .collect(Collectors.groupingBy(
                            key -> key.getValue().latex,
                            Collectors.mapping(
                                    Map.Entry::getKey,
                                    Collectors.toSet()
                            )
                    ));

            Files.write(
                    Paths.get("unicode.json"),
                    new Gson().toJson(idToChar).getBytes()
            );
            Files.write(
                    Paths.get("latex.json"),
                    new Gson().toJson(latex2Id).getBytes()
            );
            Files.write(
                    Paths.get("varlatex.json"),
                    new Gson().toJson(varlatex2Id).getBytes()
            );
            Files.write(
                    Paths.get("mathlatex.json"),
                    new Gson().toJson(mathlatex2Id).getBytes()
            );


        } catch (JAXBException | XMLStreamException | IOException je) {
            je.printStackTrace();
        }
    }

    private static void countdoubleids(Charlist customer) {
        List<List<String>> meme = customer.character.stream()
                .map(Character::getId)
                .collect(Collectors.groupingBy(str -> str))
                .values()
                .stream()
                .filter(l -> l.size() > 1)
                .collect(Collectors.toList());
        System.out.println(
                meme.size()
        );
    }
}
