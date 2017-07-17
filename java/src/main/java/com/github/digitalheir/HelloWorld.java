package com.github.digitalheir;

import com.github.digitalheir.simple.UnicodeCharacter;
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

            List<UnicodeCharacter> chars = customer.character.stream()
                    .map(c -> new UnicodeCharacter(
                                    c.id,

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
                                    c.font,
                                    c.comment,
                                    c.surrogate,
                                    c.bmp,
                                    c.description
                            )
                    )
                    .collect(Collectors.toList());

            com.github.digitalheir.simple.Charlist list = new com.github.digitalheir.simple.Charlist(customer.entitygroups, customer.mathvariants, chars);

            Files.write(
                    Paths.get("unicode.json"),
                    new Gson().toJson(list).getBytes()
            );
        } catch (JAXBException | XMLStreamException | IOException je) {
            je.printStackTrace();
        }
    }
}
