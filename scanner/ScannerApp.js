import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BarcodeScanner from './BarcodeScanner';
import FoodRating from './FoodRating';
import { lookupProduct } from './productLookup';
import SensitivitySetup from './SensitivitySetup';
import { defaultSensitivities } from './sensitivityProfile';

export default function ScannerApp({ selectedSensitivities, onSensitivitiesChange }) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('scan');
  const [profileReady, setProfileReady] = useState(Boolean(selectedSensitivities));
  const [localSensitivities, setLocalSensitivities] = useState(selectedSensitivities || defaultSensitivities);
  const [message, setMessage] = useState('');

  const handleBarcodeScanned = async ({ data }) => {
    setStatus('loading');
    setMessage('Looking up that food...');
    try {
      const result = await lookupProduct(data, selectedSensitivities || localSensitivities);
      if (!result) {
        setStatus('error');
        setMessage('We could not find that product. Try another barcode.');
        return;
      }
      setProduct(result);
      setStatus('result');
    } catch {
      setStatus('error');
      setMessage('The lookup service is unavailable. Check your connection and try again.');
    }
  };

  if (status === 'result') {
    return (
      <View style={styles.screen}>
        <FoodRating product={product} />
        <Pressable style={styles.resetButton} onPress={() => { setProduct(null); setStatus('scan'); }}>
          <Text style={styles.resetText}>SCAN ANOTHER FOOD</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {!profileReady ? (
        <SensitivitySetup selectedIds={selectedSensitivities || localSensitivities} onChange={onSensitivitiesChange || setLocalSensitivities} onContinue={() => setProfileReady(true)} />
      ) : null}
      {profileReady && status === 'loading' ? (
        <View style={styles.center}><Text style={styles.title}>{message}</Text></View>
      ) : profileReady && status === 'error' ? (
        <View style={styles.center}>
          <Text style={styles.title}>{message}</Text>
          <Pressable style={styles.resetButton} onPress={() => { setMessage(''); setStatus('scan'); }}>
            <Text style={styles.resetText}>TRY AGAIN</Text>
          </Pressable>
        </View>
      ) : (
        profileReady ? <BarcodeScanner category="food" onBarcodeScanned={handleBarcodeScanned} /> : null
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f3ec' },
  center: { flex: 1, minHeight: 520, alignItems: 'center', justifyContent: 'center', padding: 28 },
  title: { color: '#1b2b25', fontSize: 18, lineHeight: 26, fontWeight: '700', textAlign: 'center' },
  resetButton: { backgroundColor: '#395f4b', alignSelf: 'center', paddingHorizontal: 18, paddingVertical: 15, margin: 22, borderRadius: 4 },
  resetText: { color: '#f5f3ec', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
});
