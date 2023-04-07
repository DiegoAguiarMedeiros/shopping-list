import EmptyList from './emptyList'
import ListComponent from './list'
import ListStorage from '../../utils/list'
import { listType } from '../../types/types'
import { useEffect, useState } from 'react'


const getListFromStorage = async (): Promise<listType | null> => {
  const list = await ListStorage.getListArchived()
  return list;
}

export default function Home() {

  const [list, setList] = useState<listType | null>(null);

  const loadList = async (): Promise<void> => {
    const listArr = await getListFromStorage();
    setList(listArr);
  }

  useEffect(() => {
    loadList()
  }, []);

  return (
    list ? <ListComponent /> : <EmptyList />
  );
}

