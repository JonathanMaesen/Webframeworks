import { MaterialTopTabs } from '@/components/MaterialTopTabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/styles/Colors';
import { IconName } from '@fortawesome/fontawesome-svg-core';

// A reusable component for rendering tab icons.
const TabBarIcon = ({ name, color }: { name: IconName; color: string }) => {
  return <FontAwesomeIcon icon={name} color={color} size={20} />;
};

const tabScreens = [
    { name: "index", title: "Home", icon: "home" },
    { name: "safeList", title: "Safelist", icon: "list" },
    { name: "scanner", title: "Scan", icon: "barcode" },
    { name: "settings", title: "Settings", icon: "cog" },
] as const;

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
      {tabScreens.map(({ name, title, icon }) => (
        <MaterialTopTabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => <TabBarIcon name={icon} color={color} />,
          }}
        />
      ))}
    </MaterialTopTabs>
  );
}

