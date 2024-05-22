import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonText } from '@ionic/react';
import { cartOutline, cashOutline, personOutline,logInOutline } from 'ionicons/icons';
import Footer from 'src/components/footer/footer';
import Header from 'src/components/header/header';

import './userProfile.css'; 

class UserProfile extends Component {
  // Función para cerrar sesión
  handleLogout = () => {
    // Elimina los datos del usuario del localStorage
    localStorage.removeItem('userData');
    // Recarga la página para reflejar el estado de sesión cerrada
    window.location.reload();
  }

  render() {
    // Obtiene los datos del usuario almacenados en localStorage
    const userData = localStorage.getItem('userData');

    return (
      <IonPage>
        <Header />  
        <IonContent className="user-profile" color="light">
          {userData ? (
            <>
               <div className='validado'>
              <h1 className='greeting-text'>Hola {JSON.parse(userData).name}</h1>
              <IonText className='text-title'>Transacciones</IonText>
              <IonList inset={true}>
                <IonItem detail lines='full'>
                  <IonIcon icon={cartOutline} slot="start" />
                  <IonLabel>Compras</IonLabel>
                </IonItem>
                <IonItem routerLink="/MyProducts" detail lines='full'>
                  <IonIcon icon={cashOutline} slot="start" />
                  <IonLabel>Ventas</IonLabel>
                </IonItem>
              </IonList>
              <IonText className='text-title'>Cuenta</IonText>
              <IonList inset={true}>
                <IonItem routerLink="/user-edit" detail lines='full'>
                  <IonIcon icon={personOutline} slot="start" />
                  <IonLabel>Mi perfil</IonLabel>
                </IonItem>
                <IonItem onClick={this.handleLogout} detail lines='full' className='logout-item'>
                  <IonIcon icon={logInOutline} slot="start" />
                  <IonLabel>Cerrar Sesión</IonLabel>
                </IonItem>
              </IonList>
              </div>
            </>
          ) : (
            <>
            <div className='no-validado'>
            <IonText className='text-title'>Tienes una cuenta?</IonText>
              <IonList inset={true}>
                <IonItem routerLink="/login" detail lines='full' className='logout-item'>
                  <IonIcon icon={logInOutline} slot="start" />
                  <IonLabel>Inicia sesion</IonLabel>
                </IonItem>
                <IonItem routerLink="/register" detail lines='full' className='logout-item'>
                  <IonIcon icon={logInOutline} slot="start" />
                  <IonLabel>Registrate</IonLabel>
                </IonItem>
              </IonList>
            </div>
              
            </>
          )}
        </IonContent>
        <Footer />
      </IonPage>
    );
    
  }
}

export default UserProfile;
