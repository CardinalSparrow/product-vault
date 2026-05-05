import React, { memo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { Colors, Typography, Spacing, Radii } from '../utils/theme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
}

const FormField = memo(
  React.forwardRef<TextInput, Props>(({ label, error, hint, ...inputProps }, ref) => {
    const hasError = Boolean(error);

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            hasError && styles.inputError,
            inputProps.editable === false && styles.inputDisabled,
          ]}
          placeholderTextColor={Colors.textDisabled}
          {...inputProps}
        />
        {hasError ? (
          <Text style={styles.error}>⚠ {error}</Text>
        ) : hint ? (
          <Text style={styles.hint}>{hint}</Text>
        ) : null}
      </View>
    );
  })
);

FormField.displayName = 'FormField';

export default FormField;

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
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    backgroundColor: Colors.surface,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBg,
  },
  inputDisabled: {
    backgroundColor: Colors.surfaceAlt,
    color: Colors.textDisabled,
  },
  error: {
    marginTop: Spacing.xs,
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    fontWeight: Typography.weights.medium,
  },
  hint: {
    marginTop: Spacing.xs,
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
});
