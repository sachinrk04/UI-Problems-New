interface ChatThrottleProps {
  fn: (...args: any) => void;
  limit: number
}

export const chatThrottle = ({fn, limit}: ChatThrottleProps) => {
  let inThrottle: boolean;

  return (...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}