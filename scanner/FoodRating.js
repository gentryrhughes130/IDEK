import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

const sampleProduct = {
  name: 'Crisp Oat Granola',
  brand: 'Sample Kitchen',
  score: 82,
  verdict: 'GOOD PICK',
  reasons: ['Good fiber', 'Moderate sugar', 'Short ingredient list'],
  sourceName: 'Open Food Facts',
  sourceUrl: 'https://world.openfoodfacts.org/',
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
        <Text style={styles.panelTitle}>PERSONALIZED CHECK</Text>
        {product.reasons.map((reason) => (
          <View key={reason} style={styles.reasonRow}>
            <Text style={[styles.reasonMark, { color: scoreColor }]}>+</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>
        ))}
        <Text style={styles.detailLabel}>COMMUNITY NOTE</Text>
        <Text style={styles.detailText}>{product.communityNote || 'No community note was provided.'}</Text>
        <Text style={styles.detailLabel}>ANIMAL TESTING</Text>
        <Text style={styles.detailText}>{product.animalTestingStatus || 'Information not listed'}</Text>
      </View>
      <Pressable style={styles.sourceLink} onPress={() => Linking.openURL(product.sourceUrl)} accessibilityRole="link">
        <Text style={styles.sourceLinkText}>VIEW SOURCE: {product.sourceName}  -&gt;</Text>
      </Pressable>
      <Text style={styles.method}>The score combines the selected trigger signals with nutrition clues. A matched ingredient is a reason to verify the label, not a diagnosis.</Text>
      <Text style={styles.disclaimer}>A simple food guide, not medical advice.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#f5f3ec', padding: 22 },
  kicker: { color: '#758078', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  scoreCircle: { width: 126, height: 126, borderRadius: 63, borderWidth: 5, alignItems: 'center', justifyContent: 'center' },
  score: { fontSize: 40, fontWeight: '900' },
  outOf: { color: '#879189', fontSize: 11, marginTop: -4 },
  productCopy: { flex: 1 },
  brand: { color: '#758078', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  name: { color: '#1b2b25', fontSize: 23, fontWeight: '800', lineHeight: 28 },
  verdict: { fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginTop: 12 },
  reasonPanel: { backgroundColor: '#ffffff', marginTop: 28, padding: 20, borderWidth: 1, borderColor: '#e4e2da' },
  panelTitle: { color: '#758078', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 14 },
  reasonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderTopWidth: 1, borderTopColor: '#e4e2da' },
  reasonMark: { fontSize: 21, fontWeight: '700', marginRight: 12 },
  reason: { color: '#30453a', fontSize: 15 },
  detailLabel: { color: '#758078', fontSize: 10, letterSpacing: 1.4, fontWeight: '800', marginTop: 18, marginBottom: 5 },
  detailText: { color: '#6c7971', fontSize: 13, lineHeight: 19 },
  sourceLink: { alignSelf: 'flex-start', marginTop: 22, paddingVertical: 4 },
  sourceLinkText: { color: '#c9f477', fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  method: { color: '#758078', fontSize: 11, lineHeight: 17, marginTop: 14 },
  disclaimer: { color: '#879189', fontSize: 11, marginTop: 18 },
});
