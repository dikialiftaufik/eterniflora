import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { brand } from '@/constants/Colors';
import { ecoEvents, EcoEvent } from '@/data/events';

const { width } = Dimensions.get('window');
const CONTENT_PADDING = 24;
// Calculate width for 2 cards in a row with a 16px gap
const SMALL_CARD_WIDTH = (width - (CONTENT_PADDING * 2) - 16) / 2;

export default function EventsScreen() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<EcoEvent | null>(null);

  const featuredEvents = ecoEvents.filter(e => e.isFeatured);
  const upcomingEvents = ecoEvents.filter(e => !e.isFeatured);

  const renderAvatars = (count: number) => {
    // Generate 3 fake overlapping avatars
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
    ];

    return (
      <View style={styles.avatarsRow}>
        {avatars.map((uri, i) => (
          <Image 
            key={i} 
            source={{ uri }} 
            style={[styles.avatar, { left: i * -12, zIndex: 3 - i }]} 
          />
        ))}
        <Text style={[styles.attendeesText, { marginLeft: avatars.length * -12 + 24 }]}>
          +{count} Hadir
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* App Bar (Soft Gradient) */}
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.08)', 'rgba(249, 250, 251, 1)']}
        style={styles.appBarGradient}
      >
        <SafeAreaView edges={['top']} />
        <View style={styles.appBarContent}>
          <TouchableOpacity 
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.push('/')}
          >
            <FontAwesome name="angle-left" size={24} color={brand.textPrimary} style={{ marginLeft: -2 }} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Events</Text>
          <View style={{ width: 44 }} />
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Terdekat Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Terdekat</Text>
          <View style={styles.locationBadge}>
            <FontAwesome name="map-marker" size={14} color={brand.primary} />
            <Text style={styles.locationText}>Bandung</Text>
            <FontAwesome name="angle-right" size={14} color={brand.primary} />
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.horizontalScrollPadding}
          snapToInterval={width * 0.85 + 20}
          decelerationRate="fast"
        >
          {featuredEvents.map((event) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.largeCard}
              activeOpacity={0.9}
              onPress={() => setSelectedEvent(event)}
            >
              {/* Image Section */}
              <View style={styles.largeCardImageContainer}>
                <Image source={{ uri: event.imageUrl }} style={styles.largeImage} />
                
                {/* Floating Date Badge */}
                <View style={styles.floatingDateBadge}>
                  <Text style={styles.dateDay}>{event.day}</Text>
                  <Text style={styles.dateMonth}>{event.month}</Text>
                </View>
              </View>

              {/* Content Section */}
              <View style={styles.largeCardContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{event.title}</Text>
                  <View style={styles.cardLocationPill}>
                    <FontAwesome name="map-marker" size={12} color={brand.primary} />
                    <Text style={styles.cardLocationText}>{event.location}</Text>
                  </View>
                </View>

                <Text style={styles.cardTime}>{event.time}</Text>
                
                <View style={styles.cardFooter}>
                  {renderAvatars(event.attendeesCount)}
                  
                  {/* Join Button */}
                  <LinearGradient
                    colors={[brand.primaryLight, brand.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.joinButton}
                  >
                    <Text style={styles.joinButtonText}>Daftar</Text>
                  </LinearGradient>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Akan Datang Section */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>Akan Datang</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {upcomingEvents.map((event) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.mediumCard}
              activeOpacity={0.9}
              onPress={() => setSelectedEvent(event)}
            >
              <View style={styles.mediumCardImageContainer}>
                <Image source={{ uri: event.imageUrl }} style={styles.mediumImage} />
                
                <View style={styles.floatingDateBadgeSmall}>
                  <Text style={styles.dateDaySmall}>{event.day}</Text>
                  <Text style={styles.dateMonthSmall}>{event.month}</Text>
                </View>
              </View>

              <View style={styles.mediumCardContent}>
                <Text style={styles.cardTitleSmall} numberOfLines={1}>{event.title}</Text>
                <Text style={styles.cardTimeSmall}>{event.time}</Text>

                <View style={styles.cardFooterSmall}>
                  <View style={styles.smallLocationPill}>
                    <FontAwesome name="map-marker" size={10} color={brand.primary} />
                    <Text style={styles.cardLocationTextSmall}>{event.location}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Registration Modal */}
      <Modal
        visible={!!selectedEvent}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedEvent(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />
            
            <Text style={styles.modalTitle}>Konfirmasi Pendaftaran</Text>
            
            <Text style={styles.modalSubtitle}>
              Dengan mengikuti aksi "{selectedEvent?.title}", Anda berpotensi mendapatkan <Text style={{ fontFamily: 'Lato_700Bold', color: brand.ecoGreen }}>+{selectedEvent?.rewardPoints} Eco Points</Text>.
            </Text>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={() => setSelectedEvent(null)}
            >
              <Text style={styles.submitButtonText}>Simulasikan Kehadiran</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setSelectedEvent(null)}
            >
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
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
  appBarGradient: {
    paddingBottom: 4,
  },
  appBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CONTENT_PADDING,
    height: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  appBarTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 22,
    color: brand.textPrimary,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 120, // Tab bar space
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CONTENT_PADDING,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: brand.textPrimary,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: brand.primary,
  },
  seeAllText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: brand.primary,
  },
  horizontalScrollPadding: {
    paddingHorizontal: CONTENT_PADDING,
    gap: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: CONTENT_PADDING,
    justifyContent: 'space-between',
    rowGap: 16,
  },
  // Large Card (Featured)
  largeCard: {
    width: width * 0.85,
    backgroundColor: brand.white,
    borderRadius: 28,
    overflow: 'visible', // For shadows
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 10,
  },
  largeCardImageContainer: {
    height: 180,
    width: '100%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  largeImage: {
    width: '100%',
    height: '100%',
  },
  floatingDateBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: brand.white,
    borderRadius: 12,
    width: 54,
    height: 60,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dateDay: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20, // Adjusted for perfect centering
    color: brand.primary,
    includeFontPadding: false, // Helps with vertical symmetry
  },
  dateMonth: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11, // Adjusted
    color: brand.primary,
    marginTop: 2,
    includeFontPadding: false,
  },
  largeCardContent: {
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    color: brand.textPrimary,
    flex: 1,
    marginRight: 12,
  },
  cardLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.white,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  cardLocationText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: brand.primary,
  },
  cardTime: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: brand.textSecondary,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: brand.white,
  },
  attendeesText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: brand.primary,
  },
  joinButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.white,
  },
  // Medium Card (Upcoming - Grid)
  mediumCard: {
    width: SMALL_CARD_WIDTH,
    backgroundColor: brand.white,
    borderRadius: 24,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 4,
  },
  mediumCardImageContainer: {
    height: 110, // Slightly shorter to fit well in grid
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  mediumImage: {
    width: '100%',
    height: '100%',
  },
  floatingDateBadgeSmall: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: brand.white,
    borderRadius: 8,
    width: 38,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dateDaySmall: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 15,
    color: brand.primary,
    includeFontPadding: false,
  },
  dateMonthSmall: {
    fontFamily: 'Lato_700Bold',
    fontSize: 8,
    color: brand.primary,
    marginTop: 1,
    includeFontPadding: false,
  },
  mediumCardContent: {
    padding: 14,
  },
  cardTitleSmall: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.textPrimary,
    marginBottom: 4,
  },
  cardTimeSmall: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: brand.textSecondary,
    marginBottom: 12,
  },
  cardFooterSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.white,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  cardLocationTextSmall: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: brand.primary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: brand.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  dragHandle: {
    width: 48,
    height: 6,
    backgroundColor: brand.border,
    borderRadius: 3,
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: brand.deepPurple,
    marginBottom: 12,
  },
  modalSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: brand.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: brand.primary,
    width: '100%',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.white,
  },
  cancelButton: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.textSecondary,
  }
});
