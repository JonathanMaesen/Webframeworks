import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/auth.styles';
import {AuthFormProps} from "@/types & interfaces/interfaces";


export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  footerText,
  footerLinkText,
  footerLink,
} : AuthFormProps) {
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
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? `${buttonText}...` : buttonText} onPress={handlePress} disabled={loading} />
      <View style={styles.footer}>
        <Text>{footerText}</Text>
          <Text style={styles.link} onPress={() => router.push(footerLink)}>{footerLinkText}</Text>
      </View>
    </View>
  );
}
