import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './routes/components/ErrorBoundary';
import { Routes } from './routes/Routes';
import { setupIonicReact } from '@ionic/react';
import store from './store/store'; // Importa tu tienda de Redux
import 'styles/global.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


setupIonicReact();

export const App: React.FC = () => {

  const domainRedirects = {
    'rupop.pop': '/',
    'admin.pop': '/user-profile',
  };
  
  const hostname = window.location.hostname;


  if (domainRedirects.hasOwnProperty(hostname)) {
    console.log('domainm',hostname)
    // La redirección se realiza aquí, por lo que no es necesario
    // renderizar nada más en el componente App

    
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
