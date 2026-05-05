import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Typography, Spacing, Radii } from '../utils/theme';

interface Props {
  imageUri: string;
  onSelect: (uri: string) => void;
  error?: string;
}

const ImagePickerButton = memo(({ imageUri, onSelect, error }: Props) => {
  const handlePress = useCallback(() => {
    Alert.alert('Select Image', 'Choose image source', [
      {
        text: 'Camera',
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission required', 'Camera access is needed to take photos.');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });
          if (!result.canceled && result.assets[0]) {
            onSelect(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission required', 'Gallery access is needed to select photos.');
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });
          if (!result.canceled && result.assets[0]) {
            onSelect(result.assets[0].uri);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [onSelect]);

  const hasError = Boolean(error);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Product Photo</Text>

      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.75}
        style={[styles.picker, hasError && styles.pickerError]}
      >
        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />
            <View style={styles.changeOverlay}>
              <Text style={styles.changeText}>Change Photo</Text>
            </View>
          </>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>Tap to add photo</Text>
            <Text style={styles.placeholderSub}>Camera or Gallery</Text>
          </View>
        )}
      </TouchableOpacity>

      {hasError && <Text style={styles.error}>⚠ {error}</Text>}
    </View>
  );
});

ImagePickerButton.displayName = 'ImagePickerButton';

export default ImagePickerButton;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md + 4,
  },
  label: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs + 2,
  },
  picker: {
    height: 160,
    borderRadius: Radii.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
    backgroundColor: Colors.surfaceAlt,
  },
  pickerError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBg,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  changeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(13,13,13,0.55)',
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  changeText: {
    color: Colors.textInverse,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  placeholderIcon: {
    fontSize: 28,
  },
  placeholderText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  placeholderSub: {
    fontSize: Typography.sizes.xs,
    color: Colors.textDisabled,
  },
  error: {
    marginTop: Spacing.xs,
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    fontWeight: Typography.weights.medium,
  },
});
