export default interface IStorage {
  retrieveData(key: string): Promise<any>;
  save(key: string, data: any): void;
}
