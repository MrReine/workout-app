import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { globalStyles } from '../../styles/global';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error signing in', error.message);
    } else {
        router.replace('/(app)'); // After login, go straight to the app
    }
    setLoading(false);
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10, width: '100%', borderRadius: 5, borderColor: '#ccc' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginVertical: 10, width: '100%', borderRadius: 5, borderColor: '#ccc' }}
      />
      <Button
        title={loading ? "Signing in..." : "Sign In"}
        onPress={handleSignIn}
        disabled={loading}
      />
      <Button
        title="Need an account? Sign Up"
        onPress={() => router.push('/(auth)/sign-up')}
      />
    </View>
  );
}
