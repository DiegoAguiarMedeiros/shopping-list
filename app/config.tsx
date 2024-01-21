import Config from "../screens/config";

type ConfigScreenProps = {
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export default function ConfigScreen({ setTheme }: ConfigScreenProps) {
  return <Config setTheme={setTheme} />;
}
