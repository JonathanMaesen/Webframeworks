import { View, Text, Image, Button, Alert, ScrollView, Share, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSafeList } from "@/context/SafeListContext";
import { Product } from "@/types/types";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useMemo, useCallback } from "react";
import { getStyles } from "@/styles/product.styles";
import { isFromEU, getCountryDemonym } from '@/utils/countryUtils';
import { HighlightedIngredients } from "@/components/HighlightedIngredients";
import { NutriScoreProps } from "@/types/interfaces";

const nutriScoreColors: Record<string, string> = { A: '#038141', B: '#85BB2F', C: '#FECB02', D: '#F58220', E: '#E63E11' };

const NutriScore = React.memo(({ score, theme }: NutriScoreProps) => {
    if (!score) return null;
    
    const scoreUpper = score.toUpperCase();
    const styles = getStyles(theme);
    const backgroundColor = nutriScoreColors[scoreUpper] || '#ccc';

    return (
        <View style={styles.nutriScoreContainer}>
            <Text style={styles.nutriScoreText}>Nutri-Score:</Text>
            <View style={[styles.nutriScoreBadge, { backgroundColor }]}>
                <Text style={styles.nutriScoreLetter}>{scoreUpper}</Text>
            </View>
        </View>
    );
});

export default function ProductPage() {
    const { product: productString } = useLocalSearchParams<{ product: string }>();
    const { addToSafeList, removeFromSafeList, isProductInSafeList, loading: safeListLoading } = useSafeList();
    const { theme } = useTheme();
    const navigation = useNavigation();
    const styles = getStyles(theme);

    const product = useMemo(() => {
        if (!productString) return null;
        try {
            return JSON.parse(productString) as Product;
        } catch (e) {
            console.error("Failed to parse product data", e);
            return null;
        }
    }, [productString]);

    useEffect(() => {
        navigation.setOptions({ headerTitle: product?.product_name || 'Product Details' });
    }, [navigation, product]);

    const isProductInList = useMemo(() => product ? isProductInSafeList(product._id) : false, [product, isProductInSafeList]);
    const isFromEUOrigin = useMemo(() => product?.manufacturing_places ? isFromEU(product.manufacturing_places) : null, [product]);
    const originDemonym = useMemo(() => getCountryDemonym(product?.manufacturing_places), [product]);

    const handleShare = useCallback(async () => {
        if (!product) return;
        try {
            await Share.share({
                message: `Check out this product: ${product.product_name}\n${product.image_url || ''}`,
            });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }, [product]);

    if (!product) {
        return (
            <View style={styles.pageContainer}>
                <ActivityIndicator />
            </View>
        );
    }

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
