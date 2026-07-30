import { View, Text, StyleSheet } from 'react-native';
import { brand } from '@/constants/Colors';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
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
    fontSize: 24,
    fontWeight: '700',
    color: brand.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: brand.textSecondary,
  },
});
