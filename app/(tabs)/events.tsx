import { View, Text, StyleSheet } from 'react-native';
import { brand } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Eco Events</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 24,
    color: brand.primaryDark,
  }
});
