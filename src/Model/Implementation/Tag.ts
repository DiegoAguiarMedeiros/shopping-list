import ITag from "../ITag";

class Tag implements ITag {
  uuid: string;
  name: string;
  productsQTD: number;

  constructor(uuid: string, name: string, productsQTD: number) {
    this.uuid = uuid;
    this.name = name;
    this.productsQTD = productsQTD;
  }
}

export default Tag;
