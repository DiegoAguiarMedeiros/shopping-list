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
import ListGridItem from './listGridItem'


export default function ListGrid() {
  const colorScheme = useColorScheme();
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerList >
        <Styled.ContainerListInner>


          <Styled.ContainerListTotal>
            <Styled.ContainerItemTotalUnitText text={Colors[colorScheme ?? 'light'].text}>
              Total Items: 1000
            </Styled.ContainerItemTotalUnitText>
            <Styled.ContainerItemTotalText text={Colors[colorScheme ?? 'light'].text}>
              Total : R$ 10000
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView >
              <ScrollView >
                <Styled.ContainerListItemListItem>
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                  <ListGridItem />
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>

          </Styled.ContainerListItemList>
          <Styled.ContainerButtonAdd>
            <Link href="/iTems" asChild>
              <Button text='Adicionar' background={Colors['light'].buttonBackground} icon="plus" />
            </Link>
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListInner >
      </Styled.ContainerList >

    </Styled.Container >
  );
}

