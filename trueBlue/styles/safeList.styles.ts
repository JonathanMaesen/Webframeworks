import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/Colors';
import { Theme } from '@/types/types';

export const getStyles = (theme: Theme) => {
    const currentColors = Colors[theme];
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: currentColors.background,
        },
        header: {
          padding: 20,
          paddingTop: 40,
          backgroundColor: currentColors.card,
          borderBottomWidth: 1,
          borderBottomColor: currentColors.border,
        },
        headerText: {
          fontSize: 24,
          fontWeight: 'bold',
          color: currentColors.text,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: currentColors.text,
        },
        emptySubText: {
            fontSize: 14,
            color: currentColors.icon,
            marginTop: 5,
        },
        itemContainer: {
          flexDirection: 'row',
          padding: 15,
          backgroundColor: currentColors.card,
          borderBottomWidth: 1,
          borderBottomColor: currentColors.border,
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
          color: currentColors.text,
        },
        itemBrands: {
          fontSize: 14,
          color: currentColors.icon,
        }
    });
};
