export interface IUser {
    _id?: string;
    name: string;
    lastname: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    remember_token?: string | null;
}


export interface UserState {
    user: IUser | null;
}


export interface ICategoria {
    _id?: string;
    title: string;
    description: string;
    imageUrl: string;
}


export interface IProduct {
    data(data: any): unknown;
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    estado: string;
    images: (string | { fileName: string; base64Data: string })[];
    userId: string;
    state: string;
}

