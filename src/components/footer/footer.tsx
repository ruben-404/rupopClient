import React, { Component } from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { addOutline, homeOutline, heartOutline, mailOutline, personOutline } from 'ionicons/icons';
import ModalComponent from '../CreateProducto/CreateProducto'; // Importa el componente ModalComponent
import './footer.css';
import { useNavigate } from 'react-router-dom';


interface FooterProps {}

interface FooterState {
  showModal: boolean;
}

class Footer extends Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      showModal: false
    };
  }


  render() {
    return (

      <div className="footer-container">

        <IonTabBar slot="bottom" className="footer-tab-bar">
          <IonTabButton tab="home" href="/">
            <IonIcon icon={homeOutline}></IonIcon>
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>

          <IonTabButton tab="favoritos" href="/my-favorites">
            <IonIcon icon={heartOutline}></IonIcon> 
            <IonLabel>Favoritos</IonLabel>
          </IonTabButton>

          <IonTabButton tab="vender" href="/create-product">
            <IonIcon icon={addOutline}></IonIcon> 
            <IonLabel>Vender</IonLabel>
          </IonTabButton>

          {/* <IonTabButton tab="buzun" href="/library">
            <IonIcon icon={mailOutline}></IonIcon> 
            <IonLabel>Buzón</IonLabel>
          </IonTabButton> */}

          <IonTabButton tab="tu" href="/user-profile">
            <IonIcon icon={personOutline}></IonIcon>
            <IonLabel>Tú</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </div>
    );
  }
}

export default Footer;
