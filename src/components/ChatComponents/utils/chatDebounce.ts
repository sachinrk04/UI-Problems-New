interface ChatDebounceProps {
  fn: (...args: any) => void;
  delay: number
}

export const chatDebounce = ({fn, delay}: ChatDebounceProps) => {
  let timer: any;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}