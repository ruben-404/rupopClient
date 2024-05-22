// userActions.ts
import { IUser } from '../types';

// Define las acciones relacionadas con el usuario
export const setUser = (userData: IUser) => {
  // Guarda userData en localStorage
  localStorage.setItem('userData', JSON.stringify(userData));

  return {
    type: 'SET_USER',
    payload: userData,
  };
};

// Inicializa el estado del usuario con los datos de localStorage al cargar la aplicación
export const initializeUser = () => {
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return {
    type: 'SET_USER',
    payload: userData,
  };
};

// reducers/userReducer.ts
import { UserState } from '../types';

const initialState: UserState = {
  user: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_USER':
      // Elimina los datos del usuario de localStorage al cerrar sesión
      localStorage.removeItem('userData');
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
