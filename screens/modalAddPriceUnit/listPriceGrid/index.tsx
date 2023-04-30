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
import { itemInterface } from '../../../types/types';
import { Link } from 'expo-router';
import InputText from '../../../components/InputText';
import Select from '../../../components/InputSelect';
import Switch from '../../../components/Switch';
import { useNavigation } from '@react-navigation/native';

export default function ListPriceGrid() {
  const colorScheme = useColorScheme();
  return (
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <SafeAreaView >
        <ScrollView >
          <Styled.ContainerListPriceItem>
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
            <ListPriceItem />
          </Styled.ContainerListPriceItem>
        </ScrollView>
      </SafeAreaView >
    </Styled.Container>
  );
}

