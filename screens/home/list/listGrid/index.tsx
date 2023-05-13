import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import { BottomSheetProps, listInterface, listType } from '../../../../types/types';
import { Link } from 'expo-router';
import ListGridItem from './listGridItem'

interface itemProps {
  items: listType,
  deleteFromList: (uuid: string) => void,
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>,
}
export default function ListGrid({ items, deleteFromList, setBottomSheetProps }: itemProps) {
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
                    <ListGridItem setBottomSheetProps={setBottomSheetProps}  key={'ListGridItem-' + item.uuid} item={item} deleteFromList={deleteFromList} />
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

