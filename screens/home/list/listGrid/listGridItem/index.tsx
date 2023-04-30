import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Linking,
} from 'react-native';
import Colors from '../../../../../constants/Colors';
import * as Styled from './styles';
import { useState } from 'react';
import { listInterface } from '../../../../../types/types';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CircleProgress from '../../../../../components/CircleProgress';
import { useRouter } from "expo-router";

interface itemProps {
  item: listInterface
}

export default function ListGridItem({ item }: itemProps) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [total, setTotal] = useState(item.items.length);
  const [totalFilled, setTotalFilled] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  const handleOpenList = () => {
    router.push({ pathname: "/iTems", params: { listId: item.uuid } });
  }

  const handlePressIn = () => {
    setActive(!active)
  }
  const handlePressOut = () => {
    setActive(false)
  }

  return (


    <Styled.ContainerListItem active={active} background={active ? Colors[colorScheme ?? 'light'].backgroundLighterActive : Colors[colorScheme ?? 'light'].backgroundLighter}
      onPress={handlePressIn}>
      {/* <Styled.LinkStyled href={`/modalAdd`}
        onPress={handlePressIn}
        onPressOut={handlePressOut} /> */}
      <Styled.ContainerListItemHead>
        <Styled.ContainerItemTextTitle text={Colors[colorScheme ?? 'light'].textButton}>
          {item.name}
        </Styled.ContainerItemTextTitle>
        <Styled.ContainerItemCircleProgress text={Colors[colorScheme ?? 'light'].textButton}>
          <CircleProgress
            filled={totalFilled}
            progress={total > 0 ? totalFilled / total : 0}
            total={total}
            size={50} />
        </Styled.ContainerItemCircleProgress>
      </Styled.ContainerListItemHead>
      <Styled.ContainerListItemBody>
        <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
          Total: R$ {item.uuid}
        </Styled.ContainerItemTextPriceTotal>

      </Styled.ContainerListItemBody>
      {active && <Styled.ContainerListItemBottom>
        <Styled.ContainerItemBottomButtonTouchableOpacity text={Colors[colorScheme ?? 'light'].textButton} onPress={handleOpenList}>
          <Styled.ContainerItemBottomButton text={Colors[colorScheme ?? 'light'].textButton}>
            <FontAwesome size={28} style={{ marginBottom: -3 }} name="folder-open" />
          </Styled.ContainerItemBottomButton>
        </Styled.ContainerItemBottomButtonTouchableOpacity>
        <Styled.ContainerItemBottomButtonTouchableOpacity text={Colors[colorScheme ?? 'light'].textButton}>
          <Styled.ContainerItemBottomButton text={Colors[colorScheme ?? 'light'].textButton}>
            <FontAwesome size={28} style={{ marginBottom: -3 }} name="copy" />
          </Styled.ContainerItemBottomButton>
        </Styled.ContainerItemBottomButtonTouchableOpacity>
        <Styled.ContainerItemBottomButtonTouchableOpacity text={Colors[colorScheme ?? 'light'].textButton}>
          <Styled.ContainerItemBottomButton text={Colors[colorScheme ?? 'light'].textButton}>
            <FontAwesome size={28} style={{ marginBottom: -3 }} name="trash" />
          </Styled.ContainerItemBottomButton>
        </Styled.ContainerItemBottomButtonTouchableOpacity>

      </Styled.ContainerListItemBottom>}



    </ Styled.ContainerListItem >
  );
}

