import { useState, useCallback } from 'react';
import { ProductFormData, FormErrors } from '../types';

const validateForm = (data: ProductFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Product name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.price.trim()) {
    errors.price = 'Price is required';
  } else {
    const parsed = parseFloat(data.price);
    if (isNaN(parsed) || parsed <= 0) {
      errors.price = 'Enter a valid price greater than 0';
    }
  }

  if (!data.imageUri) {
    errors.imageUri = 'Please select a product image';
  }

  return errors;
};

export const useProductForm = () => {
  const [form, setForm] = useState<ProductFormData>({
    name: '',
    price: '',
    imageUri: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ProductFormData, boolean>>>({});

  const setField = useCallback(
    <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        // Re-validate the single field on change after it's been touched
        const next = { ...form, [field]: value };
        const errs = validateForm(next);
        setErrors((prev) => ({ ...prev, [field]: errs[field] }));
      }
    },
    [form, touched]
  );

  const touchField = useCallback((field: keyof ProductFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => {
      const errs = validateForm({ ...form });
      return { ...prev, [field]: errs[field] };
    });
  }, [form]);

  const validate = useCallback((): boolean => {
    setTouched({ name: true, price: true, imageUri: true });
    const errs = validateForm(form);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const reset = useCallback(() => {
    setForm({ name: '', price: '', imageUri: '' });
    setErrors({});
    setTouched({});
  }, []);

  return { form, errors, setField, touchField, validate, reset };
};
