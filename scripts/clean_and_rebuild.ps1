# Windows PowerShell script to clean and rebuild the project
cd android
./gradlew clean
cd ..
npx expo start -c
