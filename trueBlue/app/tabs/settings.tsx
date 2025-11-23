import { Text, View, Switch, Button, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { getStyles } from '@/styles/settings.styles';
import { useAllergens } from "@/context/AllergenContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTrash);

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
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Appearance</Text>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Dark Mode</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Allergens</Text>
                <View style={styles.allergenInputContainer}>
                    <TextInput
                        style={styles.allergenInput}
                        placeholder="e.g., peanuts"
                        value={newAllergen}
                        onChangeText={setNewAllergen}
                        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                    />
                    <Button title="Add" onPress={handleAddAllergen} />
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
                                <TouchableOpacity onPress={() => removeAllergen(item)}>
                                    <FontAwesomeIcon icon="trash" color={isDarkMode ? '#aaa' : '#666'} />
                                </TouchableOpacity>
                            </View>
                        )}
                        style={{ marginTop: 20 }}
                    />
                )}
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Sign Out" onPress={() => signOut(auth)} color="red" />
            </View>
        </View>
    )
}
