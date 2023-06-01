import { lazy } from 'react';

const List = lazy(() => import('../screens/list'));
export default function iTems() {
  return (
    <List />
  );
}
