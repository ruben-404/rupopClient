
// import React, { useState, useEffect } from 'react';
// import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent, IonSelect, IonSelectOption, IonSearchbar, IonGrid, IonRow, IonCol } from '@ionic/react';
// import { productService } from '../../services/products';
// import { ICategoria, IProduct } from '../../store/types';
// import { filterService } from 'src/services/filter';
// import './categories.css';
// import ProductCard from '../productCard/productCard';

// const Categories: React.FC = () => {
//   const [productos, setProductos] = useState<IProduct[]>([]);
//   const [favoritos, setFavoritos] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(5);
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedCondition, setSelectedCondition] = useState<string>('');
//   const [selectedPrice, setSelectedPrice] = useState<string>('');
//   const [searchText, setSearchText] = useState<string>('');
//   const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
//   const [categories, setCategories] = useState<ICategoria[]>([]);
//   const [maxProducts, setMaxProducts] = useState<number>();
//   const [loadMoreEnabled, setLoadMoreEnabled] = useState<boolean>(true);
//   const [loadedProductIds, setLoadedProductIds] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     loadCategories();
//     fetchMaxProducts();
//     loadProductos();
//     getFavoritos();
//   }, [currentPage, selectedCategory, selectedCondition, selectedPrice, searchText]);

//   const fetchMaxProducts = async () => {
//     try {
//       const maxProductCount = await productService.getProductMaxProduct();
//       const maxProductCountNumber = Number(maxProductCount);
//       setMaxProducts(maxProductCountNumber);
//     } catch (error) {
//       console.error('Error fetching max product count:', error);
//     }
//   };

//   const getFavoritos = async () => {
//     try {
//       const userDataString = localStorage.getItem('userData');
//       if (userDataString) {
//         const userData = JSON.parse(userDataString);
//         const favoritosResponse = await productService.getFavoritos(userData._id);
//         if (favoritosResponse.data && favoritosResponse.data.productos) {
//           const favoritosProductos = favoritosResponse.data.productos;
//           setFavoritos(favoritosProductos);
//           console.log('Favoritos:', favoritosProductos);
//         } else {
//           console.error('Error: Response data or productos array is missing');
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching favoritos:', error);
//     }
//   };

//   const loadProductos = async () => {
//     try {
//       const fetchedProductos = await productService.getAllProducts(
//         currentPage,
//         pageSize,
//         selectedCategory,
//         selectedCondition,
//         selectedPrice,
//         searchText
//       );

//       const nuevosProductos = fetchedProductos.filter((producto) => (
//         !loadedProductIds.has(producto._id)
//       ));

//       setProductos(prevProductos => [...prevProductos, ...nuevosProductos]);

//       nuevosProductos.forEach(producto => {
//         loadedProductIds.add(producto._id);
//       });

//       if (selectedCategory !== '' || searchText !== '' || selectedCondition !== '' || selectedPrice !== '') {
//         setProductos(fetchedProductos);
//         setMaxProducts(fetchedProductos.length);
//       }

//       if (productos.length >= maxProducts) {
//         setLoadMoreEnabled(false);
//       }
//     } catch (error) {
//       console.error('Error loading products:', error);
//     }
//   };

//   const loadMoreProductos = async (event: CustomEvent<void>) => {
//     try {
//       if (!loadMoreEnabled) {
//         console.log('Se alcanzó el límite máximo de productos.', maxProducts);
//         return;
//       }
      
//       setCurrentPage(prevPage => prevPage + 1);
//       await loadProductos();
//     } catch (error) {
//       console.error('Error loading more products:', error);
//     } finally {
//       if (event && event.target) {
//         (event.target as HTMLIonInfiniteScrollElement).complete();
//       }
//     }
//   };

//   const loadCategories = async () => {
//     try {
//       const fetchedCategories = await filterService.getCategories();
//       if (Array.isArray(fetchedCategories.data)) {
//         const normalizedCategories = fetchedCategories.data.map((category) => {
//           if (typeof category.title === 'object') {
//             // Si la propiedad title es un objeto, usa sus propiedades internas
//             return {
//               _id: category._id,
//               title: category.title.title,
//               description: category.title.description || '',
//               imageUrl: category.title.imageUrl || '',
//             };
//           } else {
//             // Si la propiedad title es un string, utiliza el objeto de categoría como está
//             return category;
//           }
//         });
//         setCategories(normalizedCategories);
//       }
//     } catch (error) {
//       console.error('Error loading categories:', error);
//     }
//   };
  

//   const handleCategoryChange = (event: CustomEvent) => {
//     const selectedCategory = event.detail.value;
//     setSelectedCategory(selectedCategory);

