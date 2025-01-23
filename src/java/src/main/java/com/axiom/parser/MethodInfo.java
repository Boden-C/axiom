package com.axiom.parser;

import org.jetbrains.annotations.NotNull;

public class MethodInfo {
    private final String name;
    private final String returnType;

    public MethodInfo(@NotNull String name, @NotNull String returnType) {
        this.name = name;
        this.returnType = returnType;
    }

    @NotNull
    public String getName() {
        return name;
    }

    @NotNull
    public String getReturnType() {
        return returnType;
    }

    @Override
    public String toString() {
        return name + " : " + returnType;
    }
}
