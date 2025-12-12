import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useAllergens } from '@/context/AllergenContext';
import { getStyles } from '@/styles/product.styles';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/styles/Colors';
import { HighlightedIngredientsProps } from '@/types/interfaces'

export const HighlightedIngredients: React.FC<HighlightedIngredientsProps> = React.memo(({ text }) => {
  const { allergens } = useAllergens();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const currentColors = Colors[theme];

  const ingredientParts = useMemo(() => {
    if (!text) {
      return <Text style={styles.info}>Ingredients not available.</Text>;
    }

    if (allergens.length === 0) {
      return <Text style={styles.info}>{text}</Text>;
    }

    const allergenSet = new Set(allergens.map(a => a.toLowerCase()));
    // Split the text by word boundaries but keep the delimiters (like commas, spaces)
    const parts = text.split(/([^\w_])/); 

    return parts.map((part, index) => {
      // Check if the trimmed, lowercased part is in our allergen set
      if (allergenSet.has(part.trim().toLowerCase())) {
        return (
          <Text key={index} style={{ backgroundColor: currentColors.highlight, color: '#000000', fontWeight: 'bold' }}>
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  }, [text, allergens, styles, currentColors]);

  return (
    <Text style={styles.info}>
      {ingredientParts}
    </Text>
  );
});
