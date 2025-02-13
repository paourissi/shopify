import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import { render } from '@testing-library/react';
import ProductList from '../ProductList';

import { Context, ContextDefaultValues } from '../../Provider/ContextProvider';

vitest.mock('../../utils', () => {
  return {
    fetchData: vitest.fn().mockResolvedValue([
      {
        id: 'b5da66a0-3db0-4568-90c2-edd2fda8d51f',
        name: 'Beanie',
        price: 12.99,
        stock: 5,
      },
    ]),
  };
});

describe('ProductList component testing', () => {
  test('Should render the product Beanie', async () => {
    const addToCart = vitest.fn();

    render(
      <Context.Provider value={{ ...ContextDefaultValues, addToCart }}>
        <ProductList />
      </Context.Provider>,
    );

    await waitFor(() => expect(screen.getByText('Beanie')).toBeInTheDocument());
  });

  test('Should render the product Beanie', async () => {
    const addToCart = vitest.fn();

    render(
      <Context.Provider value={{ ...ContextDefaultValues, addToCart }}>
        <ProductList />
      </Context.Provider>,
    );

    await waitFor(() => expect(screen.getByText('Beanie')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('add-Beanie'));
    expect(addToCart).toHaveBeenCalledWith({
      'id': 'b5da66a0-3db0-4568-90c2-edd2fda8d51f',
      'name': 'Beanie',
      'price': 12.99,
      'stock': 5,
    });
  });
});
