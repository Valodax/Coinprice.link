import { PriceProvider } from "@/context/PriceContext";
import { NavigationProvider } from "@/context/NavigationContext";

const ContextProvider = ({ children }: any) => {
    return (
        <PriceProvider>
            <NavigationProvider>{children}</NavigationProvider>
        </PriceProvider>
    );
};

export default ContextProvider;
