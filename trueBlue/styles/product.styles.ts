import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/Colors';
import { Theme } from '@/types/types';

export const getStyles = (theme: Theme) => {
    const currentColors = Colors[theme];

    return StyleSheet.create({
        pageContainer: {
            flex: 1,
            backgroundColor: currentColors.background,
        },
        scrollViewContent: {
            padding: 20,
        },
        title: {
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 15,
            textAlign: 'center',
            color: currentColors.text,
        },
        image: {
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            marginBottom: 20,
            borderRadius: 10,
        },
        infoSection: {
            marginBottom: 20,
            padding: 15,
            backgroundColor: currentColors.card,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: currentColors.border,
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            color: currentColors.text,
            marginRight: 8,
            minWidth: 80, // For alignment
        },
        info: {
            fontSize: 16,
            color: currentColors.text,
            flexShrink: 1,
        },
        countryContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            marginLeft: 8,
        },
        detailsSection: {
            marginBottom: 20,
            padding: 15,
            backgroundColor: currentColors.card,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: currentColors.border,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: currentColors.text,
        },
        buttonContainer: {
            padding: 20,
            borderTopWidth: 1,
            borderColor: currentColors.border,
            backgroundColor: currentColors.card,
        },
        nutriScoreContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        nutriScoreText: {
            fontSize: 16,
            color: currentColors.text,
            marginRight: 10,
        },
        nutriScoreBadge: {
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        nutriScoreLetter: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });
};
