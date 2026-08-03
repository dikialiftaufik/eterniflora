import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { brand } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useEcoStore } from '@/store/useEcoStore';

export default function ProfileScreen() {
  const { balance, totalBottles } = useEcoStore();
  return (
    <View className="flex-1 bg-brand-background">
      {/* SOFT BACKGROUND GRADIENT */}
      <LinearGradient
        colors={['rgba(124, 58, 237, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={StyleSheet.absoluteFillObject}
        end={{ x: 0, y: 0.4 }}
      />
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView contentContainerClassName="p-6 pb-32" showsVerticalScrollIndicator={false}>
        
        {/* App Bar (56px Height per UI Rules) */}
        <View className="h-[56px] flex-row items-center justify-between mb-8 mt-2">
          {/* Back Button (48px Touch Target - Fitts's Law) */}
          <TouchableOpacity 
            className="w-[48px] h-[48px] rounded-full justify-center items-center bg-brand-white border border-brand-primaryDark/5 shadow-sm shadow-brand-primaryDark/5"
            activeOpacity={0.7}
          >
            <FontAwesome name="chevron-left" size={16} color={brand.textPrimary} style={{ marginRight: 2 }} />
          </TouchableOpacity>
          
          {/* Heading 2 (24px, Center Aligned per Typography Rules) */}
          <Text className="font-playfair text-[24px] leading-[34px] text-brand-primaryDark text-center flex-1 mx-4">
            Profil
          </Text>

          {/* Settings Button (48px Touch Target) */}
          <TouchableOpacity 
            className="w-[48px] h-[48px] rounded-full justify-center items-center bg-brand-white border border-brand-primaryDark/5 shadow-sm shadow-brand-primaryDark/5"
            activeOpacity={0.7}
          >
            <FontAwesome name="cog" size={18} color={brand.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* User Identity Card */}
        <View className="bg-brand-white rounded-[20px] p-5 flex-row items-center border border-brand-primaryDark/5 mb-6">
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
            className="w-[64px] h-[64px] rounded-full mr-4"
          />
          <View className="flex-1">
            {/* Text 1: 16px, Line H 26px */}
            <Text className="font-latoBold text-[16px] leading-[26px] text-brand-textPrimary">Diki Alif</Text>
            {/* Text 2: 14px, Line H 24px */}
            <Text className="font-lato text-[14px] leading-[24px] text-brand-textSecondary">dikialif@example.com</Text>
          </View>
          {/* 48px Touch Target */}
          <TouchableOpacity 
            className="w-[48px] h-[48px] bg-brand-background rounded-full justify-center items-center"
            activeOpacity={0.7}
          >
            <FontAwesome name="pencil" size={18} color={brand.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Eco Points Dashboard (Dark Eco Wallet Card) - FIXED */}
        <View style={{ shadowColor: brand.ecoGreenDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8, marginBottom: 24 }}>
          <View 
            className="rounded-[24px] px-6 py-8 overflow-hidden" 
            style={{ backgroundColor: brand.ecoGreenDark }}
          >
            {/* Background Watermark */}
            <FontAwesome 
              name="recycle" 
              size={180} 
              color="#FFFFFF" 
              style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.05 }} 
            />

            {/* Header Row */}
            <View className="flex-row justify-between items-center mb-10">
              {/* Text 4: 10px, Line H 18px */}
              <Text className="font-latoBold text-[10px] leading-[18px] uppercase tracking-wider flex-1 mr-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Eterniflora Digital Eco-Wallet
              </Text>
              
              {/* Badge */}
              <View className="px-3 py-1.5 rounded-full flex-row items-center border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Text className="font-latoBold text-[10px] leading-[18px] uppercase tracking-wider" style={{ color: brand.white }}>
                  Gold Tier Hero
                </Text>
              </View>
            </View>

            {/* Main Points Area */}
            <View className="flex-row items-center mb-10">
              <Text className="font-playfair text-[48px] leading-[56px] mr-3" style={{ color: brand.white }}>
                {balance.toLocaleString('id-ID')}
              </Text>
              <Text className="font-lato text-[16px] leading-[26px]" style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: 12 }}>Eco Points</Text>
            </View>

            {/* Divider */}
            <View className="h-[1px] mb-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

            {/* Bottom Stats */}
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="font-latoBold text-[10px] leading-[18px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Setoran Botol
                </Text>
                <Text className="font-latoBold text-[16px] leading-[26px]" style={{ color: brand.white }}>
                  {totalBottles} Botol PET
                </Text>
              </View>
              <View className="flex-1 items-end">
                <Text className="font-latoBold text-[10px] leading-[18px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Diskon Diklaim
                </Text>
                <Text className="font-latoBold text-[16px] leading-[26px]" style={{ color: brand.white }}>
                  Rp50.000
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Primary CTA (Fitts's Law) */}
        <TouchableOpacity 
          className="bg-brand-primaryDark h-[52px] rounded-full flex-row justify-center items-center shadow-sm shadow-brand-primaryDark/20 mb-8"
          activeOpacity={0.8}
        >
          {/* Text 1: 16px, Line H 26px */}
          <Text className="font-latoBold text-[16px] leading-[26px] text-white mr-2">Tukarkan Poin dengan Voucher</Text>
          <FontAwesome name="ticket" size={16} color={brand.white} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
    </View>
  );
}
