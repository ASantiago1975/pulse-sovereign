// PulseLogo.tsx - Custom Image Asset Container for Google Play
import React from 'react';
// PulseLogo.tsx - Custom Image Asset Container for Google Play
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface LogoProps {
  size?: number; // Configurable dimensions (e.g., 60 for minimal headers, 220 for splash layouts)
}

export default function PulseLogo({ size = 200 }: LogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        // Automatically imports your personal design asset from the local project tree
        source={require('./assets/my-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
