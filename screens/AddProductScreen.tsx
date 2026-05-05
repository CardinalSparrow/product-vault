import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FormField from "../components/FormField";
import ImagePickerButton from "../components/ImagePickerButton";
import { useProducts } from "../context/ProductContext";
import { useProductForm } from "../hooks/useProductForm";
import { RootStackParamList } from "../types";
import { Colors, Radii, Shadows, Spacing, Typography } from "../utils/theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "AddProduct">;

const AddProductScreen = () => {
  const navigation = useNavigation<Nav>();
  const { addProduct, isAtLimit } = useProducts();
  const { form, errors, setField, touchField, validate, reset } =
    useProductForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const priceRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return; // prevent double submit
    if (isAtLimit) {
      Alert.alert("Vault Full", "Cannot add more than 5 products.");
      return;
    }

    const isValid = validate();
    if (!isValid) return;

    setIsSubmitting(true);

    // Brief artificial delay to show loading state — signals action to user
    await new Promise((r) => setTimeout(r, 600));

    const success = addProduct({
      name: form.name.trim(),
      price: parseFloat(form.price),
      imageUri: form.imageUri,
    });

    setIsSubmitting(false);

    if (success) {
      reset();
      navigation.goBack();
    } else {
      Alert.alert("Vault Full", "Maximum of 5 products reached.");
    }
  }, [isSubmitting, isAtLimit, validate, addProduct, form, reset, navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

      {/* Custom header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Product</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Section label */}
          <Text style={styles.sectionLabel}>Product Details</Text>

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
          />

          {/* Spacer so button doesn't clip content */}
          <View style={{ height: Spacing.xl }} />
        </ScrollView>

        {/* Submit button pinned above keyboard */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonLoading,
            ]}
            activeOpacity={0.85}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Save product"
            accessibilityState={{ busy: isSubmitting }}
          >
            {isSubmitting ? (
              <ActivityIndicator color={Colors.textInverse} />
            ) : (
              <Text style={styles.submitText}>Save Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProductScreen;

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
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    minWidth: 60,
  },
  backText: {
    fontSize: Typography.sizes.base,
    color: Colors.accent,
    fontWeight: Typography.weights.semibold,
  },
  headerTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  headerSpacer: {
    minWidth: 60,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  sectionLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: Spacing.lg,
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
  submitButtonLoading: {
    opacity: 0.8,
  },
  submitText: {
    color: Colors.textInverse,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.3,
  },
});
