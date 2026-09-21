import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { PatientContextProvider } from './PatientContext.tsx';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <PatientContextProvider>
        <App />
      </PatientContextProvider>
  </React.StrictMode>
);
