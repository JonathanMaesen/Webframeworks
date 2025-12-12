import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/Colors';
import { Theme } from '@/types/types';

export const getScannerStyles = (theme: Theme) => {
    const currentColors = Colors[theme];
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: currentColors.background,
        },
        message: {
            textAlign: 'center',
            margin: 20,
            color: currentColors.text,
            fontSize: 16,
        },
        camera: {
            flex: 1,
            width: '100%',
        },
        loadingOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            color: '#ffffff', // Always white on the dark overlay
            marginTop: 10,
        },
        scanAgainContainer: {
             ...StyleSheet.absoluteFillObject, 
             justifyContent: 'center', 
             alignItems: 'center' 
        }
    });
};
