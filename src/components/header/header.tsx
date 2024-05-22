import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonImg } from '@ionic/react';
import logo from '../../assets/web-img/logo.png'; // Importa la imagen de tu logotipo
import './header.css'; // Importa el archivo de estilos

class Header extends Component {
  render() {
    return (
      <IonHeader className="header-container">
        <IonToolbar className="toolbar">
          <IonImg src={logo} className="logo-img" />
        </IonToolbar>
      </IonHeader>
    );
  }
}

export default Header;
