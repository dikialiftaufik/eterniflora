import { View, Text, StyleSheet } from 'react-native';
import { brand } from '@/constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌸 EterniFlora</Text>
      <Text style={styles.subtitle}>Healing the Earth, Healing Yourself</Text>
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
  },
});
