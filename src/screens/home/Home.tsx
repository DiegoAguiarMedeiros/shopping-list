import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import { useIsFocused } from "@react-navigation/native";

import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { IProduct } from "../../Model/IProduct";
import { IList } from "../../Model/IList";

interface HomeProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  lists: string[];
  listRef: React.MutableRefObject<{
    handleAddNewList: (uuid: string) => void;
    handleAddNewListArray: (list: string[]) => void;
  } | null>;
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
}
export default function Home({
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  lists,
  listRef,
  listItemRef,
}: Readonly<HomeProps>) {
  const isFocused = useIsFocused();

  return (
    <Container background={color.backgroundPrimary}>
      <ContainerInner background={color.backgroundPrimary}>
        {isFocused &&
          (lists && lists.length > 0 ? (
            <ListComponent
              listItemRef={listItemRef}
              listRef={listRef}
              color={color}
              lists={lists}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : (
            <EmptyList color={color} mensage={I18n.t("noListCreated")} />
          ))}
      </ContainerInner>
    </Container>
  );
}
