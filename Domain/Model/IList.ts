import ITag from "./ITag";

export interface IList {
  uuid: string;
  name: string;
  tags: string[];
  items: string[];
}

export type IListInterface<T> = {
  [uuid: string]: T;
};
