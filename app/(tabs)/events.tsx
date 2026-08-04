import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';
import { ecoEvents, EcoEvent } from '@/data/events';

const { width } = Dimensions.get('window');
const HP = 24; // Horizontal Padding (consistent with Home)
const GAP = 14;
const FEAT_W = width * 0.78; // 78% — leaves a peek of the next card
const GRID_W = (width - HP * 2 - GAP) / 2; // 2-col grid

export default function EventsScreen() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<EcoEvent | null>(null);

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
                  <Image source={{ uri: item.imageUrl }} style={s.featImg} />
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
                  <Image source={{ uri: ev.imageUrl }} style={s.gridImg} />
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
      <Modal visible={!!selectedEvent} transparent animationType="slide" onRequestClose={() => setSelectedEvent(null)}>
        <View style={s.modalBg}>
          <View style={s.modalSheet}>
            <View style={s.modalHandle} />
            <Text style={s.modalTitle}>Konfirmasi Pendaftaran</Text>
            <Text style={s.modalSub}>
              Dengan mengikuti aksi "{selectedEvent?.title}", Anda berpotensi mendapatkan{' '}
              <Text style={{ fontFamily: 'Lato_700Bold', color: brand.ecoGreen }}>+{selectedEvent?.rewardPoints} Eco Points</Text>.
            </Text>
            <TouchableOpacity style={s.modalPrimary} onPress={() => setSelectedEvent(null)}>
              <Text style={s.modalPrimaryText}>Simulasikan Kehadiran</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.modalSecondary} onPress={() => setSelectedEvent(null)}>
              <Text style={s.modalSecondaryText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: brand.white, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: HP, paddingBottom: 48, alignItems: 'center',
  },
  modalHandle: { width: 44, height: 5, backgroundColor: brand.border, borderRadius: 3, marginBottom: 20 },
  modalTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 20, color: brand.deepPurple, marginBottom: 10 },
  modalSub: { fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 22, color: brand.textSecondary, textAlign: 'center', marginBottom: 28 },
  modalPrimary: {
    backgroundColor: brand.primary, width: '100%', height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  modalPrimaryText: { fontFamily: 'Lato_700Bold', fontSize: 15, color: brand.white },
  modalSecondary: { width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' },
  modalSecondaryText: { fontFamily: 'Lato_700Bold', fontSize: 15, color: brand.textSecondary },
});
