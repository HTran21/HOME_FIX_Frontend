import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import GlobalStyles from './components/GlobalStyles/index.js';

import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store/store.js';
import socket from './service/socketService.js';

ReactDOM.createRoot(document.getElementById('root')).render(


  // <React.StrictMode>
  //   <GlobalStyles>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </GlobalStyles>
  // </React.StrictMode>
  <GlobalStyles>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyles>
  ,


)
