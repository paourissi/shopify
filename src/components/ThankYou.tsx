import { useEffect } from 'react';
import { useContextProvider } from '../Provider/ContextProvider';

const ThankYou = () => {
  const { deleteAll } = useContextProvider();

  useEffect(() => {
    deleteAll();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Your order is completed</h1>
    </div>
  );
};

export default ThankYou;
