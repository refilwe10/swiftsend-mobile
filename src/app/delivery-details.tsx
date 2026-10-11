import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DeliveryDetails() {
  const router = useRouter();
  // This grabs the delivery ID passed from the dashboard
  const { tracking } = useLocalSearchParams<{ tracking: string }>();
  
  const [status, setStatus] = useState('Picked Up');

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    Alert.alert(
      'Status Updated!',
      `Delivery ${tracking} is now marked as: ${newStatus}`,
      [{ text: 'OK' }]
    );
  };

  const confirmDelivery = () => {
    Alert.alert(
      'Proof of Delivery',
      'Confirm delivery of this parcel?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            setStatus('Delivered');
            Alert.alert('Success!', 'Parcel delivered. Customer has been notified.');
          }
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
        <Text style={styles.headerTitle}>Delivery Details</Text>
      </View>

      {/* Delivery Info Card */}
      <View style={styles.card}>
        <Text style={styles.tracking}> {tracking || 'SS-100001'}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <View style={[styles.badge, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.badgeText}>{status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Pickup Address</Text>
        <Text style={styles.value}>123 Main St, Sandton, Johannesburg</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Delivery Address</Text>
        <Text style={styles.value}>45 Oxford Rd, Rosebank, Johannesburg</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Parcel Description</Text>
        <Text style={styles.value}>Electronics – Laptop (Fragile)</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Customer</Text>
        <Text style={styles.value}>John Doe • 082 555 1234</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Text style={styles.actionTitle}>Update Status</Text>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#FF6200' }]} 
          onPress={() => updateStatus('Picked Up')}
        >
          <Text style={styles.btnText}>Mark as Picked Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#0369A1' }]} 
          onPress={() => updateStatus('In Transit')}
        >
          <Text style={styles.btnText}>Mark as In Transit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#10B981' }]} 
          onPress={confirmDelivery}
        >
          <Text style={styles.btnText}>Confirm Delivery + POD</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return '#10B981';
    case 'In Transit': return '#0369A1';
    case 'Picked Up': return '#1E40AF';
    default: return '#B45309';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#003087', padding: 20, paddingTop: 50, paddingBottom: 20 },
  backBtn: { marginBottom: 10 },
  backText: { color: '#FF6200', fontSize: 16, fontWeight: 'bold' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  tracking: { fontSize: 20, fontWeight: 'bold', color: '#003087', marginBottom: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 13, color: '#64748B', fontWeight: '600', textTransform: 'uppercase' },
  value: { fontSize: 15, color: '#1E293B', marginTop: 4 },
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  actions: { paddingHorizontal: 20, paddingBottom: 40 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  btn: { paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});