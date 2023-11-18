export interface IProduct {
  uuid: string;
  name: string;
  amount: string[];
  unit: "Kg" | "Un";
  tag: string;
}

export interface IListInterface<IProduct> {
  [key: string]: IProduct;
}
