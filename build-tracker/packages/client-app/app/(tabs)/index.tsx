/**
 * Dashboard Screen
 */

import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/auth';

export default function DashboardScreen() {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  const { data: dashboardData, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get('/dashboard/client');
      return response.data.data;
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
          Welcome back,
        </Text>
        <Text style={[styles.userName, { color: theme.colors.text }]}>
          {user?.firstName} {user?.lastName}
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View
          style={[
            styles.statCard,
            { backgroundColor: theme.colors.primary.navy },
          ]}
        >
          <Text style={styles.statNumber}>
            {dashboardData?.activeProjects || 0}
          </Text>
          <Text style={styles.statLabel}>Active Projects</Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: theme.colors.primary.gold },
          ]}
        >
          <Text style={[styles.statNumber, { color: theme.colors.primary.navy }]}>
            {dashboardData?.upcomingMilestones || 0}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.primary.navy }]}>
            Upcoming Milestones
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: theme.colors.secondary.lightBlue },
          ]}
        >
          <Text style={styles.statNumber}>
            ${((dashboardData?.totalInvested || 0) / 1000).toFixed(0)}k
          </Text>
          <Text style={styles.statLabel}>Total Invested</Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: theme.colors.status.warning },
          ]}
        >
          <Text style={styles.statNumber}>
            {dashboardData?.pendingPayments || 0}
          </Text>
          <Text style={styles.statLabel}>Pending Payments</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsRow}>
          <View
            style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={{ color: theme.colors.text }}>View Timeline</Text>
          </View>
          <View
            style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={{ color: theme.colors.text }}>Make Payment</Text>
          </View>
          <View
            style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={{ color: theme.colors.text }}>Contact PM</Text>
          </View>
        </View>
      </View>

      {/* Recent Activity Placeholder */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recent Activity
        </Text>
        <View
          style={[
            styles.activityCard,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={{ color: theme.colors.textSecondary }}>
            No recent activity to show
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  section: {
    padding: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activityCard: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
});
