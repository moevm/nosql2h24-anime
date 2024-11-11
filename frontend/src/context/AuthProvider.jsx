import React, { createContext, useState } from "react";

// Определяем тип контекста
const AuthContext = createContext({
    isAuthenticated: false, // флаг, показывающий, аутентифицирован ли пользователь
    setAuth: () => {}, // функция для изменения значения isAuthenticated
});

// Создаем компонент провайдера, который предоставляет данные контекста всем дочерним компонентам
export const AuthProvider = ({ children }) => {
    // Используем хук useState для создания переменной isAuthenticated и функции setAuth для ее изменения
    const [isAuthenticated, setAuth] = useState(false);

    // Возвращаем контекст провайдера, передавая значения isAuthenticated и setAuth в качестве значения контекста
    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
