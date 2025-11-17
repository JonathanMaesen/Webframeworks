import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeListProvider } from '@/context/SafeListContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// Initialize the icon library
library.add(faCheckCircle);

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      router.replace('/tabs');
    } else if (!user && !inAuthGroup) {
      router.replace('/login');
    }
  }, [user, loading, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SafeListProvider>
          <InitialLayout />
        </SafeListProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
