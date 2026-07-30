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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { brand } from '@/constants/Colors';
import { images } from '@/constants/images';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    // TODO: Replace with Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleRegisterLink = () => {
    router.push('/(auth)/register');
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
              <Text style={styles.tagline}>Healing the Earth, Healing Yourself</Text>
              <Text style={styles.subtitle}>
                Masuk untuk mulai merakit buket aromaterapi{'\n'}dan berkontribusi untuk lingkungan 🌿
              </Text>
            </View>

            {/* Login Form Card */}
            <View style={styles.formCard}>
              {/* Decorative accent line at top of card */}
              <LinearGradient
                colors={['#7C3AED', '#A78BFA', '#C4B5FD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardAccentLine}
              />

              <Text style={styles.formTitle}>Masuk ke Akun</Text>

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

              {/* Remember Me + Forgot Password */}
              <View style={styles.rememberForgotRow}>
                <TouchableOpacity
                  style={styles.rememberButton}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && (
                      <FontAwesome name="check" size={10} color={brand.white} />
                    )}
                  </View>
                  <Text style={styles.rememberText}>Ingat saya</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                  <Text style={styles.forgotText}>Lupa kata sandi?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button — Gradient */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading || !email.trim() || !password.trim()}
                activeOpacity={0.85}
                style={[
                  (!email.trim() || !password.trim()) && styles.loginButtonDisabled,
                ]}
              >
                <LinearGradient
                  colors={
                    !email.trim() || !password.trim()
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
                      <FontAwesome name="sign-in" size={18} color={brand.white} />
                      <Text style={styles.loginButtonText}>Masuk</Text>
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
                <Text style={styles.googleButtonText}>Lanjutkan dengan Google</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Belum punya akun? </Text>
              <TouchableOpacity onPress={handleRegisterLink}>
                <Text style={styles.registerLink}>Daftar sekarang</Text>
              </TouchableOpacity>
            </View>


          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '700',
    color: brand.primaryDark,
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  subtitle: {
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
    fontSize: 24,
    fontWeight: '800',
    color: brand.textPrimary,
    marginTop: 4,
    marginBottom: 24,
  },

  // Input
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
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
    fontSize: 15,
    color: brand.textPrimary,
    height: '100%',
    paddingHorizontal: 12,
  },
  eyeButton: {
    padding: 4,
  },

  // Remember Me + Forgot Password
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  rememberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: brand.border,
    backgroundColor: brand.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: brand.primary,
    borderColor: brand.primary,
  },
  rememberText: {
    fontSize: 13,
    color: brand.textSecondary,
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 13,
    color: brand.primary,
    fontWeight: '600',
  },

  // Login Button
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
    color: brand.white,
    fontSize: 16,
    fontWeight: '700',
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
    fontSize: 12,
    color: brand.placeholder,
    fontWeight: '500',
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
    fontSize: 15,
    fontWeight: '600',
    color: brand.textPrimary,
  },

  // Register Link
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: brand.textSecondary,
  },
  registerLink: {
    fontSize: 14,
    color: brand.primary,
    fontWeight: '700',
  },

});
