import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, Dimensions, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';
import { images } from '@/constants/images';
import { ecoEvents, EcoEvent } from '@/data/events';

const { width, height } = Dimensions.get('window');
const HP = 24; // Horizontal Padding (consistent with Home)
const GAP = 14;
const FEAT_W = width * 0.78; // 78% — leaves a peek of the next card
const GRID_W = (width - HP * 2 - GAP) / 2; // 2-col grid

const getCategoryBgColor = (cat: string) => {
  switch (cat) {
    case 'Air Bersih': return 'rgba(59, 130, 246, 0.1)';
    case 'Pesisir Lestari': return 'rgba(16, 185, 129, 0.1)';
    case 'Paru Kota': return 'rgba(34, 197, 94, 0.1)';
    case 'Edukasi': return 'rgba(245, 158, 11, 0.1)';
    default: return 'rgba(124, 58, 237, 0.1)';
  }
};

const getCategoryTextColor = (cat: string) => {
  switch (cat) {
    case 'Air Bersih': return '#2563EB';
    case 'Pesisir Lestari': return '#059669';
    case 'Paru Kota': return '#16A34A';
    case 'Edukasi': return '#D97706';
    default: return brand.primary;
  }
};

export default function EventsScreen() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<EcoEvent | null>(null);

  // Animation States for Success Popup
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(20)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleRegisterEvent = () => {
    // Trigger Success Micro-animation
    setShowSuccessOverlay(true);
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 6, tension: 40 }),
      Animated.timing(floatAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true })
    ]).start();

    setTimeout(() => {
      // Close the modal cleanly
      setSelectedEvent(null);
      
      // Wait for modal native slide down to finish before resetting
      setTimeout(() => {
        setShowSuccessOverlay(false);
        scaleAnim.setValue(0);
        floatAnim.setValue(20);
        opacityAnim.setValue(0);
      }, 500);
    }, 2000);
  };

  const featured = ecoEvents.filter(e => e.isFeatured);
  const upcoming = ecoEvents.filter(e => !e.isFeatured);

  return (
    <View style={s.root}>
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={StyleSheet.absoluteFillObject}
        end={{ x: 0, y: 0.4 }}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        {/* ── HEADER ── */}
        <View style={s.header}>
          <TouchableOpacity style={s.headerBtn} activeOpacity={0.7} onPress={() => router.push('/')}>
            <FontAwesome name="chevron-left" size={16} color={brand.textPrimary} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Eco Events</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

          {/* ── SECTION: TERDEKAT ── */}
          <View style={s.sectionRow}>
            <Text style={s.sectionLabel}>Terdekat</Text>
            <View style={s.locBadge}>
              <FontAwesome name="map-marker" size={13} color={brand.primary} />
              <Text style={s.locText}>Bandung</Text>
              <FontAwesome name="angle-right" size={13} color={brand.primary} />
            </View>
          </View>

          <FlatList
            data={featured}
            keyExtractor={i => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={FEAT_W + GAP}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: HP, gap: GAP }}
            renderItem={({ item }) => (
              <TouchableOpacity style={s.featCard} activeOpacity={0.9} onPress={() => setSelectedEvent(item)}>
                <View style={s.featImgWrap}>
                  <Image source={item.imageSource} style={s.featImg} />
                  <View style={s.dateBadge}>
                    <Text style={s.dateDay}>{item.day}</Text>
                    <Text style={s.dateMon}>{item.month}</Text>
                  </View>
                </View>
                <View style={s.featBody}>
                  <View style={s.featTitleRow}>
                    <Text style={s.featTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={s.locPill}>
                      <FontAwesome name="map-marker" size={11} color={brand.primary} />
                      <Text style={s.locPillText}>{item.location}</Text>
                    </View>
                  </View>
                  <Text style={s.featTime}>{item.time}</Text>
                  <View style={s.featFooter}>
                    <Avatars count={item.attendeesCount} />
                    <LinearGradient colors={[brand.primaryLight, brand.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.joinBtn}>
                      <Text style={s.joinBtnText}>Daftar</Text>
                    </LinearGradient>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* ── SECTION: AKAN DATANG ── */}
          <View style={[s.sectionRow, { marginTop: 28 }]}>
            <Text style={s.sectionLabel}>Akan Datang</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={s.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <View style={s.grid}>
            {upcoming.map(ev => (
              <TouchableOpacity key={ev.id} style={s.gridCard} activeOpacity={0.9} onPress={() => setSelectedEvent(ev)}>
                <View style={s.gridImgWrap}>
                  <Image source={ev.imageSource} style={s.gridImg} />
                  <View style={s.dateBadgeSm}>
                    <Text style={s.dateDaySm}>{ev.day}</Text>
                    <Text style={s.dateMonSm}>{ev.month}</Text>
                  </View>
                </View>
                <View style={s.gridBody}>
                  <Text style={s.gridTitle} numberOfLines={1}>{ev.title}</Text>
                  <Text style={s.gridTime}>{ev.time}</Text>
                  <View style={s.locPillSm}>
                    <FontAwesome name="map-marker" size={10} color={brand.primary} />
                    <Text style={s.locPillSmText}>{ev.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>

      {/* ── MODAL ── */}
      {/* ── MODAL DETAIL EVENT ── */}
      <Modal visible={!!selectedEvent} transparent animationType="slide" onRequestClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <View style={s.modalBg}>
            <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setSelectedEvent(null)} />

            {/* CONTENT SHEET */}
            <View style={s.detailSheet}>
              <View style={s.modalHandle} />
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                
                <View style={[s.detailCatTag, { backgroundColor: getCategoryBgColor(selectedEvent.category) }]}>
                  <Text style={[s.detailCatText, { color: getCategoryTextColor(selectedEvent.category) }]}>{selectedEvent.category}</Text>
                </View>

                <Text style={s.detailTitle}>{selectedEvent.title}</Text>
                
                <View style={s.detailLocRow}>
                  <FontAwesome name="map-marker" size={14} color={brand.primary} />
                  <Text style={s.detailLocText}>{selectedEvent.location}</Text>
                  <FontAwesome name="clock-o" size={14} color={brand.primary} style={{ marginLeft: 16 }} />
                  <Text style={s.detailLocText}>{selectedEvent.day} {selectedEvent.month} - {selectedEvent.time}</Text>
                </View>

                <View style={s.detailAvRow}>
                  <Avatars count={selectedEvent.attendeesCount} />
                  <Text style={s.detailAvInvite}>{selectedEvent.quotaMax - selectedEvent.attendeesCount}/{selectedEvent.quotaMax} Tersedia</Text>
                </View>

                <Text style={s.detailSectionTitle}>Tentang Event</Text>
                <Text style={s.detailDesc}>
                  Bergabunglah bersama kami dalam acara peduli lingkungan ini. Mari berkontribusi untuk mengurangi limbah dan menghijaukan kembali bumi kita. Dapatkan poin ekstra dan jadilah bagian dari perubahan positif!
                </Text>

                <Text style={s.detailSectionTitle}>Alamat</Text>
                <View style={s.addressRow}>
                  <Text style={s.addressText}>{selectedEvent.fullAddress}</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={s.mapLink}>Lihat di Map</Text>
                  </TouchableOpacity>
                </View>

                <Text style={s.detailSectionTitle}>Penyelenggara</Text>
                <View style={s.orgRow}>
                  <View style={s.orgAvWrap}>
                    <Image source={images.icon} style={s.orgAv} />
                  </View>
                  <View style={s.orgInfo}>
                    <Text style={s.orgName}>EterniFlora Team</Text>
                    <Text style={s.orgRole}>Organize Team</Text>
                  </View>
                  <View style={s.orgActionBtn}><FontAwesome name="whatsapp" size={16} color={brand.primary} /></View>
                  <View style={s.orgActionBtn}><FontAwesome name="instagram" size={16} color={brand.primary} /></View>
                </View>
              </ScrollView>

              {/* FOOTER */}
              <View style={s.detailFooter}>
                <View style={s.footerPriceCol}>
                  <Text style={s.footerPriceLabel}>Reward Points</Text>
                  <Text style={s.footerPriceVal}>+{selectedEvent.rewardPoints} Pts</Text>
                </View>
                <TouchableOpacity style={s.bookBtn} activeOpacity={0.8} onPress={handleRegisterEvent}>
                  <Text style={s.bookBtnText}>Daftar Sekarang</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* SUCCESS OVERLAY */}
            {showSuccessOverlay && (
              <Animated.View style={[s.successOverlay, { opacity: opacityAnim }]}>
                <Animated.View style={[s.successPopup, { transform: [{ scale: scaleAnim }, { translateY: floatAnim }] }]}>
                  <View style={s.successIconCircle}>
                    <FontAwesome name="check" size={32} color={brand.white} />
                  </View>
                  <Text style={s.successTitle}>Pendaftaran Sukses!</Text>
                  <Text style={s.successSubtitle}>Kehadiran Anda telah terkonfirmasi. Bersiaplah untuk aksi nyata menyelamatkan bumi bersama kami.</Text>
                  
                  <View style={s.successBadge}>
                    <FontAwesome name="calendar-check-o" size={12} color={brand.primaryDark} />
                    <Text style={s.successBadgeText}>Tiket Elektronik Tersimpan</Text>
                  </View>
                </Animated.View>
              </Animated.View>
            )}
          </View>
        )}
      </Modal>
    </View>
  );
}

/* ── AVATAR COMPONENT ── */
function Avatars({ count }: { count: number }) {
  const uris = [
    'https://i.pravatar.cc/100?img=11',
    'https://i.pravatar.cc/100?img=32',
    'https://i.pravatar.cc/100?img=47',
  ];
  return (
    <View style={s.avRow}>
      {uris.map((uri, i) => (
        <Image key={i} source={{ uri }} style={[s.av, { marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }]} />
      ))}
      <Text style={s.avText}>+{count} Hadir</Text>
    </View>
  );
}

/* ── STYLES ── */
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: brand.background },

  // Header — matches Home
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HP,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: brand.white,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24,
    color: brand.primaryDark, textAlign: 'center', flex: 1, marginHorizontal: 16,
  },

  // Section headers
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: HP, marginBottom: 14,
  },
  sectionLabel: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: brand.textPrimary },
  locBadge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  locText: { fontFamily: 'Lato_400Regular', fontSize: 13, color: brand.primary },
  seeAll: { fontFamily: 'Lato_700Bold', fontSize: 13, color: brand.primary },

  // Featured card
  featCard: {
    width: FEAT_W,
    backgroundColor: brand.white,
    borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(30,10,60,0.05)',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.05, shadowRadius: 14,
    elevation: 4,
  },
  featImgWrap: {
    height: 150, width: '100%',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  featImg: { width: '100%', height: '100%' },
  dateBadge: {
    position: 'absolute', top: 12, left: 12,
    backgroundColor: brand.white, borderRadius: 10,
    width: 48, height: 52,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6,
    elevation: 3,
  },
  dateDay: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 18, color: brand.primary, includeFontPadding: false },
  dateMon: { fontFamily: 'Lato_700Bold', fontSize: 10, color: brand.primary, marginTop: 1, includeFontPadding: false },

  featBody: { padding: 16 },
  featTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  featTitle: { fontFamily: 'Lato_700Bold', fontSize: 16, color: brand.textPrimary, flex: 1, marginRight: 10 },
  locPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: 'rgba(124,58,237,0.15)',
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6,
  },
  locPillText: { fontFamily: 'Lato_700Bold', fontSize: 11, color: brand.primary },
  featTime: { fontFamily: 'Lato_400Regular', fontSize: 12, color: brand.textSecondary, marginBottom: 12 },
  featFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  joinBtn: { paddingHorizontal: 20, paddingVertical: 9, borderRadius: 18 },
  joinBtnText: { fontFamily: 'Lato_700Bold', fontSize: 13, color: brand.white },

  // Avatars
  avRow: { flexDirection: 'row', alignItems: 'center' },
  av: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: brand.white },
  avText: { fontFamily: 'Lato_400Regular', fontSize: 11, color: brand.primary, marginLeft: 6 },

  // Grid (Upcoming)
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: HP, justifyContent: 'space-between',
  },
  gridCard: {
    width: GRID_W,
    backgroundColor: brand.white, borderRadius: 18,
    borderWidth: 1, borderColor: 'rgba(30,10,60,0.05)',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 10,
    elevation: 2,
  },
  gridImgWrap: {
    height: 100, width: '100%',
    borderTopLeftRadius: 18, borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  gridImg: { width: '100%', height: '100%' },
  dateBadgeSm: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: brand.white, borderRadius: 8,
    width: 36, height: 40,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
    elevation: 3,
  },
  dateDaySm: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 14, color: brand.primary, includeFontPadding: false },
  dateMonSm: { fontFamily: 'Lato_700Bold', fontSize: 8, color: brand.primary, marginTop: 1, includeFontPadding: false },
  gridBody: { padding: 12 },
  gridTitle: { fontFamily: 'Lato_700Bold', fontSize: 13, color: brand.textPrimary, marginBottom: 3 },
  gridTime: { fontFamily: 'Lato_400Regular', fontSize: 11, color: brand.textSecondary, marginBottom: 8 },
  locPillSm: {
    flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: 'rgba(124,58,237,0.15)',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  locPillSmText: { fontFamily: 'Lato_700Bold', fontSize: 9, color: brand.primary },

  // Modal
  // Modal Detail Bottom Sheet
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  detailSheet: {
    backgroundColor: brand.white,
    height: height * 0.7,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    paddingHorizontal: 24, paddingTop: 16,
  },
  modalHandle: { width: 44, height: 5, backgroundColor: brand.border, borderRadius: 3, alignSelf: 'center', marginBottom: 24 },
  
  detailCatTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 114, 94, 0.1)', // Subtle primary orange
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16,
  },
  detailCatText: { fontFamily: 'Lato_700Bold', fontSize: 12, color: brand.primary },
  
  detailTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 26, color: brand.primaryDark, marginBottom: 16, lineHeight: 34 },
  
  detailLocRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  detailLocText: { fontFamily: 'Lato_400Regular', fontSize: 13, color: brand.textSecondary, marginLeft: 6 },
  
  detailAvRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: brand.border },
  detailAvInvite: { fontFamily: 'Lato_700Bold', fontSize: 13, color: brand.primary },
  
  detailSectionTitle: { fontFamily: 'Lato_700Bold', fontSize: 16, color: brand.primaryDark, marginBottom: 12 },
  detailDesc: { fontFamily: 'Lato_400Regular', fontSize: 14, color: brand.textSecondary, lineHeight: 22, marginBottom: 32 },
  
  addressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
  addressText: { fontFamily: 'Lato_400Regular', fontSize: 13, color: brand.textSecondary, flex: 1, marginRight: 16, lineHeight: 20 },
  mapLink: { fontFamily: 'Lato_700Bold', fontSize: 13, color: brand.primary, textDecorationLine: 'underline' },
  
  orgRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  orgAvWrap: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255, 114, 94, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  orgAv: { width: 50, height: 50, borderRadius: 25 },
  orgInfo: { flex: 1 },
  orgName: { fontFamily: 'Lato_700Bold', fontSize: 15, color: brand.primaryDark, marginBottom: 4 },
  orgRole: { fontFamily: 'Lato_400Regular', fontSize: 13, color: brand.textSecondary },
  orgActionBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 114, 94, 0.1)',
    justifyContent: 'center', alignItems: 'center', marginLeft: 12,
  },
  
  detailFooter: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: brand.white,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 32, // for safe area
    borderTopWidth: 1, borderTopColor: brand.border,
  },
  footerPriceCol: { flex: 1 },
  footerPriceLabel: { fontFamily: 'Lato_400Regular', fontSize: 12, color: brand.textSecondary, marginBottom: 4 },
  footerPriceVal: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: brand.primaryDark },
  bookBtn: {
    backgroundColor: brand.primary,
    paddingHorizontal: 32, paddingVertical: 16, borderRadius: 25,
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  bookBtnText: { fontFamily: 'Lato_700Bold', fontSize: 16, color: brand.white },
  
  // SUCCESS POPUP STYLES
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 10, 60, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  successPopup: {
    width: '80%',
    backgroundColor: brand.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: brand.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20,
    shadowColor: brand.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  successTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: brand.primaryDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F6FC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  successBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    color: brand.primaryDark,
    marginLeft: 6,
  },
});
