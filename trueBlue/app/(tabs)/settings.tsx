import React, { useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { getStyles } from '@/styles/settings.styles';
import { useAllergens } from "@/context/AllergenContext";
import { Appbar, Button, Switch, Text, TextInput, IconButton } from 'react-native-paper';

// Section for Appearance Settings
const AppearanceSettings = () => {
    const { theme, toggleTheme } = useTheme();
    const styles = getStyles(theme);
    const isDarkMode = theme === 'dark';

    return (
        <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Appearance</Text>
            <View style={styles.row}>
                <Text style={styles.rowLabel}>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
        </View>
    );
};

// Memoized item for the allergen list
const AllergenListItem = React.memo(({ item, onRemove }: { item: string, onRemove: (item: string) => void }) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.allergenItem}>
            <Text style={styles.allergenText}>{item}</Text>
            <IconButton icon="delete" onPress={() => onRemove(item)} />
        </View>
    );
});

// Section for Allergen Management
const AllergenSettings = () => {
    const { theme } = useTheme();
    const { allergens, addAllergen, removeAllergen, loading } = useAllergens();
    const [newAllergen, setNewAllergen] = useState('');
    const styles = getStyles(theme);

    const handleAddAllergen = useCallback(() => {
        const trimmedAllergen = newAllergen.trim();
        if (trimmedAllergen) {
            addAllergen(trimmedAllergen);
            setNewAllergen('');
        }
    }, [newAllergen, addAllergen]);

    const handleRemoveAllergen = useCallback((item: string) => {
        removeAllergen(item);
    }, [removeAllergen]);

    const renderAllergenItem = useCallback(({ item }: { item: string }) => (
        <AllergenListItem item={item} onRemove={handleRemoveAllergen} />
    ), [handleRemoveAllergen]);

    return (
        <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>My Allergens</Text>
            <View style={styles.allergenInputContainer}>
                <TextInput
                    label="e.g., peanuts"
                    value={newAllergen}
                    onChangeText={setNewAllergen}
                    style={styles.allergenInput}
                    mode="outlined"
                />
                <Button mode="contained" onPress={handleAddAllergen}>Add</Button>
            </View>
            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={allergens}
                    keyExtractor={(item) => item}
                    renderItem={renderAllergenItem}
                    style={{ marginTop: 20 }}
                />
            )}
        </View>
    );
};

// Section for Account Actions
const AccountActions = () => {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={styles.buttonContainer}>
            <Button 
                mode="contained" 
                onPress={() => signOut(auth)} 
                buttonColor="red"
            >
                Sign Out
            </Button>
        </View>
    );
};


export default function Settings() {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Settings" />
            </Appbar.Header>

            <AppearanceSettings />
            <AllergenSettings />
            <AccountActions />
        </View>
    )
}
