import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';
import { BouquetConfig } from '@/store/useEcoStore';
import { colorOptions } from '@/data/studioOptions';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Props {
  config: BouquetConfig;
}

export default function StudioPreview({ config }: Props) {
  // Get the selected color hex for the live tinting effect
  const selectedColorHex = colorOptions.find(c => c.id === config.petalColor)?.hexCode || 'transparent';

  return (
    <View style={styles.container}>
      {/* Base high-quality bouquet image */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1548842104-58a6a575c44c?q=80&w=800&auto=format&fit=crop' }} 
        style={styles.image}
      />
      
      {/* Dynamic Color Tint Overlay (Live Preview Effect) */}
      <View style={[styles.tintOverlay, { backgroundColor: selectedColorHex !== 'transparent' ? selectedColorHex : undefined, opacity: selectedColorHex !== 'transparent' ? 0.35 : 0 }]} />
      
      {/* Soft gradient overlay for text readability */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.5)']}
        style={styles.gradient}
      />

      {/* Dynamic Tag on the image itself */}
      <View style={styles.tag}>
        <FontAwesome name="recycle" size={12} color={brand.white} />
        <Text style={styles.tagText}>12 Botol PET Direduksi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9, // Wide, cinematic ratio
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent', // Removed grey background
    position: 'relative',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    mixBlendMode: 'color', // works on web, opacity acts as fallback on mobile
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  tag: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 83, 45, 0.85)', // Dark Eco Green with opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  tagText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    color: brand.white,
  }
});
