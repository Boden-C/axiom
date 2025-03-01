@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul

:: Configuration
set "REMOTE_URL=https://github.com/yourusername/yourrepo.git"
set "HORIZONTAL_BAR=----------------------------------------"

:: Enable ANSI colors in Windows Terminal
echo.

:: Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [91mError: Git is not installed or not in PATH[0m
    echo Please install Git from https://git-scm.com/downloads
    exit /b 1
)\u001b[31m

:: Check if Git repository is initialized
if not exist ".git" (
    echo [93mWarning: Git repository not initialized[0m
    git init >nul 2>&1
    if %errorlevel% neq 0 (
        echo [91mFailed to initialize Git repository[0m
        exit /b 1
    )
    echo [92m✓ Git repository initialized[0m
)

:: Check and validate remote origin
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    if defined REMOTE_URL (
        git remote add origin %REMOTE_URL% >nul 2>&1
        echo [92m✓ Added remote origin: %REMOTE_URL%[0m
    ) else (
        echo [91mError: Remote origin not configured[0m
        echo Please set REMOTE_URL in the configuration section
        exit /b 1
    )
) else (
    for /f "tokens=*" %%a in ('git remote get-url origin') do set CURRENT_URL=%%a
    if not "!CURRENT_URL!"=="%REMOTE_URL%" (
        echo [93mWarning: Remote URL mismatch[0m
        echo Current: !CURRENT_URL!
        echo Expected: %REMOTE_URL%
    )
)

:: Fetch origin and get default branch
git fetch origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [91mError: Failed to fetch from remote[0m
    for /f "tokens=*" %%a in ('git fetch origin 2^>^&1') do echo %%a
    exit /b 1
)

:: Get current branch and remote default branch
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%a
for /f "tokens=*" %%a in ('git remote show origin ^| findstr "HEAD branch"') do set DEFAULT_BRANCH=%%a
set DEFAULT_BRANCH=!DEFAULT_BRANCH:*HEAD branch: =!

:: Display current branch with icons
if "!CURRENT_BRANCH!"=="!DEFAULT_BRANCH!" (
    echo [94mCurrent Branch: ★ !CURRENT_BRANCH![0m
) else (
    echo [94mCurrent Branch: ⎇ !CURRENT_BRANCH![0m
)

if "!CURRENT_BRANCH!"=="master" (
    echo [93mWarning: Consider renaming 'master' branch to 'main'[0m
)

echo Cancel (Ctrl+C) now if you wish to switch branches
timeout /t 5 >nul

:: Attempt automatic update
git rev-list HEAD..origin/!CURRENT_BRANCH! --count >nul 2>&1
set /p COMMIT_COUNT=<"git rev-list HEAD..origin/!CURRENT_BRANCH! --count"
if !COMMIT_COUNT! gtr 0 (
    echo %HORIZONTAL_BAR%
    git pull --rebase >nul 2>&1
    if %errorlevel% equ 0 (
        for /f "tokens=*" %%a in ('git log -1 --pretty^=format:"%%h by %%an (%%ar)"') do (
            echo [92mUpdated to %%a[0m
        )
    ) else (
        git diff --check >nul 2>&1
        if %errorlevel% equ 0 (
            echo [93m!COMMIT_COUNT! new commits, manually git pull as the automatic attempt failed with this error:[0m
            git pull --rebase 2>&1
        ) else (
            echo [93m!COMMIT_COUNT! new commits, manually git pull due to merge conflicts[0m
        )
    )
)

echo %HORIZONTAL_BAR%
exit /b 0

