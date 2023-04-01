import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { itemInterface } from '../../../types/types';
import { Link } from 'expo-router';



interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../../assets/images/emptyList.png'),
};

const itemsArr: itemInterface[] = []

export default function EmptyList() {
  const colorScheme = useColorScheme();
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerListEmpty >
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInner>
          <Styled.ListEmptyTextmessage text={Colors[colorScheme ?? 'light'].text2}>
            Você não tem nenhuma item na lista
          </Styled.ListEmptyTextmessage>
          <Styled.ContainerButtonAdd>
            <Link href="/iTems" asChild>
              <Button text='Adicionar' background={Colors['light'].buttonBackground} icon="plus" />
            </Link>
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListEmptyInner>
      </Styled.ContainerListEmpty>

    </Styled.Container>
  );
}

