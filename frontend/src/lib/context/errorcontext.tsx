"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextValue {
    hasError: boolean;
    setHasError: (value: boolean) => void;
}

const ErrorContext = createContext<ErrorContextValue>({
    hasError: false,
    setHasError: () => { },
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [hasError, setHasError] = useState(false);
    return (
        <ErrorContext.Provider value={{ hasError, setHasError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorContext = () => useContext(ErrorContext);
