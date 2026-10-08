@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22 yoki yangirogini ornatib qayta oching: https://nodejs.org
  pause
  exit /b 1
)
node server.mjs
pause
