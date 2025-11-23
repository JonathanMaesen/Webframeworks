import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import AuthForm from '@/components/AuthForm';

export default function SignUpScreen() {
  const handleSignUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthForm
      title="Create Account"
      buttonText="Sign Up"
      onSubmit={handleSignUp}
      footerText="Already have an account? "
      footerLinkText="Login"
      footerLink="/login"
    />
  );
}