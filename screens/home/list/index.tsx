import { useColorScheme } from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { lazy, useState } from 'react';
import { BottomSheetProps, ListInterface, ListType } from '../../../types/types';
const Button = lazy(() => import('../../../components/Button'));
const ListGrid = lazy(() => import('./listGrid'));
const BottomSheetComponent = lazy(() => import('../../../components/BottomSheetComponent'));
interface ItemProps {
  items: ListInterface[],
}



export default function List({ items }: ItemProps) {
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    listId: '',
    action: 'addList',
    buttonText: 'add',
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerListList>
        <ListGrid items={items} setBottomSheetProps={setBottomSheetProps} />
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

