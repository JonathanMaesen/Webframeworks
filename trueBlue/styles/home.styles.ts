import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Theme } from '@/types/types';

export const getStyles = (theme: Theme) => {
    const currentColors = Colors[theme];
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: currentColors.background,
            padding: 20,
        },
        logo: {
            width: 120,
            height: 120,
            marginBottom: 20,
            resizeMode: 'contain', // Add this line to prevent cropping
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: currentColors.text,
            textAlign: 'center',
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 18,
            color: currentColors.icon, // Using icon color for subtitle as it's usually grey
            textAlign: 'center',
            marginBottom: 40,
        },
        scanButton: {
            flexDirection: 'row',
            backgroundColor: currentColors.tint,
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        scanButtonText: {
            color: '#fff', // Always white on the blue button
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        featuresContainer: {
            marginTop: 50,
            width: '100%',
            alignItems: 'flex-start',
        },
        feature: {
            marginBottom: 15,
        },
        featureText: {
            fontSize: 16,
            color: currentColors.text,
        },
    });
};
