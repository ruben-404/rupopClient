import { httpRequest } from 'src/core/http';
import { AxiosResponse } from 'axios';
import { ICategoria } from '../store/types';

export class FilterService {
    async getCategories(): Promise<any[]> {
        try {
            const url = `/categories/all`;
            const response: AxiosResponse<ICategoria[]> = await httpRequest(url, 'GET');
            if (response.status !== 200) {
                throw new Error('Failed to fetch categories');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    async createCategory(title: string, description: string, imageUrl: string): Promise<void> {
        try {
            const url = '/categories/create';
            const data = {
                title: title,
                description: description,
                imageUrl: imageUrl
            };
            const response = await httpRequest(url, 'POST', data);
            if (response.status !== 200) {
                throw new Error('Failed to create category');
            }
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    }

    async editCategory(categoryId: string, title: string, description: string, imageUrl: string): Promise<void> {
        try {
            const url = `/categories/${categoryId}/edit`;
            const data = {
                title: title,
                description: description,
                imageUrl: imageUrl
            };
            const response = await httpRequest(url, 'PUT', data);
            if (response.status !== 200) {
                throw new Error('Failed to edit category');
            }
        } catch (error) {
            console.error('Error editing category:', error);
            throw error;
        }
    }

    async deleteCategory(categoryId: string): Promise<void> {
        try {
            const url = `/categories/delete/${categoryId}`;
            const response = await httpRequest(url, 'DELETE');
            if (response.status !== 200) {
                throw new Error('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
}

export const filterService: FilterService = new FilterService();
