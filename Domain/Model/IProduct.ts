export interface IProduct {
  uuid: string;
  name: string;
  amount: string[];
  lastPrices?: LastPricesInterface;
  unit: "Kg" | "Un";
  tag: string;
}

export type LastPricesInterface = {
  [uuid: string]: ILastPrices;
};

export interface ILastPrices {
  uuid: string;
  price: number;
};