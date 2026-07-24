
import {
  ItemAmountInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../types/types";
import { IListAmountInterface } from "../Domain/Model/IAmount";
import { IList, IListInterface } from "../Domain/Model/IList";
import { IProduct } from "../Domain/Model/IProduct";

class Storage {
  retrieveData = async (key: string) => {
    try {
      const data = 'a'//await AsyncStorage.getItem(key);
      return data;
    } catch (error) {
      console.error("Storage", error);
    }
  };
}

const setOnboarding = (value: boolean) => {
  //AsyncStorage.setItem("ONBOARDING", JSON.stringify(value));
};
const getOnboarding = async (): Promise<boolean> => {
  const onboardingPromise: string | null | undefined = await _retrieveData(
    "ONBOARDING"
  );

  const onboarding: boolean = onboardingPromise === "true";
  return onboarding;
};

export default {
  Storage,
  getOnboarding,
  setOnboarding,
};
