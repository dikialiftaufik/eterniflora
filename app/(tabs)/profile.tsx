import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { brand } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useEcoStore } from '@/store/useEcoStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { balance, totalBottles } = useEcoStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* SOFT BACKGROUND GRADIENT — identical to Home */}
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={StyleSheet.absoluteFillObject}
        end={{ x: 0, y: 0.4 }}
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* HEADER — identical structure to Home */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton} 
            activeOpacity={0.7}
            onPress={() => router.push('/')}
          >
            <FontAwesome name="chevron-left" size={16} color={brand.textPrimary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Profil</Text>

          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <FontAwesome name="cog" size={20} color={brand.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* User Identity Card — compact version */}
          <View style={styles.userCard}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>DA</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Diki Alif</Text>
              <Text style={styles.userEmail}>dikialif@example.com</Text>
            </View>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
              <FontAwesome name="pencil" size={16} color={brand.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Eco Points Dashboard */}
          <View style={styles.walletShadow}>
            <View style={styles.walletCard}>
              {/* Background Watermark */}
              <FontAwesome 
                name="recycle" 
                size={180} 
                color="#FFFFFF" 
                style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.05 }} 
              />

              {/* Header Row */}
              <View style={styles.walletHeader}>
                <Text style={styles.walletLabel}>Eterniflora Digital Eco-Wallet</Text>
                <View style={styles.walletBadge}>
                  <Text style={styles.walletBadgeText}>Gold Tier Hero</Text>
                </View>
              </View>

              {/* Main Points Area */}
              <View style={styles.walletPoints}>
                <Text style={styles.walletPointsNumber}>{balance.toLocaleString('id-ID')}</Text>
                <Text style={styles.walletPointsLabel}>Eco Points</Text>
              </View>

              {/* Divider */}
              <View style={styles.walletDivider} />

              {/* Bottom Stats */}
              <View style={styles.walletStats}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.walletStatLabel}>Setoran Botol</Text>
                  <Text style={styles.walletStatValue}>{totalBottles} Botol PET</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.walletStatLabel}>Diskon Diklaim</Text>
                  <Text style={styles.walletStatValue}>Rp50.000</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <Text style={styles.ctaButtonText}>Tukarkan Poin dengan Voucher</Text>
            <FontAwesome name="ticket" size={16} color={brand.white} />
          </TouchableOpacity>

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
  // Header — matches Home exactly
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: brand.primaryDark,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 16,
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  // User Identity Card — compact
  userCard: {
    backgroundColor: brand.white,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(30, 10, 60, 0.05)',
    marginBottom: 24,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  userAvatarText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: brand.textSecondary,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: brand.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Wallet Card
  walletShadow: {
    shadowColor: brand.ecoGreenDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
  },
  walletCard: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    overflow: 'hidden',
    backgroundColor: brand.ecoGreenDark,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  walletLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    flex: 1,
    marginRight: 16,
  },
  walletBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  walletBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: brand.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  walletPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  walletPointsNumber: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    color: brand.white,
    marginRight: 12,
  },
  walletPointsLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 12,
  },
  walletDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 24,
  },
  walletStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletStatLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  walletStatValue: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.white,
  },
  // CTA Button
  ctaButton: {
    backgroundColor: brand.primaryDark,
    height: 52,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 32,
  },
  ctaButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: brand.white,
  },
});
