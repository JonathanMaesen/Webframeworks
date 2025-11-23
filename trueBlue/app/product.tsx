import { View, Text, Image, Button, Alert, ScrollView, Share } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
// @ts-ignore
import { useSafeList, Product } from "@/context/SafeListContext";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect, useCallback, useRef } from "react";
import { getStyles } from "@/styles/product.styles";
import { isFromEU, getCountryDemonym } from '@/utils/countryUtils';

const NutriScore = ({ score, theme }: { score: string | undefined, theme: 'light' | 'dark' }) => {
    if (!score) return null;
    const scoreUpper = score.toUpperCase();
    const styles = getStyles(theme);
    const scoreColors: { [key: string]: string } = { A: '#038141', B: '#85BB2F', C: '#FECB02', D: '#F58220', E: '#E63E11' };
    return (
        <View style={styles.nutriScoreContainer}>
            <Text style={styles.nutriScoreText}>Nutri-Score:</Text>
            <View style={[styles.nutriScoreBadge, { backgroundColor: scoreColors[scoreUpper] || '#ccc' }]}>
                <Text style={styles.nutriScoreLetter}>{scoreUpper}</Text>
            </View>
        </View>
    );
};

export default function ProductPage() {
    const { product: productString } = useLocalSearchParams<{ product: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { addToSafeList, removeFromSafeList, safeList } = useSafeList();
    const router = useRouter();
    const { theme } = useTheme();
    const navigation = useNavigation();
    const styles = getStyles(theme);
    const [isFromEUOrigin, setIsFromEUOrigin] = useState<boolean | null>(null);
    const isProcessing = useRef(false);

    const isProductAlreadyInSafeList = product ? safeList.some(p => p._id === product._id) : false;

    useEffect(() => {
        try {
            if (productString) {
                const parsedProduct = JSON.parse(productString);
                setProduct(parsedProduct);
            }
        } catch (e) {
            console.error("Failed to parse product data", e);
        }
    }, [productString]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: product?.product_name || 'Product',
        });
    }, [navigation, product]);

    const checkEUOrigin = useCallback(async () => {
        if (product?.manufacturing_places) {
            const result = isFromEU(product.manufacturing_places);
            setIsFromEUOrigin(result);
        } else {
            setIsFromEUOrigin(null);
        }
    }, [product?.manufacturing_places]);

    useEffect(() => {
        checkEUOrigin();
    }, [checkEUOrigin]);

    if (!product) {
        return (
            <View style={styles.pageContainer}>
                <Text style={styles.info}>No product data found.</Text>
            </View>
        );
    }

    const handleAddToSafelist = async () => {
        if (isProcessing.current) return;

        if (product) {
            isProcessing.current = true;
            try {
                await addToSafeList(product);
                Alert.alert(
                    "Added to Safelist",
                    `${product.product_name || product.brands?.split(',')[0].trim()} has been added.`,
                    [
                        { text: "OK" },
                        { text: "Go to Safelist", onPress: () => router.push('/tabs/safeList') }
                    ]
                );
            } catch (error: any) {
                console.error("Error adding to safelist:", error);
                Alert.alert("Error", "There was an issue adding the product to your safelist. Please try again.");
            } finally {
                isProcessing.current = false;
            }
        }
    };

    const handleRemoveFromSafelist = async () => {
        if (isProcessing.current) return;

        if (product?._id) {
            isProcessing.current = true;
            try {
                await removeFromSafeList(product._id);
                Alert.alert(
                    "Removed from Safelist",
                    `${product.product_name || 'The product'} has been removed.`,
                    [{ text: "OK" }]
                );
            } catch (error) {
                console.error("Error removing from safelist:", error);
                Alert.alert("Error", "There was an issue removing the product from your safelist. Please try again.");
            } finally {
                isProcessing.current = false;
            }
        }
    };

    const handleShare = async () => {
        if (!product) return;
        try {
            await Share.share({
                message: `Check out this product: ${product.product_name}\n${product.image_url || ''}`,
            });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const originDemonym = getCountryDemonym(product.manufacturing_places);

    return (
        <View style={styles.pageContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>{product.product_name || 'No product name'}</Text>
                {product.image_url && (
                    <Image source={{ uri: product.image_url }} style={styles.image} />
                )}
                
                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Brands:</Text>
                        <Text style={styles.info}>{product.brands || 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Quantity:</Text>
                        <Text style={styles.info}>{product.quantity || 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Origin:</Text>
                        <View style={styles.countryContainer}>
                            <Text style={styles.info}>{originDemonym}</Text>
                            {isFromEUOrigin === true && <FontAwesomeIcon icon="check-circle" size={20} color="green" style={styles.icon} />}
                            {isFromEUOrigin === false && <FontAwesomeIcon icon="times-circle" size={20} color="red" style={styles.icon} />}
                        </View>
                    </View>
                    <NutriScore score={product.nutrition_grade_fr} theme={theme} />
                </View>

                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    <Text style={styles.info}>{product.ingredients_text || 'Not available.'}</Text>
                </View>

                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Allergens</Text>
                    <Text style={styles.info}>{product.allergens_from_ingredients || 'None listed.'}</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                {isProductAlreadyInSafeList ? (
                    <Button title="Remove from Safelist" onPress={handleRemoveFromSafelist} color="red" />
                ) : (
                    <Button title="Add to Safelist" onPress={handleAddToSafelist} />
                )}
                <View style={{ marginTop: 10 }}><Button title="Share" onPress={handleShare} /></View>
            </View>
        </View>
    );
}
