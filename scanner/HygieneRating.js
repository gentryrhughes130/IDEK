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
  screen: { backgroundColor: '#090b10', padding: 22 },
  kicker: { color: '#7b838f', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  scoreCircle: { width: 126, height: 126, borderRadius: 63, borderWidth: 5, alignItems: 'center', justifyContent: 'center' },
  score: { fontSize: 40, fontWeight: '900' },
  outOf: { color: '#7b838f', fontSize: 11, marginTop: -4 },
  productCopy: { flex: 1 },
  brand: { color: '#7b838f', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  name: { color: '#f4f5f0', fontSize: 23, fontWeight: '800', lineHeight: 28 },
  category: { color: '#a4aab4', fontSize: 13, marginTop: 5 },
  verdict: { fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginTop: 12 },
  reasonPanel: { backgroundColor: '#12161b', marginTop: 28, padding: 20 },
  panelTitle: { color: '#7b838f', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 14 },
  reasonRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderTopWidth: 1, borderTopColor: '#252a31' },
  reasonMark: { fontSize: 19, fontWeight: '900', width: 24 },
  reason: { color: '#d4d8d3', fontSize: 15, flex: 1 },
  ingredientCount: { color: '#7b838f', fontSize: 11, marginTop: 14 },
  detailLabel: { color: '#7b838f', fontSize: 10, letterSpacing: 1.4, fontWeight: '800', marginTop: 18, marginBottom: 5 },
  detailText: { color: '#a4aab4', fontSize: 13, lineHeight: 19 },
  sourceLink: { alignSelf: 'flex-start', marginTop: 22, paddingVertical: 4 },
  sourceLinkText: { color: '#c9f477', fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  method: { color: '#7b838f', fontSize: 11, lineHeight: 17, marginTop: 14 },
});
