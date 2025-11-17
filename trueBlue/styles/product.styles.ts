import { StyleSheet } from 'react-native';

export const getStyles = (theme: 'light' | 'dark') => {
    const isDarkMode = theme === 'dark';
    return StyleSheet.create({
        scrollView: {
            backgroundColor: isDarkMode ? '#121212' : '#fff',
        },
        container: {
            alignItems: "center",
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold' as 'bold',
            textAlign: 'center',
            marginBottom: 20,
            color: isDarkMode ? '#fff' : '#000',
        },
        image: {
            width: 200,
            height: 200,
            marginBottom: 20,
            borderRadius: 10,
        },
        infoSection: {
            width: '100%',
            marginBottom: 20,
            alignItems: 'center',
        },
        brands: {
            fontSize: 16,
            fontWeight: 'bold' as 'bold',
            marginBottom: 10,
            color: isDarkMode ? '#fff' : '#000',
        },
        info: {
            fontSize: 14,
            marginBottom: 5,
            textAlign: 'center',
            color: isDarkMode ? '#ccc' : '#333',
        },
        countryContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
        },
        icon: {
            marginLeft: 10,
        },
        detailsSection: {
            width: '100%',
            padding: 15,
            backgroundColor: isDarkMode ? '#1c1c1c' : '#f8f9fa',
            borderRadius: 8,
            marginBottom: 15,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold' as 'bold',
            marginBottom: 10,
            color: isDarkMode ? '#fff' : '#000',
        },
        buttonContainer: {
            marginTop: 20,
            width: '80%',
        },
        nutriScoreContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        nutriScoreText: {
            fontSize: 16,
            marginRight: 10,
            color: isDarkMode ? '#ccc' : '#333',
        },
        nutriScoreBadge: {
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        nutriScoreLetter: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold' as 'bold',
        }
    });
};
