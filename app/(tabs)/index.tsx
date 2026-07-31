import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const DIY_STEPS = [
  { id: 1, title: 'Siapkan komponen', desc: 'Siapkan semua kelopak, stik, & botol kit.', icon: 'cube' },
  { id: 2, title: 'Pasang kelopak', desc: 'Pasang kelopak pada kawat batang utama.', icon: 'leaf' },
  { id: 3, title: 'Susun kelopak', desc: 'Rapatkan kelopak hingga membentuk bunga.', icon: 'asterisk' },
  { id: 4, title: 'Tambahkan daun', desc: 'Sematkan daun Eucalyptus.', icon: 'pagelines' },
  { id: 5, title: 'Rangkai botol', desc: 'Posisikan stik & kawat di botol diffuser.', icon: 'flask' },
  { id: 6, title: 'Teteskan oil', desc: 'Teteskan essential oil di kelopak.', icon: 'tint' },
];

const CIRCULARITY = [
  { id: 1, title: 'Plastic Waste', desc: 'Limbah disaring', icon: 'trash-o' },
  { id: 2, title: 'Upcycled', desc: 'Dibuat premium', icon: 'recycle' },
  { id: 3, title: 'Reusable', desc: 'Isi ulang oil', icon: 'refresh' },
  { id: 4, title: 'Wellness', desc: 'Self-healing tercapai', icon: 'heart-o' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* SOFT BACKGROUND GRADIENT */}
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={StyleSheet.absoluteFillObject}
        end={{ x: 0, y: 0.4 }}
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerProfile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DA</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Selamat pagi,</Text>
              <Text style={styles.userName}>Diki Alif</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <FontAwesome name="shopping-cart" size={22} color={brand.textPrimary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <FontAwesome name="bell-o" size={22} color={brand.textPrimary} />
              {/* Red Dot Indicator */}
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <FontAwesome name="search" size={22} color={brand.textSecondary} style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Cari buket atau kit..."
                placeholderTextColor={brand.placeholder}
                selectionColor={brand.primary}
              />
              <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                <FontAwesome name="sliders" size={22} color={brand.primaryDark} />
              </TouchableOpacity>
            </View>
          </View>

          {/* SECTION 1: HERO CAROUSEL */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.heroCarousel}
            snapToInterval={width * 0.85 + 16} // width of card + margin
            decelerationRate="fast"
          >
            {/* Card 1: Breeze Bouquet */}
            <View style={styles.heroCard}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>BEST SELLER</Text>
              </View>
              <Text style={styles.heroTitle}>AROMATHERAPY BREEZE BOUQUET</Text>
              
              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <FontAwesome name="recycle" size={12} color={brand.primary} />
                  </View>
                  <Text style={styles.featureText}>Upcycled Plastic Waste</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <FontAwesome name="tint" size={12} color={brand.primary} />
                  </View>
                  <Text style={styles.featureText}>Aromatherapy Diffuser</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <FontAwesome name="heart-o" size={12} color={brand.primary} />
                  </View>
                  <Text style={styles.featureText}>Mental Wellness Support</Text>
                </View>
              </View>

              <View style={styles.heroFooter}>
                <Text style={styles.heroPrice}>Rp150.000</Text>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Beli Produk</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 2: DIY Kit */}
            <View style={[styles.heroCard, { backgroundColor: '#F3EFFF' }]}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>RAKIT BUNGA, RAWAT DIRI</Text>
              </View>
              <Text style={styles.heroTitle}>DIY HEALING FLOWER KIT</Text>
              <Text style={styles.heroDesc}>
                Sesi aktivitas merakit yang meditatif untuk membantu mengurangi stres harian, 
                meningkatkan fokus, dan memicu ketenangan batin.
              </Text>
              
              <View style={[styles.heroFooter, { marginTop: 'auto' }]}>
                <Text style={styles.heroPrice}>Rp100.000</Text>
                <TouchableOpacity style={[styles.buyButton, { backgroundColor: brand.primaryDark }]}>
                  <Text style={styles.buyButtonText}>Pesan Kit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* SECTION 2: DIY STEPS */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Cara Merakit DIY Kit</Text>
            <Text style={styles.sectionSubtitle}>Ikuti enam alur langkah berikut sambil mendengarkan pemutar musik meditatif kami.</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.stepsCarousel}
            >
              {DIY_STEPS.map((step) => (
                <View key={step.id} style={styles.stepCard}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{step.id}</Text>
                  </View>
                  <FontAwesome name={step.icon as any} size={28} color={brand.primary} style={styles.stepIcon} />
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* SECTION 3: SENSASI AROMATERAPI */}
          <View style={styles.darkCard}>
            <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <Text style={[styles.badgeText, { color: brand.white }]}>AROMATHERAPY FUNCTION</Text>
            </View>
            <Text style={styles.darkCardTitle}>Sensasi Aromaterapi Penenang</Text>
            <Text style={styles.darkCardDesc}>
              Kelopak bunga berbahan daur ulang botol plastik dirancang memiliki serat pori mikro 
              yang ideal dalam menampung dan merilis essential oil murni secara bertahap.
            </Text>
            
            <TouchableOpacity style={styles.darkCardButton}>
              <Text style={styles.darkCardButtonText}>Dapatkan Ketenangan</Text>
            </TouchableOpacity>
          </View>

          {/* SECTION 4: SIRKULARITAS */}
          <View style={styles.sectionContainer}>
            <View style={[styles.badge, { alignSelf: 'flex-start', marginLeft: 24, marginBottom: 12 }]}>
              <Text style={styles.badgeText}>SUSTAINABLE BY DESIGN</Text>
            </View>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 24 }]}>Sirkularitas Tanpa Limbah</Text>
            <Text style={[styles.sectionSubtitle, { paddingHorizontal: 24 }]}>Setiap pembelian produk ikut menggerakkan ekonomi sirkular lokal.</Text>

            <View style={styles.gridContainer}>
              {CIRCULARITY.map((item) => (
                <View key={item.id} style={styles.gridItem}>
                  <View style={styles.gridIconCircle}>
                    <FontAwesome name={item.icon as any} size={20} color={brand.primary} />
                  </View>
                  <Text style={styles.gridTitle}>{item.title}</Text>
                  <Text style={styles.gridDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* EXTRA PADDING FOR TAB BAR */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24, // Added more padding to let it breathe like the reference
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48, // Slightly larger avatar
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.primary, // Vibrant purple
  },
  greeting: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: brand.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontFamily: 'Lato_700Bold', // Changed to sans-serif for a cleaner, modern look
    fontSize: 16, 
    color: brand.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Adjusted gap to fit the new circular backgrounds
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: brand.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444', 
    borderWidth: 1.5,
    borderColor: brand.white, // Matches the new white background
  },

  // Search Bar
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24, // Consistent spacing before the carousel
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.white,
    borderRadius: 999, // Pill shape for a modern, friendly feel
    paddingLeft: 20,
    paddingRight: 8, // Creates an 8px even gap (top, bottom, right) for the 44px filter button
    height: 60, // Increased height to give the 44x44 filter button room to breathe
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 14,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Lato_400Regular',
    fontSize: 15, // Increased slightly to balance with the 60px height and 22px icons
    color: brand.textPrimary,
    height: '100%',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 58, 237, 0.08)', // Harmonious background matching the header icons
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // General Badges
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: brand.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  badgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: brand.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Section 1: Hero Carousel
  heroCarousel: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 24,
  },
  heroCard: {
    width: width * 0.85,
    backgroundColor: brand.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 24,
    color: brand.textPrimary,
    marginBottom: 16,
  },
  heroDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: brand.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: brand.textSecondary,
  },
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  heroPrice: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: brand.textPrimary,
  },
  buyButton: {
    backgroundColor: brand.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buyButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.white,
  },

  // Sections
  sectionContainer: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 24,
    color: brand.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 32,
    marginBottom: 24,
  },

  // Section 2: Steps
  stepsCarousel: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 16,
  },
  stepCard: {
    width: 160,
    backgroundColor: brand.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  stepNumberBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: brand.primary,
  },
  stepIcon: {
    marginTop: 16,
    marginBottom: 16,
  },
  stepTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  stepDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Section 3: Dark Card
  darkCard: {
    marginHorizontal: 24,
    marginVertical: 24,
    backgroundColor: brand.primaryDark,
    borderRadius: 24,
    padding: 24,
    alignItems: 'flex-start',
  },
  darkCardTitle: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 28,
    color: brand.white,
    marginBottom: 16,
    lineHeight: 34,
  },
  darkCardDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    marginBottom: 24,
  },
  darkCardButton: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  darkCardButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.white,
  },

  // Section 4: Circularity Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
  },
  gridItem: {
    width: (width - 48 - 16) / 2, // Half width minus gap
    backgroundColor: 'rgba(124, 58, 237, 0.03)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.06)',
  },
  gridIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: brand.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  gridTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  gridDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
