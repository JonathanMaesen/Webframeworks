import { View, Text, Image, Button, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
// @ts-ignore
import { useSafeList, Product } from "@/context/SafeListContext";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import { getStyles } from "@/styles/product.styles";

const EU_COUNTRIES = new Set([
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
    'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta',
    'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden'
]);

function isFromEU(countries: string | undefined): boolean {
    if (!countries) return false;
    const countryList = countries.split(',').map(c => c.trim());
    return countryList.some(country => EU_COUNTRIES.has(country));
}

const NutriScore = ({ score, theme }: { score: string | undefined, theme: 'light' | 'dark' }) => {
    if (!score) return null;
    const scoreUpper = score.toUpperCase();
    const scoreColors: { [key: string]: string } = {
        A: '#038141', B: '#85BB2F', C: '#FECB02', D: '#F58220', E: '#E63E11',
    };
    const styles = getStyles(theme);

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
    const { addToSafeList, isProductInSafeList } = useSafeList();
    const router = useRouter();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const [isProductAlreadyInSafeList, setIsProductAlreadyInSafeList] = useState<boolean | undefined>(undefined); // New state

    useEffect(() => {
        try {
            if (productString) {
                setProduct(JSON.parse(productString));
            }
        } catch (e) {
            console.error("Failed to parse product data", e);
        }
    }, [productString]);

    // Effect to check if product is in safelist
    useEffect(() => {
        if (product?._id) {
            const checkSafelist = async () => {
                const isInList = await isProductInSafeList(product._id);
                setIsProductAlreadyInSafeList(isInList);
            };
            checkSafelist();
        } else {
            setIsProductAlreadyInSafeList(undefined); // Reset if no product ID
        }
    }, [product?._id, isProductInSafeList]); // Re-run when product ID or isProductInSafeList changes


    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.info}>No product data found.</Text>
            </View>
        );
    }

    const handleAddToSafelist = () => {
        if (product) {
            addToSafeList(product);
            Alert.alert(
                "Added to Safelist",
                `${product.product_name || product.brands?.split(',')[0].trim()} has been added.`,
                [
                    { text: "OK" },
                    { text: "Go to Safelist", onPress: () => router.push('/tabs/safeList') }
                ]
            );
            setIsProductAlreadyInSafeList(true);
        }
    };

    const fromEU = isFromEU(product?.countries);

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <Text style={styles.title}>{product.product_name || 'No product name'}</Text>
            {product.image_url && (
                <Image source={{ uri: product.image_url }} style={styles.image} />
            )}
            
            <View style={styles.infoSection}>
                <Text style={styles.brands}>Brands: {product.brands || 'N/A'}</Text>
                <Text style={styles.info}>Quantity: {product.quantity || 'N/A'}</Text>
                <View style={styles.countryContainer}>
                    <Text style={styles.info}>Countries: {product.countries || 'N/A'}</Text>
                    {fromEU && <FontAwesomeIcon icon="check-circle" size={20} color="green" style={styles.icon} />}
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

            <View style={styles.buttonContainer}>
                <Button 
                    title={isProductAlreadyInSafeList ? "Already in Safelist" : "Add to Safelist"} 
                    onPress={handleAddToSafelist} 
                    disabled={isProductAlreadyInSafeList === undefined ? true : isProductAlreadyInSafeList} // Use the new state
                />
            </View>
        </ScrollView>
    );
}
