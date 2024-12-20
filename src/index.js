import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css"
import {Provider} from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <Provider store={store}>
          <App />
      </Provider>
);

serviceWorkerRegistration.register();
