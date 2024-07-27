import { IList } from "../IList";

class List implements IList {
  uuid: string;
  name: string;
  tags: string[];
  items: string[];
  createAt: number;

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
    this.tags = [];
    this.items = [];
    this.createAt = Date.now();
  }
}

export default List;
