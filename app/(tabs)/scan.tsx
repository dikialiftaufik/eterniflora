import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Animated, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { brand } from '@/constants/Colors';
import { useEcoStore } from '@/store/useEcoStore';

// Reusable Animated Button for Micro-Animations
const AnimatedPressable = ({ onPress, children, style, className }: any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 12,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      className={className}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [bottles, setBottles] = useState(1);
  const [hasScanned, setHasScanned] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  const addDeposit = useEcoStore((state) => state.addDeposit);
  const pointsEarned = bottles * 10;

  // Ask for permission automatically
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  // Scanner Line Animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanLineAnim]);

  const handleSuccess = (data: string) => {
    if (hasScanned) return;
    setHasScanned(true);
    
    addDeposit(bottles, pointsEarned);

    Alert.alert(
      "Setoran Berhasil! 🌿",
      `Simulator mendeteksi QR: ${data}\nAnda menyetor ${bottles} botol dan mendapatkan ${pointsEarned} Eco Points.`,
      [{ 
        text: "Lanjutkan", 
        onPress: () => {
          setBottles(1);
          setTimeout(() => setHasScanned(false), 2000); 
        }
      }]
    );
  };

  const handleBarcodeScanned = ({ type, data }: { type: string, data: string }) => {
    handleSuccess(data);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      // Mocking successful scan from image for hackathon
      handleSuccess("MOCKED_QR_FROM_GALLERY");
    }
  };

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-brand-background justify-center items-center p-6">
        <FontAwesome name="camera" size={64} color={brand.primaryDark} style={{ marginBottom: 24 }} />
        <Text className="font-playfair text-[24px] leading-[34px] text-brand-primaryDark text-center mb-4">
          Akses Kamera Diperlukan
        </Text>
        <Text className="font-lato text-[16px] leading-[26px] text-brand-textSecondary text-center mb-8">
          Kami membutuhkan akses kamera agar Anda dapat memindai QR Code di mesin bank sampah fisik kami.
        </Text>
        <TouchableOpacity 
          className="bg-brand-primaryDark h-[52px] rounded-full flex-row justify-center items-center px-8"
          onPress={requestPermission}
        >
          <Text className="font-latoBold text-[16px] leading-[26px] text-white">Izinkan Kamera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={isTorchOn}
        onBarcodeScanned={hasScanned ? undefined : handleBarcodeScanned}
      />
      
      {/* Overlay Content */}
      <SafeAreaView className="flex-1 justify-between" edges={['top', 'bottom']}>
        
        {/* Top Navigation Bar */}
        <View className="px-6 py-4 flex-row justify-between items-center z-50">
          {/* Back Button */}
          <AnimatedPressable onPress={() => router.push('/')}>
            <View className="w-12 h-12 rounded-full justify-center items-center" style={{ backgroundColor: 'rgba(30, 10, 60, 0.6)' }}>
              <FontAwesome name="angle-left" size={24} color="#FFF" style={{ marginLeft: -2 }} />
            </View>
          </AnimatedPressable>

          {/* Right Tools (Gallery & Flash) */}
          <View className="flex-row items-center">
            {/* Gallery Button */}
            <AnimatedPressable onPress={pickImage}>
              <View className="w-12 h-12 rounded-full justify-center items-center mr-4" style={{ backgroundColor: 'rgba(30, 10, 60, 0.6)' }}>
                <FontAwesome name="image" size={18} color="#FFF" />
              </View>
            </AnimatedPressable>

            {/* Flash Button */}
            <AnimatedPressable onPress={() => setIsTorchOn(!isTorchOn)}>
              <View className="w-12 h-12 rounded-full justify-center items-center" style={{ backgroundColor: isTorchOn ? brand.primary : 'rgba(30, 10, 60, 0.6)' }}>
                <FontAwesome name="flash" size={18} color="#FFF" />
              </View>
            </AnimatedPressable>
          </View>
        </View>

        {/* Viewfinder Target */}
        <View className="flex-1 justify-center items-center pointer-events-none pb-10">
          <View className="mb-6 px-6 py-2.5 rounded-full" style={{ backgroundColor: 'rgba(30, 10, 60, 0.75)' }}>
            <Text className="font-latoBold text-[14px] text-white tracking-wide">Arahkan ke QR Code Mesin</Text>
          </View>
          
          <View className="w-64 h-64 justify-center items-center overflow-hidden">
            {/* Custom Corner Brackets (Vivid Purple) */}
            <View style={{ position: 'absolute', top: 0, left: 0, width: 48, height: 48, borderTopWidth: 4, borderLeftWidth: 4, borderColor: brand.primary, borderTopLeftRadius: 24 }} />
            <View style={{ position: 'absolute', top: 0, right: 0, width: 48, height: 48, borderTopWidth: 4, borderRightWidth: 4, borderColor: brand.primary, borderTopRightRadius: 24 }} />
            <View style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 48, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: brand.primary, borderBottomLeftRadius: 24 }} />
            <View style={{ position: 'absolute', bottom: 0, right: 0, width: 48, height: 48, borderBottomWidth: 4, borderRightWidth: 4, borderColor: brand.primary, borderBottomRightRadius: 24 }} />

            {/* Faint Solid Inner Border */}
            <View style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 24 }} />

            {/* Subtle Identity Reticle */}
            <FontAwesome name="leaf" size={32} color="rgba(255,255,255,0.15)" style={{ position: 'absolute' }} />

            {/* Animated Scan Line (Vivid Purple) */}
            <Animated.View style={{
              width: '100%',
              height: 2,
              backgroundColor: brand.primary,
              position: 'absolute',
              top: 0,
              transform: [{ translateY: scanLineAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 252] }) }],
              shadowColor: brand.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5,
            }} />
          </View>
        </View>

        {/* Bottom Interactive Sheet (Industry Standard) */}
        <View 
          className="rounded-t-[40px] px-6 pt-6"
          style={{ 
            backgroundColor: brand.background, 
            shadowColor: '#000', shadowOffset: { width: 0, height: -8 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 20,
            paddingBottom: 120 // Prevents bottom navbar collision
          }}
        >
          {/* Drag Handle */}
          <View className="items-center mb-6">
            <View className="w-12 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }} />
          </View>

          {/* Premium Input Card */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm" style={{ borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.05)' }}>
            
            {/* Input Row */}
            <View className="flex-row justify-between items-center mb-5">
               <View>
                 <Text className="font-playfair text-[18px]" style={{ color: brand.deepPurple }}>Jumlah Botol</Text>
                 <Text className="font-lato text-[13px] text-brand-textSecondary mt-0.5">Plastik PET (Simulator)</Text>
               </View>

               {/* Standardized Counter (Soft Purple Style) */}
               <View className="flex-row items-center rounded-full p-1" style={{ backgroundColor: brand.background, borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.05)' }}>
                 <AnimatedPressable onPress={() => setBottles(Math.max(1, bottles - 1))}>
                   <View className="w-[40px] h-[40px] rounded-full justify-center items-center shadow-sm" style={{ backgroundColor: 'rgba(124, 58, 237, 0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' }}>
                     <FontAwesome name="minus" size={14} color={brand.primaryDark} />
                   </View>
                 </AnimatedPressable>
                 
                 <View className="w-[48px] items-center justify-center">
                   <Text className="font-playfair text-[20px]" style={{ color: brand.deepPurple }}>{bottles}</Text>
                 </View>

                 <AnimatedPressable onPress={() => setBottles(Math.min(100, bottles + 1))}>
                   <View className="w-[40px] h-[40px] rounded-full justify-center items-center shadow-sm" style={{ backgroundColor: 'rgba(124, 58, 237, 0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' }}>
                     <FontAwesome name="plus" size={14} color={brand.primaryDark} />
                   </View>
                 </AnimatedPressable>
               </View>
            </View>

            {/* Divider (Soft Purple) */}
            <View style={{ height: 1, backgroundColor: 'rgba(124, 58, 237, 0.1)', marginBottom: 16 }} />

            {/* Clear Points Indicator */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                 <View className="w-8 h-8 rounded-full justify-center items-center mr-3" style={{ backgroundColor: 'rgba(20, 83, 45, 0.1)' }}>
                   <FontAwesome name="leaf" size={14} color={brand.ecoGreenDark} />
                 </View>
                 <Text className="font-lato text-[14px] text-brand-textPrimary">Total Potensi Poin</Text>
              </View>
              <Text className="font-latoBold text-[16px]" style={{ color: brand.ecoGreenDark }}>
                +{pointsEarned} Poin
              </Text>
            </View>

          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}
