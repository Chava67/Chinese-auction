import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bar from './components/Bar';
import Register from './components/Register';
import Donors from './components/Donors';
import Gifts from './components/Gifts';
import GiftManagement from './components/GiftManagement';
import PurchasingManagement from './components/PurchasingManagement';
import Tickets from './components/Tickets';
import Cart from './components/Cart';
import Login from './components/Login';
import { get } from './axios/httpRequest';
import DownloadImages from './DownloadImages';
import HomePage from './components/HomePage';


const AppWrapper = () => {
  const [CartQuantity, setCartQuantity] = useState(0);

  const updateQuantity = async () => {
      try {
          const cartItems = await get(`/api/Cart`);
          if (cartItems && Array.isArray(cartItems)) {
              setCartQuantity(cartItems.length);
          }
          else{
            setCartQuantity(0)
          }
      } catch (error) {
          console.error('Error updating cart quantity:', error);
      }
  };
  useEffect(() => {
    updateQuantity();
}, ); // רק פעם אחת ברגע שהרכיב מותקן (component mount)

  return (
    <>
      <Bar badge={CartQuantity}updateQuantity={updateQuantity} /> {/* מעבירים את מספר התגיות ל־Bar */}
      <Routes>
      <Route path="/" element={<HomePage updateQuantity={updateQuantity} />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/gifts" element={<Gifts updateBadgeCount={updateQuantity} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/giftManagement" element={<GiftManagement />} />
        <Route path="/purchasingManagement" element={<PurchasingManagement />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/cart" element={<Cart updateQuantity={updateQuantity} />} />
        <Route path="/login" element={<Login updateBadgeCount={updateQuantity} />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <>
    <BrowserRouter>
      <AppWrapper /> {/* מציגים את AppWrapper בתוך BrowserRouter */}
    </BrowserRouter>
    </>
  );
};

export default App;
