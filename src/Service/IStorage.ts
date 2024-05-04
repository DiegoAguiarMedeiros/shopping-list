export default interface IStorage {
  get(key: string): Promise<any>;
  set(key: string, data: any): void;
}
