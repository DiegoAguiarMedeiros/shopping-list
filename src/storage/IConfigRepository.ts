import { ColorList, colors, colorTheme } from "../../constants/Colors";
import IMMKVStorage from "../Service/IMMKVStorage";
import IToast from "../Service/IToast";

export interface IConfigRepository {
    theme: "light" | "dark";
    lang: string;
    currency: string;
    colors: ColorList;
    color: colorTheme;
    allColors: colors;
    storageMMKV: IMMKVStorage;
    toast: IToast;
    firstLoad(): void
    setTheme(theme: string): void;
    setLang(lang: string): void;
    setCurrency(currency: string): void;
    setColors(colors: string): void
    addItemsToStorage(items: string, key: string): void
}