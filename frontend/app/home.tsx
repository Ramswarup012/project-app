import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.blankScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b0608',
  },
  blankScreen: {
    flex: 1,
    backgroundColor: '#0b0608',
  },
});