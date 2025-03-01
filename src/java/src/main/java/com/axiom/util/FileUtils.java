package com.axiom.util;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;
import java.nio.file.*;

public class FileUtils {

    /**
     * Reads the content of a file as a string.
     *
     * @param path the path to the file
     * @return file content or null if an error occurs
     */
    @Nullable
    public static String readFile(@NotNull Path path) {
        try {
            return Files.readString(path);
        } catch (IOException e) {
            System.err.println("Failed to read file: " + path + " - " + e.getMessage());
            return null;
        }
    }

    /**
     * Writes a string to a file.
     *
     * @param path the path to the file
     * @param content the content to write
     * @throws IOException if an I/O error occurs
     */
    public static void writeFile(@NotNull Path path, @NotNull String content) throws IOException {
        Files.writeString(path, content, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
    }
}

