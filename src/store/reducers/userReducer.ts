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
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  