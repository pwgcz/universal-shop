import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserContextProvider from './contexts/UserContext';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

ReactDOM.render(

  <AlertProvider template={AlertTemplate} {...options}>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </AlertProvider>,
  document.getElementById('root')
);
