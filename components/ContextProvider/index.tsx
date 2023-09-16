import { AssetProvider } from "@/context/AssetContext";
import { PriceProvider } from "@/context/PriceContext";
import { WindowWidthProvider } from "@/context/WindowContext";

const ContextProvider = ({ children }: any) => {
  return (
    <WindowWidthProvider>
      <PriceProvider>
        <AssetProvider> {children}</AssetProvider>
      </PriceProvider>
    </WindowWidthProvider>
  );
};

export default ContextProvider;
