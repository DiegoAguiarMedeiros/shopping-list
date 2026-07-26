
import storageMMKV from "../Service/Implementation/MMKVStorage";

class Storage {
  retrieveData = async (key: string) => {
    try {
      const data = storageMMKV.get(key);
      return data;
    } catch (error) {
      console.error("Storage", error);
    }
  };
}

const setOnboarding = (value: boolean) => {
  storageMMKV.set("ONBOARDING", JSON.stringify(value));
};

const getOnboarding = async (): Promise<boolean> => {
  const onboardingPromise: string | null | undefined = storageMMKV.get(
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
