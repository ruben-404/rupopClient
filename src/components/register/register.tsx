import React, { useState } from 'react';
import { IonInput, IonButton, IonCard, IonCardContent, IonCardTitle, IonToast } from '@ionic/react';
import { userService } from '../../services/user';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';


import './register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    showErrorToast: false,
    showSuccessToast: false,
    errorMessage: ''
  });

  const handleInputChange = (event: CustomEvent) => {
    const target = event.target as HTMLInputElement;

    setState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  const handleRegister = async () => {
    const { name, lastname, email, password } = state;
    try {
      await userService.register({ name, lastname, email, password });
      setState({ ...state, showSuccessToast: true });
      navigate('/login');


    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setState({ ...state, showErrorToast: true, errorMessage: 'Error al registrar usuario. Por favor, inténtalo de nuevo.' });
    }
  }

  return (
    <>
      <Header />
      <div className='register-container'>
        <IonToast
          isOpen={state.showSuccessToast}
          onDidDismiss={() => setState({ ...state, showSuccessToast: false })}
          message="Usuario creado exitosamente"
          duration={3000}
          color="success" />
        <IonToast
          isOpen={state.showErrorToast}
          onDidDismiss={() => setState({ ...state, showErrorToast: false })}
          message={state.errorMessage}
          duration={3000}
          color="danger" />
        <IonCard className='card register-card'>
          <IonCardTitle className='card-content'>Regístrate</IonCardTitle>
          <IonCardContent className='card-content from-register'>
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
              placeholder="Contraseña"
              value={state.password}
              onIonChange={handleInputChange} />
            <IonButton className='register-button' onClick={handleRegister} expand="block">Registrarse</IonButton>
          </IonCardContent>
        </IonCard>
      </div>
      <Footer />
    </>
  );
}

export default Register;
