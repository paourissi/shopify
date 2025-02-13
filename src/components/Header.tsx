import './Header.css';
import { useContextProvider } from '../Provider/ContextProvider';
import { Outlet, useNavigate } from 'react-router';

const Header = () => {
  const { cartProducts, totalPrice } = useContextProvider();
  const navigate = useNavigate();

  const quantity = cartProducts.reduce((total, { quantity }) => {
    return (total += quantity!);
  }, 0);

  return (
    <>
      <header className='header'>
        <div
          data-testid='home'
          className='logo'
          onClick={() => {
            navigate('/');
          }}
        >
          Shopify
        </div>
        <div className='shopping-info'>
          <div className='price' data-testid='total-price'>
            €{totalPrice}
          </div>
          <div
            data-testid='button-my-cart'
            className='cart'
            onClick={() => {
              navigate('/mycart');
            }}
          >
            {quantity > 0 && (
              <span className='notify-badge' data-testid='badge'>
                {quantity}
              </span>
            )}
            <svg
              version='1.1'
              id='shopping_x5F_carts_1_'
              xmlns='http://www.w3.org/2000/svg'
              x='0'
              y='0'
              viewBox='0 0 128 128'
              className='cart-icon'
              fill='white'
            >
              <g id='_x36__1_'>
                <path
                  d='M19.3 14.4c-.3-1.3-1.4-2.2-2.7-2.2H2.7C1.2 12.3 0 13.5 0 15c0 1.5 1.2 2.7 2.7 2.7h11.7l25.8 74.1c.3 1.3 1.4 2.2 2.7 2.2h71.6v-5.4H45.1L19.3 14.4zm92.4 68.7L128 34H32.7L49 83h62.7zm-60-5.5-1.6-5.4h1.6v5.4zm57.2-29.9h11.2V45h-11.2v-5.4h10.9l-3.9 13.6h-7v-5.5zm0 8.1h6.2l-1.6 5.4h-4.7v-5.4zm0 8.2h3.9l-1.6 5.4h-2.3V64zm0 8.2h1.6l-1.6 5.4v-5.4zM98 39.5h8.2v5.4H98v-5.4zm0 8.2h8.2v5.4H98v-5.4zm0 8.1h8.2v5.4H98v-5.4zm0 8.2h8.2v5.4H98V64zm0 8.2h8.2v5.4H98v-5.4zM87.2 39.5h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2v-5.4zm0 8.1h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2V64zm0 8.2h8.2v5.4h-8.2v-5.4zM76.3 39.5h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2v-5.4zm0 8.1h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2V64zm0 8.2h8.2v5.4h-8.2v-5.4zM65.4 39.5h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2v-5.4zm0 8.1h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2V64zm0 8.2h8.2v5.4h-8.2v-5.4zM54.5 39.5h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2v-5.4zm0 8.1h8.2v5.4h-8.2v-5.4zm0 8.2h8.2v5.4h-8.2V64zm0 8.2h8.2v5.4h-8.2v-5.4zM40.9 39.5h10.9v5.4H40.6v2.7h11.2V53h-7l-3.9-13.5zm4.6 16.3h6.2v5.4H47l-1.5-5.4zm6.2 8.2v5.4h-2.3L47.9 64h3.8zm50.4 32.7c-5.3 0-9.5 4.3-9.5 9.5s4.3 9.5 9.5 9.5c5.3 0 9.5-4.3 9.5-9.5s-4.2-9.5-9.5-9.5zm-51.7 0c-5.3 0-9.5 4.3-9.5 9.5s4.3 9.5 9.5 9.5c5.3 0 9.5-4.3 9.5-9.5s-4.3-9.5-9.5-9.5z'
                  id='icon_9_'
                />
              </g>
            </svg>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
