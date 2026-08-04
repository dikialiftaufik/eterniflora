import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';
import StudioCustomizer from '@/components/StudioCustomizer';

const { width } = Dimensions.get('window');
const HP = 24; // Horizontal Padding
const GAP = 14;

// Mock Data for Inspiration Gallery
const INSPIRATIONS = [
  { id: '1', title: 'Lavender Calm', desc: 'Tenang & Menenangkan', img: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop', badge: 'Populer', icon: 'heart' },
  { id: '2', title: 'Sweet Comfort', desc: 'Lembut & Hangat', img: 'https://images.unsplash.com/photo-1563241527-3004b7be0fae?q=80&w=400&auto=format&fit=crop', icon: 'heart-o' },
  { id: '3', title: 'Sunny Day', desc: 'Ceria & Optimis', img: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop', icon: 'heart-o' },
];

export default function BouquetStudioLandingScreen() {
  const router = useRouter();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <View style={s.root}>
      {/* Soft Background Gradient */}
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={StyleSheet.absoluteFillObject}
        end={{ x: 0, y: 0.4 }}
      />
      
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* ── HEADER ── (Consistent with Events/Profile) */}
        <View style={s.header}>
          <TouchableOpacity style={s.headerBtn} activeOpacity={0.7} onPress={() => router.push('/')}>
            <FontAwesome name="chevron-left" size={16} color={brand.textPrimary} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Bouquet Studio</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
          
          {/* ── HERO BANNER ── */}
          <View style={s.bannerContainer}>
            <View style={[s.bannerCard, { backgroundColor: '#F3EFFF' }]}>
              <View style={s.bannerContent}>
                <View style={s.badgeSmall}>
                  <Text style={s.badgeTextSmall}>KUSTOMISASI</Text>
                </View>
                <Text style={s.bannerTitle} numberOfLines={2}>Buket Impian Penuh Makna</Text>
                
                <TouchableOpacity style={s.bannerButton} activeOpacity={0.8} onPress={() => setIsCustomizerOpen(true)}>
                  <Text style={s.bannerButtonText}>Mulai Merakit</Text>
                </TouchableOpacity>
              </View>
              <Image 
                source={require('@/assets/images/diy-kit.png')} 
                style={s.bannerImage} 
              />
            </View>
          </View>

          {/* ── START DESIGN SECTION ── */}
          <TouchableOpacity 
            style={s.designCard} 
            activeOpacity={0.9}
            onPress={() => setIsCustomizerOpen(true)}
          >
            <Text style={s.designTitle}>Mulai Desain Bouquet Anda</Text>
            
            {/* Visual Stepper */}
            <View style={s.stepperRow}>
              <StepIcon icon="asterisk" label="Bunga" sub="Jenis Bunga" active />
              <View style={s.dashLine} />
              <StepIcon icon="paint-brush" label="Warna" sub="Palet Warna" />
              <View style={s.dashLine} />
              <StepIcon icon="pagelines" label="Daun" sub="Hiasan Daun" />
              <View style={s.dashLine} />
              <StepIcon icon="gift" label="Pembungkus" sub="& Pita" />
            </View>

            {/* Meaning Banner */}
            <View style={s.meaningBanner}>
              <View style={s.meaningIconCircle}>
                <FontAwesome name="magic" size={14} color={brand.primaryDark} />
              </View>
              <View style={s.meaningTextWrap}>
                <Text style={s.meaningTitle}>Setiap pilihanmu bermakna</Text>
                <Text style={s.meaningDesc}>Desain bouquet yang mencerminkan perasaan, energi, dan kepedulian terhadap bumi.</Text>
              </View>
              <FontAwesome name="globe" size={36} color="rgba(124, 58, 237, 0.15)" style={{ position: 'absolute', right: -10, bottom: -10 }} />
            </View>
          </TouchableOpacity>

          {/* ── INSPIRATION GALLERY ── */}
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Inspirasi untuk Anda</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={s.seeAll}>Lihat semua <FontAwesome name="angle-right" size={14} /></Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={s.inspireScroll}
            snapToInterval={180 + 14}
            decelerationRate="fast"
          >
            {INSPIRATIONS.map(item => (
              <View key={item.id} style={s.inspireCard}>
                <View style={s.inspireImgWrap}>
                  <Image source={{ uri: item.img }} style={s.inspireImg} />
                  {item.badge && (
                    <View style={s.inspireBadge}>
                      <Text style={s.inspireBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={s.inspireBody}>
                  <View style={s.inspireTitleRow}>
                    <Text style={s.inspireTitle} numberOfLines={1}>{item.title}</Text>
                    <FontAwesome name={item.icon as any} size={14} color={brand.primary} />
                  </View>
                  <Text style={s.inspireDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* ── IMPACT FOOTER BANNER ── */}
          <LinearGradient 
            colors={[brand.primaryLight, brand.primary]} 
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={s.impactBanner}
          >
            <View style={s.impactIconWrap}>
              <FontAwesome name="leaf" size={20} color={brand.white} />
            </View>
            <View style={s.impactTextWrap}>
              <Text style={s.impactTitle}>Desain dengan dampak positif</Text>
              <Text style={s.impactDesc}>Setiap pembelian membantu mengurangi limbah plastik dan mendukung bumi yang lebih sehat. 🌱</Text>
            </View>
            <TouchableOpacity style={s.impactBtn} activeOpacity={0.8}>
              <Text style={s.impactBtnText}>Pelajari Lebih Lanjut <FontAwesome name="angle-right" size={12} /></Text>
            </TouchableOpacity>
          </LinearGradient>

        </ScrollView>
      </SafeAreaView>

      {/* FULL SCREEN CUSTOMIZER MODAL */}
      <StudioCustomizer 
        visible={isCustomizerOpen} 
        onClose={() => setIsCustomizerOpen(false)} 
      />
    </View>
  );
}

/* ── SUBCOMPONENTS ── */
function StepIcon({ icon, label, sub, active = false }: { icon: string, label: string, sub: string, active?: boolean }) {
  return (
    <View style={s.stepWrap}>
      <View style={[s.stepCircle, active && s.stepCircleActive]}>
        <FontAwesome name={icon as any} size={20} color={active ? brand.white : brand.textSecondary} />
      </View>
      <Text style={s.stepLabel}>{label}</Text>
      <Text style={s.stepSub}>{sub}</Text>
    </View>
  );
}

/* ── STYLES ── */
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: brand.background },
  
  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: HP, paddingTop: 16, paddingBottom: 20,
  },
  headerBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: brand.white,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: brand.primaryDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  headerTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: brand.primaryDark, textAlign: 'center', flex: 1 },

  // Banner
  bannerContainer: { paddingHorizontal: HP, marginBottom: 24 },
  bannerCard: { flexDirection: 'row', height: 170, backgroundColor: brand.white, borderRadius: 24, overflow: 'hidden', shadowColor: brand.primaryDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4 },
  bannerContent: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'flex-start' },
  badgeSmall: { backgroundColor: 'rgba(124, 58, 237, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 8 },
  badgeTextSmall: { fontFamily: 'Lato_700Bold', fontSize: 9, color: brand.primary },
  bannerTitle: { fontFamily: 'PlayfairDisplay_800ExtraBold', fontSize: 18, color: brand.textPrimary, lineHeight: 26, marginBottom: 16 },
  bannerButton: { backgroundColor: brand.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999 },
  bannerButtonText: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.white },
  bannerImage: { width: 130, height: '100%', resizeMode: 'cover' },

  // Design Card
  designCard: {
    marginHorizontal: HP, backgroundColor: brand.white, borderRadius: 24, padding: 20,
    shadowColor: brand.primaryDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 5,
    marginBottom: 32,
  },
  designTitle: { fontFamily: 'Lato_700Bold', fontSize: 18, color: brand.textPrimary, marginBottom: 20 },
  stepperRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, paddingHorizontal: 10 },
  dashLine: { flex: 1, height: 1, borderBottomWidth: 2, borderBottomColor: 'rgba(124, 58, 237, 0.1)', borderStyle: 'dashed', marginTop: 24, marginHorizontal: 8 },
  
  stepWrap: { alignItems: 'center', width: 60 },
  stepCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#F1F3F5' },
  stepCircleActive: { backgroundColor: brand.primary, borderColor: brand.primary },
  stepLabel: { fontFamily: 'Lato_700Bold', fontSize: 11, color: brand.textPrimary, marginBottom: 2 },
  stepSub: { fontFamily: 'Lato_400Regular', fontSize: 9, color: brand.textSecondary },

  meaningBanner: {
    backgroundColor: '#F8F6FC', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', position: 'relative'
  },
  meaningIconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: brand.white, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  meaningTextWrap: { flex: 1, zIndex: 2 },
  meaningTitle: { fontFamily: 'Lato_700Bold', fontSize: 13, color: brand.primaryDark, marginBottom: 2 },
  meaningDesc: { fontFamily: 'Lato_400Regular', fontSize: 11, color: brand.textSecondary, lineHeight: 16, paddingRight: 20 },

  // Inspiration Gallery
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: HP, marginBottom: 16 },
  sectionTitle: { fontFamily: 'Lato_700Bold', fontSize: 18, color: brand.textPrimary },
  seeAll: { fontFamily: 'Lato_700Bold', fontSize: 13, color: brand.primary },
  inspireScroll: { paddingHorizontal: HP, gap: GAP, paddingBottom: 20 },
  
  inspireCard: {
    width: 180, backgroundColor: brand.white, borderRadius: 20,
    shadowColor: brand.primaryDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
  },
  inspireImgWrap: { height: 180, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' },
  inspireImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  inspireBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: brand.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  inspireBadgeText: { fontFamily: 'Lato_700Bold', fontSize: 10, color: brand.white },
  inspireBody: { padding: 14 },
  inspireTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  inspireTitle: { fontFamily: 'Lato_700Bold', fontSize: 14, color: brand.textPrimary, flex: 1, marginRight: 8 },
  inspireDesc: { fontFamily: 'Lato_400Regular', fontSize: 11, color: brand.textSecondary },

  // Footer Banner
  impactBanner: {
    marginHorizontal: HP, borderRadius: 24, padding: 20, marginTop: 12,
    flexDirection: 'column', alignItems: 'flex-start'
  },
  impactIconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  impactTextWrap: { marginBottom: 16 },
  impactTitle: { fontFamily: 'Lato_700Bold', fontSize: 16, color: brand.white, marginBottom: 4 },
  impactDesc: { fontFamily: 'Lato_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  impactBtn: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  impactBtnText: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.white },
});
