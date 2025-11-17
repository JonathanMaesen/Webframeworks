import { MaterialTopTabs } from '@/components/MaterialTopTabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faList, faBarcode, faCog } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faList, faBarcode, faCog);

export default function TabsLayout() {
  return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      screenOptions={{
        tabBarSwipeEnabled: true,
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#888',
        tabBarShowLabel: true,
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={focused ? 'home' : 'home'} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="safeList"
        options={{
          title: 'Safelist',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={focused ? 'list' : 'list'} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="scanner"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={focused ? 'barcode' : 'barcode'} color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={focused ? 'cog' : 'cog'} color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
}
