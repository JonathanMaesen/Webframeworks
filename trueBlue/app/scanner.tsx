import {Button, StyleSheet, Text, View} from "react-native";
import {CameraView, useCameraPermissions, BarcodeScanningResult} from "expo-camera";
import {useCallback} from "react";

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const handleBarcodeScanned = useCallback((scanningResult: BarcodeScanningResult) => {
        const { type, data } = scanningResult;
        console.log(`Barcode of type ${type} with data ${data} has been scanned!`);
        alert(`Scanned: ${data}`);
    }, []);

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "ean13", "pdf417"],
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
});