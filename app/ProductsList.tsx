import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import ProductsList from "../screens/productsList";
import { BottomSheetProps } from "../components/BottomSheet";

interface ProductListTabProps {
    setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
    bottomSheetProps: BottomSheetProps;
    handleCloseBottomSheet: () => void;
    handleCloseBottomSheetTag: () => void;
    setActiveRouteHeader: React.Dispatch<React.SetStateAction<{
        name: string;
        left: React.ReactNode | null;
        right: React.ReactNode | null;
    }>>
}


export default function ProductList({
    setActiveRouteHeader,
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
            setActiveRouteHeader={setActiveRouteHeader}
            tagUuid={Array.isArray(tagUuid) ? tagUuid[0] : tagUuid} />
    ) : (
        <></>
    );
}
