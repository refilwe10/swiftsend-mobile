import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../config';

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState('customer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields to continue.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    console.log('--- REGISTER ATTEMPT ---');
    console.log('URL:', `${API_URL}/register`);
    console.log('Sending:', { full_name: fullName, email, phone, address, role });

    try {
      const response = await axios.post(`${API_URL}/register`, {
        full_name: fullName,
        email: email,
        phone: phone,
        address: address,
        password: password,
        role: role
      });

      console.log('Register response:', response.data);

      if (response.data) {
        Alert.alert(
          'Success!',
          `${role === 'driver' ? 'Driver' : 'Customer'} account created successfully!`,
          [{ text: 'OK', onPress: () => router.push('/') }]
        );
      }
    } catch (error: any) {
      console.log('Register error:', error.message);
      console.log('Error response:', error.response?.data);
      
      let message = 'Registration failed. Please try again.';
      if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message === 'Network Error') {
        message = 'Network error. Check your Wi-Fi connection and IP address in config.js.';
      } else if (error.message) {
        message = error.message;
      }
      
      Alert.alert('Registration Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.logo}>SwiftSend</Text>
          <Text style={styles.subtitle}>Create Your Account</Text>

          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleBtn, role === 'customer' && styles.roleBtnActive]}
              onPress={() => setRole('customer')}
            >
              <Text style={[styles.roleText, role === 'customer' && styles.roleTextActive]}>
                Customer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleBtn, role === 'driver' && styles.roleBtnActive]}
              onPress={() => setRole('driver')}
            >
              <Text style={[styles.roleText, role === 'driver' && styles.roleTextActive]}>
                Driver
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password (min 6 characters)</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>
                Register as {role === 'driver' ? 'Driver' : 'Customer'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.linkContainer}>
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.link}>Login here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#ffffff', padding: 25, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#003087', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#FF6200', textAlign: 'center', marginBottom: 20, fontWeight: '600' },
  roleContainer: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 25 },
  roleBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 2, borderColor: '#E2E8F0', alignItems: 'center', backgroundColor: '#F8FAFC' },
  roleBtnActive: { borderColor: '#003087', backgroundColor: '#E0F2FE' },
  roleText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  roleTextActive: { color: '#003087' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#475569', marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: '#F1F5F9', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, fontSize: 16, color: '#1E293B' },
  button: { backgroundColor: '#003087', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#64748B', fontSize: 14 },
  link: { color: '#FF6200', fontWeight: 'bold' },
});