import { createContext, useReducer, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    localId: '',
    isAuthenticated: false,
    authenticate: (token: string, localId: string) => {},
    logout: () => {}
});

const AuthContextProvider = ({children}: any) => {
    const [authToken, setAuthToken] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [authLocalId, setAuthLocalId] = useState('');

    const authenticate = (token: string, localId: string) => {
        setAuthToken(token);
        setIsAuth(true);
        setAuthLocalId(localId);
    }

    const logout = () => {
        setAuthToken('');
        setIsAuth(false);
        setAuthLocalId('');
    }
   
    const value = {
        token: authToken,
        localId: authLocalId,
        isAuthenticated: isAuth,
        authenticate: authenticate,
        logout: logout
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;