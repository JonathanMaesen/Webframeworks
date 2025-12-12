import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuthStyles } from '@/styles/auth.styles';
import { useTheme } from '@/context/ThemeContext';
import { AuthFormProps } from "@/types/interfaces";
import { TextInput, Button, Text } from 'react-native-paper';

import TrueBlueLogo from '@/assets/images/TrueBlueLogo.jpg';

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  footerText,
  footerLinkText,
  footerLink,
}: AuthFormProps) {
  const { theme } = useTheme();
  const styles = getAuthStyles(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePress = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (error: any) {
      Alert.alert(`${title} Failed`, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={TrueBlueLogo} style={styles.logo} />
      <Text variant="headlineLarge" style={styles.title}>{title}</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button 
        mode="contained" 
        onPress={handlePress} 
        loading={loading} 
        disabled={loading}
        style={styles.button}
      >
        {buttonText}
      </Button>
      <View style={styles.footer}>
        <Text>{footerText}</Text>
        <Text style={styles.link} onPress={() => router.push(footerLink)}>{footerLinkText}</Text>
      </View>
    </View>
  );
}