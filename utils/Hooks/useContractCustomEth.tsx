import { useContract, useContractRead } from "@thirdweb-dev/react";
import { aggregatorV3InterfaceABI } from "@/utils/ContractAbis/AggregatorV3Abi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useContractCustomEth = (contractAddress: string) => {
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { contract: priceFeed, isLoading: isContractLoading, error: contractError } = useContract(
    contractAddress,
    aggregatorV3InterfaceABI
  );

  const { data, isLoading: isContractReadLoading, error: contractReadError } = useContractRead(
    priceFeed,
    "latestRoundData"
  );

  useEffect(() => {
    if (data) {
      let price = ethers.utils.formatUnits(data.answer, 18);
      setPrice(price);
    }
    setIsLoading(isContractLoading || isContractReadLoading);
    setError(
      contractError instanceof Error ? contractError : contractReadError instanceof Error ? contractReadError : null
    );
  }, [data, isContractLoading, isContractReadLoading, contractError, contractReadError]);

  return { price, isLoading, error };
};
