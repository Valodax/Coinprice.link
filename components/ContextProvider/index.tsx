import { PriceProvider } from "@/context/PriceContext";
import { WindowWidthProvider } from "@/context/WindowContext";

const ContextProvider = ({ children }: any) => {
  return (
    <WindowWidthProvider>
      <PriceProvider>{children}</PriceProvider>
    </WindowWidthProvider>
  );
};

export default ContextProvider;
