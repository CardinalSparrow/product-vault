import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FormField from "../../components/FormField";
import ImagePickerButton from "../../components/ImagePickerButton";
import { MAX_PRODUCTS, useProducts } from "../../context/ProductContext";
import { useProductForm } from "../../hooks/useProductForm";
import { Colors, Radii, Shadows, Spacing, Typography } from "../../utils/theme";

export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct, isAtLimit, count } = useProducts();
  const { form, errors, setField, touchField, validate, reset } =
    useProductForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const priceRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    if (isAtLimit) {
      Alert.alert(
        "Vault Full",
        `You've reached the maximum of ${MAX_PRODUCTS} products.\nSwitch to the Vault tab to view your products.`,
        [{ text: "Got it" }],
      );
      return;
    }

    const isValid = validate();
    if (!isValid) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const success = addProduct({
      name: form.name.trim(),
      price: parseFloat(form.price),
      imageUri: form.imageUri,
    });

    setIsSubmitting(false);

    if (success) {
      reset();
      // Navigate to vault tab to see the newly added product
      router.replace("/(tabs)");

      // If this was the last slot, show a notification
      if (count + 1 >= MAX_PRODUCTS) {
        setTimeout(() => {
          Alert.alert(
            "🔒 Vault Full",
            "You've added 5 products — the maximum. You won't be able to add more until you remove one.",
            [{ text: "Got it" }],
          );
        }, 400);
      }
    } else {
      Alert.alert("Vault Full", "Maximum of 5 products reached.");
    }
  }, [
    isSubmitting,
    isAtLimit,
    validate,
    addProduct,
    form,
    reset,
    router,
    count,
  ]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>New Product</Text>
        <Text style={styles.headerTitle}>Add to Vault</Text>
      </View>

      {/* Limit reached banner */}
      {isAtLimit && (
        <View style={styles.limitBanner}>
          <Text style={styles.limitBannerText}>
            🔒 Vault is full — 5/5 products added
          </Text>
        </View>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            isAtLimit && styles.scrollContentDisabled,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isAtLimit}
        >
          <ImagePickerButton
            imageUri={form.imageUri}
            onSelect={(uri) => setField("imageUri", uri)}
            error={errors.imageUri}
          />

          <FormField
            label="Product Name"
            value={form.name}
            onChangeText={(v) => setField("name", v)}
            onBlur={() => touchField("name")}
            placeholder="e.g. Wireless Headphones"
            error={errors.name}
            returnKeyType="next"
            onSubmitEditing={() => priceRef.current?.focus()}
            maxLength={60}
            autoCapitalize="words"
            editable={!isAtLimit}
          />

          <FormField
            ref={priceRef}
            label="Price (NGN)"
            value={form.price}
            onChangeText={(v) => setField("price", v)}
            onBlur={() => touchField("price")}
            placeholder="0.00"
            error={errors.price}
            keyboardType="decimal-pad"
            returnKeyType="done"
            hint="Enter a numeric value (e.g. 29.99)"
            onSubmitEditing={handleSubmit}
            maxLength={12}
            editable={!isAtLimit}
          />

          <View style={{ height: Spacing.xl }} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              (isSubmitting || isAtLimit) && styles.submitButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={isSubmitting || isAtLimit}
            accessibilityRole="button"
            accessibilityLabel={isAtLimit ? "Vault is full" : "Save product"}
            accessibilityState={{
              disabled: isSubmitting || isAtLimit,
              busy: isSubmitting,
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color={Colors.textInverse} />
            ) : (
              <Text
                style={[
                  styles.submitText,
                  isAtLimit && styles.submitTextDisabled,
                ]}
              >
                {isAtLimit ? "🔒  Vault Full" : "Save Product"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  limitBanner: {
    backgroundColor: Colors.errorBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.error + "33",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
  },
  limitBannerText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.error,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  scrollContentDisabled: {
    opacity: 0.45,
  },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  submitButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radii.lg,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.button,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.surfaceAlt,
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  submitText: {
    color: Colors.textInverse,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.3,
  },
  submitTextDisabled: {
    color: Colors.textDisabled,
  },
});
