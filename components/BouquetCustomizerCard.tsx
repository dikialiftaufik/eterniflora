import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { brand } from '@/constants/Colors';

interface Props {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  colorHex?: string;
  isSelected: boolean;
  onPress: () => void;
  width?: number | string;
}

export default function BouquetCustomizerCard({ title, subtitle, imageUrl, colorHex, isSelected, onPress, width = '100%' }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        { width: width as any },
        isSelected && styles.cardSelected,
      ]}
    >
      {/* Premium Image Header */}
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          {isSelected && <View style={styles.imageOverlay} />}
        </View>
      )}

      {/* For colors / ribbons */}
      {!imageUrl && colorHex && (
        <View style={styles.colorContainer}>
          <View style={[styles.colorCircle, { backgroundColor: colorHex }, isSelected && styles.colorCircleSelected]} />
        </View>
      )}
      
      {/* Text Info */}
      <View style={[styles.textContainer, !imageUrl && !colorHex && { paddingTop: 16 }]}>
        <Text style={[styles.title, isSelected && styles.titleSelected]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, isSelected && styles.subtitleSelected]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: brand.white,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(30, 10, 60, 0.04)',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden', // to clip image to rounded corners
    minHeight: 80,
  },
  cardSelected: {
    borderColor: brand.primary,
    backgroundColor: 'rgba(124, 58, 237, 0.02)',
    shadowOpacity: 0.08,
    transform: [{ scale: 0.98 }], // Micro-interaction
  },
  imageContainer: {
    width: '100%',
    height: 80,
    backgroundColor: 'transparent', // removed slate placeholder
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
  },
  colorContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  colorCircleSelected: {
    borderWidth: 2,
    borderColor: brand.primary,
  },
  textContainer: {
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: brand.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  titleSelected: {
    color: brand.primaryDark,
  },
  subtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: brand.textSecondary,
    textAlign: 'center',
  },
  subtitleSelected: {
    color: brand.primary,
  },
});
