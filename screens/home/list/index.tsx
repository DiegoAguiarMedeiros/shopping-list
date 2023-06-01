import { useColorScheme } from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { lazy, useState } from 'react';
import { BottomSheetProps, listType } from '../../../types/types';
const Button = lazy(() => import('../../../components/Button'));
const ListGrid = lazy(() => import('./listGrid'));
const BottomSheetComponent = lazy(() => import('../../../components/BottomSheetComponent'));
interface ItemProps {
  items: listType,
  deleteFromList: (uuid: string) => void
}



export default function List({ items, deleteFromList }: ItemProps) {
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    action: 'addList',
    buttonText: 'add',
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

