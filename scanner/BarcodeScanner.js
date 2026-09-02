import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function BarcodeScanner({ onBarcodeScanned, category = 'food' }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  if (!permission) {
    return <View style={styles.center}><Text style={styles.muted}>Checking camera access...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera access needed</Text>
        <Text style={styles.muted}>Allow camera access to scan a {category === 'food' ? 'food' : 'hygiene or toiletry'} barcode.</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>ALLOW CAMERA</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarcodeScanned = ({ data, type }) => {
    if (scanned) return;
    setScanned(true);
    onBarcodeScanned?.({ data, type });
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={torchOn}
        barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'] }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <View style={styles.overlay} pointerEvents="box-none">
        <Pressable
          style={[styles.flashButton, torchOn && styles.flashButtonActive]}
          onPress={() => setTorchOn((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel={torchOn ? 'Turn flashlight off' : 'Turn flashlight on'}
        >
          <Text style={[styles.flashText, torchOn && styles.flashTextActive]}>{torchOn ? 'FLASH ON' : 'FLASH OFF'}</Text>
        </Pressable>
        <Text style={styles.heading}>SCAN A {category === 'food' ? 'FOOD' : 'TOILETRY'}</Text>
        <Text style={styles.instruction}>Line up the barcode inside the frame</Text>
        <View style={styles.scanFrame} />
        {scanned && (
          <Pressable style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>SCAN AGAIN</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 520, backgroundColor: '#090b10' },
  camera: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', paddingTop: 48, backgroundColor: 'rgba(9, 11, 16, 0.2)' },
  heading: { color: '#f4f5f0', fontSize: 24, fontWeight: '800', letterSpacing: 1.5 },
  instruction: { color: '#cbd0d4', fontSize: 14, marginTop: 10 },
  scanFrame: { width: 270, height: 170, borderWidth: 2, borderColor: '#c9f477', marginTop: 74, borderRadius: 8 },
  flashButton: { alignSelf: 'flex-end', borderWidth: 1, borderColor: '#cbd0d4', paddingHorizontal: 12, paddingVertical: 9, marginRight: 20, marginBottom: 46, backgroundColor: 'rgba(9, 11, 16, 0.65)', borderRadius: 4 },
  flashButtonActive: { backgroundColor: '#c9f477', borderColor: '#c9f477' },
  flashText: { color: '#f4f5f0', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  flashTextActive: { color: '#151a12' },
  center: { flex: 1, minHeight: 520, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: '#090b10' },
  title: { color: '#f4f5f0', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
  muted: { color: '#a4aab4', fontSize: 15, textAlign: 'center', lineHeight: 22 },
  button: { backgroundColor: '#c9f477', paddingHorizontal: 20, paddingVertical: 15, marginTop: 24, borderRadius: 4 },
  buttonText: { color: '#151a12', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
});
