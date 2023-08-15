"use client";
import React, { createContext, useState } from "react";
import "@/components/Header";

interface NavigationDirectionData {
    navigationDirection: string;
    setNavigationDirection: React.Dispatch<React.SetStateAction<string>>;
}

export const NavigationDirectionContext = createContext<NavigationDirectionData>({
    navigationDirection: "",
    setNavigationDirection: () => {},
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [navigationDirection, setNavigationDirection] = useState<string>("");

    console.log("inside context", navigationDirection);

    return (
        <NavigationDirectionContext.Provider value={{ navigationDirection, setNavigationDirection }}>
            {children}
        </NavigationDirectionContext.Provider>
    );
};
