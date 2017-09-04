package com.github.digitalheir.unicode;


import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "_package",
        "priority"
})
@XmlRootElement(name = "latex")
public class Latex {

    @XmlAttribute(name = "package")
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    protected String _package;

    @XmlAttribute(name = "priority")
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    protected String priority;
    @XmlValue
    public String value;

    public String getPackage() {
        return _package;
    }

    public String getPriority() {
        return priority;
    }
}
