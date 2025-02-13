import { useEffect, useState } from 'react';
import './Cart.css';
import { useContextProvider } from '../Provider/ContextProvider';
import { useNavigate } from 'react-router';
import { createData, fetchData } from '../utils';
import { Discount } from '../types';

const Cart = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [submitDiscount, setSubmitDiscount] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    cartProducts,
    addToCart,
    deleteFromCart,
    setDiscountCoupon,
    discount,
  } = useContextProvider();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (discountCode && !loading && submitDiscount) {
      setLoading(true);
      fetchData('/discounts')
        .then((discounts: Discount[]) => {
          const fetchedDiscount = discounts.find(
            discount => discount.code === discountCode,
          );

          if (!fetchedDiscount) {
            alert('Wrong Coupon!!');
          } else if (discount?.code) {
            alert('A Coupon is Already In Used!!');
          } else {
            setDiscountCoupon(fetchedDiscount);
          }
        })
        .finally(() => {
          setLoading(false);
          setSubmitDiscount(false);
        });
    }
  });

  return (
    <div className='cart-page'>
      <h2>Shopping Cart</h2>
      {cartProducts.length <= 0 && <h2>You cart is empty</h2>}
      {cartProducts.length > 0 && (
        <div>
          <ul>
            {cartProducts.map(product => (
              <li key={product.id}>
                <div className='product-quantity'>
                  <span>{product.name}</span>
                  <span>
                    {product.price} x {product.quantity}
                    <input
                      type='number'
                      name='stock'
                      data-testid='stock'
                      value={product.quantity}
                      min='1'
                      max={product.stock}
                      onChange={e => {
                        addToCart(product, Number.parseInt(e.target.value));
                      }}
                    />
                  </span>
                  <svg
                    data-testid={'delete-' + product.name}
                    onClick={() => deleteFromCart(product.id)}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                  >
                    <path d='M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717zM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z' />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
          <div className='discount-section'>
            <input
              type='text'
              data-testid='input-coupon'
              placeholder='Enter discount code'
              value={discountCode}
              onChange={e => {
                setDiscountCode(e.target.value);
              }}
            />
            <button
              data-testid='button-coupon'
              onClick={() => setSubmitDiscount(true)}
            >
              {loading ? 'Loading' : 'Apply Coupon'}
            </button>
            {discount?.code && <span>{discount.code} coupon applied</span>}
          </div>

          <div className='complete-order'>
            <button
              data-testid='complete-order'
              onClick={() => {
                createData('/orders', {
                  'cart_id': localStorage.getItem('cart'),
                  'discount_code': discount?.code || '',
                }).then(() => {
                  localStorage.removeItem('cart');
                });
                navigate('/thank-you');
              }}
            >
              Complete your order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
