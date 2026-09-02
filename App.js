import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import ScannerApp from './scanner/ScannerApp';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#090b10' }}>
      <StatusBar style="light" />
      <ScannerApp />
    </View>
  );
}
