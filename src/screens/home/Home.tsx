import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import { useIsFocused } from "@react-navigation/native";

import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";

interface HomeProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  lists: string[];
  listRef: React.MutableRefObject<{
    handleAddNewList: (uuid: string) => void;
    handleAddNewListArray: (list: string[]) => void;
  } | null>;
}
export default function Home({
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  lists,
  listRef,
}: Readonly<HomeProps>) {
  const isFocused = useIsFocused();
  // console.log("lists", lists);
  return (
    <Container background={color.backgroundPrimary}>
      <ContainerInner background={color.backgroundPrimary}>
        {isFocused &&
          (lists && lists.length > 0 ? (
            <ListComponent
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
