import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Switch, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  // Notification preferences (toggles)
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Editable fields
  const [phone, setPhone] = useState('082 111 2233');
  const [vehicle, setVehicle] = useState('Toyota Quantum CA 123-456');

  const handleSave = () => {
    Alert.alert('Saved!', 'Your settings have been updated successfully.');
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'A password reset link has been sent to your email.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
          <Text style={styles.name}>Sipho Mokoena</Text>
          <Text style={styles.email}>sipho@swiftsend.co.za</Text>
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={[styles.label, { marginTop: 15 }]}>Vehicle Details</Text>
        <TextInput
          style={styles.input}
          value={vehicle}
          onChangeText={setVehicle}
        />
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Push Notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: '#CBD5E1', true: '#003087' }}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Email Notifications</Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#CBD5E1', true: '#003087' }}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>SMS Notifications</Text>
          <Switch
            value={smsNotifications}
            onValueChange={setSmsNotifications}
            trackColor={{ false: '#CBD5E1', true: '#003087' }}
          />
        </View>
      </View>

      {/* Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>

        <TouchableOpacity style={styles.actionRow} onPress={handleChangePassword}>
          <Text style={styles.actionText}>🔒 Change Password</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>SwiftSend Driver App</Text>
        <Text style={styles.aboutSubText}>Version 1.0.0</Text>
        <Text style={styles.aboutSubText}>© 2026 SwiftSend Couriers</Text>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#003087', padding: 20, paddingTop: 50, paddingBottom: 20 },
  backBtn: { marginBottom: 10 },
  backText: { color: '#FF6200', fontSize: 16, fontWeight: 'bold' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    marginBottom: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#003087', marginBottom: 15 },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#003087',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  email: { fontSize: 14, color: '#64748B', marginTop: 2 },
  label: { fontSize: 13, color: '#64748B', fontWeight: '600', textTransform: 'uppercase', marginBottom: 8 },
  input: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 15,
    color: '#1E293B',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  toggleLabel: { fontSize: 15, color: '#1E293B' },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionText: { fontSize: 15, color: '#1E293B' },
  actionArrow: { fontSize: 22, color: '#CBD5E1' },
  aboutText: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  aboutSubText: { fontSize: 13, color: '#64748B', marginTop: 4 },
  saveBtn: {
    backgroundColor: '#003087',
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#EF4444',
    marginHorizontal: 15,
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutBtnText: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },
});