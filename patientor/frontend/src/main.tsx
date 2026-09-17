import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { PatientContextProvider } from './PatientContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PatientContextProvider>
    <App />
  </PatientContextProvider>
);
