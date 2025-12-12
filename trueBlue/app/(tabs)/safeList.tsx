import React, { useCallback } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useSafeList } from "@/context/SafeListContext";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { getStyles } from '@/styles/safeList.styles';
import { Product } from "@/types/types";

const ProductListItem = React.memo(({ item, onPress }: { item: Product; onPress: (item: Product) => void; }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
      <TouchableOpacity onPress={() => onPress(item)}>
          <View style={styles.itemContainer}>
              <Image source={{ uri: item.image_url }} style={styles.itemImage} defaultSource={require('@/assets/images/icon.png')} />
              <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.product_name}</Text>
                  <Text style={styles.itemBrands}>{item.brands || 'N/A'}</Text>
              </View>
          </View>
      </TouchableOpacity>
  );
});

export default function SafeList(){
  const { safeList } = useSafeList();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleProductPress = useCallback((product: Product) => {
    router.push({ pathname: "/product", params: { product: JSON.stringify(product) } });
  }, [router]);

  const renderItem = useCallback(({ item }: { item: Product }) => (
    <ProductListItem item={item} onPress={handleProductPress} />
  ), [handleProductPress]);

  if (safeList.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Safelist</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your safelist is empty.</Text>
          <Text style={styles.emptySubText}>Scan a product to add it here.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Safelist</Text>
      </View>
      <FlatList
        data={safeList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ width: '100%' }}
      />
    </View>
  );
}
