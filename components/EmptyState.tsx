import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../utils/theme";

const EmptyState = memo(() => (
  <View style={styles.container}>
    <Text style={styles.icon}>📦</Text>
    <Text style={styles.heading}>Your vault is empty</Text>
    <Text style={styles.sub}>
      Add up to 5 products to get started.{"\n"}Tap the button below.
    </Text>
  </View>
));

EmptyState.displayName = "EmptyState";

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing["2xl"],
    paddingBottom: Spacing["3xl"],
  },
  icon: {
    fontSize: 52,
    marginBottom: Spacing.md,
  },
  heading: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  sub: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: Typography.sizes.base * Typography.lineHeights.relaxed,
  },
});
