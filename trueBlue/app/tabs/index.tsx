import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { getStyles } from '../../styles/home.styles';

export default function HomeScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to TrueBlue</Text>
            <Text style={styles.subtitle}>Your guide to true blue European Products.</Text>

            <TouchableOpacity
                style={styles.scanButton}
                onPress={() => router.push('/tabs/scanner')}
            >
                <FontAwesomeIcon icon={faBarcode} size={24} color="#fff" />
                <Text style={styles.scanButtonText}>Scan a Barcode</Text>
            </TouchableOpacity>

            <View style={styles.featuresContainer}>
                <View style={styles.feature}>
                    <Text style={styles.featureText}>Scan and check product ingredients</Text>
                </View>
                <View style={styles.feature}>
                    <Text style={styles.featureText}>Verify if a product is from the EU</Text>
                </View>
                <View style={styles.feature}>
                    <Text style={styles.featureText}>Create your own safelist of products</Text>
                </View>
            </View>
        </View>
    );
}
