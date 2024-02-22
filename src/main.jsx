import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import GlobalStyles from './components/GlobalStyles/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </React.StrictMode>,


)
