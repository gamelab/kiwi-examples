@echo off
setlocal enableextensions enabledelayedexpansion

for %%f in (*.*) do (
set ARG=%%~nxf
rename "%%f" !ARG: =!
)