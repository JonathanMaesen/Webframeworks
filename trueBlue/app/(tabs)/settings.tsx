import { View, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { getStyles } from '@/styles/settings.styles';
import { useAllergens } from "@/context/AllergenContext";
import { useState } from "react";
import { Appbar, Button, Switch, Text, TextInput, IconButton } from 'react-native-paper';

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const { allergens, addAllergen, removeAllergen, loading } = useAllergens();
    const [newAllergen, setNewAllergen] = useState('');
    const isDarkMode = theme === 'dark';
    
    const styles = getStyles(theme);

    const handleAddAllergen = () => {
        if (newAllergen) {
            addAllergen(newAllergen);
            setNewAllergen('');
        }
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Settings" />
            </Appbar.Header>

            <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>Appearance</Text>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Dark Mode</Text>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} />
                </View>
            </View>

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
                        renderItem={({ item }) => (
                            <View style={styles.allergenItem}>
                                <Text style={styles.allergenText}>{item}</Text>
                                <IconButton
                                    icon="delete"
                                    onPress={() => removeAllergen(item)}
                                />
                            </View>
                        )}
                        style={{ marginTop: 20 }}
                    />
                )}
            </View>

            <View style={styles.buttonContainer}>
                <Button 
                    mode="contained" 
                    onPress={() => signOut(auth)} 
                    buttonColor="red"
                >
                    Sign Out
                </Button>
            </View>
        </View>
    )
}
