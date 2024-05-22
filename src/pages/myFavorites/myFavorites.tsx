import React, { useState, useEffect } from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonChip } from '@ionic/react';
import { productService } from '../../services/products';
import { IProduct } from '../../store/types';
import ProductCard from '../../components/productCard/productCard';
import Header from 'src/components/header/header';
import Footer from 'src/components/footer/footer';
import './myFavorites.css';
import { useNavigate } from 'react-router-dom';


const MyFavorites: React.FC = () => {
  const [productos, setProductos] = useState<IProduct[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const navigate = useNavigate();


  useEffect(() => {

    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      navigate('/login');
    }
    loadProductos();
    getFavoritos();

  }, []);

  useEffect(() => {
  }, [productos]);

  const getFavoritos = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const favoritosResponse = await productService.getFavoritos(userData._id);
        // Verificar si la respuesta contiene la propiedad 'data' y 'productos'
        if (favoritosResponse.data && favoritosResponse.data.productos) {
          const favoritosProductos = favoritosResponse.data.productos;
          setFavoritos(favoritosProductos); // Establecer los favoritos en el estado 'favoritos'
          console.log('Favoritos:', favoritosProductos);
        } else {
          console.error('Error: Response data or productos array is missing');
        }
      }
    } catch (error) {
      console.error('Error fetching favoritos:', error);
    }
  };

  const loadProductos = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData._id;
        const fetchedProductos = await productService.getFavoritosProduct(userId);
        console.log(fetchedProductos)
        setProductos(fetchedProductos.data);
        console.log(productos)

      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };
  
  return (
    <><Header />
     <div className='scrollable-content'>
        <IonGrid>
          <IonRow className='myProdcutsContent'>
            {Array.isArray(productos) && productos.length > 0 ? (
              productos
                .filter(producto => producto.state !== 'deshabilitado')
                .map((producto, index) => (
                  <IonCol key={index} sizeXs="6" sizeMd="3">
                    <ProductCard product={producto} edit={false} favoritos={favoritos} />
                  </IonCol>
                ))
            ) : (
              <IonCol className="no-favorites" sizeXs="12">
                <p>Sin Favoritos</p>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </div><Footer /></>

  );
};

export default MyFavorites;
