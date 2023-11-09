import { useEffect, useState } from 'react';

const useWindowScrolledDown = () => {
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        // you can adjust this value
        setHasUserScrolled(true);
      } else {
        setHasUserScrolled(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return hasUserScrolled;
};

export default useWindowScrolledDown;
