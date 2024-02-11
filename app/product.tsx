import { useSearchParams } from "expo-router";
import { Text, Title } from "../components/Text";

import Product from "../screens/product";
import { BottomSheetProps } from "../components/BottomSheet";
import { useEffect, useState } from "react";
import { Dimensions, TouchableHighlight, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import InputText from "../components/InputText";
import HeaderInputTextSearch from "../components/HeaderInputTextSearch";


interface ProductTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
  search: string;
}


export default function ProductTab({
  setBottomSheetProps,
  bottomSheetProps,
  handleCloseBottomSheet,
  search }: Readonly<ProductTabProps>) {

  return (<Product
    search={search}
    setBottomSheetProps={setBottomSheetProps}
    bottomSheetProps={bottomSheetProps}
    handleCloseBottomSheet={handleCloseBottomSheet} />)
}
