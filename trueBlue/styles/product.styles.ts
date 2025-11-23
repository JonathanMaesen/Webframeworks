import { StyleSheet } from 'react-native';

const lightColors = {
    background: '#F5F5F5',
    text: '#000000',
    label: '#333333',
    brands: '#555555',
    sectionBackground: '#FFFFFF',
    borderColor: '#DDDDDD',
    nutriScoreText: '#FFFFFF',
};

const darkColors = {
    background: '#121212',
    text: '#E0E0E0',
    label: '#CCCCCC',
    brands: '#AAAAAA',
    sectionBackground: '#1E1E1E',
    borderColor: '#333333',
    nutriScoreText: '#FFFFFF',
};

export const getStyles = (theme: 'light' | 'dark') => {
    const colors = theme === 'light' ? lightColors : darkColors;

    return StyleSheet.create({
        pageContainer: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollViewContent: {
            padding: 20,
        },
        title: {
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 15,
            textAlign: 'center',
            color: colors.text,
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
            backgroundColor: colors.sectionBackground,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.borderColor,
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.label,
            marginRight: 8,
            minWidth: 80, // For alignment
        },
        info: {
            fontSize: 16,
            color: colors.text,
            flexShrink: 1, // Allow text to wrap
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
            backgroundColor: colors.sectionBackground,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.borderColor,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text,
        },
        buttonContainer: {
            padding: 20,
            borderTopWidth: 1,
            borderColor: colors.borderColor,
            backgroundColor: colors.sectionBackground,
        },
        nutriScoreContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        nutriScoreText: {
            fontSize: 16,
            color: colors.text,
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
            color: colors.nutriScoreText,
            fontWeight: 'bold',
            fontSize: 16,
        },
    });
};
