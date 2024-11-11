import React, { createContext, useState } from 'react';

// Определяем тип контекста
const AuthContext = createContext({
    isAuthenticated: false,
    setAuth: () => {},
});

// Создаем компонент провайдера
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

