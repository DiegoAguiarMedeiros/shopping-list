import I18n from "i18n-js";
import { View } from "react-native";
import { useStores } from "../../context/StoreContext";
import Button from "../Button";
import { SubTitle } from "../Text";

type AddProductOptionsProps = {
  onSelectProduct: () => void;
  onSelectCategory: () => void;
  onCancel: () => void;
};

export default function AddProductOptions({
  onSelectProduct,
  onSelectCategory,
  onCancel,
}: Readonly<AddProductOptionsProps>) {
  const { ConfigRepository } = useStores();

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <SubTitle color={ConfigRepository.color.text}>{I18n.t("chooseWhatToAdd")}</SubTitle>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Button
            text={I18n.t("product")}
            background={ConfigRepository.color.bottomSheetButtonAddBackground}
            border={ConfigRepository.color.bottomSheetButtonAddBorder}
            textColor={ConfigRepository.color.bottomSheetButtonAddText}
            onPress={onSelectProduct}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            text={I18n.t("category")}
            background={ConfigRepository.color.bottomSheetButtonAddBackground}
            border={ConfigRepository.color.bottomSheetButtonAddBorder}
            textColor={ConfigRepository.color.bottomSheetButtonAddText}
            onPress={onSelectCategory}
          />
        </View>
      </View>
      <Button
        text={I18n.t("cancel")}
        background={ConfigRepository.color.bottomSheetButtonCancelBackground}
        border={ConfigRepository.color.bottomSheetButtonCancelBorder}
        textColor={ConfigRepository.color.bottomSheetButtonCancelText}
        onPress={onCancel}
      />
    </View>
  );
}
