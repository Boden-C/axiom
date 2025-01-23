package com.axiom.parser;

import org.jetbrains.annotations.NotNull;

public class FieldInfo {
    private final String name;
    private final String type;

    public FieldInfo(@NotNull String name, @NotNull String type) {
        this.name = name;
        this.type = type;
    }

    @NotNull
    public String getName() {
        return name;
    }

    @NotNull
    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return name + " : " + type;
    }
}
