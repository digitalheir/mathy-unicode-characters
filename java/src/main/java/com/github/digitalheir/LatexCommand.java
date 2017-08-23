package com.github.digitalheir;

public class LatexCommand{
    private static final char[] specialChars = {
            '\'', '(', ')', ',', '.', '-', '"', '!', '^', '$', '&', '#', '{',
            '}', '%', '~', '|', '/', ':', ';', '=', '[', ']', '\\', '`', ' '};

    public static Boolean isLatexCommand(String s) {
        int i = 0;

        // all latex commands start with an \
        if(s.charAt(i++) != '\\') return false;

        // the remainder is either a sequence of [a-zA-Z] chars
        while(i < s.length()){
            char c = s.charAt(i++);
            if( !('a' <= c && c <= 'z' || 'A' <= c && c <= 'Z' || c == ' ') )
                break;
        }
        if(i == s.length()) return true;

        // or a single special character
        if(s.length() == 2 && contains(specialChars, s.charAt(1)))
            return true;

        return false;
    }

    public static boolean contains(final char[] array, final char v) {
        for (final char e : array)
            if (e == v) return true;

        return false;
    }
}
