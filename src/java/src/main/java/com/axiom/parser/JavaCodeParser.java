package com.axiom.parser;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseProblemException;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.*;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class JavaCodeParser {
    private final ParserConfig config;
    private final Map<String, ClassInfo> classInfoMap = new HashMap<>();

    public JavaCodeParser(@NotNull ParserConfig config) {
        this.config = config;
    }

    /**
     * Parses all .java and .kt files in the specified directory.
     *
     * @param inputPath the path to the input directory
     * @throws IOException if an I/O error occurs
     */
    public void parseDirectory(@NotNull Path inputPath) throws IOException {
        if (!Files.isDirectory(inputPath)) {
            throw new IllegalArgumentException("Input path must be a directory.");
        }

        Files.walk(inputPath)
                .filter(path -> Files.isRegularFile(path) && 
                        (path.toString().endsWith(".java") || path.toString().endsWith(".kt")))
                .forEach(this::parseFile);
    }

        /**
     * Parses a single file.
     *
     * @param filePath the path to the file to parse
     */
    private void parseFile(@NotNull Path filePath) {
        try {
            JavaParser javaParser = new JavaParser();
            ParseResult<CompilationUnit> parseResult = javaParser.parse(filePath);
            if (parseResult.isSuccessful() && parseResult.getResult().isPresent()) {
                CompilationUnit cu = parseResult.getResult().get();
                cu.findAll(ClassOrInterfaceDeclaration.class).forEach(this::processClass);
            } else {
                System.err.println("Failed to parse file: " + filePath);
                parseResult.getProblems().forEach(problem -> System.err.println(problem.toString()));
            }
        } catch (ParseProblemException | IOException e) {
            System.err.println("Failed to parse file: " + filePath + " - " + e.getMessage());
        }
    }

    private void processClass(@NotNull ClassOrInterfaceDeclaration classDecl) {
        if (!classDecl.isPublic()) {
            return;
        }

        String className = classDecl.getNameAsString();
        ClassInfo classInfo = new ClassInfo(className);

        if (config.shouldParseFields()) {
            List<FieldInfo> fields = classDecl.getFields().stream()
                    .filter(field -> config.shouldIncludePrivate() || field.isPublic())
                    .flatMap(field -> field.getVariables().stream()
                            .map(var -> new FieldInfo(var.getNameAsString(), var.getTypeAsString())))
                    .collect(Collectors.toList());
            classInfo.setFields(fields);
        }

        if (config.shouldParseMethods()) {
            List<MethodInfo> methods = classDecl.getMethods().stream()
                    .filter(method -> config.shouldIncludePrivate() || method.isPublic())
                    .map(method -> new MethodInfo(method.getNameAsString(), method.getTypeAsString()))
                    .collect(Collectors.toList());
            classInfo.setMethods(methods);
        }

        classInfoMap.put(className, classInfo);
    }

    /**
     * Generates the output file with parsed information.
     *
     * @param outputFilePath the path to the output file
     * @throws IOException if an I/O error occurs
     */
    public void generateOutput(@NotNull String outputFilePath) throws IOException {
        List<String> lines = classInfoMap.values().stream()
                .map(ClassInfo::toString)
                .collect(Collectors.toList());
        Files.write(Paths.get(outputFilePath), lines, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
    }

    /**
     * Retrieves information from specified classes.
     *
     * @param classNames array of class names
     * @param includeMethods whether to include methods
     * @param includeFields whether to include fields
     * @return list of ClassInfo objects
     */
    public List<ClassInfo> getFromClasses(@NotNull String[] classNames, boolean includeMethods, boolean includeFields) {
        List<ClassInfo> result = new ArrayList<>();
        for (String className : classNames) {
            ClassInfo info = classInfoMap.get(className);
            if (info != null) {
                ClassInfo filtered = new ClassInfo(info.getClassName());
                if (includeMethods) {
                    filtered.setMethods(info.getMethods());
                }
                if (includeFields) {
                    filtered.setFields(info.getFields());
                }
                result.add(filtered);
            }
        }
        return result;
    }

    /**
     * Retrieves the source code of specified classes without imports.
     *
     * @param classNames array of class names
     * @param includePrivate whether to include private members
     * @param includeImports whether to include import statements
     * @return map of class names to their source code
     */
    public Map<String, String> getSource(@NotNull String[] classNames, boolean includePrivate, boolean includeImports) {
        // Implementation would require storing the source code during parsing
        // This is a placeholder for demonstration purposes
        throw new UnsupportedOperationException("getSource method is not implemented yet.");
    }
}

