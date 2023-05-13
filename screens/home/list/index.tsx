import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Button from '../../../components/Button';
import { BottomSheetProps, itemInterface, listInterface, listType } from '../../../types/types';
import { Link } from 'expo-router';
import ListGrid from './listGrid';
import BottomSheetComponent from '../../../components/BottomSheetComponent';

interface itemProps {
  items: listType,
  deleteFromList: (uuid: string) => void
}



export default function List({ items, deleteFromList }: itemProps) {
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    action: 'addList',
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerListList>
        <ListGrid items={items} setBottomSheetProps={setBottomSheetProps} deleteFromList={deleteFromList} />
      </Styled.ContainerListList>
      <Styled.ContainerListInner>
        <Styled.ContainerButtonAdd>
          {/* <Link href="/modal" asChild> */}
          <Button text='Criar' onPress={() => setBottomSheetProps({ ...bottomSheetProps, isVisible: true })} background={Colors[colorScheme ?? 'light'].buttonBackground} icon="plus" />
          {/* </Link> */}
        </Styled.ContainerButtonAdd>
      </Styled.ContainerListInner>
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container>
  );
}

