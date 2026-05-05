import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProducts, MAX_PRODUCTS } from '../context/ProductContext';
import { Product, RootStackParamList } from '../types';
import ProductCard from '../components/ProductCard';
import LimitBar from '../components/LimitBar';
import EmptyState from '../components/EmptyState';
import { Colors, Typography, Spacing, Radii, Shadows } from '../utils/theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductListScreen = () => {
  const { products, isAtLimit, count } = useProducts();
  const navigation = useNavigation<Nav>();

  const handleAddPress = useCallback(() => {
    if (isAtLimit) {
      Alert.alert(
        'Vault Full',
        `You've reached the maximum of ${MAX_PRODUCTS} products. Remove one to add more.`,
        [{ text: 'Got it', style: 'default' }]
      );
      return;
    }
    navigation.navigate('AddProduct');
  }, [isAtLimit, navigation]);

  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <ProductCard product={item} index={index} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const ListHeader = useCallback(
    () => (
      <View style={styles.listHeader}>
        <LimitBar count={count} />
      </View>
    ),
    [count]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>Your Collection</Text>
          <Text style={styles.headerTitle}>Product Vault</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{count}/{MAX_PRODUCTS}</Text>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={products.length > 0 ? ListHeader : null}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={[
          styles.listContent,
          products.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleAddPress}
          style={[styles.addButton, isAtLimit && styles.addButtonDisabled]}
          activeOpacity={isAtLimit ? 1 : 0.8}
          accessibilityRole="button"
          accessibilityLabel="Add product"
          accessibilityState={{ disabled: isAtLimit }}
        >
          <Text style={[styles.addButtonText, isAtLimit && styles.addButtonTextDisabled]}>
            {isAtLimit ? '🔒  Vault Full' : '+  Add Product'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  headerEyebrow: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.black,
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  headerBadge: {
    backgroundColor: Colors.accentMuted,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.accent + '33',
  },
  headerBadgeText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.black,
    color: Colors.accent,
    letterSpacing: -0.5,
  },
  listContent: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing['2xl'],
  },
  listContentEmpty: {
    flex: 1,
  },
  listHeader: {
    paddingBottom: Spacing.sm,
  },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  addButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radii.lg,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.button,
  },
  addButtonDisabled: {
    backgroundColor: Colors.surfaceAlt,
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  addButtonText: {
    color: Colors.textInverse,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.3,
  },
  addButtonTextDisabled: {
    color: Colors.textDisabled,
  },
});
