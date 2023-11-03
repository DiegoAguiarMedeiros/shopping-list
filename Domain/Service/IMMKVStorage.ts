export default interface IMMKV {
  clearAll(): void;
  getAll(): string[] | null;
  get(key: string): string | null;
  set(key: string, data: string): void;
}
