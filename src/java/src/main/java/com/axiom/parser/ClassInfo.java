package com.axiom.parser;

import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.StringJoiner;

public class ClassInfo {
    private final String className;
    private List<MethodInfo> methods;
    private List<FieldInfo> fields;

    public ClassInfo(@NotNull String className) {
        this.className = className;
    }

    public String getClassName() {
        return className;
    }

    public List<MethodInfo> getMethods() {
        return methods;
    }

    public void setMethods(List<MethodInfo> methods) {
        this.methods = methods;
    }

    public List<FieldInfo> getFields() {
        return fields;
    }

    public void setFields(List<FieldInfo> fields) {
        this.fields = fields;
    }

    @Override
    public String toString() {
        StringJoiner sj = new StringJoiner(System.lineSeparator());
        sj.add("Class: " + className);
        if (fields != null && !fields.isEmpty()) {
            sj.add("  Fields:");
            fields.forEach(field -> sj.add("    - " + field));
        }
        if (methods != null && !methods.isEmpty()) {
            sj.add("  Methods:");
            methods.forEach(method -> sj.add("    - " + method));
        }
        return sj.toString();
    }
}

