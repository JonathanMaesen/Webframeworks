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
        section: {
            marginTop: 20,
            marginBottom: 10,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: currentColors.icon,
            paddingHorizontal: 20,
            marginBottom: 10,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: currentColors.card,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: currentColors.border,
            borderTopWidth: 1,
            borderTopColor: currentColors.border,
        },
        rowLabel: {
            fontSize: 18,
            color: currentColors.text,
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
            borderBottomColor: currentColors.border,
        },
        allergenText: {
            color: currentColors.text,
            fontSize: 16,
        },
    });
};
