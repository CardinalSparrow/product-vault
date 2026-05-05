import React, { memo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';
import { Colors, Typography, Spacing, Radii, Shadows } from '../utils/theme';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Props {
  product: Product;
  index: number;
}

const ProductCard = memo(({ product, index }: Props) => {
  const { removeProduct } = useProducts();
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Remove Product',
      `Remove "${product.name}" from your vault?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => swipeableRef.current?.close(),
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeProduct(product.id),
        },
      ]
    );
  }, [product.id, product.name, removeProduct]);

  const renderRightActions = useCallback(() => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={handleDelete}
      activeOpacity={0.85}
    >
      <Text style={styles.deleteIcon}>🗑️</Text>
      <Text style={styles.deleteLabel}>Remove</Text>
    </TouchableOpacity>
  ), [handleDelete]);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={60}
      overshootRight={false}
      friction={2}
    >
      <View style={styles.card}>
        <View style={styles.indexBadge}>
          <Text style={styles.indexText}>{String(index + 1).padStart(2, '0')}</Text>
        </View>

        <Image
          source={{ uri: product.imageUri }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.date}>Added {formatDate(product.createdAt)}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        </View>
      </View>
    </Swipeable>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radii.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm + 2,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: Radii.sm,
    backgroundColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  indexText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: Radii.md,
    backgroundColor: Colors.surfaceAlt,
    marginRight: Spacing.md,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  date: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    letterSpacing: 0.2,
  },
  priceContainer: {
    alignItems: 'flex-end',
    paddingLeft: Spacing.sm,
  },
  price: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.accent,
    letterSpacing: -0.5,
  },
  deleteAction: {
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: Radii.lg,
    marginBottom: Spacing.sm + 2,
    marginRight: Spacing.md,
    gap: 4,
  },
  deleteIcon: {
    fontSize: 18,
  },
  deleteLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.textInverse,
    letterSpacing: 0.3,
  },
});
