import { lazy } from 'react';

const Modal = lazy(() => import('../screens/modal'));
export default function ModalScreen() {
  return (
    <Modal />
  );
}
