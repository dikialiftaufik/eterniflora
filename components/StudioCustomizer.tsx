import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { brand } from '@/constants/Colors';
import { useEcoStore } from '@/store/useEcoStore';
import BouquetCustomizerCard from '@/components/BouquetCustomizerCard';
import { flowerOptions, colorOptions, leafOptions, wrapperOptions, ribbonOptions, getPreviewImageUrl } from '@/data/studioOptions';

const TOTAL_STEPS = 5;

interface Props {
  visible: boolean;
  onClose: () => void;
}

const SummaryRow = ({ label, value, colorHex, icon }: { label: string, value: string, colorHex?: string, icon?: React.ComponentProps<typeof FontAwesome>['name'] }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <View style={styles.summaryValueContainer}>
      <Text style={styles.summaryValue}>{value}</Text>
      {colorHex && <View style={[styles.summaryColorCircle, { backgroundColor: colorHex }]} />}
      {icon && <FontAwesome name={icon} size={12} color={brand.ecoGreen} style={{ marginLeft: 6 }} />}
    </View>
  </View>
);

export default function StudioCustomizer({ visible, onClose }: Props) {
  const { bouquetConfig, setBouquetConfig } = useEcoStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<'wrapper' | 'ribbon' | null>(null);

  const basePrice = 150000;
  const priceString = `Rp${basePrice.toLocaleString('id-ID')}`;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Proceed to checkout with:', bouquetConfig);
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onClose();
    }
  };

  const { title, subtitle } = (() => {
    switch (currentStep) {
      case 1: return { title: "Pilih Jenis Bunga Utama", subtitle: "Pilih bunga favorit Anda sebagai fokus utama bouquet." };
      case 2: return { title: "Pilih Palet Warna Kelopak", subtitle: "Warna yang Anda pilih akan mempengaruhi nuansa dan energi bouquet Anda." };
      case 3: return { title: "Pilih Hiasan Daun", subtitle: "Tambahkan sentuhan natural dan tekstur pada bouquet Anda." };
      case 4: return { title: "Pilih Kertas & Pita", subtitle: "Sentuhan akhir untuk melengkapi karya Anda." };
      case 5: return { title: "Pratinjau Bouquet Anda", subtitle: "Periksa detail desain Anda sebelum memesan." };
      default: return { title: "", subtitle: "" };
    }
  })();

  const nextButtonText = (() => {
    switch (currentStep) {
      case 1: return "Lanjut ke Palet Warna";
      case 2: return "Lanjut ke Hiasan Daun";
      case 3: return "Lanjut ke Pembungkus";
      case 4: return "Lanjut ke Pratinjau";
      default: return "Selanjutnya";
    }
  })();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.gridContainer}>
            {flowerOptions.map(flower => (
              <BouquetCustomizerCard key={flower.id} title={flower.name} subtitle={flower.subtitle} imageUrl={flower.imageUrl} imageSource={flower.imageSource} isSelected={bouquetConfig.flowerType === flower.id} onPress={() => setBouquetConfig({ flowerType: flower.id })} width="48%" layout="grid" />
            ))}
          </View>
        );
      case 2:
        return (
          <View style={styles.listContainer}>
            {colorOptions.map(color => (
              <BouquetCustomizerCard key={color.id} title={color.name} subtitle={color.subtitle} colorHex={color.hexCode} isSelected={bouquetConfig.petalColor === color.id} onPress={() => setBouquetConfig({ petalColor: color.id })} width="100%" layout="list" />
            ))}
          </View>
        );
      case 3:
        return (
          <View>
            {/* Top row: 2 items */}
            <View style={styles.gridContainer}>
              {leafOptions.slice(0, 2).map(leaf => (
                <BouquetCustomizerCard key={leaf.id} title={leaf.name} subtitle={leaf.subtitle} imageUrl={leaf.imageUrl} imageSource={leaf.imageSource} isSelected={bouquetConfig.leafAccent === leaf.id} onPress={() => setBouquetConfig({ leafAccent: leaf.id })} width="48%" layout="grid" imageResizeMode={leaf.id === 'silver-dollar' ? 'contain' : 'cover'} />
              ))}
            </View>
            {/* Bottom row: 1 item centered */}
            <View style={styles.centeredRow}>
              {leafOptions.slice(2).map(leaf => (
                <BouquetCustomizerCard key={leaf.id} title={leaf.name} subtitle={leaf.subtitle} imageUrl={leaf.imageUrl} imageSource={leaf.imageSource} isSelected={bouquetConfig.leafAccent === leaf.id} onPress={() => setBouquetConfig({ leafAccent: leaf.id })} width="48%" layout="grid" />
              ))}
            </View>
          </View>
        );
      case 4: {
        const selectedWrapper = wrapperOptions.find(w => w.id === bouquetConfig.wrappingStyle);
        const selectedRibbon = ribbonOptions.find(r => r.id === bouquetConfig.ribbonColor);

        return (
          <View style={{ gap: 24 }}>
            {/* WRAPPERS DROPDOWN */}
            <View>
              <Text style={[styles.subCategoryTitle, { textAlign: 'left', marginBottom: 8 }]}>Kertas Pembungkus</Text>
              <TouchableOpacity 
                style={styles.dropdownHeader} 
                onPress={() => setOpenDropdown(openDropdown === 'wrapper' ? null : 'wrapper')}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownHeaderText}>{selectedWrapper?.name || 'Pilih Kertas Pembungkus'}</Text>
                <FontAwesome name={openDropdown === 'wrapper' ? "chevron-up" : "chevron-down"} size={16} color={brand.textSecondary} />
              </TouchableOpacity>

              {openDropdown === 'wrapper' && (
                <View style={styles.dropdownContent}>
                  {wrapperOptions.map(wrapper => (
                    <BouquetCustomizerCard key={wrapper.id} title={wrapper.name} subtitle={wrapper.subtitle} imageUrl={wrapper.imageUrl} isSelected={bouquetConfig.wrappingStyle === wrapper.id} onPress={() => { setBouquetConfig({ wrappingStyle: wrapper.id }); setOpenDropdown(null); }} width="100%" layout="list" />
                  ))}
                </View>
              )}
            </View>

            {/* RIBBONS DROPDOWN */}
            <View>
              <Text style={[styles.subCategoryTitle, { textAlign: 'left', marginBottom: 8 }]}>Warna Pita Pengikat</Text>
              <TouchableOpacity 
                style={styles.dropdownHeader} 
                onPress={() => setOpenDropdown(openDropdown === 'ribbon' ? null : 'ribbon')}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownHeaderText}>{selectedRibbon?.name || 'Pilih Warna Pita'}</Text>
                <FontAwesome name={openDropdown === 'ribbon' ? "chevron-up" : "chevron-down"} size={16} color={brand.textSecondary} />
              </TouchableOpacity>

              {openDropdown === 'ribbon' && (
                <View style={styles.dropdownContent}>
                  {ribbonOptions.map(ribbon => (
                    <BouquetCustomizerCard key={ribbon.id} title={ribbon.name} subtitle={ribbon.subtitle} colorHex={ribbon.hexCode} isSelected={bouquetConfig.ribbonColor === ribbon.id} onPress={() => { setBouquetConfig({ ribbonColor: ribbon.id }); setOpenDropdown(null); }} width="100%" layout="list" />
                  ))}
                </View>
              )}
            </View>
          </View>
        );
      }
      case 5:
        const activeFlower = flowerOptions.find(f => f.id === bouquetConfig.flowerType)?.name || 'Roses';
        const activeColor = colorOptions.find(c => c.id === bouquetConfig.petalColor) || colorOptions[0];
        const activeLeaf = leafOptions.find(l => l.id === bouquetConfig.leafAccent)?.name || 'Eucalyptus Leaf';
        const activeWrapper = wrapperOptions.find(w => w.id === bouquetConfig.wrappingStyle)?.name || 'Kain Goni Premium';
        
        return (
          <View style={styles.previewContainer}>
            <View style={styles.previewImageWrap}>
              <Image source={{ uri: getPreviewImageUrl(bouquetConfig.flowerType, bouquetConfig.petalColor) }} style={styles.previewImage} />
              
              <View style={styles.previewFloatingActions}>
                <TouchableOpacity style={styles.previewActionBtn}><Text style={styles.previewActionBtnText}>3D</Text></TouchableOpacity>
                <TouchableOpacity style={styles.previewActionBtn}><Text style={styles.previewActionBtnText}>AR</Text></TouchableOpacity>
              </View>

              <View style={styles.paginationDots}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>

            <View style={styles.summaryCard}>
              <SummaryRow label="Bunga Utama" value={activeFlower} colorHex="#D8B4E2" />
              <SummaryRow label="Palet Warna" value={activeColor.name} colorHex={activeColor.hexCode} />
              <SummaryRow label="Hiasan Daun" value={activeLeaf} icon="leaf" />
              <SummaryRow label="Kertas & Pita" value={activeWrapper} colorHex="#E5E7EB" />
              <View style={styles.ecoRow}>
                <Text style={styles.ecoLabel}>Limbah Tereduksi</Text>
                <Text style={styles.ecoValue}>12 Botol PET</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(124, 58, 237, 0.05)', 'rgba(255, 255, 255, 0)']}
          style={StyleSheet.absoluteFillObject}
          end={{ x: 0, y: 0.3 }}
        />
        
        <SafeAreaView style={styles.safeArea}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={handlePrev}>
              <FontAwesome name={currentStep === 1 ? "times" : "arrow-left"} size={16} color={brand.textPrimary} />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Text style={styles.stepIndicatorText}>Langkah {currentStep} dari {TOTAL_STEPS}</Text>
              {/* Segmented Progress Bar */}
              <View style={styles.segmentedProgressContainer}>
                {[1, 2, 3, 4, 5].map((step) => (
                  <View key={step} style={[styles.progressSegment, currentStep >= step && styles.progressSegmentActive]} />
                ))}
              </View>
            </View>
            
            {/* Empty view for flex balance */}
            <View style={{ width: 44 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
            {/* STEP HEADER TEXT */}
            <View style={styles.stepHeaderWrapper}>
              <Text style={styles.stepTitle}>{title}</Text>
              {!!subtitle && <Text style={styles.stepSubtitle}>{subtitle}</Text>}
            </View>

            {/* DYNAMIC STEP CONTENT */}
            <View style={styles.stepContentWrapper}>
              {renderStepContent()}
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* FLOATING BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>
          {currentStep === TOTAL_STEPS ? (
            <>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>INVESTASI HEALING</Text>
                <Text style={styles.priceValue}>{priceString}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8} onPress={handleNext}>
                <FontAwesome name="shopping-bag" size={14} color={brand.white} style={{ marginRight: 8 }} />
                <Text style={styles.checkoutText}>Pesan Bouquet Ini</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={handleNext}>
              <Text style={styles.nextButtonText}>{nextButtonText}</Text>
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
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16,
  },
  iconButton: {
    width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  stepIndicatorText: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.textPrimary, marginBottom: 8 },
  segmentedProgressContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    width: 140,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
  },
  progressSegmentActive: {
    backgroundColor: brand.primary,
  },
  
  stepHeaderWrapper: { paddingHorizontal: 24, marginBottom: 24 },
  stepTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: brand.primaryDark, marginBottom: 8, lineHeight: 32 },
  stepSubtitle: { fontFamily: 'Lato_400Regular', fontSize: 13, color: brand.textSecondary, lineHeight: 20 },
  subCategoryTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 18, color: brand.primaryDark, marginBottom: 12, textAlign: 'center' },
  
  stepContentWrapper: { paddingHorizontal: 24 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  listContainer: { flexDirection: 'column', gap: 0 },
  centeredRow: { flexDirection: 'row', justifyContent: 'center' },
  
  // DROPDOWN STYLES
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: brand.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
  },
  dropdownHeaderText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: brand.textPrimary,
  },
  dropdownContent: {
    marginTop: 12,
    gap: 12,
  },
  
  // PREVIEW SCREEN STYLES
  previewContainer: {
    width: '100%',
  },
  previewImageWrap: {
    width: '100%',
    height: 320,
    backgroundColor: brand.white,
    borderRadius: 24,
    marginBottom: 24,
    position: 'relative',
    shadowColor: brand.primaryDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 3,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
  },
  previewFloatingActions: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    gap: 8,
  },
  previewActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3,
  },
  previewActionBtnText: {
    fontFamily: 'Lato_700Bold', fontSize: 11, color: brand.primary,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.1)' },
  dotActive: { width: 16, backgroundColor: brand.white, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  
  summaryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  summaryLabel: { fontFamily: 'Lato_400Regular', fontSize: 12, color: brand.textSecondary },
  summaryValueContainer: { flexDirection: 'row', alignItems: 'center' },
  summaryValue: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.textPrimary, marginRight: 6 },
  summaryColorCircle: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' },
  ecoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 6,
  },
  ecoLabel: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.ecoGreen },
  ecoValue: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.ecoGreen },
  
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
  nextButtonText: { fontFamily: 'Lato_700Bold', fontSize: 14, color: brand.white },
  priceContainer: { flex: 1 },
  priceLabel: { fontFamily: 'Lato_700Bold', fontSize: 10, color: brand.textSecondary, letterSpacing: 1 },
  priceValue: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: brand.primaryDark, marginTop: 4 },
  checkoutButton: {
    backgroundColor: brand.primary, flexDirection: 'row', height: 54, borderRadius: 27, paddingHorizontal: 20,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  checkoutText: { fontFamily: 'Lato_700Bold', fontSize: 14, color: brand.white }
});
