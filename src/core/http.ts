import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Configuración base de Axios
const axiosInstance = axios.create({
  baseURL: 'https://localhost:3100', // URL base de tu servidor
  timeout: 5000, // Tiempo máximo de espera para las solicitudes (en milisegundos)
});

// Función para realizar solicitudes HTTP con Axios
export const httpRequest = async (url: string, method: string, data?: any): Promise<AxiosResponse<any, any>> => {
    // Configuración de la solicitud
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      data: data,
    };
  
    try {
      // Realizar la solicitud y devolver la respuesta
      const response = await axiosInstance(config);
      return response;
    } catch (error: any) { // Especificar el tipo de 'error' como 'any'
      throw new Error(`HTTP request failed: ${(error as Error).message}`);
    }
  };
  
