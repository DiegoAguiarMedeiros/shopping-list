import {
  useColorScheme, SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { lazy, } from 'react';
import { BottomSheetProps, listInterface, listType } from '../../../../types/types';

const ListGridItem = lazy(() => import('./listGridItem'));
interface ItemProps {
  items: listType,
}
export default function ListGrid({ items }: ItemProps) {
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
                    <ListGridItem key={'ListGridItem-' + item.uuid} item={item} />
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

