import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import { IonContent } from '@ionic/react';
import AppProductos from '../productos/productos';
import Categories from '../categories/categories';

import './home.css';


const Home: React.FC = () => {
  // Obtiene los datos del usuario almacenados en localStorage
  const userData = localStorage.getItem('userData');

  // Verifica si los datos del usuario existen en localStorage antes de imprimirlos en la consola
  React.useEffect(() => {
    if (userData) {
      console.log(JSON.parse(userData));
    }
  }, [userData]);

  return (
    <>
      <Header />
      <div className='filterCategories'>
        <Categories/>
        
      </div>

        <IonContent color="light"/>
      <Footer />
    </>
  );
}

export default Home;
