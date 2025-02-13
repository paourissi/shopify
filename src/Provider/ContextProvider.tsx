import React, {
  createContext,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  bankersRound,
  createData,
  fetchData,
  calculateDiscount,
  transformToCartData,
  updateData,
} from '../utils';
import { Discount, DISCOUNTS, Product } from '../types';

export interface ContextProviderProps {
  children: JSX.Element;
}

export interface ContextProps {
  totalPrice: number;
  cartProducts: Product[];
  discount: Discount | null;
  addToCart: (product: any, quantity?: number) => void;
  deleteFromCart: (id: string) => void;
  setDiscountCoupon: (dis: Discount) => void;
  deleteAll: () => void;
}

const ContextDefaultValues = {
  totalPrice: 0,
  cartProducts: [],
  discount: null,
  setDiscountCoupon: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
  deleteAll: () => {},
};

const Context = createContext<ContextProps>(ContextDefaultValues);

const useContextProvider = () => {
  return useContext(Context);
};

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState<Discount | null>(null);

  useEffect(() => {
    fetchData('/products').then((products: Product[]) => {
      const cart = localStorage.getItem('cart') || '';

      if (cart) {
        fetchData('/carts/' + cart).then(({ items }) => {
          const cartProducts = items.map(
            ({
              product_id,
              quantity,
            }: {
              product_id: string;
              quantity: number;
            }) => {
              const foundCartProduct = products.find(
                ({ id }) => id === product_id,
              );
              return { ...foundCartProduct, quantity };
            },
          );
          updateCartParties(cartProducts);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const couponOffers = useCallback(
    ({
      quantity,
      price,
      name,
    }: {
      quantity?: number;
      price: number;
      name: string;
    }) => {
      if (discount?.type === DISCOUNTS.BOGO) {
        switch (name) {
          case 'Beanie':
            if (cartProducts.find(product => product.name === 'T-Shirt')) {
              return (quantity! - 1) * price;
            }
            break;

          default:
            break;
        }
      }
      return quantity! * price;
    },
    [discount, cartProducts],
  );

  useEffect(() => {
    const updatedPrice = cartProducts.reduce(
      (total: number, product: Product) => {
        return (total += couponOffers(product));
      },
      0,
    ) as unknown as number;

    setTotalPrice(bankersRound(calculateDiscount(updatedPrice, discount)));
  }, [discount, cartProducts, couponOffers]);

  const setDiscountCoupon = useCallback(
    (dis: Discount) => {
      setTotalPrice(bankersRound(calculateDiscount(totalPrice, dis)));
      setDiscount(dis);
    },
    [totalPrice],
  );

  const updateCartParties = (newProducts: Product[]) => {
    if (newProducts.length === 0) {
      deleteAll();
    } else {
      setCartProducts(newProducts);
    }
  };

  const updateCart = (newProducts: Product[]) => {
    const cart = localStorage.getItem('cart') || '';

    if (!cart) {
      createData('/carts', {}).then(cart => {
        const n = cart?.lastIndexOf('/') || 0;
        const result = cart?.substring(n + 1) || '';
        localStorage.setItem('cart', result);
        updateData('/carts/' + result, transformToCartData(newProducts));
      });
    } else {
      updateData('/carts/' + cart, transformToCartData(newProducts));
    }
  };

  const addToCart = useCallback(
    (product: Product, quantity?: number) => {
      const foundProduct = structuredClone<Product | undefined>(
        cartProducts.find(({ id }) => id === product.id),
      );
      if (foundProduct) {
        foundProduct.quantity = quantity ?? foundProduct.quantity! + 1;
        if (foundProduct.quantity <= foundProduct.stock) {
          const newUserProducts = cartProducts.filter(
            ({ id }) => id !== product.id,
          );

          const newProducts = [...newUserProducts, foundProduct].sort((a, b) =>
            a.name > b.name ? 1 : -1,
          );

          updateCartParties(newProducts);
          updateCart(newProducts);
        }
      } else {
        const newProducts = [...cartProducts, { ...product, quantity: 1 }].sort(
          (a, b) => (a.name > b.name ? 1 : -1),
        );
        updateCartParties(newProducts);
        updateCart(newProducts);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartProducts],
  );

  const deleteFromCart = useCallback(
    (product_id: string) => {
      const updatedCart = cartProducts.filter(
        product => product_id !== product.id,
      );
      updateCartParties(updatedCart);
      updateCart(updatedCart);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartProducts],
  );

  const deleteAll = useCallback(() => {
    setTotalPrice(0);
    setCartProducts([]);
    setDiscount(null);
  }, []);

  const ctx: ContextProps = useMemo(() => {
    return {
      cartProducts,
      totalPrice,
      discount,
      addToCart,
      deleteFromCart,
      setDiscountCoupon,
      deleteAll,
    };
  }, [
    cartProducts,
    totalPrice,
    discount,
    addToCart,
    deleteAll,
    deleteFromCart,
    setDiscountCoupon,
  ]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

export { Context, ContextDefaultValues, ContextProvider, useContextProvider };
