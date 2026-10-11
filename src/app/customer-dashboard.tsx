import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Delivery {
  delivery_id: number;
  tracking_number: string;
  pickup_address: string;
  delivery_address: string;
  status: string;
}

export default function CustomerDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Demo data - in real app, fetch from /api/customers/1/deliveries
    setTimeout(() => {
      setDeliveries([
        { delivery_id: 1, tracking_number: 'SS-100001', pickup_address: 'Sandton', delivery_address: 'Rosebank', status: 'In Transit' },
        { delivery_id: 2, tracking_number: 'SS-100002', pickup_address: 'Rosebank', delivery_address: 'Pretoria', status: 'Delivered' },
        { delivery_id: 3, tracking_number: 'SS-100003', pickup_address: 'Pretoria', delivery_address: 'Cape Town', status: 'Pending' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#10B981';
      case 'In Transit': return '#0369A1';
      case 'Picked Up': return '#1E40AF';
      default: return '#B45309';
    }
  };

  const renderDelivery = ({ item }: { item: Delivery }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.tracking}>📦 {item.tracking_number}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.route}>From: {item.pickup_address}</Text>
      <Text style={styles.route}>To: {item.delivery_address}</Text>
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
        <Text style={styles.headerTitle}>My Parcels</Text>
        <Text style={styles.headerSubtitle}>👤 Welcome back!</Text>
      </View>

      <Text style={styles.sectionTitle}>Tracking ({deliveries.length})</Text>

      <FlatList
        data={deliveries}
        renderItem={renderDelivery}
        keyExtractor={(item) => item.delivery_id.toString()}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity 
        style={styles.logoutBtn}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#003087', padding: 20, paddingTop: 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: '#FF6200', fontSize: 16, marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', margin: 20, marginBottom: 10 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tracking: { fontSize: 16, fontWeight: 'bold', color: '#003087' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  route: { fontSize: 14, color: '#475569', marginBottom: 4 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#475569' },
  logoutBtn: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#EF4444', marginHorizontal: 20, marginBottom: 20, paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },
});