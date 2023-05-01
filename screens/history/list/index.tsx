import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { Link } from 'expo-router';
import ListGrid from './listGrid';

export default function List() {
  const colorScheme = useColorScheme();
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerListList>
        <ListGrid />
      </Styled.ContainerListList>
      <Styled.ContainerListInner>
        <Styled.ContainerButtonAdd>
          <Link href="/modal" asChild>
            <Button text='Criar' background={Colors['light'].buttonBackground} icon="plus" />
          </Link>
        </Styled.ContainerButtonAdd>
      </Styled.ContainerListInner>
    </Styled.Container>
  );
}

