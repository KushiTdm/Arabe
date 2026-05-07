import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './src/theme';
import { ProfileProvider, useProfile } from './src/lib/ProfileContext';
import { useCourses } from './src/lib/useCourses';

import HomeScreen       from './src/screens/HomeScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import WritingScreen    from './src/screens/WritingScreen';
import VocabularyScreen from './src/screens/VocabularyScreen';
import CoursScreen      from './src/screens/Coursscreen';
import AlphabetScreen   from './src/screens/AlphabetScreen';
import ProfileScreen    from './src/screens/ProfileScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CoursTabIcon({ color, size, unread }: { color: string; size: number; unread: number }) {
  return (
    <View style={{ width: size + 4, height: size + 4, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name="school-outline" size={size} color={color} />
      {unread > 0 && (
        <View style={tabStyles.badge}>
          <Text style={tabStyles.badgeText}>{unread > 9 ? '9+' : unread}</Text>
        </View>
      )}
    </View>
  );
}

function HomeTabs() {
  const { activeProfile } = useProfile();
  const coursKey = activeProfile
    ? `@maa_courses_${activeProfile.id}_${activeProfile.activeLanguageCode}`
    : '@maa_courses_v1';
  const { unreadCount } = useCourses(coursKey);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Cours') {
            return <CoursTabIcon color={color} size={size} unread={focused ? 0 : unreadCount} />;
          }
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Home':         iconName = focused ? 'home'        : 'home-outline';        break;
            case 'Conversation': iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'; break;
            case 'Writing':      iconName = focused ? 'pencil'      : 'pencil-outline';      break;
            case 'Vocabulary':   iconName = focused ? 'book'        : 'book-outline';        break;
            case 'Profile':      iconName = focused ? 'person'      : 'person-outline';      break;
            default:             iconName = 'help-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor:   colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 6,
          paddingBottom: 8,
          height: 68,
        },
        tabBarLabelStyle: { fontSize: 9, fontWeight: '600', marginTop: 2 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home"         component={HomeScreen}         options={{ tabBarLabel: 'Accueil' }} />
      <Tab.Screen name="Conversation" component={ConversationScreen} options={{ tabBarLabel: 'Parler'  }} />
      <Tab.Screen name="Writing"      component={WritingScreen}      options={{ tabBarLabel: 'Écrire'  }} />
      <Tab.Screen name="Vocabulary"   component={VocabularyScreen}   options={{ tabBarLabel: 'Vocab'   }} />
      <Tab.Screen name="Cours"        component={CoursScreen}        options={{ tabBarLabel: 'Cours'   }} />
      <Tab.Screen name="Profile"      component={ProfileScreen}      options={{ tabBarLabel: 'Profil'  }} />
    </Tab.Navigator>
  );
}

function RootStack() {
  const { loading, profiles } = useProfile();

  // Splash seulement au démarrage à froid (pas encore de profils en mémoire)
  if (loading && profiles.length === 0) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashLogo}>🌍</Text>
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 24 }} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {profiles.length === 0 ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={HomeTabs} />
          <Stack.Screen name="Alphabet" component={AlphabetScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <RootStack />
        </NavigationContainer>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  splashLogo: { fontSize: 72 },
});

const tabStyles = StyleSheet.create({
  badge: {
    position: 'absolute', top: -2, right: -4,
    minWidth: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.destructive,
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 8, fontWeight: '800' },
});
