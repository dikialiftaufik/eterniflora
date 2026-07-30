import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { brand } from '@/constants/Colors';

export default function HomeScreen() {
  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌸 EterniFlora</Text>
      <Text style={styles.subtitle}>Healing the Earth, Healing Yourself</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Keluar (Logout)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brand.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: brand.primaryDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: brand.textSecondary,
    marginBottom: 32,
  },
  logoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: brand.error,
  },
  logoutText: {
    color: brand.error,
    fontSize: 15,
    fontWeight: '600',
  },
});
