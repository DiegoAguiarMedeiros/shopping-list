import {
  useColorScheme,
  Animated
} from 'react-native';
import Colors from '../../../../../constants/Colors';
import * as Styled from './styles';
import { lazy, useCallback } from 'react';
import { BottomSheetProps, listInterface } from '../../../../../types/types';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import { Swipeable } from 'react-native-gesture-handler';
import { getTotal, getTotalUn, getTotalWithAmount } from '../../../../../utils/functions';
import { Title, Text } from '../../../../../components/Text';
const CircleProgress = lazy(() => import('../../../../../components/CircleProgress'));

interface ItemProps {
  item: listInterface,
  deleteFromList: (uuid: string) => void,
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>,
}



export default function ListGridItem({ item, deleteFromList, setBottomSheetProps }: ItemProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const total = item.items ? getTotal(item.items) : 0;
  const totalWithAmount = item.items ? getTotalWithAmount(item.items) : 0;
  const totalUn = item.items ? getTotalUn(item.items) : 0;

  const handleOpenList = useCallback(() => {
    router.push({ pathname: "/iTems", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const handleEdit = useCallback(() => {
    setBottomSheetProps({
      items: item,
      buttonText: 'edit',
      action: 'editList',
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item)
    })
  }, [item, setBottomSheetProps]);

  const handleCopy = useCallback(() => {
    setBottomSheetProps({
      items: item,
      buttonText: 'copy',
      action: 'copyList',
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item)
    })
  }, [item, setBottomSheetProps]);

  const handleDelete = useCallback(() => {
    deleteFromList(item.uuid);
  }, [item.uuid, deleteFromList]);

  const LeftRightSwipe = useCallback((progress: any, dragX: { interpolate: (arg0: { inputRange: number[]; outputRange: number[] }) => any }) => {

    return (
      <Animated.View style={{
        width: 200,
        height: 100,
        overflow: 'hidden',
      }}>
        <Styled.ButtonView>
          <Styled.ButtonInner underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight} onPress={handleEdit}>
            <>
              <Styled.ButtonTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
                <FontAwesome size={24} style={{ marginBottom: -3 }} name="pencil" />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={Colors[colorScheme ?? 'light'].textButton} >
                Editar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight} onPress={handleDelete}>
            <>
              <Styled.ButtonTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
                <FontAwesome size={24} style={{ marginBottom: -3 }} name="trash" />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={Colors[colorScheme ?? 'light'].textButton} >
                Deletar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight} onPress={handleCopy}>
            <>
              <Styled.ButtonTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
                <FontAwesome size={24} style={{ marginBottom: -3 }} name="copy" />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={Colors[colorScheme ?? 'light'].textButton}>
                Copiar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View >
    )
  }, []);

  return (

    <Swipeable renderLeftActions={LeftRightSwipe} renderRightActions={LeftRightSwipe} leftThreshold={100}>

      <Styled.ContainerListItem
        underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight}
        background={Colors[colorScheme ?? 'light'].backgroundLighter}
        onPress={handleOpenList}>
        <Styled.ContainerListItemInner>
          <Styled.ContainerListItemHead>
            <Styled.ContainerItemTitle>
              <Title>
                {item.name}
              </Title>
            </Styled.ContainerItemTitle>
            <Styled.ContainerItemCircleProgress text={Colors[colorScheme ?? 'light'].textButton}>
              <CircleProgress
                filled={totalWithAmount}
                progress={totalUn && totalWithAmount ? Number(totalWithAmount / totalUn) : 0}
                total={totalUn}
                size={50} />
            </Styled.ContainerItemCircleProgress>
          </Styled.ContainerListItemHead>
          <Styled.ContainerListItemBody>
            <Text>
              Total: R$ {total}
            </Text>

          </Styled.ContainerListItemBody>
        </Styled.ContainerListItemInner>

      </ Styled.ContainerListItem >
    </Swipeable>
  );
}

