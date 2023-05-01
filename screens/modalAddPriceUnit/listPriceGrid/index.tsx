import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import ListPriceItem from './listPriceItem'
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { itemInterface, itemAmountInterface } from '../../../types/types';
import { Link, useRouter, useSearchParams } from 'expo-router';
import InputText from '../../../components/InputText';
import Select from '../../../components/InputSelect';
import Switch from '../../../components/Switch';
import { useNavigation } from '@react-navigation/native';

interface listProps {
  item: itemInterface,
  deleteFromAmount: (AmountUuid: string) => void,
}

export default function ListPriceGrid({ item, deleteFromAmount }: listProps) {
  const colorScheme = useColorScheme();

  return (
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <SafeAreaView >
        <ScrollView >
          <Styled.ContainerListPriceItem>
            {item.amount.map((itemAmount: itemAmountInterface) =>
              <ListPriceItem itemAmount={itemAmount} key={itemAmount.uuid} deleteFromAmount={deleteFromAmount} />
            )}
          </Styled.ContainerListPriceItem>
        </ScrollView>
      </SafeAreaView >
    </Styled.Container>
  );
}