//     setCurrentPage(1);
//     setProductos([]);
//     setLoadedProductIds(new Set());
//   };

//   const handleConditionChange = (event: CustomEvent) => {
//     setSelectedCondition(event.detail.value);
//     setCurrentPage(1);
//     setProductos([]);
//     setLoadedProductIds(new Set());
//   };

//   const handlePriceChange = (event: CustomEvent) => {
//     setSelectedPrice(event.detail.value);
//     setCurrentPage(1);
//     setProductos([]);
//     setLoadedProductIds(new Set());
//   };

//   const handleSearchTextChange = (event: CustomEvent) => {
//     const newText = event.detail.value as string;
//     setSearchText(newText);

//     if (newText.trim() === '' || newText === null) {
//       setSelectedCategory('all');
//     }

//     setCurrentPage(1);
//     setProductos([]);
//     setLoadedProductIds(new Set());
//   };

//   return (
//     <div>
//       <div className="search-container">
//         <IonSearchbar
//           value={searchText}
//           onIonChange={handleSearchTextChange}
//           placeholder="Buscar productos"
//         />
//       </div>
//       <div className="categories-container">
//         <div className="categories-select">
//           <IonSelect
//             placeholder="Categorías"
//             labelPlacement="floating"
//             fill="outline"
//             label='Categoria'
//             onIonChange={handleCategoryChange}
//             interface="action-sheet"
//           >
//             <IonSelectOption value="all">Todas las categorías</IonSelectOption>
//             {categories.map(category => (
//               <IonSelectOption key={category._id} value={category.title}>
//                 {category.title}
//               </IonSelectOption>
//             ))}
//           </IonSelect>
//         </div>
//         <div className={`filters-container ${filtersExpanded ? 'expanded' : ''}`}>
//           <div className="filters-header" onClick={() => setFiltersExpanded(!filtersExpanded)}>
//           </div>
//           <div className="filters-content">
//             <IonSelect
//               placeholder="Estado"
//               labelPlacement="floating"
//               fill="outline"
//               label='Estado'
//               onIonChange={handleConditionChange}
//               interface="action-sheet"
//               interfaceOptions={{
//                 cssClass: 'estado-interface'
//               }}
//             >
//               <IonSelectOption value="usado">Usado</IonSelectOption>
//               <IonSelectOption value="roto">Roto</IonSelectOption>
//               <IonSelectOption value="nuevo">Nuevo</IonSelectOption>
//               <IonSelectOption value="comoNuevo">Como nuevo</IonSelectOption>
//               <IonSelectOption value="all">Todos</IonSelectOption>
//             </IonSelect>
//             <div className='value-select'>
//               <IonSelect
//                 placeholder="Precio"
//                 labelPlacement="floating"
//                 fill="outline"
//                 label='Precio'
//                 onIonChange={handlePriceChange}
//                 interface="action-sheet"
//                 interfaceOptions={{
//                   cssClass: 'value-interface'
//                 }}
//               >
//                 <IonSelectOption value="0-100">0-100</IonSelectOption>
//                 <IonSelectOption value="100-500">100-500</IonSelectOption>
//                 <IonSelectOption value="500-1000">500-1000</IonSelectOption>
//                 <IonSelectOption value="1000+">1000+</IonSelectOption>
//                 <IonSelectOption value="all">Todo</IonSelectOption>
//               </IonSelect>
//             </div>
//           </div>
//         </div>
//       </div>
//       <IonContent className="scrollable-content2">
//         <IonGrid>
//         <IonRow>
//           {Array.isArray(productos) && productos
//             .filter(producto => producto.state !== 'deshabilitado')  // Filtra productos deshabilitados
//             .map((producto, index) => (
//               <IonCol key={index} sizeXs="6" sizeMd="3">
//                 <ProductCard product={producto} edit={false} favoritos={favoritos} />
//               </IonCol>
//             ))}
//         </IonRow>

//         </IonGrid>
//         <IonInfiniteScroll threshold="400px" onIonInfinite={loadMoreProductos}>
//           <IonInfiniteScrollContent
//             loadingSpinner="bubbles"
//             loadingText="Cargando más productos..."
//           />
//         </IonInfiniteScroll>
//       </IonContent>
//     </div>
//   );
// };

// export default Categories;


