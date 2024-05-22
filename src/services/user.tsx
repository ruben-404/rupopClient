import { httpRequest } from 'src/core/http';
import { AxiosResponse } from 'axios';
import { IUser } from '../store/types';



export class UserService {
    async getUsers(): Promise<IUser[]> {
        try {
            const url = `/users`;
            const response: AxiosResponse<IUser[]> = await httpRequest(url, 'GET');
            if (response.status !== 200) {
                throw new Error('Failed to fetch users');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getUserById(userId: string): Promise<IUser> {
        try {
            const url = `/users/${userId}`;
            const response: AxiosResponse<IUser> = await httpRequest(url, 'GET');
            if (response.status !== 200) {
                throw new Error('Failed to fetch user');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    async updateUser(userId: string, updatedUser: IUser): Promise<void> {
        try {
            const url = `/edit/${userId}`;
            const response: AxiosResponse<void> = await httpRequest(url, 'POST', updatedUser);
            if (response.status !== 200) {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async addUser(newUser: IUser): Promise<void> {
        try {
            const url = `/users`;
            const response: AxiosResponse<void> = await httpRequest(url, 'POST', newUser);
            if (response.status !== 201) {
                throw new Error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            const url = `/users/${userId}`;
            const response: AxiosResponse<void> = await httpRequest(url, 'DELETE');
            if (response.status !== 200) {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
    async login(email: string, password: string): Promise<IUser> {
        try {
            const url = `/login`;
            const data = {
                email: email,
                password: password
            };
            const response: AxiosResponse<any> = await httpRequest(url, 'POST', data);
            if (response.status === 200) {
                const userData: IUser = response.data.data;
                return userData;
            } else if (response.status === 404) {
                throw new Error('Credenciales incorrectas');
            } else {
                throw new Error('Inicio de sesión fallido');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    }

    async register(newUser: IUser): Promise<void> {
        try {
            const url = `/create`;
            const response: AxiosResponse<void> = await httpRequest(url, 'POST', newUser);
            if (response.status !== 200) {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
    
}

export const userService: UserService = new UserService();
