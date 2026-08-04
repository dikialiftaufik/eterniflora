import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { brand } from '@/constants/Colors';
import { useEcoStore } from '@/store/useEcoStore';
import StudioPreview from '@/components/StudioPreview';
import BouquetCustomizerCard from '@/components/BouquetCustomizerCard';
import { flowerOptions, colorOptions, leafOptions, wrapperOptions, ribbonOptions } from '@/data/studioOptions';

const TOTAL_STEPS = 5;

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function StudioCustomizer({ visible, onClose }: Props) {
  const { bouquetConfig, setBouquetConfig } = useEcoStore();
  const [currentStep, setCurrentStep] = useState(1);

  // For MVP: Calculate a flat price
  const basePrice = 150000;
  const priceString = `Rp${basePrice.toLocaleString('id-ID')}`;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Proceed to checkout/cart
      console.log('Proceed to checkout with:', bouquetConfig);
      onClose(); // Close modal after checkout for now
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.gridContainer}>
            {flowerOptions.map(flower => (
              <BouquetCustomizerCard
                key={flower.id}
                title={flower.name}
                subtitle={flower.subtitle}
                imageUrl={flower.imageUrl}
                isSelected={bouquetConfig.flowerType === flower.id}
                onPress={() => setBouquetConfig({ flowerType: flower.id })}
                width="48%"
              />
            ))}
          </View>
        );
      case 2:
        return (
          <View style={styles.gridContainer}>
            {colorOptions.map(color => (
              <BouquetCustomizerCard
                key={color.id}
                title={color.name}
                colorHex={color.hexCode}
                isSelected={bouquetConfig.petalColor === color.id}
                onPress={() => setBouquetConfig({ petalColor: color.id })}
                width="48%"
              />
            ))}
          </View>
        );
      case 3:
        return (
          <View style={styles.gridContainer}>
            {leafOptions.map(leaf => (
              <BouquetCustomizerCard
                key={leaf.id}
                title={leaf.name}
                subtitle={leaf.subtitle}
                imageUrl={leaf.imageUrl}
                isSelected={bouquetConfig.leafAccent === leaf.id}
                onPress={() => setBouquetConfig({ leafAccent: leaf.id })}
                width="48%"
              />
            ))}
          </View>
        );
      case 4:
        return (
          <View style={styles.gridContainer}>
            {wrapperOptions.map(wrapper => (
              <BouquetCustomizerCard
                key={wrapper.id}
                title={wrapper.name}
                subtitle={wrapper.subtitle}
                imageUrl={wrapper.imageUrl}
                isSelected={bouquetConfig.wrappingStyle === wrapper.id}
                onPress={() => setBouquetConfig({ wrappingStyle: wrapper.id })}
                width="100%"
              />
            ))}
          </View>
        );
      case 5:
        return (
          <View style={styles.gridContainer}>
            {ribbonOptions.map(ribbon => (
              <BouquetCustomizerCard
                key={ribbon.id}
                title={ribbon.name}
                colorHex={ribbon.hexCode}
                isSelected={bouquetConfig.ribbonColor === ribbon.id}
                onPress={() => setBouquetConfig({ ribbonColor: ribbon.id })}
                width="48%"
              />
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    "Pilih Bunga Utama",
    "Palet Warna Kelopak",
    "Hiasan Daun Kering",
    "Gaya Pembungkus",
    "Warna Pita Pengikat"
  ];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Background Gradient */}
        <LinearGradient
          colors={['rgba(124, 58, 237, 0.1)', 'rgba(255, 255, 255, 0)']}
          style={StyleSheet.absoluteFillObject}
          end={{ x: 0, y: 0.4 }}
        />
        
        <SafeAreaView style={styles.safeArea}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={handlePrev}>
              <FontAwesome name={currentStep === 1 ? "times" : "chevron-left"} size={16} color={brand.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Studio</Text>
            <View style={styles.stepIndicatorBadge}>
              <Text style={styles.stepIndicatorText}>{currentStep} / {TOTAL_STEPS}</Text>
            </View>
          </View>

          {/* PROGRESS BAR */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${(currentStep / TOTAL_STEPS) * 100}%` }]} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
            {/* STICKY-LIKE PREVIEW */}
            <View style={styles.previewWrapper}>
              <StudioPreview config={bouquetConfig} />
            </View>

            {/* DYNAMIC STEP CONTENT */}
            <View style={styles.stepContentWrapper}>
              <Text style={styles.stepTitle}>{stepTitles[currentStep - 1]}</Text>
              {renderStepContent()}
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* FLOATING BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>
          {currentStep === TOTAL_STEPS ? (
            <>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>TOTAL INVESTASI</Text>
                <Text style={styles.priceValue}>{priceString}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8} onPress={handleNext}>
                <FontAwesome name="shopping-bag" size={14} color={brand.white} style={{ marginRight: 8 }} />
                <Text style={styles.checkoutText}>Pesan Buket</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Selanjutnya</Text>
              <FontAwesome name="arrow-right" size={14} color={brand.white} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.background },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12,
  },
  iconButton: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: brand.white,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: brand.primaryDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  headerTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: brand.primaryDark, textAlign: 'center' },
  stepIndicatorBadge: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, width: 54, alignItems: 'center',
  },
  stepIndicatorText: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.primary },
  
  progressBarContainer: { height: 4, backgroundColor: 'rgba(0,0,0,0.05)', width: '100%', marginBottom: 20 },
  progressBarFill: { height: '100%', backgroundColor: brand.primary },

  previewWrapper: { paddingHorizontal: 24, marginBottom: 24 },
  
  stepContentWrapper: { paddingHorizontal: 24 },
  stepTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: brand.textPrimary, marginBottom: 16, textAlign: 'center' },
  
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: brand.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 36,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 10,
  },
  
  nextButton: {
    backgroundColor: brand.primary, flexDirection: 'row', height: 54, borderRadius: 27,
    alignItems: 'center', justifyContent: 'center', flex: 1,
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  nextButtonText: { fontFamily: 'Lato_700Bold', fontSize: 16, color: brand.white },
  
  priceContainer: { flex: 1 },
  priceLabel: { fontFamily: 'Lato_700Bold', fontSize: 10, color: brand.textSecondary, letterSpacing: 1.5 },
  priceValue: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: brand.primaryDark, marginTop: 4 },
  
  checkoutButton: {
    backgroundColor: brand.primary, flexDirection: 'row', height: 54, borderRadius: 27, paddingHorizontal: 24,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  checkoutText: { fontFamily: 'Lato_700Bold', fontSize: 15, color: brand.white }
});
