import { useState } from 'react';

export const useCounterII = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue);
  
      const increment = (value: number = 1) => {
          setCount((prev) => prev + value);
      };
  
      const decrement = (value: number = 1) => {
          setCount((prev) => prev - value);
      };
  
      const reset = () => {
          setCount(initialValue);
      };

      const setValue = (value: number) => {
        setCount(value)
      }
  
      return [count, increment, decrement, reset, setValue] as const
}
