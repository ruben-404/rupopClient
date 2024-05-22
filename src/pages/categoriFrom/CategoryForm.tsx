import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { filterService } from '../../services/filter';
import { useNavigate } from 'react-router-dom';
import Header from 'src/components/header/header';
import './categoriFrom.css';


const AddCategoryForm: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('/vacio'); // Agrega estado para la URL de la imagen si es necesario

  useEffect(() => {

    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const isAdmin = userData && userData.isAdmin;
    if (!isAdmin) {
      navigate('/login');

    }
  }, []);


  const handleSave = async () => {
    try {
      await filterService.createCategory(title, description, imageUrl ); // Pasa todos los argumentos necesarios al servicio
      // Aquí puedes agregar lógica adicional después de guardar la categoría, como redirigir al usuario a otra página, mostrar un mensaje de éxito, etc.
      console.log('Categoría creada exitosamente');
      navigate('/admin-panel');

    } catch (error) {
      console.error('Error al crear la categoría:', error);
    }
  };

  return (
      <><Header /><div className='cat-container'>
      <IonCard className='card'>
        <IonCardTitle className='card-content'>Crear categoria</IonCardTitle>

        <IonItem>
          <IonLabel position="stacked">Título</IonLabel>
          <IonInput
            type="text"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
            placeholder="Ingrese el título de la categoría" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonInput
            type="text"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
            placeholder="Ingrese la descripción de la categoría" />
        </IonItem>
        <IonButton expand="block" onClick={handleSave}>Guardar</IonButton>

      </IonCard>

      {/* Agrega entrada para la URL de la imagen si es necesario */}
      {/* <IonItem>
      <IonLabel position="stacked">URL de la imagen</IonLabel>
      <IonInput
        type="text"
        value={imageUrl}
        onIonChange={(e) => setImageUrl(e.detail.value!)}
        placeholder="Ingrese la URL de la imagen de la categoría"
      />
    </IonItem> */}
    </div></>
  );
};

export default AddCategoryForm;
