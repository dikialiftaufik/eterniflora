import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { brand } from '@/constants/Colors';

interface Props {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageSource?: any;
  colorHex?: string;
  isSelected: boolean;
  onPress: () => void;
  width?: number | string;
  layout?: 'grid' | 'list';
  imageResizeMode?: 'cover' | 'contain';
}

export default function BouquetCustomizerCard({ title, subtitle, imageUrl, imageSource, colorHex, isSelected, onPress, width = '100%', layout = 'grid', imageResizeMode = 'cover' }: Props) {
  const isList = layout === 'list';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        { width: width as any },
        isList && styles.cardList,
        isSelected && styles.cardSelected,
      ]}
    >
      {/* Checkmark Badge */}
      {isSelected && (
        <View style={styles.checkBadge}>
          <FontAwesome name="check" size={10} color={brand.white} />
        </View>
      )}

      {/* Premium Image Header */}
      {(imageUrl || imageSource) && (
        <View style={[styles.imageContainer, isList && styles.imageContainerList]}>
          <Image source={imageSource ? imageSource : { uri: imageUrl }} style={[styles.image, { resizeMode: imageResizeMode }]} />
          {isSelected && !isList && <View style={styles.imageOverlay} />}
        </View>
      )}

      {/* For colors / ribbons */}
      {!imageUrl && !imageSource && colorHex && (
        <View style={[styles.colorContainer, isList && styles.colorContainerList]}>
          <View style={[styles.colorCircle, { backgroundColor: colorHex }, isSelected && styles.colorCircleSelected]} />
        </View>
      )}
      
      {/* Text Info */}
      <View style={[styles.textContainer, isList && styles.textContainerList, !imageUrl && !imageSource && !colorHex && !isList && { paddingTop: 16 }]}>
        <Text style={[styles.title, isList && styles.titleList, isSelected && styles.titleSelected]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, isList && styles.subtitleList, isSelected && styles.subtitleSelected]} numberOfLines={1}>
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
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(30, 10, 60, 0.05)',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    minHeight: 80,
    position: 'relative',
    marginBottom: 12,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    minHeight: 72,
  },
  cardSelected: {
    borderColor: brand.primary,
    backgroundColor: '#F8F6FC',
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
  },
  imageContainerList: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
  },
  colorContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  colorContainerList: {
    paddingTop: 0,
    marginRight: 16,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  colorCircleSelected: {
    borderWidth: 0, // removed border, badge handles active state
  },
  textContainer: {
    alignItems: 'center',
    padding: 12,
  },
  textContainerList: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 0,
  },
  title: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: brand.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  titleList: {
    fontSize: 14,
    textAlign: 'left',
  },
  titleSelected: {
    color: brand.textPrimary,
  },
  subtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: brand.textSecondary,
    textAlign: 'center',
  },
  subtitleList: {
    fontSize: 11,
    textAlign: 'left',
  },
  subtitleSelected: {
    color: brand.textSecondary,
  },
});
