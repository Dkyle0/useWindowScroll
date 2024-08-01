import { useEffect } from 'react';

export function useWindowEvent(type: string, listener: (event: Event) => void, options?: any) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener(type, listener, options);
      return () => window.removeEventListener(type, listener, options);
    }
  }, [type, listener, options]);
}
