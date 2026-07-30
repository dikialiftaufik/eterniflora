import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { brand } from '@/constants/Colors';
import { images } from '@/constants/images';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) return;

    setIsLoading(true);
    
    // Simulate API call for prototype
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      
      // Auto redirect to login after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        router.replace('/(auth)/login');
      }, 2000);
    }, 1500);
  };

  const handleLoginLink = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Multi-layer gradient background */}
      <LinearGradient
        colors={['#F3E8FF', '#EDE9FE', '#F5F3F0', '#F5F3F0']}
        locations={[0, 0.25, 0.6, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative background orbs */}
      <View style={styles.orbContainer}>
        <View style={[styles.orb, styles.orbTopRight]} />
        <View style={[styles.orb, styles.orbBottomLeft]} />
        <View style={[styles.orb, styles.orbCenter]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo & Branding */}
            <View style={styles.brandSection}>
              <Image
                source={images.icon}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.tagline}>Mulai Perjalanan Anda</Text>
              <Text style={styles.subtitle}>
                Daftar untuk merakit buket aromaterapi dan selamatkan lingkungan 🌿
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              {/* Decorative accent line at top of card */}
              <LinearGradient
                colors={['#7C3AED', '#A78BFA', '#C4B5FD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardAccentLine}
              />

              <Text style={styles.formTitle}>Daftar Akun</Text>

              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama Lengkap</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconBox}>
                    <FontAwesome
                      name="user-o"
                      size={14}
                      color={brand.primary}
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nama Anda"
                    placeholderTextColor={brand.placeholder}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconBox}>
                    <FontAwesome
                      name="envelope-o"
                      size={14}
                      color={brand.primary}
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="nama@email.com"
                    placeholderTextColor={brand.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Kata Sandi</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconBox}>
                    <FontAwesome
                      name="lock"
                      size={15}
                      color={brand.primary}
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Masukkan kata sandi"
                    placeholderTextColor={brand.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <FontAwesome
                      name={showPassword ? 'eye' : 'eye-slash'}
                      size={18}
                      color={brand.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Konfirmasi Kata Sandi</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconBox}>
                    <FontAwesome
                      name="lock"
                      size={15}
                      color={brand.primary}
                    />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ulangi kata sandi"
                    placeholderTextColor={brand.placeholder}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <FontAwesome
                      name={showConfirmPassword ? 'eye' : 'eye-slash'}
                      size={18}
                      color={brand.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Register Button — Gradient */}
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading || !name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()}
                activeOpacity={0.85}
                style={[
                  { marginTop: 12 },
                  (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) && styles.loginButtonDisabled,
                ]}
              >
                <LinearGradient
                  colors={
                    (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim())
                      ? ['#C4B5FD', '#C4B5FD']
                      : ['#7C3AED', '#6D28D9']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButton}
                >
                  {isLoading ? (
                    <ActivityIndicator color={brand.white} size="small" />
                  ) : (
                    <View style={styles.loginButtonContent}>
                      <FontAwesome name="user-plus" size={16} color={brand.white} />
                      <Text style={styles.loginButtonText}>Daftar Sekarang</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <LinearGradient
                  colors={['transparent', brand.border]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dividerLine}
                />
                <View style={styles.dividerBadge}>
                  <Text style={styles.dividerText}>atau</Text>
                </View>
                <LinearGradient
                  colors={[brand.border, 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dividerLine}
                />
              </View>

              {/* Google Sign In */}
              <TouchableOpacity style={styles.googleButton} activeOpacity={0.7}>
                <FontAwesome name="google" size={18} color="#4B5563" />
                <Text style={styles.googleButtonText}>Daftar dengan Google</Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Sudah punya akun? </Text>
              <TouchableOpacity onPress={handleLoginLink}>
                <Text style={styles.registerLink}>Masuk sekarang</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <FontAwesome name="check" size={32} color={brand.white} />
            </View>
            <Text style={styles.modalTitle}>Berhasil!</Text>
            <Text style={styles.modalSubtitle}>Akun Anda berhasil dibuat. Mengarahkan ke halaman login...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 24,
    paddingTop: 12,
  },

  // Decorative orbs
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbTopRight: {
    width: 200,
    height: 200,
    top: -60,
    right: -60,
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
  },
  orbBottomLeft: {
    width: 260,
    height: 260,
    bottom: -80,
    left: -80,
    backgroundColor: 'rgba(124, 58, 237, 0.06)',
  },
  orbCenter: {
    width: 140,
    height: 140,
    top: '40%' as unknown as number,
    left: width * 0.6,
    backgroundColor: 'rgba(196, 181, 253, 0.1)',
  },

  // Brand Section
  brandSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 16,
  },
  tagline: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: brand.primaryDark,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },

  // Form Card
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 28,
    padding: 24,
    overflow: 'hidden',
    // Shadow
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  cardAccentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  formTitle: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 24,
    color: brand.textPrimary,
    marginTop: 4,
    marginBottom: 24,
  },

  // Input
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: brand.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFE',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: brand.border,
    paddingRight: 14,
    height: 54,
  },
  inputIconBox: {
    width: 42,
    height: 54,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.04)',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    color: brand.textPrimary,
    height: '100%',
    paddingHorizontal: 12,
  },
  eyeButton: {
    padding: 4,
  },

  // Register Button
  loginButton: {
    borderRadius: 999,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginButtonText: {
    fontFamily: 'Lato_700Bold',
    color: brand.white,
    fontSize: 16,
    letterSpacing: 0.3,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: brand.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: brand.border,
  },
  dividerText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: brand.placeholder,
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: brand.border,
    backgroundColor: brand.white,
    gap: 10,
  },
  googleButtonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: brand.textPrimary,
  },

  // Login Link
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: brand.textSecondary,
  },
  registerLink: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: brand.primary,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: brand.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 22,
    color: brand.textPrimary,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