import React, { useState, useEffect } from 'react';
import { IonSearchbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';
import { productService } from '../../services/products';
import { ICategoria, IProduct } from '../../store/types';
import { filterService } from 'src/services/filter';
import './categories.css';
import ProductCard from '../productCard/productCard';

const Categories: React.FC = () => {
  const [productos, setProductos] = useState<IProduct[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [maxProducts, setMaxProducts] = useState<number>();
  const [loadMoreEnabled, setLoadMoreEnabled] = useState<boolean>(true);
  const [loadedProductIds, setLoadedProductIds] = useState<Set<string>>(new Set());


  useEffect(() => {
    loadCategories();
    loadProductos();
    getFavoritos();
  }, [selectedCategory, selectedCondition, selectedPrice, searchText]);

  const getFavoritos = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const favoritosResponse = await productService.getFavoritos(userData._id);
        if (favoritosResponse.data && favoritosResponse.data.productos) {
          setFavoritos(favoritosResponse.data.productos);
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
      const fetchedProductos = await productService.getAllProducts2(selectedCategory, selectedCondition, selectedPrice, searchText);
      setProductos(fetchedProductos);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const fetchedCategories = await filterService.getCategories();
      if (Array.isArray(fetchedCategories.data)) {
        const normalizedCategories = fetchedCategories.data.map((category) => {
          if (typeof category.title === 'object') {
            return {
              _id: category._id,
              title: category.title.title,
              description: category.title.description || '',
              imageUrl: category.title.imageUrl || '',
            };
          } else {
            return category;
          }
        });
        setCategories(normalizedCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCategoryChange = (event: CustomEvent) => {
    setSelectedCategory(event.detail.value);
  };

  const handleConditionChange = (event: CustomEvent) => {
    setSelectedCondition(event.detail.value);
  };

  const handlePriceChange = (event: CustomEvent) => {
    setSelectedPrice(event.detail.value);
  };

  const handleSearchTextChange = (event: CustomEvent) => {
    setSearchText(event.detail.value as string);
  };

  return (
    <div>
       <div className="search-container">
        <IonSearchbar
          value={searchText}
          onIonChange={handleSearchTextChange}
          placeholder="Buscar productos"
        />
      </div>
      <div className="categories-container">
        <div className="categories-select">
          <IonSelect
            placeholder="Categorías"
            labelPlacement="floating"
            fill="outline"
            label='Categoria'
            onIonChange={handleCategoryChange}
            interface="action-sheet"
          >
            <IonSelectOption value="all">Todas las categorías</IonSelectOption>
            {categories.map(category => (
              <IonSelectOption key={category._id} value={category.title}>
                {category.title}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>
        <div className={`filters-container ${filtersExpanded ? 'expanded' : ''}`}>
          <div className="filters-header" onClick={() => setFiltersExpanded(!filtersExpanded)}>
          </div>
          <div className="filters-content">
            <IonSelect
              placeholder="Estado"
              labelPlacement="floating"
              fill="outline"
              label='Estado'
              onIonChange={handleConditionChange}
              interface="action-sheet"
              interfaceOptions={{
                cssClass: 'estado-interface'
              }}
            >
              <IonSelectOption value="usado">Usado</IonSelectOption>
              <IonSelectOption value="roto">Roto</IonSelectOption>
              <IonSelectOption value="nuevo">Nuevo</IonSelectOption>
              <IonSelectOption value="comoNuevo">Como nuevo</IonSelectOption>
              <IonSelectOption value="all">Todos</IonSelectOption>
            </IonSelect>
            <div className='value-select'>
              <IonSelect
                placeholder="Precio"
                labelPlacement="floating"
                fill="outline"
                label='Precio'
                onIonChange={handlePriceChange}
                interface="action-sheet"
                interfaceOptions={{
                  cssClass: 'value-interface'
                }}
              >
                <IonSelectOption value="0-100">0-100</IonSelectOption>
                <IonSelectOption value="100-500">100-500</IonSelectOption>
                <IonSelectOption value="500-1000">500-1000</IonSelectOption>
                <IonSelectOption value="1000+">1000+</IonSelectOption>
                <IonSelectOption value="all">Todo</IonSelectOption>
              </IonSelect>
            </div>
          </div>
        </div>
      </div>
      <IonContent className="scrollable-content2">
  <IonGrid>
    <IonRow className='koala'>
      {Array.isArray(productos) && productos.length > 0 ? (
        productos
          .filter(producto => producto.state !== 'deshabilitado')  // Filtra productos deshabilitados
          .map((producto, index) => (
            <IonCol key={index} sizeXs="6" sizeMd="3">
              <ProductCard product={producto} edit={false} favoritos={favoritos} />
            </IonCol>
          ))
      ) : (
        <IonCol>
          <div className='NoCon'>
            <p>Sin coincidencias</p>
          </div>
        </IonCol>
      )}
    </IonRow>
  </IonGrid>
</IonContent>


     
    </div>
  );
};

export default Categories;
