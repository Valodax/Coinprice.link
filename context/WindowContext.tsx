"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Create context with null initial value and make sure to specify the type
const WindowWidthContext = createContext<number | null>(null);

interface WindowWidthProviderProps {
  children: ReactNode;
}

// Create context provider and specify the type
export const WindowWidthProvider: React.FC<WindowWidthProviderProps> = ({ children }: WindowWidthProviderProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(0); // initialize as 0 instead

  useEffect(() => {
    // Check if window is defined to avoid issues with server-side rendering
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return <WindowWidthContext.Provider value={windowWidth}>{children}</WindowWidthContext.Provider>;
};

// Create custom hook to use this context
export const useWindowWidth = (): number | null => useContext(WindowWidthContext);
