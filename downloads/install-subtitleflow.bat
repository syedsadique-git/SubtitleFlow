@echo off
title SubtitleFlow Installer for Windows
color 0B
setlocal enabledelayedexpansion

echo ============================================
echo    SubtitleFlow Extension Installer
echo    Windows Desktop Setup
echo ============================================
echo.

:: Check if running as admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] NOT running as Administrator.
    echo [*] Some browsers may require admin privileges.
    echo.
)

:: Set paths
set "EXT_NAME=SubtitleFlow"
set "EXT_VERSION=1.0.0"
set "ZIP_URL=https://syedsadique-git.github.io/SubtitleFlow/downloads/subtitleflow-extension-v%EXT_VERSION%.zip"
set "DOWNLOAD_DIR=%USERPROFILE%\Downloads"
set "EXTRACT_DIR=%DOWNLOAD_DIR%\%EXT_NAME%-extension"
set "ZIP_FILE=%DOWNLOAD_DIR%\%EXT_NAME%-v%EXT_VERSION%.zip"

echo [1/4] Downloading SubtitleFlow extension...
echo      From: %ZIP_URL%
echo      To:   %ZIP_FILE%
echo.

:: Download using PowerShell
powershell -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%ZIP_URL%' -OutFile '%ZIP_FILE%' }"
if %errorLevel% neq 0 (
    echo [ERROR] Download failed. Check your internet connection.
    pause
    exit /b 1
)
echo      Download complete!
echo.

echo [2/4] Extracting extension files...
echo      To: %EXTRACT_DIR%
echo.

:: Remove old extraction if exists
if exist "%EXTRACT_DIR%" (
    rmdir /s /q "%EXTRACT_DIR%"
)

powershell -Command "& { Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%EXTRACT_DIR%' -Force }"
if %errorLevel% neq 0 (
    echo [ERROR] Extraction failed.
    pause
    exit /b 1
)
echo      Extraction complete!
echo.

echo [3/4] Opening extension folder...
echo      Location: %EXTRACT_DIR%
echo.
explorer "%EXTRACT_DIR%"
echo.

echo [4/4] Opening browser extensions page...
echo.
echo ============================================
echo    NEXT STEPS:
echo ============================================
echo.
echo  1. In the Extensions page, enable "Developer mode"
echo     (toggle in top-right corner)
echo.
echo  2. Click "Load unpacked" button
echo.
echo  3. Select this folder:
echo     %EXTRACT_DIR%
echo.
echo  4. SubtitleFlow will appear in your extensions!
echo.
echo ============================================
echo.

:: Detect browser and open extensions page
set "BROWSER_EXT="
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_EXT=chrome://extensions"
    start "" "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" chrome://extensions
) else if exist "%PROGRAMFILES%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_EXT=chrome://extensions"
    start "" "%PROGRAMFILES%\Google\Chrome\Application\chrome.exe" chrome://extensions
) else if exist "%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_EXT=edge://extensions"
    start "" "%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe" edge://extensions
) else if exist "%PROGRAMFILES(x86)%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_EXT=edge://extensions"
    start "" "%PROGRAMFILES(x86)%\Microsoft\Edge\Application\msedge.exe" edge://extensions
) else if exist "%PROGRAMFILES%\Mozilla Firefox\firefox.exe" (
    set "BROWSER_EXT=about:debugging#/runtime/this-firefox"
    start "" "%PROGRAMFILES%\Mozilla Firefox\firefox.exe" about:debugging#/runtime/this-firefox
) else (
    echo [!] Could not detect a supported browser.
    echo [*] Please open your browser's extensions page manually.
    echo.
    echo     Chrome:  chrome://extensions
    echo     Edge:    edge://extensions
    echo     Firefox: about:debugging#/runtime/this-firefox
    echo     Brave:   brave://extensions
)

echo.
echo [SUCCESS] SubtitleFlow has been downloaded and extracted!
echo           Follow the steps above to complete installation.
echo.
echo Press any key to close this window...
pause >nul
