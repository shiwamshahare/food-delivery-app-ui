/**
 * Script to add Poppins fontFamily to all text styles
 * 
 * This script adds fontFamily based on fontWeight:
 * - fontWeight: '300' → fontFamily: FontFamily.light
 * - fontWeight: '400' or 'normal' → fontFamily: FontFamily.regular
 * - fontWeight: '500' → fontFamily: FontFamily.medium
 * - fontWeight: '600' → fontFamily: FontFamily.semiBold
 * - fontWeight: '700' or 'bold' → fontFamily: FontFamily.bold
 * - fontWeight: '800' → fontFamily: FontFamily.extraBold
 * - fontWeight: '900' → fontFamily: FontFamily.black
 * - No fontWeight → fontFamily: FontFamily.regular (default)
 */

const fs = require('fs');
const path = require('path');

// Font weight to FontFamily mapping
const fontWeightMap = {
    '300': 'FontFamily.light',
    '400': 'FontFamily.regular',
    'normal': 'FontFamily.regular',
    '500': 'FontFamily.medium',
    '600': 'FontFamily.semiBold',
    '700': 'FontFamily.bold',
    'bold': 'FontFamily.bold',
    '800': 'FontFamily.extraBold',
    '900': 'FontFamily.black',
};

// Files to process
const files = [
    'src/app/(tabs)/home/index.tsx',
    'src/app/(tabs)/home/restaurant.tsx',
    'src/app/(tabs)/home/cart.tsx',
    'src/app/(tabs)/search.tsx',
    'src/app/(tabs)/orders.tsx',
    'src/app/(tabs)/profile.tsx',
    'src/app/(auth)/login.tsx',
    'src/app/onboarding/index.tsx',
    'src/app/drawer.tsx',
];

console.log('🎨 Adding Poppins fontFamily to all text styles...\n');

files.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);

    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  Skipping ${filePath} (not found)`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // Check if FontFamily import already exists
    if (!content.includes("import { FontFamily } from '@/theme/fonts'")) {
        // Add import after other imports
        const importRegex = /(import .+ from ['"]@\/[^'"]+['"];?\n)/g;
        const imports = content.match(importRegex);
        if (imports && imports.length > 0) {
            const lastImport = imports[imports.length - 1];
            content = content.replace(
                lastImport,
                lastImport + "import { FontFamily } from '@/theme/fonts';\n"
            );
            modified = true;
        }
    }

    // Add fontFamily to text styles
    // This is a simplified approach - adds fontFamily: FontFamily.regular to styles with fontSize
    const styleRegex = /(\w+):\s*\{([^}]+fontSize:\s*\d+[^}]*)\}/g;

    content = content.replace(styleRegex, (match, styleName, styleContent) => {
        // Skip if already has fontFamily
        if (styleContent.includes('fontFamily')) {
            return match;
        }

        // Determine font family based on fontWeight
        let fontFamily = 'FontFamily.regular';
        const weightMatch = styleContent.match(/fontWeight:\s*['"]?(\w+)['"]?/);
        if (weightMatch) {
            const weight = weightMatch[1];
            fontFamily = fontWeightMap[weight] || 'FontFamily.regular';
        }

        // Add fontFamily after fontSize
        const newStyleContent = styleContent.replace(
            /(fontSize:\s*\d+)/,
            `$1, fontFamily: ${fontFamily}`
        );

        modified = true;
        return `${styleName}: {${newStyleContent}}`;
    });

    if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Updated ${filePath}`);
    } else {
        console.log(`⏭️  No changes needed for ${filePath}`);
    }
});

console.log('\n🎉 Done! Poppins font added to all text styles.');
console.log('\n📝 Note: You may need to manually adjust some styles for optimal results.');
