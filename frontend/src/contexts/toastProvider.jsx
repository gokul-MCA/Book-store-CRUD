import React, { createContext, useState } from "react";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState([]); // Ensure initial state is always an array

    function addToast(message) {
        console.log(message);
        const id = Date.now();

        setToast((prevToast) => (Array.isArray(prevToast) ? [...prevToast, { id, message }] : [{ id, message }]));

        setTimeout(() => removeToast(id), 3000);
    }

    function removeToast(id) {
        setToast((currentToast) => 
            Array.isArray(currentToast) ? currentToast.filter((toast) => toast.id !== id) : []
        );
    }

    return (
        <ToastContext.Provider value={{ toast, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
