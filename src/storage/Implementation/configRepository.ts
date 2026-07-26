import { action, makeAutoObservable } from "mobx";
import { IConfigRepository } from "../IConfigRepository";
import { ColorList, colorTheme, DEFAULT_ACCENT_COLOR, getColorTheme, normalizeHexColor } from "../../../constants/Colors";
import IMMKVStorage from "../../Service/IMMKVStorage";

import storageMMKV from "../../Service/Implementation/MMKVStorage";
import I18n from "i18n-js";
import IToast from "../../Service/IToast";
import Toast from "../../Service/Implementation/Toast";

const COLOR_STORAGE_KEY = "SLSHOPPINGCOLOR";
const THEME_STORAGE_KEY = "SLSHOPPINGTHEME";
const LANG_STORAGE_KEY = "SLSHOPPINGLANG";
const CURRENCY_STORAGE_KEY = "SLSHOPPINGCURRENCY";

class ConfigRepository implements IConfigRepository {
    theme: "light" | "dark" = "light";
    lang: string = 'pt-br';
    currency: string = 'R$';
    colors: ColorList = DEFAULT_ACCENT_COLOR;
    color: colorTheme;
    storageMMKV: IMMKVStorage;
    toast: IToast;
    constructor(
        storageMMKV: IMMKVStorage,
        toast: IToast
    ) {
        this.toast = toast;
        makeAutoObservable(this, {
            setTheme: action.bound,
            setLang: action.bound,
            setCurrency: action.bound,
            setColors: action.bound,
            setColor: action.bound,
        });
        this.color = getColorTheme(this.colors, this.theme);
        this.storageMMKV = storageMMKV;
    }

    firstLoad(): void {
        try {
            const theme = this.storageMMKV.get(THEME_STORAGE_KEY);
            if (theme) { this.setTheme(theme as "light" | "dark"); } else {
                this.setTheme("light")
            }

            const lang = this.storageMMKV.get(LANG_STORAGE_KEY);
            if (lang) { this.setLang(lang) } else {
                this.setLang('en')
            }

            const currency = this.storageMMKV.get(CURRENCY_STORAGE_KEY);
            if (currency) { this.setCurrency(currency) } else {
                this.setCurrency("R$")
            }

            const colors = this.storageMMKV.get(COLOR_STORAGE_KEY);
            if (colors) { this.setColors(colors) } else {
                this.setColors(DEFAULT_ACCENT_COLOR)
            }


        } catch (error) {
            console.error("Failed to load:", error);
        }
    }

    addItemsToStorage(items: string, key: string): void {
        try {
            this.storageMMKV.set(key, items);
        } catch (error) {
            console.error("Failed to add item to storage:", error);
        }
    }

    setTheme(theme: "light" | "dark"): void {
        this.theme = theme;
        this.setColor(getColorTheme(this.colors, theme));
        this.addItemsToStorage(theme, THEME_STORAGE_KEY)
    }
    setLang(lang: string): void {
        this.lang = lang;
        this.addItemsToStorage(lang, LANG_STORAGE_KEY)
        I18n.locale = lang;
    }
    setCurrency(currency: string): void {
        this.currency = currency;
        this.addItemsToStorage(currency, CURRENCY_STORAGE_KEY)
    }
    setColors(colors: string): void {
        const normalizedColor = normalizeHexColor(colors);
        if (!normalizedColor) return;
        this.colors = normalizedColor;
        this.setColor(getColorTheme(normalizedColor, this.theme));
        this.addItemsToStorage(normalizedColor, COLOR_STORAGE_KEY)
    }
    setColor(color: colorTheme): void {
        this.color = color;
    }

}

export default new ConfigRepository(storageMMKV, Toast);
