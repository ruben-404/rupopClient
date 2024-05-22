import { modalController } from '@ionic/core';


export function openSelectAddScaleModal(component: string, componentProps?: Record<string, any>) {
    return new Promise<void>((resolve, reject) => {
      modalController
        .create({
          component,
          componentProps,
        })
        .then(modal => {
          modal.onDidDismiss().then(() => {
            resolve(); 
          });
          modal.present();
        })
        .catch(error => {
          reject(error);
        });
    });
  }