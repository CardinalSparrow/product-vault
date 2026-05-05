import EmptyState from "@/components/EmptyState";
import LimitBar from "@/components/LimitBar";
import ProductCard from "@/components/ProductCard";
import { MAX_PRODUCTS, useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { Colors, Radii, Spacing, Typography } from "@/utils/theme";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VaultScreen() {
  const { products, count } = useProducts();

  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <ProductCard product={item} index={index} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const ListHeader = useCallback(
    () => (
      <View style={styles.listHeader}>
        <LimitBar count={count} />
      </View>
    ),
    [count],
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>Your Collection</Text>
          <Text style={styles.headerTitle}>Product Vault</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>
            {count}
            <Text style={styles.headerBadgeMax}>/{MAX_PRODUCTS}</Text>
          </Text>
        </View>
      </View>

      {/* List */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: Typography.sizes["2xl"],
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
    borderColor: Colors.accent + "33",
  },
  headerBadgeText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.black,
    color: Colors.accent,
    letterSpacing: -0.5,
  },
  headerBadgeMax: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.regular,
    color: Colors.accent + "AA",
  },
  listContent: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  listContentEmpty: {
    flex: 1,
  },
  listHeader: {
    paddingBottom: Spacing.sm,
  },
});
