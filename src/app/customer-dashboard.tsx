import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../config';
import { clearUser } from '../auth';

interface Delivery {
  delivery_id: number;
  tracking_number: string;
  pickup_address: string;
  delivery_address: string;
  status: string;
  parcel_description: string;
  weight_kg: number;
  booking_date: string;
}

export default function CustomerDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      // Customer ID 1 = John Doe (from your database)
      const response = await axios.get(`${API_URL}/customers/1/deliveries`);
      console.log('Customer deliveries:', response.data);
      setDeliveries(response.data);
    } catch (error: any) {
      console.error('Fetch error:', error.message);
      Alert.alert('Connection Error', 'Could not load your parcels. Check your network.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#10B981';
      case 'In Transit': return '#0369A1';
      case 'Picked Up': return '#1E40AF';
      default: return '#B45309';
    }
  };

  const handleLogout = async () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to log out?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await clearUser();
          router.replace('/');
        }
      }
    ]
  );
};
  const renderDelivery = ({ item }: { item: Delivery }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.tracking}>📦 {item.tracking_number}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>From:</Text>
        <Text style={styles.value}>{item.pickup_address}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>To:</Text>
        <Text style={styles.value}>{item.delivery_address}</Text>
      </View>

      {item.parcel_description && (
        <View style={styles.infoRow}>
          <Text style={styles.label}>Parcel:</Text>
          <Text style={styles.value}>{item.parcel_description}</Text>
        </View>
      )}

      {item.booking_date && (
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date(item.booking_date).toDateString()}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003087" />
        <Text style={styles.loadingText}>Loading your parcels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>My Parcels</Text>
            <Text style={styles.headerSubtitle}>👤 Welcome back!</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>Tracking ({deliveries.length})</Text>
        <TouchableOpacity onPress={fetchDeliveries}>
          <Text style={styles.refreshText}>🔄 Refresh</Text>
        </TouchableOpacity>
      </View>

      {deliveries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No parcels yet</Text>
          <Text style={styles.emptySubText}>Book a delivery on the website to see it here</Text>
        </View>
      ) : (
        <FlatList
          data={deliveries}
          renderItem={renderDelivery}
          keyExtractor={(item) => item.delivery_id.toString()}
          contentContainerStyle={styles.list}
          onRefresh={fetchDeliveries}
          refreshing={loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#003087', padding: 20, paddingTop: 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: '#FF6200', fontSize: 16, marginTop: 5 },
  logoutBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.15)' },
  logoutText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  refreshText: { color: '#003087', fontSize: 14, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tracking: { fontSize: 16, fontWeight: 'bold', color: '#003087' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  infoRow: { flexDirection: 'row', marginBottom: 6 },
  label: { fontSize: 13, color: '#64748B', fontWeight: '600', width: 70 },
  value: { fontSize: 14, color: '#1E293B', flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#475569' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#64748B' },
  emptySubText: { fontSize: 14, color: '#94A3B8', marginTop: 8, textAlign: 'center' },
});