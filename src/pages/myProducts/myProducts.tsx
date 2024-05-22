import React, { useState, useEffect } from 'react';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { productService } from '../../services/products';
import { IProduct } from '../../store/types';
import ProductCard from '../../components/productCard/productCard';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';
import './myProducts.css';

const MyProducts: React.FC = () => {
  const [productos, setProductos] = useState<IProduct[]>([]);

  useEffect(() => {
    loadProductos();
  }, []);

  useEffect(() => {
    console.log(productos);
  }, [productos]);

  const loadProductos = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData._id;
        const fetchedProductos = await productService.getProductsByUser(userId);
        console.log(fetchedProductos)
        setProductos(fetchedProductos.data);
        console.log(productos)

      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };
  
  return (
    <><Header /><div className='scrollable-content'>
    <IonGrid>
      <IonRow className='myProdcutsContent'>
        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map((producto, index) => (
            <IonCol key={index} sizeXs="6" sizeMd="3">
              <ProductCard product={producto} edit={true} favoritos={[]} />
            </IonCol>
          ))
        ) : (
          <IonCol className="no-products" sizeXs="12">
            <p>No hay productos disponibles</p>
          </IonCol>
        )}
      </IonRow>
    </IonGrid>
  </div><Footer /></>

  );
};

export default MyProducts;
