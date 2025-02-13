import { Discount, Product } from './types';

const bankersRound = (num: number) => {
  const rounded = Math.round(num);
  if (Math.abs(num % 1) === 0.5) {
    return rounded % 2 === 0 ? rounded : rounded - 1;
  }
  return rounded;
};

const calculateDiscount = (price: number, discount: Discount | null) => {
  if (!discount) return price;

  switch (discount.type) {
    case 'FLAT':
      return price - 10;
    case 'PERCENTAGE':
      return price - (discount.amount / 100) * price;
    case 'BOGO':
      return price;
    default:
      return price;
  }
};

const fetchData = async (api: string) => {
  try {
    const response = await fetch('http://localhost:8080' + api);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    alert(error);
  }
};

const createData = async (api: string, data: any) => {
  try {
    const response = await fetch('http://localhost:8080' + api, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.headers.get('Location');
  } catch (error) {
    alert(error);
  }
};

const updateData = async (api: string, data: any) => {
  try {
    const response = await fetch('http://localhost:8080' + api, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    alert(error);
  }
};

const transformToCartData = (cartProducts: Product[]) => {
  return cartProducts.map(({ id, quantity }) => ({ product_id: id, quantity }));
};

export {
  bankersRound,
  calculateDiscount,
  fetchData,
  createData,
  updateData,
  transformToCartData,
};
