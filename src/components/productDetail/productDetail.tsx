import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonIcon, IonInput, IonTextarea, IonSelect, IonSelectOption, IonChip, IonToast, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage } from '@ionic/react';

import { productService } from '../../services/products';
import { ICategoria, IProduct } from '../../store/types';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Carousel } from 'react-responsive-carousel';
import { filterService } from 'src/services/filter';
import { closeOutline, saveOutline, cameraOutline } from 'ionicons/icons';
import './productDetail.css';

const ProductDetailPage: React.FC = () => {
  const location = useLocation();
  const { edit } = location.state || {};
  const [product, setProduct] = useState<IProduct>();
  const [formData, setFormData] = useState<IProduct | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);


  const { id } = useParams(); 
  
  useEffect(() => {
    loadCategories();
    console.log(edit)
    const loadProduct = async () => {
      try {
        if(id){
          const loadedProduct = await productService.getProductById(id);
          console.log(loadedProduct)
          setProduct(loadedProduct.data);
          setFormData(loadedProduct.data);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };
  
    loadProduct();
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }) as IProduct | null);
  };

  const handleSubmit = async () => {
    try {
      if(formData && id) {
          console.log(formData);
          await productService.editProduct(id,formData);
          setShowSuccessToast(true);

          
      }
    } catch (error) {
        console.error('Error updating product:', error);
    }
  };

  
  const loadCategories = async () => {
    try {
      const fetchedCategories = await filterService.getCategories();
      if (Array.isArray(fetchedCategories.data)) {
        const categoryTitles = fetchedCategories.data.map((category) => {
          if (typeof category.title === 'object') {
            return category.title.title || ''; // Si es un objeto, obtenemos el título
          } else {
            return category.title || ''; // Si es un string, simplemente devolvemos el título
          }
        });
        setCategories(categoryTitles);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setShowCamera(true);

      // Verificar si videoContainer no es nulo antes de usarlo
      const videoContainer = document.getElementById('video-container');
      if (videoContainer) {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        videoContainer.appendChild(video);

        const captureButton = document.createElement('button');
        captureButton.classList.add('fotoBoton')
        const imgElement = document.createElement('img');
        imgElement.src = '../../assets/web-img/camera-outline.svg';
        captureButton.appendChild(imgElement);



        // Cambia el botón de texto a un ícono de IonIcon

        captureButton.addEventListener('click', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const base64Data = canvas.toDataURL('image/png');

            stream.getTracks().forEach(track => track.stop());
            videoContainer.removeChild(video);
            videoContainer.removeChild(captureButton);

            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
              const userData = JSON.parse(userDataString);
              const userEmail = userData.email;
              const fileName = `${formData.name}_${userEmail}_camera.png`;
              const updatedImages = [...formData.images, { fileName, base64Data }];
              setFormData(prevState => {
                if (!prevState) return prevState;
              
                return {
                  ...prevState,
                  images: updatedImages,
                };
              });
              
              setShowCamera(false);
            }
          }
        });

        videoContainer.appendChild(captureButton);
      } else {
        console.error('Error: No se encontró el elemento con id "video-container"');
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const handleDeleteImage = (index: number) => {
    setFormData(prevState => {
      if (!prevState) return prevState; // Retorna el estado actual si es null
  
      const updatedImages = [...prevState.images];
      updatedImages.splice(index, 1);
  
      return {
        ...prevState,
        images: updatedImages,
      };
    });
  };
  
  

  return (
    <IonPage>
      <Header/>
      {showCamera && (
        <div id="video-container">
          <IonIcon icon={closeOutline} onClick={() => setShowCamera(false)} ></IonIcon>

        </div>
      )}
      <div className="product-detail-container" style={{ display: showCamera ? 'none' : 'flex' }}>
        <IonCard className='CardDetail'>
          <Carousel showThumbs={false} className='product-detail-image'>
            {formData?.images.map((image, index) => (
              <div key={index}>
                {typeof image !== 'string' && image.base64Data && (
                  <div className="image-container jii">
                     {edit && (
                    <IonIcon icon={closeOutline} onClick={() => handleDeleteImage(index)} className="delete-icon" />
                     )}
                    <img src={image.base64Data} alt={`Product Image ${index}`} />
                  </div>
                )}
              </div>
            ))}
          </Carousel>
          {!edit && (
            <>
            <div className='chips'>
              <IonChip color="primary">{product?.category}</IonChip>
              <IonChip color="primary">{product?.estado}</IonChip>
            </div>

            </>
          )}
          <div className="product-detail-content">
            {edit ? (
              <form className="form-container">
                <div>
                  <div >
                    <div>
                      <label className="form-label">Nombre del Producto</label>
                      <IonInput name="name" value={formData?.name || ''} onIonChange={handleInputChange}></IonInput>
                    </div>
                    <div>
                    <label className="form-label">Descripción</label>
                    <IonTextarea
                      name="description"
                      value={formData?.description || ''}
                      onIonChange={handleInputChange}
                      rows={5} // Número de filas en el área de texto
                      autoGrow={true} // Permitir que el área de texto crezca automáticamente en función del contenido
                    ></IonTextarea>
                  </div>

                  </div>
                  <div>
                  <div>
                    <label className="form-label">Precio</label>
                    <IonInput name="price" type="number" value={formData?.price || ''} onIonChange={handleInputChange}></IonInput>
                  </div>
                  <div>
                  <div>
                      <label className="form-label">Estado de la venta</label>
                      <IonSelect
                          name="state"
                          value={formData?.state || ''}
                          placeholder="Selecciona un estado"
                          onIonChange={handleInputChange}
                      >
                          <IonSelectOption value="en venta">En venta</IonSelectOption>
                          <IonSelectOption value="Reservado">Reservado</IonSelectOption>
                          <IonSelectOption value="Vendido">Vendido</IonSelectOption>
                          <IonSelectOption value="deshabilitado">Deshabilitar</IonSelectOption>

                      </IonSelect>
                  </div>
                  </div>
                </div>
                  </div>
                <div>

                <div>
                  <div><label className="form-label">Categoría</label>
                  <IonSelect
                    name="category"
                    value={formData?.category || ''}
                    placeholder="Selecciona una categoría"
                    onIonChange={handleInputChange}
                  >
                    {categories.map((category, index) => (
                      <IonSelectOption key={index} value={category}>{category}</IonSelectOption>
                    ))}
                  </IonSelect></div>
                  
                  <div></div>
                  </div>

                </div>
                <div className='botonesPr'>
                  <IonButton onClick={handleCameraCapture} expand="block"><IonIcon icon={cameraOutline}></IonIcon></IonButton>
                  <IonButton onClick={handleSubmit} expand="block"><IonIcon icon={saveOutline} ></IonIcon></IonButton>
                </div>
           


              </form>
            ) : (
              <>
                <h2>{product?.name}</h2>
                <div className="description-container">
                  <p>{product?.description}</p>
                </div>
                <p>{product?.price}€</p>
              </>
            )}
          </div>
        </IonCard>
      </div>
      <IonToast
                isOpen={showSuccessToast}
                onDidDismiss={() => setShowSuccessToast(false)}
                message="Producto editado correctamente"
                duration={3000}
                color='success'
            />
      <Footer />
    </IonPage>
  );
};

export default ProductDetailPage;
