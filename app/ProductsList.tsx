import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import ProductsList from "../screens/productsList";
import { BottomSheetProps } from "../components/BottomSheet";

interface ProductListTabProps {
    setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
    bottomSheetProps: BottomSheetProps;
    handleCloseBottomSheet: () => void;
    handleCloseBottomSheetTag: () => void;
}


export default function ProductList({
    setBottomSheetProps,
    bottomSheetProps,
    handleCloseBottomSheet,
    handleCloseBottomSheetTag }: ProductListTabProps) {
    const { tagUuid } = useSearchParams();


    return tagUuid ? (
        <ProductsList setBottomSheetProps={setBottomSheetProps}
            bottomSheetProps={bottomSheetProps}
            handleCloseBottomSheet={handleCloseBottomSheet}
            handleCloseBottomSheetTag={handleCloseBottomSheetTag}
            tagUuid={Array.isArray(tagUuid) ? tagUuid[0] : tagUuid} />
    ) : (
        <></>
    );
}
