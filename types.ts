
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from 'expo-router';
import { BottomTabScreenProps } from 'expo-router/build/react-navigation/bottom-tabs';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterComplement: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Chat: undefined;
  Perfil: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;