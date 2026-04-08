import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './src/theme';

import HomeScreen from './src/screens/HomeScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import WritingScreen from './src/screens/WritingScreen';
import VocabularyScreen from './src/screens/VocabularyScreen';
import AlphabetScreen from './src/screens/AlphabetScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Home':        iconName = focused ? 'home'        : 'home-outline';        break;
            case 'Conversation':iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'; break;
            case 'Writing':     iconName = focused ? 'pencil'      : 'pencil-outline';      break;
            case 'Vocabulary':  iconName = focused ? 'book'        : 'book-outline';        break;
            case 'Profile':     iconName = focused ? 'person'      : 'person-outline';      break;
            default:            iconName = 'help-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home"         component={HomeScreen}         options={{ tabBarLabel: 'Accueil' }} />
      <Tab.Screen name="Conversation" component={ConversationScreen} options={{ tabBarLabel: 'Parler'  }} />
      <Tab.Screen name="Writing"      component={WritingScreen}      options={{ tabBarLabel: 'Écrire'  }} />
      <Tab.Screen name="Vocabulary"   component={VocabularyScreen}   options={{ tabBarLabel: 'Vocab'   }} />
      <Tab.Screen name="Profile"      component={ProfileScreen}      options={{ tabBarLabel: 'Profil'  }} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={HomeTabs} />
      <Stack.Screen name="Alphabet" component={AlphabetScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}