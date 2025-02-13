import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, Mock, test, vitest } from 'vitest';
import { render } from '@testing-library/react';
import Cart from '../Cart';
import { Context, ContextDefaultValues } from '../../Provider/ContextProvider';

vitest.mock('react-router', () => {
  return {
    useNavigate: () => vitest.fn(),
  };
});

const { mockedMethod } = vitest.hoisted(() => {
  return { mockedMethod: vitest.fn().mockResolvedValue({}) };
});

vitest.mock('../../utils', () => {
  return {
    fetchData: vitest.fn().mockResolvedValue([
      {
        code: 'FLAT10',
        type: 'FLAT',
        amount: 10,
      },
    ]),
    createData: mockedMethod,
  };
});

describe('Cart component testing', () => {
  let addToCart: Mock<(...args: any[]) => any>;
  let deleteFromCart: Mock<(...args: any[]) => any>;
  let setDiscountCoupon: Mock<(...args: any[]) => any>;
  let discount: null;
  let deleteAll: Mock<(...args: any[]) => any>;
  let cartProducts: {
    id: string;
    name: string;
    price: number;
    stock: number;
    quantity: number;
  }[];

  beforeEach(() => {
    deleteAll = vitest.fn();
    cartProducts = [
      {
        id: 'b5da66a0-3db0-4568-90c2-edd2fda8d51f',
        name: 'Beanie',
        price: 10,
        stock: 5,
        quantity: 1,
      },
      {
        id: 'a5da66a0-3db0-4568-90c2-edd2fda8d51f',
        name: 'Jeans',
        price: 20,
        stock: 2,
        quantity: 1,
      },
    ];
    addToCart = vitest.fn();
    deleteFromCart = vitest.fn();
    setDiscountCoupon = vitest.fn();
    discount = null;
  });
  test('Should render Cart', () => {
    render(
      <Context.Provider
        value={{
          ...ContextDefaultValues,
          deleteAll,
          cartProducts,
          deleteFromCart,
          addToCart,
          setDiscountCoupon,
          discount,
        }}
      >
        <Cart />
      </Context.Provider>,
    );
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Apply Coupon')).toBeInTheDocument();
    expect(screen.getByText('Complete your order')).toBeInTheDocument();
  });

  test('Should call deleteFromCart', () => {
    render(
      <Context.Provider
        value={{
          ...ContextDefaultValues,
          deleteAll,
          cartProducts,
          deleteFromCart,
          addToCart,
          setDiscountCoupon,
          discount,
        }}
      >
        <Cart />
      </Context.Provider>,
    );

    fireEvent.click(screen.getByTestId('delete-Beanie'));
    expect(deleteFromCart).toHaveBeenCalledWith(
      'b5da66a0-3db0-4568-90c2-edd2fda8d51f',
    );
  });

  test('Should call createData', () => {
    render(
      <Context.Provider
        value={{
          ...ContextDefaultValues,
          deleteAll,
          cartProducts,
          deleteFromCart,
          addToCart,
          setDiscountCoupon,
          discount,
        }}
      >
        <Cart />
      </Context.Provider>,
    );

    fireEvent.click(screen.getByTestId('complete-order'));
    expect(mockedMethod).toHaveBeenCalledWith('/orders', {
      'cart_id': null,
      'discount_code': '',
    });
  });

  test('Should call setDiscountCoupon', async () => {
    render(
      <Context.Provider
        value={{
          ...ContextDefaultValues,
          deleteAll,
          cartProducts,
          deleteFromCart,
          addToCart,
          setDiscountCoupon,
          discount,
        }}
      >
        <Cart />
      </Context.Provider>,
    );

    fireEvent.change(screen.getByTestId('input-coupon') as Element, {
      target: { value: 'FLAT10' },
    });

    fireEvent.click(screen.getByTestId('button-coupon'));

    await waitFor(() =>
      expect(setDiscountCoupon).toHaveBeenCalledWith({
        code: 'FLAT10',
        type: 'FLAT',
        amount: 10,
      }),
    );
  });

  test('Should alert "Wrong Coupon!!"', async () => {
    render(
      <Context.Provider
        value={{
          ...ContextDefaultValues,
          deleteAll,
          cartProducts,
          deleteFromCart,
          addToCart,
          setDiscountCoupon,
          discount,
        }}
      >
        <Cart />
      </Context.Provider>,
    );

    fireEvent.change(screen.getByTestId('input-coupon') as Element, {
      target: { value: 'error' },
    });

    fireEvent.click(screen.getByTestId('button-coupon'));

    await waitFor(() => expect(alert).toHaveBeenCalledWith('Wrong Coupon!!'));
  });
});
