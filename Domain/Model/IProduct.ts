export default interface IProduct {
  uuid: string;
  name: string;
  amount: string[];
  unit: "Kg" | "Un";
  tag: string;
}

export interface IListProductInterface {
  [key: string]: IProduct;
}
