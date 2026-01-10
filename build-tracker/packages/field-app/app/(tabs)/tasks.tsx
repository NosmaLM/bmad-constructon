/**
 * Tasks Screen - Field App
 */

import { Ionicons } from '@expo/vector-icons';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const NAVY = '#1E3A5F';

const mockTasks = [
  { id: '1', title: 'Pour foundation section B', status: 'in_progress', priority: 'high' },
  { id: '2', title: 'Install rebar grid', status: 'todo', priority: 'medium' },
  { id: '3', title: 'Check material delivery', status: 'completed', priority: 'low' },
];

export default function TasksScreen() {
  const renderTask = ({ item }: { item: typeof mockTasks[0] }) => (
    <TouchableOpacity style={styles.taskCard}>
      <View style={styles.checkbox}>
        {item.status === 'completed' && (
          <Ionicons name="checkmark" size={16} color="#fff" />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.taskTitle, item.status === 'completed' && styles.completed]}>
          {item.title}
        </Text>
        <Text style={styles.taskStatus}>{item.status.replace('_', ' ')}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  list: { padding: 16 },
  taskCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: NAVY,
    backgroundColor: NAVY,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: { fontSize: 16, fontWeight: '500', color: '#111827' },
  taskStatus: { fontSize: 12, color: '#9CA3AF', marginTop: 2, textTransform: 'capitalize' },
  completed: { textDecorationLine: 'line-through', color: '#9CA3AF' },
});
