export const formatPrice = (price: string | number, decimalPlaces: number): string => {
    const [integerPart, decimalPart] = parseFloat(price.toString()).toFixed(decimalPlaces).split(".");
    return `${Number(integerPart).toLocaleString()}.${decimalPart}`;
};
