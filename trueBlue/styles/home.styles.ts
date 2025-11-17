import { StyleSheet } from 'react-native';

export const getStyles = (theme: 'light' | 'dark') => {
    const isDarkMode = theme === 'dark';
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#121212' : '#fff',
            padding: 20,
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
            textAlign: 'center',
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 18,
            color: isDarkMode ? '#ccc' : '#666',
            textAlign: 'center',
            marginBottom: 40,
        },
        scanButton: {
            flexDirection: 'row',
            backgroundColor: '#007BFF',
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
            color: '#fff',
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
            color: isDarkMode ? '#ddd' : '#333',
        },
    });
};
