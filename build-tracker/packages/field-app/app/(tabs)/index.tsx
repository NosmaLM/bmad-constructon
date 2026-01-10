/**
 * Today Screen - Field App Dashboard
 */

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const NAVY = '#1E3A5F';
const GOLD = '#C9A227';
const SUCCESS = '#10B981';

export default function TodayScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' }}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Field Operations</Text>
          <Text style={styles.heroSubtitle}>Building excellence on-site</Text>
        </View>
      </View>

      {/* Site Info */}
      <View style={styles.siteCard}>
        <Text style={styles.siteName}>Villa Project - Plot 15</Text>
        <Text style={styles.siteAddress}>123 Highland Road, Borrowdale</Text>
        <View style={styles.siteStatus}>
          <View style={[styles.statusDot, { backgroundColor: SUCCESS }]} />
          <Text style={styles.statusText}>Active - Foundation Phase</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="checkmark-circle" size={32} color={NAVY} />
          <Text style={styles.actionLabel}>Check In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="camera" size={32} color={NAVY} />
          <Text style={styles.actionLabel}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="document-text" size={32} color={NAVY} />
          <Text style={styles.actionLabel}>Daily Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="warning" size={32} color={NAVY} />
          <Text style={styles.actionLabel}>Report Issue</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <View style={[styles.taskPriority, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.taskTitle}>Pour foundation section B</Text>
          </View>
          <Text style={styles.taskDescription}>Complete concrete pour for section B of foundation</Text>
          <View style={styles.taskFooter}>
            <Text style={styles.taskTime}>Due: 5:00 PM</Text>
            <TouchableOpacity style={styles.taskAction}>
              <Text style={{ color: NAVY, fontWeight: '600' }}>Mark Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <View style={[styles.taskPriority, { backgroundColor: SUCCESS }]} />
            <Text style={styles.taskTitle}>Material delivery check</Text>
          </View>
          <Text style={styles.taskDescription}>Verify cement and aggregate delivery</Text>
          <View style={styles.taskFooter}>
            <Text style={styles.taskTime}>Due: 10:00 AM</Text>
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark" size={14} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>Done</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Weather */}
      <View style={styles.weatherCard}>
        <Ionicons name="sunny" size={24} color={GOLD} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.weatherTemp}>28°C - Sunny</Text>
          <Text style={styles.weatherStatus}>Good conditions for concrete work</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  heroBanner: {
    width: screenWidth,
    height: 180,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(30, 58, 95, 0.75)',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 13,
    color: GOLD,
    marginTop: 2,
  },
  siteCard: {
    backgroundColor: NAVY,
    padding: 20,
    margin: 16,
    borderRadius: 12,
  },
  siteName: { color: '#fff', fontSize: 20, fontWeight: '700' },
  siteAddress: { color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  siteStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { color: '#fff' },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 4,
  },
  actionLabel: { marginTop: 8, fontWeight: '500', color: NAVY },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#111827' },
  taskCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  taskHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  taskPriority: { width: 4, height: 24, borderRadius: 2, marginRight: 12 },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  taskDescription: { color: '#6B7280', marginBottom: 12 },
  taskFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTime: { color: '#9CA3AF', fontSize: 12 },
  taskAction: { paddingVertical: 4 },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SUCCESS,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  weatherCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  weatherTemp: { fontWeight: '600', color: '#111827' },
  weatherStatus: { color: '#6B7280', fontSize: 12, marginTop: 2 },
});
