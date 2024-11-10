import IAmount from "./IAmount";

export interface IProduct {
  uuid: string;
  name: string;
  amount: IAmount[];
  total?: string;
  lastPrices?: string[];
  unit: "Kg" | "Un";
  tag: string;
}
export interface IProductTiny {
  id: string;
  name: string;
}

export type LastPricesInterface = {
  [uuid: string]: ILastPrices;
};

export interface ILastPrices {
  uuid: string;
  price: number;
}

export interface ITagsSelect {
  name: string;
  id: string;
}
export interface ITagsProductsMultiSelect {
  name: string;
  id: string;
  children: IProductTiny[];
}
