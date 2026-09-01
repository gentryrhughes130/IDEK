import { StyleSheet, Text, View } from 'react-native';

const sampleProduct = {
  name: 'Crisp Oat Granola',
  brand: 'Sample Kitchen',
  score: 82,
  verdict: 'GOOD PICK',
  reasons: ['Good fiber', 'Moderate sugar', 'Short ingredient list'],
};

export default function FoodRating({ product = sampleProduct }) {
  const scoreColor = product.score >= 70 ? '#c9f477' : product.score >= 40 ? '#f4c95d' : '#ff7b72';

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>SCAN RESULT</Text>
      <View style={styles.header}>
        <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
          <Text style={[styles.score, { color: scoreColor }]}>{product.score}</Text>
          <Text style={styles.outOf}>/ 100</Text>
        </View>
        <View style={styles.productCopy}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={[styles.verdict, { color: scoreColor }]}>{product.verdict}</Text>
        </View>
      </View>
      <View style={styles.reasonPanel}>
        <Text style={styles.panelTitle}>WHY THIS SCORE</Text>
        {product.reasons.map((reason) => (
          <View key={reason} style={styles.reasonRow}>
            <Text style={[styles.reasonMark, { color: scoreColor }]}>+</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.disclaimer}>A simple food guide, not medical advice.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#090b10', padding: 22 },
  kicker: { color: '#7b838f', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  scoreCircle: { width: 126, height: 126, borderRadius: 63, borderWidth: 5, alignItems: 'center', justifyContent: 'center' },
  score: { fontSize: 40, fontWeight: '900' },
  outOf: { color: '#7b838f', fontSize: 11, marginTop: -4 },
  productCopy: { flex: 1 },
  brand: { color: '#7b838f', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  name: { color: '#f4f5f0', fontSize: 23, fontWeight: '800', lineHeight: 28 },
  verdict: { fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginTop: 12 },
  reasonPanel: { backgroundColor: '#12161b', marginTop: 28, padding: 20 },
  panelTitle: { color: '#7b838f', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 14 },
  reasonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderTopWidth: 1, borderTopColor: '#252a31' },
  reasonMark: { fontSize: 21, fontWeight: '700', marginRight: 12 },
  reason: { color: '#d4d8d3', fontSize: 15 },
  disclaimer: { color: '#626a75', fontSize: 11, marginTop: 18 },
});
