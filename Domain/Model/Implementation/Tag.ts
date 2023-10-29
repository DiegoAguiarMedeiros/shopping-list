import ITag from "../ITag";

class Tag implements ITag {
  uuid: string;
  name: string;

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}

export default Tag;
