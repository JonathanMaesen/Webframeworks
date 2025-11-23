import { StyleSheet } from 'react-native';

export const getStyles = (theme: 'light' | 'dark') => {
    const isDarkMode = theme === 'dark';
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#121212' : '#f8f9fa',
        },
        header: {
            padding: 20,
            paddingTop: 40,
            backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#333' : '#eee',
        },
        headerText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
        },
        section: {
            marginTop: 20,
            marginBottom: 10,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: isDarkMode ? '#aaa' : '#666',
            paddingHorizontal: 20,
            marginBottom: 10,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#333' : '#eee',
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? '#333' : '#eee',
        },
        rowLabel: {
            fontSize: 18,
            color: isDarkMode ? '#fff' : '#000',
        },
        buttonContainer: {
            marginTop: 30,
            paddingHorizontal: 20,
        },
        allergenInputContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginTop: 10,
            alignItems: 'center',
        },
        allergenInput: {
            flex: 1,
            marginRight: 10,
        },
        allergenItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#333' : '#eee',
        },
        allergenText: {
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 16,
        },
    });
};
