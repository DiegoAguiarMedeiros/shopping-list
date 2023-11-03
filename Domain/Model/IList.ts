import ITag from "./ITag";

export interface IList {
  uuid: string;
  name: string;
  tags: ITag[];
  items: string[];
}

export interface IListInterface {
  [key: string]: IList;
}
