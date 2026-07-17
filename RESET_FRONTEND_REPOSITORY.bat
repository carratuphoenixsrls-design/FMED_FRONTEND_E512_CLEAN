@echo off
setlocal
chcp 65001 >nul
cls
echo ==========================================================
echo FMED E5.1.2 CLEAN REBUILD - RESET FRONTEND REPOSITORY
echo ==========================================================
echo.
echo Questo script elimina il vecchio frontend dal clone locale,
echo conserva soltanto la cartella .git e copia il frontend nuovo.
echo.
set /p "TARGET=Incolla il percorso del clone FMED_FRONTEND_CLEAN: "
if not exist "%TARGET%\.git" (
  echo.
  echo ERRORE: nel percorso indicato non trovo la cartella .git
  echo Clona prima il repository con GitHub Desktop.
  pause
  exit /b 1
)
set "SOURCE=%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop'; $source=[IO.Path]::GetFullPath('%SOURCE%'); $target=[IO.Path]::GetFullPath('%TARGET%');" ^
  "Get-ChildItem -LiteralPath $target -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force;" ^
  "$exclude=@('RESET_FRONTEND_REPOSITORY.bat','ISTRUZIONI_DEPLOY_E5_1_2.txt','COLLAUDO_E5_1_2.txt','SHA256_E5_1_2.txt');" ^
  "Get-ChildItem -LiteralPath $source -Force | Where-Object { $exclude -notcontains $_.Name -and $_.Name -notin @('node_modules','dist') } | Copy-Item -Destination $target -Recurse -Force;"
if errorlevel 1 (
  echo.
  echo ERRORE durante la sostituzione dei file.
  pause
  exit /b 1
)
echo.
echo FRONTEND SOSTITUITO CORRETTAMENTE.
echo Ora apri GitHub Desktop, esegui Commit to main e poi Push origin.
pause
