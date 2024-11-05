import { action, makeAutoObservable } from "mobx";
import { IConfigRepository } from "../IConfigRepository";
import { ColorList, Colors, colors, colorTheme } from "../../../constants/Colors";
import IMMKVStorage from "../../Service/IMMKVStorage";

import storageMMKV from "../../Service/Implementation/MMKVStorage";
import I18n from "i18n-js";

const COLOR_STORAGE_KEY = "SLSHOPPINGCOLOR";
const THEME_STORAGE_KEY = "SLSHOPPINGTHEME";
const LANG_STORAGE_KEY = "SLSHOPPINGLANG";
const CURRENCY_STORAGE_KEY = "SLSHOPPINGCURRENCY";

class ConfigRepository implements IConfigRepository {
    theme: "light" | "dark" = "light";
    lang: string = 'pt-br';
    currency: string = 'R$';
    colors: ColorList = "#43BCAE";
    color: colorTheme;
    allColors: colors;
    storageMMKV: IMMKVStorage;
    constructor(allColors: colors,
        storageMMKV: IMMKVStorage) {
        makeAutoObservable(this, {
            setTheme: action.bound,
            setLang: action.bound,
            setCurrency: action.bound,
            setColors: action.bound,
            setColor: action.bound,
        });
        this.allColors = allColors;
        this.color = this.allColors[this.colors][this.theme];
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
            if (colors) { this.setColors(colors as ColorList) } else {
                this.setColors("#43BCAE")
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
        console.log("theme", theme)
        console.log("this.theme", theme)
        this.theme = theme;
        this.setColor(this.allColors[this.colors][theme]);
        this.addItemsToStorage(theme, THEME_STORAGE_KEY)
    }
    setLang(lang: string): void {
        // console.log("lang", lang)
        this.lang = lang;
        this.addItemsToStorage(lang, LANG_STORAGE_KEY)
        I18n.locale = lang;
    }
    setCurrency(currency: string): void {
        // console.log("currency", currency)
        this.currency = currency;
        this.addItemsToStorage(currency, CURRENCY_STORAGE_KEY)
    }
    setColors(colors: ColorList): void {
        this.colors = colors;
        this.setColor(this.allColors[colors][this.theme]);
        this.addItemsToStorage(colors, COLOR_STORAGE_KEY)
    }
    setColor(color: colorTheme): void {
        // console.log("color", color)
        this.color = color;
    }

}

export default new ConfigRepository(Colors, storageMMKV);