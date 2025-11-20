import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useSafeList } from "@/context/SafeListContext";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { getStyles } from '@/styles/safeList.styles';

export default function SafeList(){
  const { safeList } = useSafeList();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleProductPress = (product: any) => {
    router.push({ pathname: "/product", params: { product: JSON.stringify(product) } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Safelist</Text>
      </View>
      {safeList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your safelist is empty.</Text>
          <Text style={styles.emptySubText}>Scan a product to add it here.</Text>
        </View>
      ) : (
        <FlatList
          data={safeList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item)}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image_thumb_url || item.image_url }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.product_name}</Text>
                  <Text style={styles.itemBrands}>{item.brands || 'N/A'}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ width: '100%' }}
        />
      )}
    </View>
  );
}
