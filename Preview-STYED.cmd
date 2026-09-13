@echo off
setlocal
cd /d "%~dp0"
if exist "%LOCALAPPDATA%\STYED-tools\node-v24.21.0-win-x64\node.exe" set "PATH=%LOCALAPPDATA%\STYED-tools\node-v24.21.0-win-x64;%PATH%"
if not exist node_modules call npm ci
if errorlevel 1 exit /b 1
call npm run build
if errorlevel 1 exit /b 1
call npm run preview -- --port 4173 --strictPort
