@echo off
setlocal
cd /d "%~dp0"
if exist "%LOCALAPPDATA%\STYED-tools\node-v24.21.0-win-x64\node.exe" set "PATH=%LOCALAPPDATA%\STYED-tools\node-v24.21.0-win-x64;%PATH%"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22.12 or newer, then run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  call npm ci
  if errorlevel 1 exit /b 1
)
call npm run dev
