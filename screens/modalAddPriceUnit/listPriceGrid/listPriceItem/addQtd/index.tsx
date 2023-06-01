import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch
} from 'react-native';
import Colors from '../../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from './Button';
import { itemInterface } from '../../../../../types/types';
import { Link } from 'expo-router';
import InputText from './InputText';
import Select from '../../../../../components/InputSelect';
import Switch from '../../../../../components/Switch';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ListPriceGridProps {
  amount: string;
  setNewItemAmount: React.Dispatch<React.SetStateAction<string>>;
}

export default function ListPriceGrid({ setNewItemAmount, amount }: ListPriceGridProps) {

  const colorScheme = useColorScheme();


  const minusAMount = (): void => {
    if (amount === '1') setNewItemAmount(String(Number(amount) - 1));
  }
  const plusAMount = (): void => {
    setNewItemAmount(String(Number(amount) + 1));
  }


  return (
    <Styled.Container>

      <Styled.ContainerMinusPlus >
        <Button icon='minus' invertSide={true} background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={minusAMount} />
      </Styled.ContainerMinusPlus >
      <Styled.ContainerQtd >
        <InputText placeholder='Valor' value={amount} />
      </Styled.ContainerQtd >
      <Styled.ContainerMinusPlus >
        <Button icon='plus' background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={plusAMount} />
      </Styled.ContainerMinusPlus >
    </Styled.Container >
  );
}

