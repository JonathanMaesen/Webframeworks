import { StyleSheet } from 'react-native';

const lightColors = {
    background: '#F5F5F5',
    text: '#000000',
    brands: '#555555',
    sectionBackground: '#FFFFFF',
    borderColor: '#DDDDDD',
    nutriScoreText: '#FFFFFF',
};

const darkColors = {
    background: '#121212',
    text: '#E0E0E0',
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
        container: {
            flex: 1,
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
        brands: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.brands,
            marginBottom: 8,
        },
        info: {
            fontSize: 16,
            marginBottom: 8,
            color: colors.text,
            lineHeight: 22,
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