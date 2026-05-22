import { FontFamily, getFontFamily } from '@/theme/fonts';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
    weight?: '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';
}

/**
 * Custom Text component that uses Poppins font by default
 * 
 * Usage:
 * <Text>Regular text</Text>
 * <Text weight="700">Bold text</Text>
 * <Text weight="600">SemiBold text</Text>
 */
export function Text({ style, weight, ...props }: TextProps) {
    const fontFamily = weight ? getFontFamily(weight) : FontFamily.regular;

    return (
        <RNText
            {...props}
            style={[
                { fontFamily },
                style,
            ]}
        />
    );
}
