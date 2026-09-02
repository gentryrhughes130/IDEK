import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

const sampleProduct = {
  name: 'Daily Clean Wash',
  brand: 'Sample Care',
  category: 'Body wash',
  score: 82,
  verdict: 'LOWER CONCERN',
  reasons: ['No common concern signals found'],
  ingredientCount: 12,
  sourceName: 'Open Beauty Facts',
  sourceUrl: 'https://world.openbeautyfacts.org/',
};

export default function HygieneRating({ product = sampleProduct }) {
  const scoreColor = product.score >= 70 ? '#c9f477' : product.score >= 40 ? '#f4c95d' : '#ff7b72';

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>HYGIENE RESULT</Text>
      <View style={styles.header}>
        <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
          <Text style={[styles.score, { color: scoreColor }]}>{product.score}</Text>
          <Text style={styles.outOf}>/ 100</Text>
        </View>
        <View style={styles.productCopy}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={[styles.verdict, { color: scoreColor }]}>{product.verdict}</Text>
        </View>
      </View>
      <View style={styles.reasonPanel}>
        <Text style={styles.panelTitle}>INGREDIENT SIGNALS</Text>
        {product.reasons.map((reason) => (
          <View key={reason} style={styles.reasonRow}>
            <Text style={[styles.reasonMark, { color: scoreColor }]}>{reason === 'No common concern signals found' ? '+' : '!'}</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>
        ))}
        <Text style={styles.ingredientCount}>{product.ingredientCount} listed ingredients detected</Text>
        <Text style={styles.detailLabel}>COMMUNITY NOTE</Text>
        <Text style={styles.detailText}>{product.communityNote || 'No community note was provided.'}</Text>
        <Text style={styles.detailLabel}>ANIMAL TESTING</Text>
        <Text style={styles.detailText}>{product.animalTestingStatus || 'Information not listed'}</Text>
      </View>
      <Pressable style={styles.sourceLink} onPress={() => Linking.openURL(product.sourceUrl)} accessibilityRole="link">
        <Text style={styles.sourceLinkText}>VIEW SOURCE: {product.sourceName}  -&gt;</Text>
      </Pressable>
      <Text style={styles.method}>This is an ingredient-screening signal, not a medical or safety certification.</Text>
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
  category: { color: '#6c7971', fontSize: 13, marginTop: 5 },
  verdict: { fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginTop: 12 },
  reasonPanel: { backgroundColor: '#ffffff', marginTop: 28, padding: 20, borderWidth: 1, borderColor: '#e4e2da' },
  panelTitle: { color: '#758078', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 14 },
  reasonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderTopWidth: 1, borderTopColor: '#e4e2da' },
  reasonMark: { fontSize: 19, fontWeight: '900', width: 24 },
  reason: { color: '#30453a', fontSize: 15, flex: 1 },
  ingredientCount: { color: '#758078', fontSize: 11, marginTop: 14 },
  detailLabel: { color: '#758078', fontSize: 10, letterSpacing: 1.4, fontWeight: '800', marginTop: 18, marginBottom: 5 },
  detailText: { color: '#6c7971', fontSize: 13, lineHeight: 19 },
  sourceLink: { alignSelf: 'flex-start', marginTop: 22, paddingVertical: 4 },
  sourceLinkText: { color: '#c9f477', fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  method: { color: '#758078', fontSize: 11, lineHeight: 17, marginTop: 14 },
});
