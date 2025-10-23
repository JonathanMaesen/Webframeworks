import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {rainbow} from "rainbow-colors-array-ts";

interface RainbowSectionI {
    styleContainer: StyleProp<ViewStyle>
    styleRainbow: StyleProp<ViewStyle>
    rainbowNr: number
}

function RainBow({styleContainer, styleRainbow, rainbowNr}: RainbowSectionI) {

   return (
       <View style={styleContainer}>
           {
               rainbow(rainbowNr, 'hex', true)
                   .map((e, index) =>
                       (<View key={index} style={[styleRainbow, {backgroundColor: e.hex}]} />))
           }
       </View>
   )
}

export function App() {
    const footerText: string = 'RainBow'
    return (
        <View style={{flex: 1, justifyContent: 'space-around'}}>
            <RainBow // topbar
                styleContainer={{flex: 1, alignItems: 'stretch'}}
                styleRainbow={{flex: 1}}
                rainbowNr={7}
            />
            <View id={"body"} style={{flexDirection: 'row', height: '90%'}}>
                <RainBow // left
                    styleContainer={{flex: 1, alignItems: 'stretch', flexDirection: 'row', gap: "10%"}}
                    styleRainbow={{flex: 1, alignItems: 'stretch'}}
                    rainbowNr={7}
                />
                <RainBow // right
                    styleContainer={{flex: 1, alignItems: 'center', gap: "9%", marginTop: '5%', marginBottom: '5%'}}
                    styleRainbow={{flex: 1, width: 50}}
                    rainbowNr={7}
                />
            </View>
            {/*footer*/}
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                {footerText.split('').map((char, i) => (
                    <Text key={i} style={ { color:rainbow(footerText.length, 'hex', false)[i].hex, fontSize: 22 }}>
                        {char}
                    </Text>
                ))}
            </View>
        </View>
    );
}