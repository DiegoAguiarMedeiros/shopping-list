import { lazy, Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/Text'
const Home = lazy(() => import('../../screens/home'));
const View = lazy(() => import('../../components/Themed'));

export default function TabOneScreen() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        <Home />
      </View>
    </Suspense>
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
