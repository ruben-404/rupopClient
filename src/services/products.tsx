import { httpRequest } from 'src/core/http';
import { AxiosResponse } from 'axios';
import { IProduct } from '../store/types'; // Asegúrate de importar el tipo correcto para los productos

export class ProductService {
    async getAllProducts(
        currentPage: number,
        pageSize: number,
        category?: string,
        selectedCondition?: string,
        selectedPrice?: string,
        searchText?: string,

      ): Promise<IProduct[]> {
        try {
          // Construir la URL base del endpoint
          let url = `/product/${currentPage}/${pageSize}/${category || 'all'}/${searchText || 'all'}/${selectedPrice || 'all'}/${selectedCondition || 'all'}`;
    
          // Realizar la solicitud GET al endpoint con la URL construida
          const response: AxiosResponse<IProduct[]> = await httpRequest(url, 'GET');
          
          // Manejar la respuesta
          if (response.status !== 200) {
            throw new Error('Failed to fetch products');
          }
      
          return response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
          throw error;
        }
    }
    
      
    async getProductMaxProduct(): Promise<number> {
        try {
            const url = `/product/max`;
            const response: AxiosResponse<number> = await httpRequest(url, 'GET');
            if (response.status !== 200) {
                throw new Error('Failed to fetch product count');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching product count:', error);
            throw error;
        }
    }
    

    async getProductById(productId: string): Promise<IProduct> {
        try {
            const url = `/product/${productId}`;
            const response: AxiosResponse<IProduct> = await httpRequest(url, 'GET');
            if (response.status !== 200) {
                throw new Error('Failed to fetch product');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    async createProduct(newProduct: IProduct): Promise<void> {
        try {
            const url = `/product/create`;
            const response: AxiosResponse<void> = await httpRequest(url, 'POST', newProduct);
            if (response.status !== 200) {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    async editProduct(productId: string, updatedProduct: IProduct): Promise<void> {
        try {
            const url = `/product/edit/${productId}`;
            const response: AxiosResponse<void> = await httpRequest(url, 'POST', updatedProduct);
            if (response.status !== 200) {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    async deleteProduct(productId: string): Promise<void> {
        try {
            const url = `/product/${productId}`;
            const response: AxiosResponse<void> = await httpRequest(url, 'DELETE');
            if (response.status !== 200) {
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    async getProductsByUser(userId: string): Promise<IProduct[]> {
        try {
            const url = `/product/user`;
            const response: AxiosResponse<IProduct[]> = await httpRequest(url, 'POST', { userId });
            if (response.status !== 200) {
                throw new Error('Failed to fetch products by user');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching products by user:', error);
            throw error;
        }
    }

    async addfavoritos(userId: string,productId: string):  Promise<void> {
        try {
            const url = `/favoritos/add`;
            const response: AxiosResponse<void> = await httpRequest(url, 'POST', { userId,productId });
            if (response.status !== 200) {
                throw new Error('Failed to fetch products by user');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching products by user:', error);
            throw error;
        }
    }

    async getFavoritos(userId:string): Promise<any> {
        try {
            const url = `/favoritos/user/${userId}`;
            const response: AxiosResponse<any> = await httpRequest(url, 'GET'); // Cambio en el tipo de respuesta esperada
            if (response.status !== 200) {
                throw new Error('Failed to fetch favorites');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }

    async getFavoritosProduct(userId: string): Promise<IProduct[]> {
        try {
            const url = `/favoritos/products/${userId}`;
            const response: AxiosResponse<IProduct[]> = await httpRequest(url, 'GET');
            if (response.status !== 200) {
                throw new Error('Failed to fetch product');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    // async getAllProducts2(): Promise<IProduct[]> {
    //     try {
    //         // URL para obtener todos los productos sin parámetros
    //         const url = `/product/all`;
    
    //         // Realizar la solicitud GET al endpoint con la URL construida
    //         const response: AxiosResponse<IProduct[]> = await httpRequest(url, 'GET');
            
    //         // Manejar la respuesta
    //         if (response.status !== 200) {
    //             throw new Error('Failed to fetch products');
    //         }
        
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //         throw error;
    //     }
    // }

    async getAllProducts2(
        category?: string,
        selectedCondition?: string,
        selectedPrice?: string,
        searchText?: string,

      ): Promise<IProduct[]> {
        try {
          // Construir la URL base del endpoint
          let url = `/product/${searchText || 'all'}/${category || 'all'}/${selectedPrice || 'all'}/${selectedCondition || 'all'}`;
    
          // Realizar la solicitud GET al endpoint con la URL construida
          const response: AxiosResponse<IProduct[]> = await httpRequest(url, 'GET');
          
          // Manejar la respuesta
          if (response.status !== 200) {
            throw new Error('Failed to fetch products');
          }
      
          return response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
          throw error;
        }
    }
    
}

export const productService: ProductService = new ProductService();
