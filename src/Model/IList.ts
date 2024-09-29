export interface IList {
  uuid: string;
  name: string;
  tags: string[];
  items: string[];
  createAt: number;
  total?: number;
  totalUn?: number;
  totalWithAmount?: number;
  totalWithoutAmount?: number;
}

export type IListInterface<T> = {
  [uuid: string]: T;
};
