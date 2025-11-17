import {Button, Text, View, ActivityIndicator, Alert} from "react-native";
import {CameraView, useCameraPermissions, BarcodeScanningResult} from "expo-camera";
import {useCallback, useEffect} from "react";
import { useRouter } from "expo-router";
import { useBarcodeSearch } from "@/hooks/useBarcodeSearch";
import { useSafeList } from "@/context/SafeListContext";
import { styles } from '../../styles/scanner.styles';

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const { product, loading, error, search } = useBarcodeSearch();
    const { safeList } = useSafeList();
    const router = useRouter();

    useEffect(() => {
        if (product) {
            const isProductInSafeList = safeList.some(item => item._id === product._id);
            if (isProductInSafeList) {
                Alert.alert("Already in Safelist", "This product is already in your safelist.");
            } else {
                router.push({ pathname: "/product", params: { product: JSON.stringify(product) } });
            }
        }
        if (error) {
            Alert.alert("Error", error);
        }
    }, [product, error, router, safeList]);

    const handleBarcodeScanned = useCallback((scanningResult: BarcodeScanningResult) => {
        if (!loading) {
            search(scanningResult.data);
        }
    }, [loading, search]);

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
            <CameraView
                style={styles.camera}
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "ean13", "pdf417"],
                }}
            />
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Searching...</Text>
                </View>
            )}
        </View>
    );
}
