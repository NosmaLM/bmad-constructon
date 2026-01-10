/**
 * Reports Screen - Field App
 */

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NAVY = '#1E3A5F';

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newReportButton}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.newReportText}>New Daily Report</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recent Reports</Text>

      <View style={styles.reportCard}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportDate}>January 9, 2026</Text>
          <View style={styles.submittedBadge}>
            <Text style={styles.badgeText}>Submitted</Text>
          </View>
        </View>
        <Text style={styles.reportSummary}>Foundation work - Section B completed</Text>
        <View style={styles.reportStats}>
          <View style={styles.stat}>
            <Ionicons name="people" size={16} color="#6B7280" />
            <Text style={styles.statText}>8 workers</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="images" size={16} color="#6B7280" />
            <Text style={styles.statText}>12 photos</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportCard}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportDate}>January 8, 2026</Text>
          <View style={styles.submittedBadge}>
            <Text style={styles.badgeText}>Submitted</Text>
          </View>
        </View>
        <Text style={styles.reportSummary}>Material delivery and site preparation</Text>
        <View style={styles.reportStats}>
          <View style={styles.stat}>
            <Ionicons name="people" size={16} color="#6B7280" />
            <Text style={styles.statText}>6 workers</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="images" size={16} color="#6B7280" />
            <Text style={styles.statText}>8 photos</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 16 },
  newReportButton: {
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  newReportText: { color: '#fff', fontWeight: '600', marginLeft: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#111827' },
  reportCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportDate: { fontWeight: '600', color: '#111827' },
  submittedBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: { color: '#059669', fontSize: 12, fontWeight: '500' },
  reportSummary: { color: '#6B7280', marginBottom: 12 },
  reportStats: { flexDirection: 'row', gap: 16 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { color: '#6B7280', fontSize: 12 },
});
