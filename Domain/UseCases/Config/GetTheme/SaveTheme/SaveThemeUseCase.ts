import IMMKVStorage from "../../../../Service/IMMKVStorage";

export default class SaveThemeUseCase{

    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string,theme: "light" | "dark"){
        try {
            this.MMKVStorage.set(key, theme);
          } catch (error) {
            console.error("SaveListsUseCase", error);
          }
    }
}