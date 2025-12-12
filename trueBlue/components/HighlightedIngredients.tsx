import React from 'react';
import { Text } from 'react-native';
import { useAllergens } from '@/context/AllergenContext';
import { getStyles } from '@/styles/product.styles';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { HighlightedIngredientsProps } from '@/types/interfaces'

export const HighlightedIngredients: React.FC<HighlightedIngredientsProps> = ({ text }) => {
  const { allergens } = useAllergens();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const currentColors = Colors[theme];

  if (!text) {
    return <Text style={styles.info}>Ingredients not available.</Text>;
  }

  if (allergens.length === 0) {
    return <Text style={styles.info}>{text}</Text>;
  }

  const allergenSet = new Set(allergens.map(a => a.toLowerCase()));

  const parts = text.split(/([^\w_])/);

  return (
    <Text style={styles.info}>
      {parts.map((part, index) => {
        if (allergenSet.has(part.toLowerCase())) {
          return (
            <Text key={index} style={{ backgroundColor: currentColors.highlight, color: '#000000' }}>
              {part}
            </Text>
          );
        }
        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
};
