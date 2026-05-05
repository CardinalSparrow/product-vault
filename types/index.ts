export interface Product {
  id: string;
  name: string;
  price: number;
  imageUri: string;
  createdAt: number;
}

export interface ProductFormData {
  name: string;
  price: string;
  imageUri: string;
}

export interface FormErrors {
  name?: string;
  price?: string;
  imageUri?: string;
}
