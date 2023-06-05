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
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>,
}
export default function ListGrid({ items, setBottomSheetProps }: ItemProps) {
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
                    <ListGridItem setBottomSheetProps={setBottomSheetProps} key={'ListGridItem-' + item.uuid} item={item} />
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

