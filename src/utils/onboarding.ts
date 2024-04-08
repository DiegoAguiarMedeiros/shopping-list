import Storage from "./storage";

const getOnboarding = () => Storage.getOnboarding();

const setOnboarding = (value: boolean) => {
  Storage.setOnboarding(value);
};

export { getOnboarding, setOnboarding };
