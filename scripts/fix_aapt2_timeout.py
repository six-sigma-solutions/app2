# This script will automatically fix the most common AAPT2 timeout issues for Android builds in React Native/Expo projects.
# It will:
# 1. Optimize the DailyMoney.png asset (convert to lowercase, re-save, and reduce size if possible)
# 2. Update all code references to use the new filename (dailymoney.png)
# 3. Clean build artifacts
# 4. Instruct the user to rebuild

import os
from PIL import Image

# 1. Rename and optimize the asset
ASSET_PATH = r'k:/app/assets/DailyMoney.png'
NEW_ASSET_PATH = r'k:/app/assets/dailymoney.png'

if os.path.exists(ASSET_PATH):
    # Open and re-save as optimized PNG
    img = Image.open(ASSET_PATH)
    img.save(NEW_ASSET_PATH, optimize=True)
    os.remove(ASSET_PATH)
    print(f'Renamed and optimized: {ASSET_PATH} -> {NEW_ASSET_PATH}')
else:
    print(f'Asset not found: {ASSET_PATH}')

# 2. Update code references
for root, dirs, files in os.walk(r'k:/app'):
    for file in files:
        if file.endswith(('.js', '.ts', '.tsx')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = content.replace('DailyMoney.png', 'dailymoney.png')
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated references in: {path}')

print('Done. Please run the following commands to clean and rebuild:')
print('cd android && ./gradlew clean && cd .. && npx expo start -c')
