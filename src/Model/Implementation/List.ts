//ok
import IList from "../IList";
import ITag from "../ITag";

class List implements IList {
  uuid: string;
  name: string;
  tags: ITag[];
  items: string[];

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
    this.tags = [];
    this.items = [];
  }
}

export default List;
