import { useEffect } from 'react';

// This is a custom hook that we can call in each page so that they start from top
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
