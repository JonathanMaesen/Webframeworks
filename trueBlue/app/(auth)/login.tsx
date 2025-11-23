import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import AuthForm from '@/components/AuthForm';

export default function LoginScreen() {
  const handleLogin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={handleLogin}
      footerText="Don't have an account? "
      footerLinkText="Sign Up"
      footerLink="/signup"
    />
  );
}