import { PriceProvider } from "@/context/PriceContext";

const ContextProvider = ({ children }: any) => {
    return <PriceProvider>{children}</PriceProvider>;
};

export default ContextProvider;
