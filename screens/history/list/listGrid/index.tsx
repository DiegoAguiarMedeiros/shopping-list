import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import { Link } from 'expo-router';
import ListGridItem from './listGridItem'


export default function ListGrid() {
  const colorScheme = useColorScheme();
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerList >
        <Styled.ContainerListInner>
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
        </Styled.ContainerListInner >
      </Styled.ContainerList >

    </Styled.Container >
  );
}

