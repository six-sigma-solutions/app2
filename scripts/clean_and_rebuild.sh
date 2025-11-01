#!/bin/bash
# Windows PowerShell/Batch version below
# Remove old build artifacts for a clean build
cd android
./gradlew clean
cd ..
npx expo start -c
