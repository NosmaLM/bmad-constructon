/**
 * Updates/Notifications Screen
 */

import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { api } from '@/services/api';

export default function UpdatesScreen() {
  const { theme } = useTheme();

  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('/notifications');
      return response.data.data;
    },
  });

  const renderNotification = ({ item }: { item: any }) => (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
      <Text style={{ color: theme.colors.textSecondary }}>{item.body}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={data?.items || []}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-outline" size={48} color={theme.colors.textTertiary} />
            <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>
              No updates yet
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
  card: { borderRadius: 12, padding: 16, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  empty: { alignItems: 'center', paddingVertical: 48 },
});
