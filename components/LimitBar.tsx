import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radii } from '../utils/theme';
import { MAX_PRODUCTS } from '../context/ProductContext';

interface Props {
  count: number;
}

const getBarColor = (count: number): string => {
  if (count <= 2) return Colors.limitLow;
  if (count <= 3) return Colors.limitMid;
  return Colors.limitHigh;
};

const LimitBar = memo(({ count }: Props) => {
  const ratio = count / MAX_PRODUCTS;
  const color = getBarColor(count);
  const isFull = count >= MAX_PRODUCTS;

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.label}>
          {isFull ? '🔒 Vault is full' : 'Vault capacity'}
        </Text>
        <Text style={[styles.counter, { color }]}>
          {count}<Text style={styles.counterMax}> / {MAX_PRODUCTS}</Text>
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${ratio * 100}%` as `${number}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      {isFull && (
        <Text style={styles.hint}>Remove a product to add a new one</Text>
      )}
    </View>
  );
});

LimitBar.displayName = 'LimitBar';

export default LimitBar;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radii.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
    letterSpacing: 0.2,
  },
  counter: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.black,
    letterSpacing: -1,
  },
  counterMax: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.regular,
    color: Colors.textSecondary,
  },
  track: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: Radii.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radii.full,
  },
  hint: {
    marginTop: Spacing.sm,
    fontSize: Typography.sizes.xs,
    color: Colors.limitHigh,
    fontWeight: Typography.weights.medium,
  },
});
