import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { itemInterface } from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from './emptyList'
import List from './list'

const itemsArr: itemInterface[] = []

export default function Home() {
  const colorScheme = useColorScheme();
  return (
    // <EmptyList />
    <List />
  );
}

