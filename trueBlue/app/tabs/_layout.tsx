import { MaterialTopTabs } from '@/components/MaterialTopTabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faList, faBarcode, faCog } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/context/ThemeContext';

library.add(faHome, faList, faBarcode, faCog);

export default function TabsLayout() {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: isDarkMode ? '#555' : '#888',
        tabBarShowLabel: true,
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#fff',
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? '#333' : '#eee',
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: 'Home',
            // @ts-ignore
            tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon="home" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="safeList"
        options={{
          title: 'Safelist',
            // @ts-ignore
            tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon="list" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="scanner"
        options={{
          title: 'Scan',
            // @ts-ignore
            tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon="barcode" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="settings"
        options={{
          title: 'Settings',
            // @ts-ignore
            tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon="cog" color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
}
