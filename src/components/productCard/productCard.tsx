import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonIcon } from '@ionic/react';
import { heartOutline, heart } from 'ionicons/icons';
import { IProduct } from '../../store/types';
import { productService } from '../../services/products';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Asegúrate de importar el archivo CSS

interface ProductCardProps {
  product: IProduct;
  edit: boolean;
  favoritos: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, edit, favoritos }) => {
  const base64Data = typeof product.images[0] === 'object' ? product.images[0].base64Data : '';
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Verificar si el ID del producto está en la lista de favoritos al cargar
    if (favoritos.includes(product._id)) {
      setIsFavorite(true);
    }
  }, [favoritos, product._id]);

  const handleClick = () => {
    navigate(`/detail-product/${product._id}`, { state: { edit: edit } });
  };

  const handleFavoriteToggle = async () => {
    setIsFavorite(!isFavorite);
    const userDataString = localStorage.getItem('userData');
    if (userDataString && product._id) {
      const userData = JSON.parse(userDataString);
      const response = await productService.addfavoritos(userData._id, product._id);
      console.log(response);
    }
  };

  return (
    <IonCard>
      <div className="image-container" style={{ position: 'relative' }}>
        <div className="image-wrapper" onClick={handleClick}>
          <IonImg className="product-image" src={base64Data} />
        </div>
        {(product.state === 'Reservado' || product.state === 'Vendido') && (
          <div className="dark-overlay">
            <div><h3>{product.state}</h3></div>
          </div>
        )}
      </div>
      <IonCardHeader onClick={handleClick}>
        <IonCardTitle className="product-title">{product.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className='sssdd'>
        <div className='sd'>        <p>{product.price}€</p>
        </div>
        <IonButton fill="clear" onClick={handleFavoriteToggle}>
          <IonIcon icon={isFavorite ? heart : heartOutline} color={isFavorite ? 'danger' : 'medium'} />
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
