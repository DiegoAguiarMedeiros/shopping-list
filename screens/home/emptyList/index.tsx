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
import { useRouter } from 'expo-router';



interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../../assets/images/empty.png'),
};

const itemsArr: itemInterface[] = []
const data = { name: 'John', age: 30 };
export default function EmptyList() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerListEmpty >
        <Styled.ContainerListEmptyInner>
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInner>
          <Styled.ListEmptyTextmessage text={Colors[colorScheme ?? 'light'].text2}>
            Você não tem nenhuma lista criada
          </Styled.ListEmptyTextmessage>
          <Styled.ContainerButtonAdd>
            <Button text='Adicionar' background={Colors['light'].buttonBackground} icon="plus" onPress={() => {
              router.push("/modal?myPage=home");
            }} />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListEmptyInner>
      </Styled.ContainerListEmpty>

    </Styled.Container >
  );
}

