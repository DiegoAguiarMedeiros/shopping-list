import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { itemInterface, listInterface } from '../../../types/types';
import { Link, useRouter } from 'expo-router';
import ListGridItem from './listGridItem'

interface listProps {
  list: listInterface,
}

export default function ListGrid({ list }: listProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const handleOpenList = () => {
    router.push({ pathname: "/modal", params: { listId: list.uuid } });
  }
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerList >
        <Styled.ContainerListInner>


          <Styled.ContainerListTotal>
            <Styled.ContainerItemTotalUnitText text={Colors[colorScheme ?? 'light'].text}>
              Total Items: {list.items.length}
            </Styled.ContainerItemTotalUnitText>
            <Styled.ContainerItemTotalText text={Colors[colorScheme ?? 'light'].text}>
              Total : R$ 10000
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView >
              <ScrollView>
                <Styled.ContainerListItemListItem>
                  {list.items.map((item: itemInterface) => (
                    <ListGridItem item={item} />
                  ))}
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>

          </Styled.ContainerListItemList>
          <Styled.ContainerButtonAdd>
            <Button text='Adicionar' onPress={handleOpenList} background={Colors['light'].buttonBackground} icon="plus" />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListInner >
      </Styled.ContainerList >

    </Styled.Container >
  );
}

