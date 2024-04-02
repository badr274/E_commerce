import { createContext, useEffect, useState } from "react";

export const WindowResize = createContext(null);

export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", setWindowWidth);

    // CleanUp Function
    return () => {
      window.removeEventListener("resize", setWindowWidth);
    };
  }, []);
  return (
    <WindowResize.Provider value={{ windowSize }}>
      {children}
    </WindowResize.Provider>
  );
}
