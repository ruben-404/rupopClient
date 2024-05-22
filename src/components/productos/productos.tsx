import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import { productService } from '../../services/products';
import Categories from '../categories/categories'; // Asegúrate de importar correctamente el componente AppFilter
// import AppProductoInfo from '../AppProductoInfo'; // Asegúrate de importar correctamente el componente AppProductoInfo
import './productos.css';
import { IProduct } from 'src/store/types';

const AppProductos = () => {
    const [productos, setProductos] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [priceInput, setpriceInput] = useState('');

  useEffect(() => {
    loadProductos();
  }, [currentPage, selectedCategory, searchInput]);

  const loadProductos = async () => {
    try {
      const fetchedProductos = await productService.getAllProducts(
        currentPage,
        pageSize,
        selectedCategory === 'all' ? undefined : selectedCategory,
        searchInput
      );
      setProductos(fetchedProductos);
      setTotalPages(Math.ceil(fetchedProductos.length / pageSize));
    } catch (error) {
      console.error('Error loading productos:', error);
    }
  };

  const loadMoreProductos = async (event: CustomEvent<void>) => {
    try {
      setCurrentPage(currentPage + 1);
      const moreProductos = await productService.getAllProducts(
        currentPage + 1,
        pageSize,
        selectedCategory === 'all' ? undefined : selectedCategory,
        searchInput
      );
      setProductos([...productos, ...moreProductos]);
    } catch (error) {
      console.error('Error loading more productos:', error);
    } finally {
      if (event && event.target) {
        (event.target as HTMLIonInfiniteScrollElement).complete();
      } else {
        console.error('Event target is null.');
      }
    }
  };
  
  

  const handleFilterChange = (event: { detail: { category: React.SetStateAction<string>; name: React.SetStateAction<string>; price: React.SetStateAction<string>; }; }) => {
    setSelectedCategory(event.detail.category);
    setSearchInput(event.detail.name);
    setpriceInput(event.detail.price); // Establecer el precio seleccionado
    console.log(event.detail);
    setCurrentPage(1); // Resetear la página actual al cambiar los filtros
  };
  

  return (
    <IonContent>
      <Categories onFilterChange={handleFilterChange} />
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="10" size-md="8" size-lg="10">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Lista de Productos</IonCardTitle>
                <p>hola</p>
              </IonCardHeader>
              <IonCardContent>
                {/* <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Categoría</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(productos) && productos.map((producto, index) => (
                        <p key={index}>{producto.name}</p>
                    ))}
                    </tbody>

                </table> */}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonInfiniteScroll threshold="100px" onIonInfinite={loadMoreProductos}>
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Cargando más productos..."
        />
      </IonInfiniteScroll>
    </IonContent>
  );
};

export default AppProductos;
