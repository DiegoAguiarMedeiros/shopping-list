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
import * as Progress from 'react-native-progress';
import EmptyList from './emptyList';
import ListGrid from './listGrid';


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
          <Progress.Circle
            progress={0.5}
            size={80}
            unfilledColor={Colors[colorScheme ?? 'light'].secondary}
            color={Colors[colorScheme ?? 'light'].primary}
            showsText={true}
            formatText={() => formatText(1)}
            strokeCap="round"
            allowFontScaling={true} />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerBody >
        <ListGrid />
        {/* <EmptyList /> */}
      </Styled.ContainerBody>
    </Styled.Container >
  )
}

