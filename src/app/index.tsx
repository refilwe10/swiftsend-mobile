import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { API_URL } from '../config';
import { saveUser, getUser } from '../auth';

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  const webClientId = "536310536387-iibauviicbn5m6sasoh7lmsi91hg29q1.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId,
    androidClientId: webClientId,
  });

  useEffect(() => {
    checkExistingSession();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('Google Sign-In Success:', userCredential.user);
          Alert.alert(
            'Success!',
            `Welcome, ${userCredential.user.displayName || 'User'}!`,
            [{ text: 'OK', onPress: () => router.replace('/dashboard') }]
          );
        })
        .catch((error) => {
          console.error('Firebase Auth error:', error);
          Alert.alert('Google Sign-In Error', 'Could not complete sign-in.');
        });
    }
  }, [response]);

  const checkExistingSession = async () => {
    const session = await getUser();
    if (session && session.user) {
      router.replace(session.role === 'driver' ? '/dashboard' : '/customer-dashboard');
    } else {
      setCheckingSession(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
        role: role
      });
      if (response.data && response.data.message === 'Login successful!') {
        await saveUser(response.data.user, role);
        Alert.alert('Success!', `Welcome back, ${response.data.user.full_name}!`, [{
          text: 'OK',
          onPress: () => router.replace(role === 'driver' ? '/dashboard' : '/customer-dashboard')
        }]);
      }
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed. Please try again.';
      Alert.alert('Login Error', message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003087" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>SwiftSend</Text>
        <Text style={styles.subtitle}>Courier System</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleBtn, role === 'customer' && styles.roleBtnActive]}
            onPress={() => setRole('customer')}
          >
            <Text style={[styles.roleText, role === 'customer' && styles.roleTextActive]}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleBtn, role === 'driver' && styles.roleBtnActive]}
            onPress={() => setRole('driver')}
          >
            <Text style={[styles.roleText, role === 'driver' && styles.roleTextActive]}>Driver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} disabled={!request} onPress={() => promptAsync()}>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerLink}>
          <Text style={styles.registerText}>
            New user? <Text style={styles.registerBold}>Register here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#ffffff', padding: 25, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#003087', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#FF6200', textAlign: 'center', marginBottom: 20, fontWeight: '600' },
  roleContainer: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 25 },
  roleBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 2, borderColor: '#E2E8F0', alignItems: 'center', backgroundColor: '#F8FAFC' },
  roleBtnActive: { borderColor: '#003087', backgroundColor: '#E0F2FE' },
  roleText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  roleTextActive: { color: '#003087' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#475569', marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: '#F1F5F9', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, fontSize: 16, color: '#1E293B' },
  button: { backgroundColor: '#003087', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  googleButton: { backgroundColor: '#DB4437', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  googleButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerText: { color: '#64748B', fontSize: 14 },
  registerBold: { color: '#FF6200', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  loadingText: { marginTop: 10, color: '#475569' },
});