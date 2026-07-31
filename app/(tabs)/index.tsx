import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, FlatList, Image, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

const BANNERS = [
  {
    id: '1',
    badge: 'BEST SELLER',
    title: 'Aromatherapy Breeze Bouquet',
    desc: 'Buket bunga eksklusif dari limbah botol plastik daur ulang dengan fungsi aromaterapi penenang pikiran.',
    price: 'Rp150.000',
    bgColor: brand.white,
    imageUrl: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop', // Bouquet Placeholder
    features: [
      { text: 'Upcycled Plastic Waste', icon: 'recycle' },
      { text: 'Aromatherapy Diffuser', icon: 'tint' },
      { text: 'Mental Wellness Support', icon: 'heart-o' },
    ]
  },
  {
    id: '2',
    badge: 'RAKIT BUNGA, RAWAT DIRI',
    title: 'DIY Healing Flower Kit',
    desc: 'Sesi aktivitas merakit yang meditatif untuk mengurangi stres harian, melatih fokus, dan memicu ketenangan batin.',
    price: 'Rp100.000',
    bgColor: '#F3EFFF',
    imageSource: require('@/assets/images/diy-kit.png'), // Local image asset
    features: [
      { text: 'Guided Meditation Audio', icon: 'headphones' },
      { text: 'Reduce Daily Stress', icon: 'leaf' },
      { text: 'Build Focus & Patience', icon: 'puzzle-piece' },
    ]
  }
];

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
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // New Cart & Animation State
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  
  const flatListRef = useRef<FlatList>(null);
  
  // Animated Values
  const scrollY = useRef(new Animated.Value(0)).current;
  const toastAnim = useRef(new Animated.Value(150)).current; // Start hidden below the screen

  // Auto-scroll logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      let nextIndex = activeBannerIndex + 1;
      if (nextIndex >= BANNERS.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveBannerIndex(nextIndex);
    }, 4000); // 4 seconds delay

    return () => clearInterval(intervalId);
  }, [activeBannerIndex]);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeBannerIndex && roundIndex >= 0 && roundIndex < BANNERS.length) {
      setActiveBannerIndex(roundIndex);
    }
  };

  const openProductModal = (product: any) => {
    scrollY.setValue(0); // Reset scroll position for modal
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: -120, // Slide UP into view (safely above the bottom tab bar)
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(2500), // Wait
      Animated.timing(toastAnim, {
        toValue: 150, // Slide back down off-screen
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setIsModalVisible(false);
    triggerToast('1 Produk ditambahkan ke keranjang!');
  };

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-100, 0, 260],
    outputRange: [0, 0, -130], // Move up half the scroll distance (parallax)
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.5, 1], // Scale up when pulled down
    extrapolate: 'clamp',
  });

  const renderBanner = ({ item }: { item: any }) => (
    <View style={styles.bannerSlide}>
      <View style={[styles.bannerCard, { backgroundColor: item.bgColor }]}>
        <View style={styles.bannerContent}>
          <View style={styles.badgeSmall}>
            <Text style={styles.badgeTextSmall}>{item.badge}</Text>
          </View>
          <Text style={styles.bannerTitle} numberOfLines={2}>{item.title}</Text>
          <TouchableOpacity 
            style={styles.bannerButton} 
            activeOpacity={0.8}
            onPress={() => openProductModal(item)}
          >
            <Text style={styles.bannerButtonText}>Lihat Selengkapnya</Text>
          </TouchableOpacity>
        </View>
        <Image source={item.imageSource ? item.imageSource : { uri: item.imageUrl }} style={styles.bannerImage} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* CUSTOM TOAST NOTIFICATION */}
      <Animated.View style={[styles.toastContainer, { transform: [{ translateY: toastAnim }] }]}>
        <View style={styles.toastContent}>
          <FontAwesome name="check-circle" size={20} color={brand.primary} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      </Animated.View>

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
              {/* Cart Badge */}
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
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

          {/* SECTION 1: AUTO-PLAY LANDSCAPE BANNERS */}
          <View>
            <FlatList
              ref={flatListRef}
              data={BANNERS}
              renderItem={renderBanner}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              decelerationRate="fast"
            />
            {/* BANNER PAGINATION DOTS */}
            <View style={styles.paginationContainer}>
              {BANNERS.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    activeBannerIndex === index ? styles.activeDot : styles.inactiveDot
                  ]} 
                />
              ))}
            </View>
          </View>

          {/* SECTION 2: DIY STEPS */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Cara Merakit DIY Kit</Text>
            <Text style={styles.sectionSubtitle}>Ikuti enam alur langkah berikut sambil mendengarkan pemutar musik meditatif kami.</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.stepsCarousel}
              snapToInterval={126} // Smoothly snap to each step (110 width + 16 margin)
              decelerationRate="fast"
            >
              {DIY_STEPS.map((step, index) => (
                <View key={step.id} style={styles.stepperItem}>
                  {/* Tali Penghubung (Connecting Line) */}
                  {index < DIY_STEPS.length - 1 && <View style={styles.stepperLine} />}
                  
                  <View style={styles.stepperCircle}>
                    <FontAwesome name={step.icon as any} size={20} color={brand.primary} />
                  </View>
                  <Text style={styles.stepperStepLabel}>LANGKAH {step.id}</Text>
                  <Text style={styles.stepperTitle}>{step.title}</Text>
                  <Text style={styles.stepperDesc} numberOfLines={3}>{step.desc}</Text>
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

      {/* PRODUCT DETAILS MODAL */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button overlapping image */}
            <TouchableOpacity 
              style={styles.modalCloseButton} 
              onPress={() => setIsModalVisible(false)}
              activeOpacity={0.7}
            >
              <FontAwesome name="times" size={16} color={brand.textPrimary} />
            </TouchableOpacity>

            {selectedProduct && (
              <>
                {/* Absolute Parallax Image */}
                <Animated.Image 
                  source={selectedProduct.imageSource ? selectedProduct.imageSource : { uri: selectedProduct.imageUrl }} 
                  style={[styles.modalHeroImageAbsolute, { transform: [{ translateY: imageTranslateY }, { scale: imageScale }] }]} 
                />
                
                <Animated.ScrollView 
                  contentContainerStyle={{ paddingTop: 260 }} // Transparent space for the absolute image
                  showsVerticalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true } // 60 FPS Native Animation
                  )}
                  scrollEventThrottle={16}
                >
                  {/* White card that slides over the image */}
                  <View style={styles.modalScrollContent}>
                    <View style={styles.modalBadge}>
                      <Text style={styles.modalBadgeText}>{selectedProduct.badge}</Text>
                    </View>
                  
                  <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                  <Text style={styles.modalDesc}>{selectedProduct.desc}</Text>

                  <Text style={styles.modalSectionTitle}>Fitur & Dampak Lingkungan</Text>
                  <View style={styles.modalFeatureList}>
                    {selectedProduct.features.map((feat: any, idx: number) => (
                      <View key={idx} style={styles.modalFeatureItem}>
                        <View style={styles.modalFeatureIcon}>
                          <FontAwesome name={feat.icon} size={16} color={brand.primary} />
                        </View>
                        <Text style={styles.modalFeatureText}>{feat.text}</Text>
                      </View>
                    ))}
                  </View>
                  
                  {/* Extra Padding for bottom button so nothing gets cut off */}
                  <View style={{ height: 160 }} />
                  </View>
                </Animated.ScrollView>

                {/* Fixed Bottom Footer */}
                <View style={styles.modalFooter}>
                  <View style={styles.modalPriceContainer}>
                    <Text style={styles.modalPriceLabel}>Harga Total</Text>
                    <Text style={styles.modalPrice}>{selectedProduct.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.modalBuyButton} activeOpacity={0.8} onPress={handleAddToCart}>
                    <FontAwesome name="shopping-cart" size={16} color={brand.white} />
                    <Text style={styles.modalBuyButtonText}>Tambah Keranjang</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    paddingBottom: 24, 
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.primary,
  },
  greeting: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: brand.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16, 
    color: brand.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, 
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
    borderColor: brand.white,
  },

  // Toast & Cart Badge Styles
  cartBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: brand.white,
  },
  cartBadgeText: {
    color: brand.white,
    fontSize: 10,
    fontFamily: 'Lato_700Bold',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999, // Ensure it's above everything
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    gap: 12,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  toastText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.textPrimary,
  },

  // Search Bar
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24, 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.white,
    borderRadius: 999, 
    paddingLeft: 20,
    paddingRight: 8,
    height: 60,
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
    fontSize: 15,
    color: brand.textPrimary,
    height: '100%',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // Banner Carousel
  bannerSlide: {
    width: width,
    paddingHorizontal: 24,
  },
  bannerCard: {
    flexDirection: 'row',
    height: 170, // Increased slightly for better proportions
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  badgeSmall: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  badgeTextSmall: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: brand.primary,
  },
  bannerTitle: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 18,
    color: brand.textPrimary,
    marginBottom: 16, // More breathing room before button
  },
  bannerButton: {
    backgroundColor: brand.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  bannerButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: brand.white,
  },
  bannerImage: {
    width: 130, // Occupies right side beautifully
    height: '100%',
    resizeMode: 'cover',
  },
  
  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 8, // Space before next section
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: brand.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#000', // Black background makes image pop
    height: height * 0.85,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: brand.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  modalHeroImageAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300, // Provides extra height for bounce effect
    resizeMode: 'cover',
  },
  modalScrollContent: {
    backgroundColor: brand.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    minHeight: height * 0.85, // Ensure white background fills screen
  },
  modalBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  modalBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: brand.primary,
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 26,
    color: brand.textPrimary,
    marginBottom: 12,
    lineHeight: 32,
  },
  modalDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    color: brand.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.textPrimary,
    marginBottom: 16,
  },
  modalFeatureList: {
    gap: 16,
  },
  modalFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  modalFeatureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFeatureText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    color: brand.textPrimary,
  },
  modalFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: brand.white,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    gap: 12, // Space between price and button
  },
  modalPriceContainer: {
    flex: 1, // Let price take available space
  },
  modalPriceLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: brand.textSecondary,
    marginBottom: 4,
  },
  modalPrice: {
    fontFamily: 'Lato_700Bold', // Changed to Lato for clarity and readability
    fontSize: 22, // Adjusted slightly to fit better
    color: brand.primaryDark,
  },
  modalBuyButton: {
    flex: 1.4, // Button takes more space to fit text
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center content in button
    backgroundColor: brand.primary,
    paddingVertical: 14,
    borderRadius: 999,
    gap: 8,
  },
  modalBuyButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14, // Standardized safe size
    color: brand.white,
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
    paddingTop: 8,
    paddingBottom: 16,
  },
  stepperItem: {
    width: 110, // Compact width to fit 3 steps comfortably
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  stepperLine: {
    position: 'absolute',
    top: 22, // Center of the 44px circle
    left: '50%', // Start from the center of current circle
    width: 126, // Reach the center of the next circle (110 width + 16 margin)
    height: 2,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    zIndex: 1, // Stay behind the circle
  },
  stepperCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: brand.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Stay above the connecting line
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  stepperStepLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: brand.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  stepperTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: brand.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 16,
  },
  stepperDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
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
