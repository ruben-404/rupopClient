import React, { useState } from 'react';
import { IonInput, IonButton, IonCard, IonCardContent, IonCardTitle, IonToast } from '@ionic/react';
import { userService } from '../../services/user';
import Header from '../header/header';

import { useDispatch } from 'react-redux'; // Importa useDispatch de react-redux
import { setUser } from '../../store/actions/userActions'; // Importa la acción setUser
import './login.css';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';

interface State {
  username: string;
  password: string;
  showErrorToast: boolean;
  errorMessage: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch(); // Obtiene la función dispatch de redux
  const navigate = useNavigate();

  const [state, setState] = useState<State>({
    username: '',
    password: '',
    showErrorToast: false,
    errorMessage: ''
  });

  const handleInputChange = (event: CustomEvent) => {
    const target = event.target as HTMLInputElement;
    setState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  const handleLogin = async () => {
    const { username, password } = state;
    try {
      // Llamar al servicio de usuarios para iniciar sesión con username y password
      const userData = await userService.login(username, password);
      
      // Guardar los datos del usuario en el store de redux
      // dispatch(setUser(userData));
      // console.log(userData);
      // Guardar los datos del usuario en localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('es admin?', userData.isAdmin)
      // Redireccionar al usuario después de iniciar sesión
      if(!userData.isAdmin){
        navigate('/');

      }else{
        navigate('/admin-panel');

      }
      

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setState(prevState => ({
        ...prevState,
        showErrorToast: true,
        errorMessage: 'Credenciales no válidas'
      }));
    }
  }

  return (
    <><><Header /><div className='login-container'>
      
      <IonToast
        isOpen={state.showErrorToast}
        onDidDismiss={() => setState(prevState => ({ ...prevState, showErrorToast: false }))}
        message={state.errorMessage}
        duration={3000}
        color="danger" />
      <IonCard className='card'>
        <IonCardTitle className='card-content'>¡Te damos las bienvenida!</IonCardTitle>
        <IonCardContent className='card-content from-login'>
          <IonInput
            name="username"
            placeholder="Nombre de usuario"
            value={state.username}
            onIonChange={handleInputChange} />
          <IonInput
            name="password"
            type="password"
            placeholder="Contraseña"
            value={state.password}
            onIonChange={handleInputChange} />
          <IonButton className='login-button' onClick={handleLogin} expand="block">Iniciar sesión</IonButton>
        </IonCardContent>
      </IonCard>
    </div></><Footer /></>

  );
}

export default Login;
