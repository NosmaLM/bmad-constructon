/**
 * Camera/Capture Screen - Field App
 */

import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NAVY = '#1E3A5F';
const GOLD = '#C9A227';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Ionicons name="camera" size={64} color="#9CA3AF" />
        <Text style={styles.placeholderText}>Camera preview</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="flash" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton}>
          <View style={styles.captureInner} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="camera-reverse" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={[styles.optionChip, styles.activeChip]}>
          <Text style={styles.activeChipText}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionChip}>
          <Text style={styles.chipText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionChip}>
          <Text style={styles.chipText}>Timelapse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
  },
  placeholderText: { color: '#9CA3AF', marginTop: 12 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: '#000',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 32,
    backgroundColor: '#000',
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeChip: {
    backgroundColor: GOLD,
  },
  chipText: { color: '#fff' },
  activeChipText: { color: NAVY, fontWeight: '600' },
});
