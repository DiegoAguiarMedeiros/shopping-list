import { IProduct } from "../IProduct";

class Product implements IProduct {
  uuid: string;
  name: string;
  amount: string[];
  unit: "Kg" | "Un";
  tag: string;

  constructor(uuid: string, name: string, unit: "Kg" | "Un", tag: string) {
    this.uuid = uuid;
    this.name = name;
    this.unit = unit;
    this.tag = tag;
    this.amount = [];
  }
}

export default Product;
