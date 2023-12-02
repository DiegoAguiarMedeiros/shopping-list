export interface IProduct {
  uuid: string;
  name: string;
  amount: string[];
  unit: "Kg" | "Un";
  tag: string;
}
