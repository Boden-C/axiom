package com.axiom;

import com.axiom.parser.JavaCodeParser;
import com.axiom.parser.ParserConfig;

import org.jetbrains.annotations.NotNull;

import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(@NotNull String[] args) {
        try {
            ParserConfig config = new ParserConfig.Builder()
                    .parseMethods(true)
                    .parseFields(true)
                    .includePrivate(false)
                    .build();

            JavaCodeParser parser = new JavaCodeParser(config);
            parser.parseDirectory(Paths.get("input"));

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HHmmss"));
            String outputFilePath = Paths.get("output", "" + timestamp + ".txt").toString();
            parser.generateOutput(outputFilePath);

            System.out.println("Parsing completed. Output file created at: " + outputFilePath);
        } catch (Exception e) {
            System.err.println("An error occurred during parsing: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

