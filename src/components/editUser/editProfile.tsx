import React, { useState, useEffect } from 'react';
import { IonInput, IonButton, IonCard, IonCardContent, IonCardTitle, IonToast, InputChangeEventDetail } from '@ionic/react';
import { userService } from '../../services/user';
import Header from '../header/header';
import Footer from '../footer/footer';

import './editProfile.css';

const EditProfile: React.FC = () => {
  const [state, setState] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    showErrorToast: false,
    showSuccessToast: false,
    errorMessage: ''
  });

  useEffect(() => {
    // Recuperar información del usuario almacenada en localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setState(userData);
    }
  }, []);

  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const target = event.target as HTMLInputElement;
    setState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  const handleEditProfile = async () => {
    const { name, lastname, email, password } = state;
    try {
    //   await userService.updateProfile({ name, lastname, email, password });
        console.log(name, lastname, email, password)

      setState({ ...state, showSuccessToast: true });
      
      // Actualizar los datos del usuario en localStorage después de editarlos
      localStorage.setItem('userData', JSON.stringify(state));
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData._id;
        await userService.updateUser(userId,userData);

      }

    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setState({ ...state, showErrorToast: true, errorMessage: 'Error al actualizar perfil. Por favor, inténtalo de nuevo.' });
    }
  }

  return (
    <>
      <Header />
      <div className='edit-profile-container'>
        <IonToast
          isOpen={state.showSuccessToast}
          onDidDismiss={() => setState({ ...state, showSuccessToast: false })}
          message="Perfil actualizado exitosamente"
          duration={3000}
          color="success" />
        <IonToast
          isOpen={state.showErrorToast}
          onDidDismiss={() => setState({ ...state, showErrorToast: false })}
          message={state.errorMessage}
          duration={3000}
          color="danger" />
        <IonCard className='card edit-profile-card'>
          <IonCardTitle className='card-content'>Editar Perfil</IonCardTitle>
          <IonCardContent className='card-content from-edit-profile'>
            <IonInput
              name="name"
              placeholder="Nombre"
              value={state.name}
              onIonChange={handleInputChange} />
            <IonInput
              name="lastname"
              placeholder="Apellido"
              value={state.lastname}
              onIonChange={handleInputChange} />
            <IonInput
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={state.email}
              onIonChange={handleInputChange} />
            <IonInput
              name="password"
              type="password"
              placeholder="Nueva Contraseña"
              value={state.password}
              onIonChange={handleInputChange} />
            <IonButton className='edit-profile-button' onClick={handleEditProfile} expand="block">Guardar Cambios</IonButton>
          </IonCardContent>
        </IonCard>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
