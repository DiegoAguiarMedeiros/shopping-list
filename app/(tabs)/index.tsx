import { lazy } from 'react';
import { StyleSheet } from 'react-native';

const Home = lazy(() => import('../../screens/home'));
const View = lazy(() => import('../../components/Themed'));

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
