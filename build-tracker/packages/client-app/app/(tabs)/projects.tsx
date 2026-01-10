/**
 * Projects List Screen
 */

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { api } from '@/services/api';

export default function ProjectsScreen() {
  const { theme } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects');
      return response.data.data;
    },
  });

  const renderProject = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.projectCard, { backgroundColor: theme.colors.card }]}
      onPress={() => router.push(`/project/${item.id}`)}
    >
      <Text style={[styles.projectName, { color: theme.colors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.projectAddress, { color: theme.colors.textSecondary }]}>
        {item.plotAddress}
      </Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${item.progressPercentage}%`, backgroundColor: theme.colors.primary.gold },
            ]}
          />
        </View>
        <Text style={{ color: theme.colors.text }}>{item.progressPercentage}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={data?.items || []}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="business-outline" size={48} color={theme.colors.textTertiary} />
            <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>
              No projects yet
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  projectCard: { borderRadius: 12, padding: 16, marginBottom: 12 },
  projectName: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  projectAddress: { fontSize: 14, marginBottom: 12 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressBar: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%' },
  empty: { alignItems: 'center', paddingVertical: 48 },
});
