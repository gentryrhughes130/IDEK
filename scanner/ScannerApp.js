import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BarcodeScanner from './BarcodeScanner';
import FoodRating from './FoodRating';
import { lookupProduct } from './productLookup';

export default function ScannerApp({ onExit }) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('scan');
  const [message, setMessage] = useState('');

  const handleBarcodeScanned = async ({ data }) => {
    setStatus('loading');
    setMessage('Looking up that food...');
    try {
      const result = await lookupProduct(data);
      if (!result) {
        setStatus('error');
        setMessage('We could not find that product. Try another barcode.');
        return;
      }
      setProduct(result);
      setStatus('result');
    } catch {
      setStatus('error');
      setMessage('The product lookup failed. Check your connection and try again.');
    }
  };

  if (status === 'result') {
    return (
      <View style={styles.screen}>
        <Pressable style={styles.backButton} onPress={onExit}>
          <Text style={styles.backText}>&lt;- WELCOME</Text>
        </Pressable>
        <FoodRating product={product} />
        <Pressable style={styles.resetButton} onPress={() => { setProduct(null); setStatus('scan'); }}>
          <Text style={styles.resetText}>SCAN ANOTHER FOOD</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Pressable style={styles.backButton} onPress={onExit}>
        <Text style={styles.backText}>&lt;- WELCOME</Text>
      </Pressable>
      {status === 'loading' ? (
        <View style={styles.center}><Text style={styles.title}>{message}</Text></View>
      ) : status === 'error' ? (
        <View style={styles.center}>
          <Text style={styles.title}>{message}</Text>
          <Pressable style={styles.resetButton} onPress={() => { setMessage(''); setStatus('scan'); }}>
            <Text style={styles.resetText}>TRY AGAIN</Text>
          </Pressable>
        </View>
      ) : (
        <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#090b10' },
  center: { flex: 1, minHeight: 520, alignItems: 'center', justifyContent: 'center', padding: 28 },
  title: { color: '#f4f5f0', fontSize: 18, lineHeight: 26, fontWeight: '700', textAlign: 'center' },
  resetButton: { backgroundColor: '#c9f477', alignSelf: 'center', paddingHorizontal: 18, paddingVertical: 15, margin: 22, borderRadius: 4 },
  resetText: { color: '#151a12', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  backButton: { alignSelf: 'flex-start', paddingHorizontal: 22, paddingTop: 28, paddingBottom: 8 },
  backText: { color: '#c9f477', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
});
