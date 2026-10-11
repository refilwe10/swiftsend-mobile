import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

// 1. Here is the definition TypeScript was asking for
interface Delivery {
  id: string;
  tracking: string;
  pickup: string;
  dropoff: string;
  status: string;
}

export default function Dashboard() {
  // 2. We tell TypeScript that 'deliveries' is an array of Delivery objects
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching deliveries
    setTimeout(() => {
      setDeliveries([
        { id: '1', tracking: 'SS-100001', pickup: 'Sandton', dropoff: 'Rosebank', status: 'Picked Up' },
        { id: '2', tracking: 'SS-100004', pickup: 'Cape Town', dropoff: 'Sandton', status: 'In Transit' },
        { id: '3', tracking: 'SS-100007', pickup: 'Johannesburg', dropoff: 'Northcliff', status: 'Pending' },
        { id: '4', tracking: 'SS-100008', pickup: 'Northcliff', dropoff: 'Roodepoort', status: 'Picked Up' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // 3. We tell TypeScript that 'status' is a string
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#10B981';
      case 'In Transit': return '#0369A1';
      case 'Picked Up': return '#1E40AF';
      default: return '#B45309';
    }
  };

  // 4. We tell TypeScript that 'item' is a Delivery object
  const renderDelivery = ({ item }: { item: Delivery }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.tracking}>📦 {item.tracking}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.route}>From: {item.pickup}</Text>
      <Text style={styles.route}>To: {item.dropoff}</Text>
      
      {/* ✨ Button navigates to the details screen */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push({
          pathname: '/delivery-details',
          params: { tracking: item.tracking }
        })}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003087" />
        <Text style={styles.loadingText}>Loading deliveries...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ✨ UPDATED HEADER WITH SETTINGS GEAR */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Driver Dashboard</Text>
            <Text style={styles.headerSubtitle}>👤 Sipho Mokoena</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsBtn}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today's Assignments ({deliveries.length})</Text>

      <FlatList
        data={deliveries}
        renderItem={renderDelivery}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: '#003087',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: '#FF6200', fontSize: 16, marginTop: 5 },
  settingsBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: { fontSize: 22 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', margin: 20, marginBottom: 10 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tracking: { fontSize: 16, fontWeight: 'bold', color: '#003087' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  route: { fontSize: 14, color: '#475569', marginBottom: 4 },
  button: {
    backgroundColor: '#003087',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#475569' },
});