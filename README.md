# Electron App Icon Creator

A simple Node.js script to generate app icons for Electron applications. This script takes a PNG image and generates icons in various sizes required for macOS and Windows applications.

## Features

- Generates icons for both macOS and Windows
- Preserves transparency in PNG files
- Creates standard AppIcon.iconset structure for macOS
- Generates Windows icons in multiple sizes
- Automatically creates 2x versions for Retina displays

## Setup

1. Install dependencies:
```bash
npm install
```

2. Place your source PNG image in the `sourceImages` directory
   - The image should be at least 1024x1024 pixels
   - PNG format with transparency is recommended

3. Run the script:
```bash
npm start
```

## Output

The script will create icons in the following structure:

```
appIcons/
  └── [your-image-name]/
      ├── AppIcon.iconset/
      │   ├── icon_16x16.png
      │   ├── icon_16x16@2x.png
      │   ├── icon_32x32.png
      │   ├── icon_32x32@2x.png
      │   └── ...
      └── windows/
          ├── icon-16x16.png
          ├── icon-24x24.png
          ├── icon-32x32.png
          └── ...
```

## Icon Sizes

### macOS
- 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024
- @2x versions for Retina displays

### Windows
- 16x16, 24x24, 32x32, 48x48, 64x64, 96x96, 128x128, 256x256
