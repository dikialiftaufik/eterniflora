import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { brand } from '@/constants/Colors';

const { width } = Dimensions.get('window');

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.tabBarContainer}>
      <View style={[styles.tabBar, { height: 64 + insets.bottom, paddingBottom: insets.bottom }]}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isCenter = index === 2;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Define Icons and Labels
          let iconName = 'home';
          let label = 'Beranda';
          
          if (route.name === 'index') {
            iconName = 'home';
            label = 'Beranda';
          } else if (route.name === 'studio') {
            iconName = 'gift';
            label = 'Studio';
          } else if (route.name === 'scan') {
            iconName = 'qrcode';
            label = 'Scan';
          } else if (route.name === 'events') {
            iconName = 'calendar';
            label = 'Events';
          } else if (route.name === 'profile') {
            iconName = 'user';
            label = 'Profil';
          }

          const color = isFocused ? brand.primary : brand.placeholder;

          if (isCenter) {
            return (
              <View key={route.key} style={styles.centerTabWrapper}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={onPress}
                  style={styles.fabButton}
                >
                  <FontAwesome name="qrcode" size={26} color={brand.white} />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={onPress}
              style={styles.tabItem}
            >
              {/* Top Active Indicator with Glow */}
              {isFocused && <View style={styles.activeIndicator} />}
              
              <View style={styles.iconContainer}>
                <FontAwesome name={iconName as any} size={22} color={color} />
              </View>
              <Text style={[styles.tabLabel, { color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We use custom headers in screens
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="studio" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="events" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: brand.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: brand.primaryDark,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 16,
    justifyContent: 'space-between', // Ensures even distribution
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
  },
  iconContainer: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 4,
    backgroundColor: brand.primary,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  tabLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    marginTop: 2,
  },
  centerTabWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  fabButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    // Lift the FAB up proportionally
    transform: [{ translateY: -22 }],
    borderWidth: 6,
    borderColor: brand.white, // Creates the perfect seamless cutout (Halo) effect
    // Intense Spotlight / Glow Effect
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
});
