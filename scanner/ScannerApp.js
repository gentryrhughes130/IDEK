import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BarcodeScanner from './BarcodeScanner';
import FoodRating from './FoodRating';
import HygieneRating from './HygieneRating';
import { lookupProduct } from './productLookup';
import { lookupHygieneProduct } from './hygieneLookup';
import SensitivitySetup from './SensitivitySetup';
import { defaultSensitivities } from './sensitivityProfile';

export default function ScannerApp({ onExit }) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('scan');
  const [category, setCategory] = useState(null);
  const [profileReady, setProfileReady] = useState(false);
  const [selectedSensitivities, setSelectedSensitivities] = useState(defaultSensitivities);
  const [message, setMessage] = useState('');

  const handleBarcodeScanned = async ({ data }) => {
    setStatus('loading');
    setMessage('Looking up that food...');
    try {
      const result = category === 'food'
        ? await lookupProduct(data, selectedSensitivities)
        : await lookupHygieneProduct(data, selectedSensitivities);
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
        <Pressable style={styles.backButton} onPress={onExit}>
          <Text style={styles.backText}>&lt;- WELCOME</Text>
        </Pressable>
        {category === 'food' ? <FoodRating product={product} /> : <HygieneRating product={product} />}
        <Pressable style={styles.resetButton} onPress={() => { setProduct(null); setStatus('scan'); }}>
          <Text style={styles.resetText}>SCAN ANOTHER {category === 'food' ? 'FOOD' : 'TOILETRY'}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Pressable style={styles.backButton} onPress={onExit}>
        <Text style={styles.backText}>&lt;- WELCOME</Text>
      </Pressable>
      {!category ? (
        <View style={styles.choosePanel}>
          <Text style={styles.kicker}>WHAT ARE YOU SCANNING?</Text>
          <Text style={styles.chooseTitle}>Pick a lane.</Text>
          <Text style={styles.chooseDetail}>We use a different source and rating system for each category.</Text>
          <Pressable style={styles.categoryButton} onPress={() => setCategory('food')}>
            <Text style={styles.categoryIcon}>01</Text>
            <View><Text style={styles.categoryTitle}>FOOD</Text><Text style={styles.categoryDetail}>Nutrition and ingredients</Text></View>
            <Text style={styles.categoryArrow}>-&gt;</Text>
          </Pressable>
          <Pressable style={styles.categoryButton} onPress={() => setCategory('toiletries')}>
            <Text style={styles.categoryIcon}>02</Text>
            <View><Text style={styles.categoryTitle}>TOILETRIES</Text><Text style={styles.categoryDetail}>Personal-care ingredients</Text></View>
            <Text style={styles.categoryArrow}>-&gt;</Text>
          </Pressable>
        </View>
      ) : !profileReady ? (
        <SensitivitySetup selectedIds={selectedSensitivities} onChange={setSelectedSensitivities} onContinue={() => setProfileReady(true)} />
      ) : null}
      {category && profileReady && status === 'loading' ? (
        <View style={styles.center}><Text style={styles.title}>{message}</Text></View>
      ) : category && profileReady && status === 'error' ? (
        <View style={styles.center}>
          <Text style={styles.title}>{message}</Text>
          <Pressable style={styles.resetButton} onPress={() => { setMessage(''); setStatus('scan'); }}>
            <Text style={styles.resetText}>TRY AGAIN</Text>
          </Pressable>
        </View>
      ) : (
        category && profileReady ? <BarcodeScanner category={category} onBarcodeScanned={handleBarcodeScanned} /> : null
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
  choosePanel: { padding: 22, marginTop: 52 },
  kicker: { color: '#7b838f', fontSize: 10, letterSpacing: 1.8, fontWeight: '800' },
  chooseTitle: { color: '#f4f5f0', fontSize: 34, fontWeight: '800', marginTop: 14 },
  chooseDetail: { color: '#a4aab4', fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 28 },
  categoryButton: { minHeight: 78, backgroundColor: '#12161b', borderWidth: 1, borderColor: '#303841', marginBottom: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  categoryIcon: { color: '#c9f477', fontSize: 11, fontWeight: '900' },
  categoryTitle: { color: '#f4f5f0', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  categoryDetail: { color: '#7b838f', fontSize: 12, marginTop: 5 },
  categoryArrow: { color: '#c9f477', fontSize: 18, marginLeft: 'auto' },
});
