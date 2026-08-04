import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';
import { images } from '@/constants/images';
import StudioCustomizer from '@/components/StudioCustomizer';

const { width } = Dimensions.get('window');
const HP = 24; // Horizontal Padding
const GAP = 14;

// Mock Data for Inspiration Gallery
const INSPIRATIONS = [
  { id: '1', title: 'Lavender Calm', desc: 'Tenang & Menenangkan', img: images.lavender, badge: 'Populer', icon: 'heart' },
  { id: '2', title: 'Sweet Comfort', desc: 'Lembut & Hangat', img: images.sweetComfort, icon: 'heart-o' },
  { id: '3', title: 'Sunny Day', desc: 'Ceria & Optimis', img: images.sunnyDay, icon: 'heart-o' },
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

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>

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
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Proses Mendesain Bouquet Anda</Text>
          </View>

          <TouchableOpacity
            style={s.designCard}
            activeOpacity={0.9}
            onPress={() => setIsCustomizerOpen(true)}
          >
            {/* Visual Stepper Workflow (Static) */}
            <View style={s.stepperRow}>
              <View style={s.stepperBackgroundLine} />
              <StepIcon icon="asterisk" label="Bunga" sub="Pilih jenis bunga favoritmu" />
              <StepIcon icon="paint-brush" label="Warna" sub="Tentukan palet warna bouquet" />
              <StepIcon icon="pagelines" label="Daun" sub="Tambahkan hiasan daun" />
              <StepIcon icon="sticky-note-o" label="Bungkus" sub="Pilih kertas pembungkus" />
            </View>

            {/* Inner CTA Card (Slim & Gradient) */}
            <LinearGradient
              colors={['#A78BFA', '#8B5CF6']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={s.innerCtaCard}
            >
              {/* Center Text */}
              <View style={s.innerCtaTextWrap}>
                <Text style={s.innerCtaTitle} numberOfLines={1} adjustsFontSizeToFit>Mulai Mendesain Bouquet Anda</Text>
                <Text style={s.innerCtaDesc}>Wujudkan perasaan dan momen spesial dalam rangkaian bunga.</Text>
              </View>

              {/* Right Arrow */}
              <View style={s.innerCtaArrowCircle}>
                <FontAwesome name="arrow-right" size={14} color={brand.primary} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* ── INSPIRATION GALLERY ── */}
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Inspirasi untuk Anda</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={s.seeAll}>Lihat semua</Text>
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
              <InspirationCard key={item.id} item={item} />
            ))}
          </ScrollView>

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
function InspirationCard({ item }: { item: typeof INSPIRATIONS[0] }) {
  const [liked, setLiked] = useState(item.icon === 'heart');
  const scale = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const toggleLike = () => {
    const isNowLiked = !liked;
    setLiked(isNowLiked);
    Animated.sequence([
      Animated.timing(heartScale, { toValue: 1.4, duration: 100, useNativeDriver: true }),
      Animated.spring(heartScale, { toValue: 1, friction: 3, useNativeDriver: true })
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={s.inspireCard}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayPressIn={0}
      >
        <View style={s.inspireImgWrap}>
          <Image source={item.img} style={s.inspireImg} />
          {item.badge && (
            <View style={s.inspireBadge}>
              <Text style={s.inspireBadgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
        <View style={s.inspireBody}>
          <View style={s.inspireTitleRow}>
            <Text style={s.inspireTitle} numberOfLines={1}>{item.title}</Text>
            <TouchableOpacity onPress={toggleLike} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
              <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                <FontAwesome name={liked ? 'heart' : 'heart-o'} size={15} color={liked ? '#EF4444' : brand.textSecondary} />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <Text style={s.inspireDesc}>{item.desc}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function StepIcon({ icon, label, sub }: { icon: string, label: string, sub: string }) {
  return (
    <View style={s.stepWrap}>
      <View style={s.stepCircle}>
        <FontAwesome name={icon as any} size={18} color={brand.primary} />
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
  stepperRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', width: '100%' },
  stepperBackgroundLine: { position: 'absolute', top: 22, left: 24, right: 24, height: 1, borderBottomWidth: 1.5, borderBottomColor: 'rgba(124, 58, 237, 0.2)', borderStyle: 'dashed' },

  stepWrap: { alignItems: 'center', flex: 1 },
  stepCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F8F6FC', justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1.5, borderColor: 'rgba(124, 58, 237, 0.15)' },
  stepLabel: { fontFamily: 'Lato_700Bold', fontSize: 10, color: brand.textPrimary, marginBottom: 4, textAlign: 'center' },
  stepSub: { fontFamily: 'Lato_400Regular', fontSize: 9, color: brand.textSecondary, textAlign: 'center', lineHeight: 12 },

  innerCtaCard: {
    borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginTop: 32, position: 'relative', overflow: 'hidden',
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 5
  },
  innerCtaTextWrap: { flex: 1, zIndex: 2 },
  innerCtaTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 16, color: brand.white, marginBottom: 4 },
  innerCtaDesc: { fontFamily: 'Lato_400Regular', fontSize: 11, color: 'rgba(255,255,255,0.9)', lineHeight: 16, paddingRight: 8 },
  innerCtaArrowCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: brand.white, justifyContent: 'center', alignItems: 'center', marginLeft: 8, zIndex: 2 },

  // Inspiration Gallery
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: HP, marginBottom: 14 },
  sectionTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: brand.textPrimary },
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
});
