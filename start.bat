@echo off
cd /d "%~dp0"
where py >nul 2>&1 && (
  start "" http://127.0.0.1:8080/
  py -m http.server 8080 --bind 127.0.0.1
  goto :eof
)
where python >nul 2>&1 && (
  start "" http://127.0.0.1:8080/
  python -m http.server 8080 --bind 127.0.0.1
  goto :eof
)
echo Python не найден. Откройте index.html в браузере напрямую
echo или установите Python: https://www.python.org/downloads/
pause
