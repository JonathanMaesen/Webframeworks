import { Text, View, Switch, Button } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { getStyles } from '@/styles/settings.styles';

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    const styles = getStyles(theme);

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

            <View style={styles.buttonContainer}>
                <Button title="Sign Out" onPress={() => signOut(auth)} color="red" />
            </View>
        </View>
    )
}
