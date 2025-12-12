import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { getStyles } from '@/styles/home.styles';

import TrueBlueLogo from '@/assets/images/TrueBlueLogo.jpg';

const features = [
    'Scan and check product ingredients',
    'Verify if a product is from the EU',
    'Add allergens to highlight them',
];

export default function HomeScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const isLightMode = theme === 'light';

    return (
        <View style={styles.container}>
            {isLightMode && <Image source={TrueBlueLogo} style={styles.logo} />}
            <Text style={styles.title}>Welcome to TrueBlue</Text>
            <Text style={styles.subtitle}>Your guide to true blue European Products.</Text>

            <TouchableOpacity
                style={styles.scanButton}
                onPress={() => router.push('/scanner')}
            >
                <FontAwesomeIcon icon={faBarcode} size={24} color="#fff" />
                <Text style={styles.scanButtonText}>Scan a Barcode</Text>
            </TouchableOpacity>

            <View style={styles.featuresContainer}>
                {features.map((feature, index) => (
                    <View key={index} style={styles.feature}>
                        <Text style={styles.featureText}>{feature}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
