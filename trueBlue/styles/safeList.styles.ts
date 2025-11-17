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
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
        },
        emptySubText: {
            fontSize: 14,
            color: isDarkMode ? '#888' : '#666',
            marginTop: 5,
        },
        itemContainer: {
          flexDirection: 'row',
          padding: 15,
          backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
          borderBottomWidth: 1,
          borderBottomColor: isDarkMode ? '#333' : '#eee',
          alignItems: 'center',
        },
        itemImage: {
          width: 50,
          height: 50,
          marginRight: 15,
          borderRadius: 5,
        },
        itemDetails: {
          flex: 1,
        },
        itemText: {
          fontSize: 16,
          fontWeight: 'bold',
          color: isDarkMode ? '#fff' : '#000',
        },
        itemBrands: {
          fontSize: 14,
          color: isDarkMode ? '#aaa' : '#666',
        }
    });
};
