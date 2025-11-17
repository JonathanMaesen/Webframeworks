import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faList, faQrcode, faCog } from '@fortawesome/free-solid-svg-icons'
import { MaterialTopTabs } from '@/components/MaterialTopTabs';

library.add(faHome, faList, faQrcode, faCog);

export default function RootLayout(){
    return (
      <MaterialTopTabs
          tabBarPosition="bottom"
      >
          <MaterialTopTabs.Screen name="index" options={{
              tabBarLabel: "Home",
              // @ts-ignore
              tabBarIcon: ({color, size}) => <FontAwesomeIcon icon="home" color={color} size={size}/>
          }}/>
          <MaterialTopTabs.Screen name="safeList" options={{
              tabBarLabel: "Safe List",
              // @ts-ignore
              tabBarIcon: ({color, size}) => <FontAwesomeIcon icon="list" color={color} size={size}/>
          }}/>
          <MaterialTopTabs.Screen name="scanner" options={{
              tabBarLabel: "Scanner",
              // @ts-ignore
              tabBarIcon: ({color, size}) => <FontAwesomeIcon icon="qrcode" color={color} size={size}/>
          }}/>
          <MaterialTopTabs.Screen name="settings" options={{
              tabBarLabel: "Settings",
              // @ts-ignore
              tabBarIcon: ({color, size}) => <FontAwesomeIcon icon="cog" color={color} size={size}/>
          }}/>
      </MaterialTopTabs>
  );
}
