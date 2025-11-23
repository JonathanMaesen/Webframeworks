import React from 'react';
import { Text } from 'react-native';
import { useAllergens } from '@/context/AllergenContext';
import { getStyles } from '@/styles/product.styles';
import { useTheme } from '@/context/ThemeContext';

interface HighlightedIngredientsProps {
  text: string;
}

export const HighlightedIngredients: React.FC<HighlightedIngredientsProps> = ({ text }) => {
  const { allergens } = useAllergens();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  if (!text) {
    return <Text style={styles.info}>Ingredients not available.</Text>;
  }

  // Create a regex that matches any of the allergens, case-insensitively
  const regex = new RegExp(`\\b(${allergens.join('|')})\\b`, 'gi');

  // Split the text by the regex to find the parts that are not allergens
  const parts = text.split(regex);

  return (
    <Text style={styles.info}>
      {parts.map((part, index) => {
        // Check if the part is one of the allergens
        if (allergens.includes(part.toLowerCase())) {
          // If it is, render it with a highlighted style
          return (
            <Text key={index} style={{ backgroundColor: 'yellow', color: 'black' }}>
              {part}
            </Text>
          );
        }
        // Otherwise, render it as normal text
        return part;
      })}
    </Text>
  );
};
