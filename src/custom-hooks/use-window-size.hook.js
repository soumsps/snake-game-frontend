import { useEffect, useState } from 'react';

const useWindowSize = () => {
  function getCurrentSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getCurrentSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getCurrentSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export { useWindowSize };
