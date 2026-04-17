import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { globalStyles } from '../../styles/global';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignUp() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error signing up', error.message);
    } else if (data.session) {
        // If sign up is successful and user is logged in
        router.push('/(onboarding)/name');
    } else {
        Alert.alert('Success!', 'Please check your email for confirmation.');
    }
    setLoading(false);
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Create an Account</Text>
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
        title={loading ? "Creating account..." : "Sign Up"}
        onPress={handleSignUp}
        disabled={loading}
      />
      <Button
        title="Already have an account? Sign In"
        onPress={() => router.push('/(auth)/sign-in')}
      />
    </View>
  );
}
