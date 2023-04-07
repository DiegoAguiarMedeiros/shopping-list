import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { itemInterface } from '../../types/types';
import { Link } from 'expo-router';
import InputText from '../../components/InputText';
import EmptyList from './emptyList';
import ListGrid from './listGrid';
import CircleProgress from '../../components/CircleProgress';


interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../assets/images/empty.png'),
};

const itemsArr: itemInterface[] = []

export default function List() {
  const [newItem, setNewItem] = useState('');
  const colorScheme = useColorScheme();
  const styleDot = {
    backgroundColor: '#000000',
    marginRight: 3,
  };
  const percentage = 66;


  const formatText = (progress: number) => {
    return `${progress}/2`;
  }
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerHeader >
        <Styled.ContainerHeaderInnerText >
          <Styled.ListTitle text={Colors[colorScheme ?? 'light'].text}>
            Nome da Lista!
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
        <Styled.ContainerHeaderInnerProgress >
          <CircleProgress
            filled={2}
            progress={0.66}
            total={3}
            size={80} />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerBody >
        <ListGrid />
        {/* <EmptyList /> */}
      </Styled.ContainerBody>
    </Styled.Container >
  )
}

