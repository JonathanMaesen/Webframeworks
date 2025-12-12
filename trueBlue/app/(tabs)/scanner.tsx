import {Button, Text, View, ActivityIndicator, Alert, StyleSheet, Vibration} from "react-native";
import {CameraView, useCameraPermissions, BarcodeScanningResult} from "expo-camera";
import {useCallback, useEffect, useState} from "react";
import { useRouter } from "expo-router";
import { useBarcodeSearch } from "@/hooks/useBarcodeSearch";
import { useFocusEffect } from '@react-navigation/native';
import { getScannerStyles } from "@/styles/scanner.styles";
import { useTheme } from "@/context/ThemeContext";

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const { product, loading, error, search } = useBarcodeSearch();
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const { theme } = useTheme();
    const styles = getScannerStyles(theme);

    useEffect(() => {
        if (product) {
            setIsScanning(false);
            // Navigate directly to the product page. The product page will handle showing the correct button.
            router.push({ pathname: "/product", params: { product: JSON.stringify(product) } });
        }
        if (error) {
            setIsScanning(false);
            Alert.alert("Error", error);
        }
    }, [product, error, router]);

    useFocusEffect(
        useCallback(() => {
            // When the screen is focused, allow scanning.
            setIsScanning(true);
            // When the screen is unfocused, stop scanning.
            return () => setIsScanning(false);
        }, [])
    );

    const handleBarcodeScanned = useCallback((scanningResult: BarcodeScanningResult) => {
        Vibration.vibrate();
        setIsScanning(false);
        search(scanningResult.data).catch(e => console.error(e));
    }, [search]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>To start scanning, we need your permission to use the camera.</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {isScanning && (
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    onBarcodeScanned={loading ? undefined : handleBarcodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "ean13", "pdf417"],
                    }}
                />
            )}
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Searching...</Text>
                </View>
            )}
        </View>
    );
}
