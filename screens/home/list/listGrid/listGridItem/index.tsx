import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Linking,
  View,
  Text,
  Animated
} from 'react-native';
import Colors from '../../../../../constants/Colors';
import * as Styled from './styles';
import { useState } from 'react';
import { BottomSheetProps, listInterface } from '../../../../../types/types';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CircleProgress from '../../../../../components/CircleProgress';
import { useRouter } from "expo-router";

import { Swipeable } from 'react-native-gesture-handler';
import BottomSheetComponent from '../../../../../components/BottomSheetComponent';
import { getTotal, getTotalUn, getTotalWithAmount } from '../../../../../utils/functions';

interface itemProps {
  item: listInterface,
  deleteFromList: (uuid: string) => void,
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>,
}



export default function ListGridItem({ item, deleteFromList, setBottomSheetProps }: itemProps) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const router = useRouter();

  const total = item.items ? getTotal(item.items) : 0;
  const totalWithAmount = item.items ? getTotalWithAmount(item.items) : 0;
  const totalUn = item.items ? getTotalUn(item.items) : 0;
  const handleOpenList = () => {
    router.push({ pathname: "/iTems", params: { listId: item.uuid } });
  }

  const handlePressIn = () => {
    setBottomSheetProps({
      items: item,
      action: 'editListItem',
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item)
    })
  }
  const handleDelete = () => {
    deleteFromList(item.uuid)
  }

  function LeftRightSwipe(progress: any, dragX: { interpolate: (arg0: { inputRange: number[]; outputRange: number[] }) => any }) {

    return (
      <Animated.View style={{
        width: 200,
        height: 100,
        overflow: 'hidden',
      }}>
        <Styled.ButtonView>
          <Styled.ButtonInner>
            <Styled.ButtonTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
              <FontAwesome size={28} style={{ marginBottom: -3 }} name="trash" />
            </Styled.ButtonTextIcon>
            <Styled.ButtonText text={Colors[colorScheme ?? 'light'].textButton} onPress={handleDelete}>
              Deletar
            </Styled.ButtonText>
          </Styled.ButtonInner>
          <Styled.ButtonInner>
            <Styled.ButtonTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
              <FontAwesome size={28} style={{ marginBottom: -3 }} name="copy" />
            </Styled.ButtonTextIcon>
            <Styled.ButtonText text={Colors[colorScheme ?? 'light'].textButton}>
              Copiar
            </Styled.ButtonText>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View >
    )
  }

  return (

    <Swipeable renderLeftActions={LeftRightSwipe} renderRightActions={LeftRightSwipe} leftThreshold={100}>

      <Styled.ContainerListItem
        onPress={handlePressIn}>
        <Styled.ContainerListItemInner background={Colors[colorScheme ?? 'light'].backgroundLighter}>
          <Styled.ContainerListItemHead>
            <Styled.ContainerItemTextTitle text={Colors[colorScheme ?? 'light'].textButton}>
              {item.name}
            </Styled.ContainerItemTextTitle>
            <Styled.ContainerItemCircleProgress text={Colors[colorScheme ?? 'light'].textButton}>
              <CircleProgress
                filled={totalWithAmount}
                progress={totalUn && totalWithAmount ? Number(totalWithAmount / totalUn) : 0}
                total={totalUn}
                size={50} />
            </Styled.ContainerItemCircleProgress>
          </Styled.ContainerListItemHead>
          <Styled.ContainerListItemBody>
            <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
              Total: R$ {total}
            </Styled.ContainerItemTextPriceTotal>

          </Styled.ContainerListItemBody>
        </Styled.ContainerListItemInner>

      </ Styled.ContainerListItem >
    </Swipeable>
  );
}

