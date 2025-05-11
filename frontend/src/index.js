import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.css';
import UserProvider from './components/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
  // </React.StrictMode>
);

