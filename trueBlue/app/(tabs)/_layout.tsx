import { MaterialTopTabs } from '@/components/MaterialTopTabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faList, faBarcode, faCog } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

library.add(faHome, faList, faBarcode, faCog);

export default function TabsLayout() {
    const { theme } = useTheme();
    const currentColors = Colors[theme];

    return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: currentColors.tint,
        tabBarInactiveTintColor: currentColors.tabIconDefault,
        tabBarShowLabel: true,
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: currentColors.background,
          borderTopWidth: 1,
          borderTopColor: currentColors.border,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: 'Home',
            tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon="home" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="safeList"
        options={{
          title: 'Safelist',
            tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon="list" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="scanner"
        options={{
          title: 'Scan',
            tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon="barcode" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="settings"
        options={{
          title: 'Settings',
            tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon="cog" color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
}
