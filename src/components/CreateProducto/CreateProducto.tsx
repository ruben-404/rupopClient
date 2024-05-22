import React, { useEffect, useState } from 'react';
import { IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonCard, IonCardContent, IonCardTitle, IonToast, IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

import { filterService } from '../../services/filter';
import Footer from 'src/components/footer/footer';
import Header from 'src/components/header/header';
import { ICategoria } from '../../store/types';
import { Carousel } from 'react-responsive-carousel';
import { productService } from '../../services/products';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './CreateProducto.css'; 

const CreateProducto: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [] as (string | { fileName: string; base64Data: any })[],
    userId: '',
    estado: '',

  });

  const [showCamera, setShowCamera] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);

  const [showSuccessToast, setShowSuccessToast] = useState(false);


  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      navigate('/login');
    }
    loadCategories();
  }, []);

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
  



  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
              setFormData(prevState => ({
                ...prevState,
                images: updatedImages,
              }));
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileReaders: FileReader[] = [];
      const base64Images: { fileName: string; base64Data: any }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();
        fileReaders.push(fileReader);

        fileReader.onloadend = () => {
          if (fileReader.result) {
            base64Images.push({
              fileName: file.name,
              base64Data: fileReader.result
            });

            if (base64Images.length === files.length) {
              setFormData(prevState => ({
                ...prevState,
                images: [...prevState.images, ...base64Images]
              }));
            }
          }
        };

        fileReader.readAsDataURL(file);
      }
    }
  };


  const handleDeleteImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  useEffect(() => {
    console.log('images:', formData.images);
  }, [formData.images]);

  const handleSubmit = async () => {
    try {
      if (formData.images.length === 0) {
        console.error('Debes subir al menos una imagen');
        // Puedes mostrar un mensaje de error o realizar alguna otra acción para informar al usuario
        return;
      }
        console.log('Formulario enviado:', formData);
        
        
        // Obtener el ID del usuario del almacenamiento local
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const userData = JSON.parse(userDataString);

            // Agregar el campo userId al formData con el ID del usuario
            formData.userId = userData._id;

            // Crear el producto utilizando el servicio
            await productService.createProduct(formData);
            setShowSuccessToast(true);
            navigate('/user-profile');


        }
        

        
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};

  return (
    <>
      <Header />
      
      {showCamera && (
        <div id="video-container">
          {/* Contenido para la cámara */}
          <IonIcon icon={closeOutline} onClick={() => setShowCamera(false)} ></IonIcon>

        </div>
      )}

      <div className='register-container' style={{ display: showCamera ? 'none' : 'flex' }}>
        <IonToast
          isOpen={false}
          message=""
          duration={0}
          color="success"
        />
        <IonCard className='form-create'>
          <IonCardTitle className='card-content'>Crear Producto</IonCardTitle>
          <IonCardContent className='card-content from-create'>
            <IonItem className='form-item'>
              <IonInput
                name="name"
                value={formData.name}
                placeholder="Nombre del producto"
                onIonChange={handleInputChange} />
            </IonItem>
            <IonItem className='form-item'>
              <IonInput
                name="description"
                value={formData.description}
                placeholder="Descripción"
                onIonChange={handleInputChange} />
            </IonItem>
            <IonItem className='form-item'>
              <IonInput
                name="price"
                type="number"
                value={formData.price}
                placeholder="Precio"
                onIonChange={handleInputChange} />
            </IonItem>
            <IonItem className='form-item'>
              <IonSelect
                name="category"
                value={formData.category}
                placeholder="Categoría"
                onIonChange={handleInputChange}
                className='select-category'
              >
                {categories.map((category, index) => (
                  <IonSelectOption key={index} value={category}>{category}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className='form-item'>
              <IonSelect
                name="estado"
                value={formData.estado}
                placeholder="Estado"
                onIonChange={handleInputChange}
                className='select-category'
              >
                <IonSelectOption value="usado">Usado</IonSelectOption>
                <IonSelectOption value="roto">Roto</IonSelectOption>
                <IonSelectOption value="nuevo">Nuevo</IonSelectOption>
                <IonSelectOption value="comoNuevo">Como nuevo</IonSelectOption>
                <IonSelectOption value="all">Todos</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className='form-item'>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            </IonItem>
            <IonItem className='form-item'>
              <IonButton onClick={handleCameraCapture}>Usar Cámara</IonButton>
            </IonItem>

            <IonButton className='submit-button' onClick={handleSubmit} expand="block">Enviar</IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard className='imageCard' style={{ display: formData.images.length === 0 ? 'none' : 'flex' }}>

        <div className="image-carousel">
          <Carousel showThumbs={false}>
            {formData.images.map((image, index) => (
              <div key={index} className="image-item">
              {typeof image === 'string' ? (
                <img src={image} alt={`Foto ${index}`} />
              ) : (
                <div className="image-container">
                  <IonIcon icon={closeOutline} onClick={() => handleDeleteImage(index)} className="delete-icon" />
                  <img src={image.base64Data} alt={`Foto ${index}`} />
                </div>
              )}
            </div>
            
            ))}
          </Carousel>
        </div>
        </IonCard>

      </div>
      <Footer />
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        message="Producto creado exitosamente"
        duration={3000}
        color="success"
      />
    </>
  );
};

export default CreateProducto;
