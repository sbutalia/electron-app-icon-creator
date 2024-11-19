const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Icon sizes for different platforms
const iconSizes = {
    mac: [16, 32, 64, 128, 256, 512, 1024],
    windows: [16, 24, 32, 48, 64, 96, 128, 256]
};

async function generateIcons(sourcePath, outputBasePath) {
    try {
        // Ensure source image exists
        if (!fs.existsSync(sourcePath)) {
            throw new Error('Source image not found!');
        }

        // Create output directories
        await fs.ensureDir(path.join(outputBasePath, 'AppIcon.iconset'));
        await fs.ensureDir(path.join(outputBasePath, 'windows'));

        // Generate macOS icons
        for (const size of iconSizes.mac) {
            const iconName = `icon_${size}x${size}.png`;
            const icon2xName = `icon_${size}x${size}@2x.png`;
            
            await sharp(sourcePath)
                .resize(size, size)
                .toFile(path.join(outputBasePath, 'AppIcon.iconset', iconName));

            // Generate 2x version if it doesn't exceed 1024
            if (size * 2 <= 1024) {
                await sharp(sourcePath)
                    .resize(size * 2, size * 2)
                    .toFile(path.join(outputBasePath, 'AppIcon.iconset', icon2xName));
            }
        }

        // Generate Windows icons
        for (const size of iconSizes.windows) {
            const iconName = `icon-${size}x${size}.png`;
            
            await sharp(sourcePath)
                .resize(size, size)
                .toFile(path.join(outputBasePath, 'windows', iconName));
        }

        console.log('✅ Icons generated successfully!');
        console.log(`📁 macOS icons: ${path.join(outputBasePath, 'AppIcon.iconset')}`);
        console.log(`📁 Windows icons: ${path.join(outputBasePath, 'windows')}`);

    } catch (error) {
        console.error('❌ Error generating icons:', error.message);
    }
}

// Create required directories
fs.ensureDirSync(path.join(__dirname, 'appIcons'));

// Check if source image exists
const sourceDir = path.join(__dirname, 'sourceImages');
fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('❌ Error reading source directory:', err.message);
        return;
    }

    const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
    if (pngFiles.length === 0) {
        console.log('ℹ️  Please place a PNG file in the sourceImages directory');
        return;
    }

    // Use the first PNG file found
    const sourcePath = path.join(sourceDir, pngFiles[0]);
    const outputPath = path.join(__dirname, 'appIcons', path.parse(pngFiles[0]).name);
    
    generateIcons(sourcePath, outputPath);
});
