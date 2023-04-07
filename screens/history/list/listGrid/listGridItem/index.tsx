import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Linking,
} from 'react-native';
import Colors from '../../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import { itemInterface } from '../../../../../types/types';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CircleProgress from '../../../../../components/CircleProgress';

export default function ListGridItem() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [active, setActive] = useState(false);



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
          Bread
        </Styled.ContainerItemTextTitle>
        <Styled.ContainerItemCircleProgress text={Colors[colorScheme ?? 'light'].textButton}>
          <CircleProgress
            filled={2}
            progress={0.66}
            total={3}
            size={50} />
        </Styled.ContainerItemCircleProgress>
      </Styled.ContainerListItemHead>
      <Styled.ContainerListItemBody>
        <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
          Total: R$ 2000,00
        </Styled.ContainerItemTextPriceTotal>

      </Styled.ContainerListItemBody>
      {active && <Styled.ContainerListItemBottom>
        <Styled.ContainerItemBottomButtonTouchableOpacity text={Colors[colorScheme ?? 'light'].textButton}>
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

