export interface IList {
  uuid: string;
  name: string;
  tags: string[];
  items: string[];
  createAt: number;
}

export type IListInterface<T> = {
  [uuid: string]: T;
};
