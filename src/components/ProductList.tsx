import { useEffect, useState } from 'react';
import { useContextProvider } from '../Provider/ContextProvider';
import { fetchData } from '../utils';
import './ProductList.css';
import { Product } from '../types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useContextProvider();

  useEffect(() => {
    fetchData('/products').then((products: Product[]) => {
      setProducts(products);
    });
  }, []);

  return (
    <div className='product-list'>
      {products.map(product => (
        <div key={product.id} className='product-card'>
          <img
            src={
              'https://img.freepik.com/free-vector/sticker-design-with-purple-beanie-hat-isolated_1308-62077.jpg'
            }
            alt={product.name}
            className='product-image'
          />
          <h3 className='product-name'>{product.name}</h3>
          <p className='product-price'>{product.price}</p>
          <button
            className='add-to-cart'
            data-testid={'add-' + product.name}
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
