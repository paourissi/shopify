import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import { ContextProvider, useContextProvider } from '../ContextProvider';

const TestingComponent = () => {
  const {
    cartProducts,
    totalPrice,
    discount,
    addToCart,
    deleteAll,
    deleteFromCart,
    setDiscountCoupon,
  } = useContextProvider();

  return (
    <div>
      <span>Total Price: {totalPrice}</span>
      <span>Name: {cartProducts[0]?.name}</span>
      <span>Discount: {discount?.code}</span>
      <button
        data-testid='add-to-cart'
        onClick={() =>
          addToCart({
            id: 'b5da66a0-3db0-4568-90c2-edd2fda8d51f',
            name: 'Beanie',
            price: 12.99,
            stock: 5,
            quantity: 1,
          })
        }
      ></button>
      <button data-testid='delete-all' onClick={() => deleteAll()}></button>
      <button
        data-testid='delete-from-cart'
        onClick={() => deleteFromCart('b5da66a0-3db0-4568-90c2-edd2fda8d51f')}
      ></button>
      <button
        data-testid='add-discount'
        onClick={() =>
          setDiscountCoupon({
            code: 'FLAT10',
            type: 'FLAT',
            amount: 10,
          })
        }
      ></button>
    </div>
  );
};

describe('ContextProvider component testing', () => {
  test('Should add to cart "Beanie"', () => {
    render(
      <ContextProvider>
        <TestingComponent />
      </ContextProvider>,
    );

    fireEvent.click(screen.getByTestId('add-to-cart'));
    expect(screen.getByText('Name: Beanie')).toBeInTheDocument();
  });

  test('Should delete from cart "Beanie"', () => {
    render(
      <ContextProvider>
        <TestingComponent />
      </ContextProvider>,
    );
    fireEvent.click(screen.getByTestId('add-to-cart'));
    expect(screen.getByText('Name: Beanie')).toBeInTheDocument();
    expect(screen.getByText('Total Price: 13')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-from-cart'));
    expect(screen.queryByText('Name: Beanie')).not.toBeInTheDocument();
  });

  test('Should add discount"', () => {
    render(
      <ContextProvider>
        <TestingComponent />
      </ContextProvider>,
    );
    fireEvent.click(screen.getByTestId('add-discount'));
    expect(screen.getByText('Discount: FLAT10')).toBeInTheDocument();
  });

  test('Should delete all from cart ', () => {
    render(
      <ContextProvider>
        <TestingComponent />
      </ContextProvider>,
    );
    fireEvent.click(screen.getByTestId('add-to-cart'));
    fireEvent.click(screen.getByTestId('add-discount'));
    fireEvent.click(screen.getByTestId('delete-from-cart'));
    expect(screen.queryByText('Name: Beanie')).not.toBeInTheDocument();
    expect(screen.queryByText('Total Price: 13')).not.toBeInTheDocument();
    expect(screen.queryByText('Discount: FLAT10')).not.toBeInTheDocument();
  });
});
