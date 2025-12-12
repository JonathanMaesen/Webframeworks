import { Stack, useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { SafeListProvider } from '@/context/SafeListContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AllergenProvider } from '@/context/AllergenContext';
import { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle, faHome, faList, faBarcode, faCog } from '@fortawesome/free-solid-svg-icons';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

library.add(faCheckCircle, faTimesCircle, faHome, faList, faBarcode, faCog);

function RootLayoutNav() {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (user && inAuthGroup) {
      router.replace('/');
    } else if (!user && !inAuthGroup) {
      router.replace('/login');
    }
  }, [user, loading, segments, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="product" 
        options={{ 
          presentation: 'modal',
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#121212' : '#F5F5F5',
          },
          headerTintColor: theme === 'dark' ? '#E0E0E0' : '#000000',
        }} 
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

function ThemedRoot() {
  const { theme } = useTheme();
  const paperTheme = theme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
      <PaperProvider theme={paperTheme}>
          <RootLayoutNav />
      </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AllergenProvider>
          <SafeListProvider>
            <ThemedRoot />
          </SafeListProvider>
        </AllergenProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
