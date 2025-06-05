import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Initialize state
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : (
        typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
      );
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    } finally {
      setIsLoading(false);
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      setError(null);
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error('Failed to save to localStorage'));
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setError(null);
    } catch (error) {
      console.error(`Error setting value for localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error('Failed to set value'));
    }
  };

  return { value: storedValue, setValue, isLoading, error };
} 