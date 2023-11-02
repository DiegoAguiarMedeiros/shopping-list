import { MMKV } from "react-native-mmkv";
import IMMKVStorage from "../IMMKVStorage";

export default class MMKVStorage implements IMMKVStorage {
  constructor(private mmkv: MMKV) {}

  get(key: string): string | null {
    const result = this.mmkv.getString(key);
    if (result) return result;
    return null;
  }
  set(key: string, data: string): void {
    this.mmkv.set(key, data);
  }
}
