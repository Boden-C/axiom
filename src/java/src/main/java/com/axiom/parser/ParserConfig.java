package com.axiom.parser;

public class ParserConfig {
    private final boolean parseMethods;
    private final boolean parseFields;
    private final boolean includePrivate;

    private ParserConfig(Builder builder) {
        this.parseMethods = builder.parseMethods;
        this.parseFields = builder.parseFields;
        this.includePrivate = builder.includePrivate;
    }

    public boolean shouldParseMethods() {
        return parseMethods;
    }

    public boolean shouldParseFields() {
        return parseFields;
    }

    public boolean shouldIncludePrivate() {
        return includePrivate;
    }

    public static class Builder {
        private boolean parseMethods = true;
        private boolean parseFields = true;
        private boolean includePrivate = false;

        public Builder parseMethods(boolean parseMethods) {
            this.parseMethods = parseMethods;
            return this;
        }

        public Builder parseFields(boolean parseFields) {
            this.parseFields = parseFields;
            return this;
        }

        public Builder includePrivate(boolean includePrivate) {
            this.includePrivate = includePrivate;
            return this;
        }

        public ParserConfig build() {
            return new ParserConfig(this);
        }
    }
}
