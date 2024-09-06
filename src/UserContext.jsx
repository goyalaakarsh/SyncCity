import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false 
      };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: { ...state.user, ...action.payload } 
      };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}