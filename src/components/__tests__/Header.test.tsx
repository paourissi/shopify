import { screen } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import { render } from '@testing-library/react';
import Header from '../Header';
import { Context, ContextDefaultValues } from '../../Provider/ContextProvider';

vitest.mock('react-router');

describe('Header component testing', () => {
  test('Should render Header', () => {
    const cartProducts = [
      {
        name: 'Test',
        price: 20,
        stock: 2,
        quantity: 1,
        id: 'qwerty',
      },
    ];

    render(
      <Context.Provider
        value={{ ...ContextDefaultValues, cartProducts, totalPrice: 20 }}
      >
        <Header />
      </Context.Provider>,
    );
    expect(screen.getByTestId('total-price')).toHaveTextContent('20');
    expect(screen.getByTestId('badge')).toHaveTextContent('1');
    expect(screen.getByText('Shopify')).toBeInTheDocument();
  });
});
