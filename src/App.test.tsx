import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, test } from 'vitest';
import { ContextProvider } from './Provider/ContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ThankYou from './components/ThankYou';
import Cart from './components/Cart';

describe('App component testing', async () => {
  test('Should test a happy path ordering a product with FLAT10 discount', async () => {
    render(
      <ContextProvider>
        <MemoryRouter initialIndex={1}>
          <Routes>
            <Route element={<Header />}>
              <Route path='/' element={<ProductList />} />
              <Route path='thank-you' element={<ThankYou />} />
              <Route path='mycart' element={<Cart />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    await waitFor(() => expect(screen.getByText('Beanie')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('add-Beanie'));
    fireEvent.click(screen.getByTestId('add-Beanie'));

    fireEvent.click(screen.getByTestId('button-my-cart'));

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveTextContent('2');

    fireEvent.change(screen.getByTestId('input-coupon') as Element, {
      target: { value: 'FLAT10' },
    });

    fireEvent.click(screen.getByTestId('button-coupon'));

    await waitFor(() =>
      expect(screen.getByText('FLAT10 coupon applied')).toBeInTheDocument(),
    );

    expect(screen.getByTestId('total-price')).toHaveTextContent('16');

    fireEvent.click(screen.getByTestId('complete-order'));

    await waitFor(() =>
      expect(screen.getByText('Your order is completed')).toBeInTheDocument(),
    );
  });

  test('Should test BOGO discount', async () => {
    render(
      <ContextProvider>
        <MemoryRouter initialIndex={1}>
          <Routes>
            <Route element={<Header />}>
              <Route path='/' element={<ProductList />} />
              <Route path='thank-you' element={<ThankYou />} />
              <Route path='mycart' element={<Cart />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    await waitFor(() => expect(screen.getByText('Beanie')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('add-T-Shirt'));

    fireEvent.click(screen.getByTestId('button-my-cart'));

    fireEvent.change(screen.getByTestId('input-coupon') as Element, {
      target: { value: 'BOGO' },
    });

    fireEvent.click(screen.getByTestId('button-coupon'));

    await waitFor(() =>
      expect(screen.getByText('BOGO coupon applied')).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByTestId('home'));

    await waitFor(() => expect(screen.getByText('Beanie')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('add-Beanie'));

    expect(screen.getByTestId('total-price')).toHaveTextContent('20');

    fireEvent.click(screen.getByTestId('button-my-cart'));

    fireEvent.click(screen.getByTestId('complete-order'));

    await waitFor(() =>
      expect(screen.getByText('Your order is completed')).toBeInTheDocument(),
    );
  });

  test('Should test stock to be 13', async () => {
    render(
      <ContextProvider>
        <MemoryRouter initialIndex={1}>
          <Routes>
            <Route element={<Header />}>
              <Route path='/' element={<ProductList />} />
              <Route path='thank-you' element={<ThankYou />} />
              <Route path='mycart' element={<Cart />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    await waitFor(() => expect(screen.getByText('Beanie')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('add-Beanie'));

    fireEvent.click(screen.getByTestId('button-my-cart'));

    fireEvent.change(screen.getByTestId('stock') as Element, {
      target: { value: '60' },
    });

    expect(screen.getByTestId('total-price')).toHaveTextContent('13');
  });

  test('Should remove an item from cart', async () => {
    render(
      <ContextProvider>
        <MemoryRouter initialIndex={1}>
          <Routes>
            <Route element={<Header />}>
              <Route path='/' element={<ProductList />} />
              <Route path='thank-you' element={<ThankYou />} />
              <Route path='mycart' element={<Cart />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ContextProvider>,
    );

    await waitFor(() => expect(screen.getByText('Beanie')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('add-Beanie'));

    fireEvent.click(screen.getByTestId('button-my-cart'));

    fireEvent.click(screen.getByTestId('delete-Beanie'));

    expect(screen.getByText('You cart is empty')).toBeInTheDocument();
  });
});
