import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonFabButton,
  IonFab,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { filterService } from '../../services/filter';
import { ICategoria } from '../../store/types';
import { trash, pencil, add, logInOutline } from 'ionicons/icons';
import Header from 'src/components/header/header';
import './adminpanel.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<ICategoria[]>([]);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const isAdmin = userData && userData.isAdmin;
    if (!isAdmin) {
      navigate('/login');
    }
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const fetchedCategories = await filterService.getCategories();
      if (Array.isArray(fetchedCategories.data)) {
        const normalizedCategories = fetchedCategories.data.map((category) => {
          if (typeof category.title === 'object') {
            // Si la propiedad title es un objeto, usa sus propiedades internas
            return {
              _id: category._id,
              title: category.title.title,
              description: category.title.description || '',
              imageUrl: category.title.imageUrl || '',
            };
          } else {
            // Si la propiedad title es un string, utiliza el objeto de categoría como está
            return category;
          }
        });
        setCategories(normalizedCategories);
        setFilteredCategories(normalizedCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleLogout = () => {
    // Elimina los datos del usuario del localStorage
    localStorage.removeItem('userData');
    // Recarga la página para reflejar el estado de sesión cerrada
    navigate('/login');
  }

  const handleSearch = (event: CustomEvent) => {
    const searchText = event.detail.value;
    setSearchText(searchText);
    if (searchText.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      console.log(`Eliminar categoría con ID: ${categoryId}`);
      // Aquí deberías agregar la lógica para eliminar la categoría
      await filterService.deleteCategory(categoryId);
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
        <IonGrid className="ion-text-center">
          <IonRow className="contCate">
            <IonCol size="12">
              <IonCard>
                <IonCardContent>
                  <IonSearchbar value={searchText} onIonChange={handleSearch} placeholder="Buscar categorías" />
                </IonCardContent>
                <IonItem onClick={handleLogout} detail lines='full' className='logout-item'>
                  <IonIcon icon={logInOutline} slot="start" />
                  <IonLabel>Cerrar Sesión</IonLabel>
                </IonItem>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  <div className="scrollable-table-container">
                    <table className="category-table">
                      <thead>
                        <tr>
                          <th>Título</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(filteredCategories) &&
                          filteredCategories.map((category, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                              <td>{category.title}</td>
                              <td className="actions-column">
                                {/* <IonButton color="primary" onClick={() => handleEdit(category)}>
                                  <IonIcon slot="icon-only" icon={pencil} />
                                </IonButton> */}
                                <IonButton color="danger" onClick={() => handleDelete(category._id)}>
                                  <IonIcon slot="icon-only" icon={trash} />
                                </IonButton>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <Link to="/category/create">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </Link>
    </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default AdminPanel;
