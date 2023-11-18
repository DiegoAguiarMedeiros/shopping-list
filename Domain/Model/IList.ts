import ITag from "./ITag";

export interface IList {
  uuid: string;
  name: string;
  tags: ITag[];
  items: string[];
}

export type IListInterface<T> = {
  [uuid: string]: T;
};
