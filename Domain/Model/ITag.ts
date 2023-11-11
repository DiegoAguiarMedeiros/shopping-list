export default interface ITag {
  uuid: string;
  name: string;
}


export interface ITagInterface {
  [key: string]: ITag;
}