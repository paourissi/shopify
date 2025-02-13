import './App.css';
import ProductList from './components/ProductList';
import { BrowserRouter, Route, Routes } from 'react-router';
import Cart from './components/Cart.tsx';
import { ContextProvider } from './Provider/ContextProvider.tsx';
import Header from './components/Header.tsx';
import ThankYou from './components/ThankYou.tsx';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path='/' element={<ProductList />} />
            <Route path='thank-you' element={<ThankYou />} />
            <Route path='mycart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
