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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { brand } from '@/constants/Colors';
import { images } from '@/constants/images';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    // TODO: Navigate to register screen
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#EDE9FE', '#F5F3F0', '#F5F3F0']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo & Branding */}
            <View style={styles.brandSection}>
              <View style={styles.logoContainer}>
                <Image
                  source={images.icon}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.tagline}>Healing the Earth, Healing Yourself</Text>
              <Text style={styles.subtitle}>
                Masuk untuk mulai merakit buket aromaterapi{'\n'}dan berkontribusi untuk lingkungan 🌿
              </Text>
            </View>

            {/* Login Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Masuk ke Akun</Text>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome
                    name="envelope-o"
                    size={16}
                    color={brand.placeholder}
                    style={styles.inputIcon}
                  />
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
                  <FontAwesome
                    name="lock"
                    size={18}
                    color={brand.placeholder}
                    style={styles.inputIcon}
                  />
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
                      color={brand.placeholder}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Lupa kata sandi?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  (!email.trim() || !password.trim()) && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading || !email.trim() || !password.trim()}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={brand.white} size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>Masuk</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>atau</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Sign In (placeholder) */}
              <TouchableOpacity style={styles.googleButton} activeOpacity={0.7}>
                <FontAwesome name="google" size={20} color={brand.textPrimary} />
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
    paddingBottom: 32,
  },

  // Brand Section
  brandSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: brand.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // Shadow
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  logo: {
    width: 88,
    height: 88,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '700',
    color: brand.primaryDark,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Form Card
  formCard: {
    backgroundColor: brand.white,
    borderRadius: 24,
    padding: 24,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: brand.textPrimary,
    marginBottom: 24,
  },

  // Input
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: brand.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.background,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: brand.border,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
    width: 20,
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: brand.textPrimary,
    height: '100%',
  },
  eyeButton: {
    padding: 4,
  },

  // Forgot Password
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: 4,
  },
  forgotText: {
    fontSize: 13,
    color: brand.primary,
    fontWeight: '600',
  },

  // Login Button
  loginButton: {
    backgroundColor: brand.primary,
    borderRadius: 999,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.5,
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
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: brand.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: brand.placeholder,
  },

  // Google Button
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
