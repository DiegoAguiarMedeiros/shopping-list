import { MMKV } from "react-native-mmkv";
import IMMKVStorage from "../IMMKVStorage";

export default class MMKVStorage implements IMMKVStorage {
  constructor(private mmkv: MMKV) { }
  delete(key: string): void {
    this.mmkv.delete(key);
  }
  clearAll(): void {
    this.mmkv.clearAll();
  }

  getAll(): string[] | null {
    const result2 = this.mmkv.getAllKeys();
    if (result2) return result2;
    return null;
  }

  get(key: string): string | null {
    const result = this.mmkv.getString(key);
    if (result) return result;
    return null;
  }
  set(key: string, data: string): void {
    this.mmkv.set(key, data);
  }
}

