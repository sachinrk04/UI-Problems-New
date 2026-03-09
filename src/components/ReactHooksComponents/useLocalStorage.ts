import { useState } from 'react'

export const useLocalStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch (error) {
            console.log("Error reading localStorage:", error)
            return initialValue
        }
    });

    const setStoredValue = (newValue: any) => {
        try {
            setValue(newValue);
            localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {
            console.log("Error setting localStorage:", error)
        }
    }

    return [value, setStoredValue] as const;
};