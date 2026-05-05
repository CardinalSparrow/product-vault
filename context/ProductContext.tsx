import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { Product } from '../types';

export const MAX_PRODUCTS = 5;

interface ProductContextValue {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => boolean;
  removeProduct: (id: string) => void;
  isAtLimit: boolean;
  count: number;
}

const ProductContext = createContext<ProductContextValue | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = useCallback(
    (data: Omit<Product, 'id' | 'createdAt'>): boolean => {
      if (products.length >= MAX_PRODUCTS) return false;

      const newProduct: Product = {
        ...data,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: Date.now(),
      };

      setProducts((prev) => [...prev, newProduct]);
      return true;
    },
    [products.length]
  );

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        isAtLimit: products.length >= MAX_PRODUCTS,
        count: products.length,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextValue => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};
