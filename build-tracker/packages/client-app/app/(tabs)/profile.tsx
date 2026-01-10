/**
 * Profile Screen
 */

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth';

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const MenuItem = ({
    icon,
    label,
    onPress,
    destructive = false,
  }: {
    icon: string;
    label: string;
    onPress: () => void;
    destructive?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon as any}
          size={22}
          color={destructive ? theme.colors.status.error : theme.colors.text}
        />
        <Text
          style={[
            styles.menuLabel,
            { color: destructive ? theme.colors.status.error : theme.colors.text },
          ]}
        >
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary.navy }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </Text>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Menu Items */}
      <View style={[styles.menuSection, { backgroundColor: theme.colors.card }]}>
        <MenuItem
          icon="person-outline"
          label="Edit Profile"
          onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available soon')}
        />
        <MenuItem
          icon="notifications-outline"
          label="Notification Settings"
          onPress={() => Alert.alert('Coming Soon', 'Notification settings will be available soon')}
        />
        <MenuItem
          icon={isDark ? 'sunny-outline' : 'moon-outline'}
          label={isDark ? 'Light Mode' : 'Dark Mode'}
          onPress={toggleTheme}
        />
        <MenuItem
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => Alert.alert('Coming Soon', 'Help & support will be available soon')}
        />
      </View>

      <View style={[styles.menuSection, { backgroundColor: theme.colors.card }]}>
        <MenuItem icon="log-out-outline" label="Logout" onPress={handleLogout} destructive />
      </View>

      <Text style={[styles.version, { color: theme.colors.textTertiary }]}>
        Build Tracker v0.1.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 48,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  menuSection: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 12,
  },
});
