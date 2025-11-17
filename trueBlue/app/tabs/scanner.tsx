import {Button, Text, View, ActivityIndicator, Alert} from "react-native";
import {CameraView, useCameraPermissions, BarcodeScanningResult} from "expo-camera";
import {useCallback, useEffect, useState} from "react";
import { useRouter } from "expo-router";
import { useBarcodeSearch } from "@/hooks/useBarcodeSearch";
import { useSafeList } from "@/context/SafeListContext";
import { styles } from '@/styles/scanner.styles';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const { product, loading, error, search } = useBarcodeSearch();
    const { safeList } = useSafeList();
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        if (product) {
            setIsScanning(false);
            const isProductInSafeList = safeList.some(item => item._id === product._id);
            if (isProductInSafeList) {
                Alert.alert("Already in Safelist", "This product is already in your safelist.");
            } else {
                router.push({ pathname: "/product", params: { product: JSON.stringify(product) } });
            }
        }
        if (error) {
            setIsScanning(false);
            Alert.alert("Error", error);
        }
    }, [product, error, router, safeList]);

    // Use useFocusEffect to reset scanning state when the component is focused
    useFocusEffect(
        useCallback(() => {
            setIsScanning(true);
            return () => {
                // Optional: perform cleanup when the screen loses focus
                setIsScanning(false);
            };
        }, [])
    );

    const handleBarcodeScanned = useCallback((scanningResult: BarcodeScanningResult) => {
        if (!loading && isScanning) {
            setIsScanning(false);
            search(scanningResult.data);
        }
    }, [loading, isScanning, search]);

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
                    style={styles.camera}
                    onBarcodeScanned={handleBarcodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "ean13", "pdf417"],
                    }}
                />
            )}
            {!isScanning && !loading && (
                <View style={styles.scanAgainContainer}>
                    <Button title="Scan Another Product" onPress={() => setIsScanning(true)} />
                </View>
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
