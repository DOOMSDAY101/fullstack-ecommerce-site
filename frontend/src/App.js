import React, { useState } from 'react';
import './App.css';
import RoutePath from './RoutePath';
import { ToastContainer } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase-config';

export const isUserLoggedIn = React.createContext();







function App() {
  const [isLoggedIn, setIsloggedIn] = useState(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return true
      } else {
        return false
      }
    })
  });



  return (
    <div>
      <isUserLoggedIn.Provider value={[isLoggedIn, setIsloggedIn]}>
        <ToastContainer />
        <RoutePath />
      </isUserLoggedIn.Provider>
    </div>
  );
}

export default App;
