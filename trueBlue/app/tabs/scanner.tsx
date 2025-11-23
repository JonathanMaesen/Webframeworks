import {Button, Text, View, ActivityIndicator, Alert, StyleSheet, Vibration} from "react-native";
import {CameraView, useCameraPermissions, BarcodeScanningResult} from "expo-camera";
import {useCallback, useEffect, useState} from "react";
import { useRouter } from "expo-router";
import { useBarcodeSearch } from "@/hooks/useBarcodeSearch";
import { useSafeList } from "@/context/SafeListContext";
import { useFocusEffect } from '@react-navigation/native';

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const { product, loading, error, search } = useBarcodeSearch();
    const { safeList } = useSafeList();
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);

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

    useFocusEffect(
        useCallback(() => {
            // When the screen is focused, allow scanning.
            setIsScanning(true);
            // When the screen is unfocused, stop scanning.
            return () => setIsScanning(false);
        }, [])
    );

    const handleBarcodeScanned = useCallback((scanningResult: BarcodeScanningResult) => {
        if (isScanning) {
            Vibration.vibrate();
            setIsScanning(false);
            search(scanningResult.data).catch(e => console.error(e));
        }
    }, [isScanning, search]);
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
                    onBarcodeScanned={handleBarcodeScanned}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    message: {
        textAlign: 'center',
        margin: 20,
        color: '#fff',
        fontSize: 16,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: { color: '#fff', marginTop: 10 },
    scanAgainContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
});
