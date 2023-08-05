import { useDebugValue, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const useMediaQuery = (queryValue, initialValue = false) => {
  const [match, setMatches] = useState(initialValue);

  useDebugValue(`Query: ${queryValue}`, (name) => {
    return name + ' modificado';
  });

  useEffect(() => {
    let isMounted = true;
    const matchMedia = window.matchMedia(queryValue);

    const handleChange = () => {
      if (!isMounted) return;
      setMatches(Boolean(matchMedia.matches));
    };
    matchMedia.addEventListener('change', handleChange);
    // Set a timeout to avoid the "flash of unstyled content".
    setMatches(!!matchMedia.matches);
    return () => {
      isMounted = false;
      matchMedia.addEventListener('change', handleChange);
    };
  }, [queryValue]);
  return match;
};

function App() {
  const huge = useMediaQuery('(min-width: 980px)');
  const big = useMediaQuery('(max-width: 979px) and (min-width: 768px)');
  const medium = useMediaQuery('(max-width: 767px) and (min-width: 321px)');
  const small = useMediaQuery('(max-width: 321px)');
  const background = huge
    ? 'black'
    : big
    ? 'blue'
    : medium
    ? 'green'
    : small
    ? 'yellow'
    : null;
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React: useDebugValue + custom Hook useMediaQuery</h1>
      <div style={{ fontSize: '60px', background }}>
        <h3>olá</h3>
      </div>
    </>
  );
}

export default App;
