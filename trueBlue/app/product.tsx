import { View, Text, Image, Button, Alert, ScrollView, Share, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
// @ts-ignore
import { useSafeList, Product } from "@/context/SafeListContext";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import { getStyles } from "@/styles/product.styles";
import { isFromEU, getCountryDemonym } from '@/utils/countryUtils';
import { HighlightedIngredients } from "@/components/HighlightedIngredients";

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
    const { addToSafeList, removeFromSafeList, isProductInSafeList, loading: safeListLoading } = useSafeList();
    const { theme } = useTheme();
    const navigation = useNavigation();
    const styles = getStyles(theme);
    const [isFromEUOrigin, setIsFromEUOrigin] = useState<boolean | null>(null);

    const isProductInList = product ? isProductInSafeList(product._id) : false;

    useEffect(() => {
        try {
            if (productString) {
                const parsedProduct = JSON.parse(productString);
                setProduct(parsedProduct);
                navigation.setOptions({ headerTitle: parsedProduct.product_name || 'Product' });
                if (parsedProduct.manufacturing_places) {
                    setIsFromEUOrigin(isFromEU(parsedProduct.manufacturing_places));
                }
            }
        } catch (e) {
            console.error("Failed to parse product data", e);
        }
    }, [productString, navigation]);

    if (!product) {
        return (
            <View style={styles.pageContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    const handleShare = async () => {
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
                    <HighlightedIngredients text={product.ingredients_text || ''} />
                </View>

                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Allergens</Text>
                    <Text style={styles.info}>{product.allergens_from_ingredients || 'None listed.'}</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                {safeListLoading ? (
                    <ActivityIndicator />
                ) : isProductInList ? (
                    <Button title="Remove from Safelist" onPress={() => removeFromSafeList(product._id)} color="red" />
                ) : (
                    <Button title="Add to Safelist" onPress={() => addToSafeList(product)} />
                )}
                <View style={{ marginTop: 10 }}><Button title="Share" onPress={handleShare} /></View>
            </View>
        </View>
    );
}
