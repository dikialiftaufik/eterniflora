import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { brand } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const otpInputRef = useRef<TextInput>(null);
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    if (step === 2) {
      blink.start();
    }
    return () => blink.stop();
  }, [step]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNextStep = () => {
    if (!email.trim() && step === 1) return;
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      if (step < 3) {
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start(() => {
          setStep(step + 1);
          // Fade in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        });
      } else {
        // Final step: Success
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.replace('/(auth)/login');
        }, 2000);
      }
    }, 1500);
  };

  const handleBack = () => {
    if (step > 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setStep(step - 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });
    } else {
      router.back();
    }
  };

  const handleLoginLink = () => {
    router.replace('/(auth)/login');
  };

  // Helper to render the 6-digit OTP UI with a dash in the middle
  const renderOtpBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const char = otp[i] || '';
      const isFocused = otp.length === i; // The box that will receive the next typed character

      boxes.push(
        <View
          key={`box-${i}`}
          style={[
            styles.otpBox,
            isFocused && styles.otpBoxFocused,
            char ? styles.otpBoxFilled : null,
          ]}
        >
          {isFocused && !char ? (
            <Animated.View style={[styles.otpCursor, { opacity: cursorOpacity }]} />
          ) : (
            <Text style={styles.otpText}>{char}</Text>
          )}
        </View>
      );

      // Insert dash between index 2 and 3
      if (i === 2) {
        boxes.push(
          <View key="dash" style={styles.otpDashContainer}>
            <Text style={styles.otpDash}>-</Text>
          </View>
        );
      }
    }
    return boxes;
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
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome name="angle-left" size={28} color={brand.textPrimary} />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header section based on step */}
            <View style={styles.headerSection}>
              <View style={styles.iconCircle}>
                <FontAwesome
                  name={step === 1 ? 'envelope-o' : step === 2 ? 'shield' : 'lock'}
                  size={32}
                  color={brand.primary}
                />
              </View>
              <Text style={styles.title}>
                {step === 1
                  ? 'Lupa Kata Sandi?'
                  : step === 2
                  ? 'Verifikasi OTP'
                  : 'Kata Sandi Baru'}
              </Text>
              <Text style={styles.subtitle}>
                {step === 1
                  ? 'Masukkan email Anda yang terdaftar untuk menerima kode verifikasi.'
                  : step === 2
                  ? `Kode 6 digit telah dikirimkan ke email:\n${email}`
                  : 'Buat kata sandi baru yang kuat dan mudah diingat.'}
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              <LinearGradient
                colors={['#7C3AED', '#A78BFA', '#C4B5FD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardAccentLine}
              />

              <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
                {/* STEP 1: Email */}
                {step === 1 && (
                  <View style={styles.stepContent}>
                  <Text style={styles.inputLabel}>Email Terdaftar</Text>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIconBox}>
                      <FontAwesome name="envelope-o" size={14} color={brand.primary} />
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
                  
                  <TouchableOpacity
                    onPress={handleNextStep}
                    disabled={isLoading || !email.trim()}
                    activeOpacity={0.85}
                    style={[styles.actionButtonContainer, (!email.trim()) && styles.buttonDisabled]}
                  >
                    <LinearGradient
                      colors={!email.trim() ? ['#C4B5FD', '#C4B5FD'] : ['#7C3AED', '#6D28D9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.actionButton}
                    >
                      {isLoading ? (
                        <ActivityIndicator color={brand.white} size="small" />
                      ) : (
                        <Text style={styles.actionButtonText}>Kirim Kode OTP</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}

              {/* STEP 2: OTP */}
              {step === 2 && (
                  <View style={styles.stepContent}>
                    <Text style={styles.inputLabel}>Kode 6 Digit</Text>
                    
                    <View style={styles.otpWrapper}>
                      {/* Custom OTP UI */}
                      <View style={styles.otpRow} pointerEvents="none">
                        {renderOtpBoxes()}
                      </View>

                      {/* Hidden TextInput covering the whole area to reliably open keyboard */}
                      <TextInput
                        ref={otpInputRef}
                        style={styles.hiddenOtpInput}
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="number-pad"
                        maxLength={6}
                        autoFocus
                      />
                    </View>

                  <TouchableOpacity
                    onPress={handleNextStep}
                    disabled={isLoading || otp.length < 6}
                    activeOpacity={0.85}
                    style={[styles.actionButtonContainer, { marginTop: 24 }, (otp.length < 6) && styles.buttonDisabled]}
                  >
                    <LinearGradient
                      colors={otp.length < 6 ? ['#C4B5FD', '#C4B5FD'] : ['#7C3AED', '#6D28D9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.actionButton}
                    >
                      {isLoading ? (
                        <ActivityIndicator color={brand.white} size="small" />
                      ) : (
                        <Text style={styles.actionButtonText}>Verifikasi Kode</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.resendContainer}>
                    <Text style={styles.resendText}>Kirim ulang kode?</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* STEP 3: New Password */}
              {step === 3 && (
                  <View style={styles.stepContent}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Kata Sandi Baru</Text>
                    <View style={styles.inputWrapper}>
                      <View style={styles.inputIconBox}>
                        <FontAwesome name="lock" size={15} color={brand.primary} />
                      </View>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Masukkan kata sandi baru"
                        placeholderTextColor={brand.placeholder}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
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

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Konfirmasi Kata Sandi Baru</Text>
                    <View style={styles.inputWrapper}>
                      <View style={styles.inputIconBox}>
                        <FontAwesome name="lock" size={15} color={brand.primary} />
                      </View>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Ulangi kata sandi baru"
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

                  <TouchableOpacity
                    onPress={handleNextStep}
                    disabled={isLoading || !password.trim() || !confirmPassword.trim()}
                    activeOpacity={0.85}
                    style={[styles.actionButtonContainer, (!password.trim() || !confirmPassword.trim()) && styles.buttonDisabled]}
                  >
                    <LinearGradient
                      colors={(!password.trim() || !confirmPassword.trim()) ? ['#C4B5FD', '#C4B5FD'] : ['#7C3AED', '#6D28D9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.actionButton}
                    >
                      {isLoading ? (
                        <ActivityIndicator color={brand.white} size="small" />
                      ) : (
                        <Text style={styles.actionButtonText}>Simpan Kata Sandi</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
              </Animated.View>
            </View>
            
            {/* Login Link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Ingat kata sandi Anda? </Text>
              <TouchableOpacity onPress={handleLoginLink}>
                <Text style={styles.registerLink}>Kembali ke Login</Text>
              </TouchableOpacity>
            </View>

            {/* Graphical Progress Indicator */}
            <View style={styles.progressContainer}>
              {[1, 2, 3].map((s) => (
                <View
                  key={s}
                  style={[
                    styles.progressDot,
                    step === s ? styles.progressDotActive : styles.progressDotInactive,
                  ]}
                />
              ))}
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <FontAwesome name="check" size={32} color={brand.white} />
            </View>
            <Text style={styles.modalTitle}>Berhasil!</Text>
            <Text style={styles.modalSubtitle}>Kata sandi berhasil diubah. Mengarahkan ke halaman login...</Text>
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
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 20,
    left: 24,
    width: 40,
    height: 40,
    justifyContent: 'center',
    zIndex: 10,
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

  // Header Section
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: brand.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  // Form Card
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 28,
    padding: 24,
    overflow: 'hidden',
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
  },
  stepContainer: {
    width: '100%',
  },
  stepContent: {
    width: '100%',
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

  // OTP UI
  otpWrapper: {
    position: 'relative',
    marginVertical: 20,
  },
  hiddenOtpInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 10,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  otpBox: {
    flex: 1,
    aspectRatio: 0.8,
    maxWidth: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: brand.border,
    backgroundColor: '#FAFAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: brand.primary,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
  },
  otpBoxFilled: {
    borderColor: brand.primary,
  },
  otpText: {
    fontSize: 20,
    fontWeight: '700',
    color: brand.textPrimary,
  },
  otpCursor: {
    width: 2,
    height: 24,
    backgroundColor: brand.primary,
    borderRadius: 2,
  },
  otpDashContainer: {
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpDash: {
    fontSize: 20,
    fontWeight: '700',
    color: brand.placeholder,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 13,
    color: brand.primary,
    fontWeight: '600',
  },

  // Buttons
  actionButtonContainer: {
    marginTop: 12,
  },
  actionButton: {
    borderRadius: 999,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: brand.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  
  // Login Link
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

  // Graphical Progress
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  progressDot: {
    height: 6,
    borderRadius: 3,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: brand.primary,
  },
  progressDotInactive: {
    width: 6,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
  },

  // Modal
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
    fontSize: 22,
    fontWeight: '800',
    color: brand.textPrimary,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: brand.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
