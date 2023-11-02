export default interface IMMKV {
  get(key: string): string | null;
  set(key: string, data: string): void;
}
