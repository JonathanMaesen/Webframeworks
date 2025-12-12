import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/Colors';
import { Theme } from '@/types/types';

export const getAuthStyles = (theme: Theme) => {
  const currentColors = Colors[theme];
  
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: currentColors.background,
    },
    logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: 30,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: currentColors.text,
    },
    input: {
      marginBottom: 15,
    },
    button: {
      marginTop: 10,
      paddingVertical: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    link: {
      color: currentColors.tint,
      fontWeight: '600',
    },
  });
};