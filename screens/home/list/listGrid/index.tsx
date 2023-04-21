import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import { itemInterface, listInterface, listType } from '../../../../types/types';
import { Link } from 'expo-router';
import ListGridItem from './listGridItem'

interface itemProps {
  items: listType
}
export default function ListGrid({ items }: itemProps) {
  const colorScheme = useColorScheme();
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerList >
        <Styled.ContainerListInner>
          <Styled.ContainerListItemList>
            <SafeAreaView>
              <ScrollView>
                <Styled.ContainerListItemListItem>
                  {items.map((item: listInterface) =>
                    <ListGridItem item={item} />
                  )}
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>

          </Styled.ContainerListItemList>
        </Styled.ContainerListInner >
      </Styled.ContainerList >

    </Styled.Container >
  );
}

