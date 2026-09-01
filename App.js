import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

const interests = ['Linux', 'RAGBRAI'];

export default function App() {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topLine}>
          <Text style={styles.eyebrow}>WELCOME / 01</Text>
          <View style={styles.liveMark}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>ONLINE</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>GRH</Text>
            <Text style={styles.avatarHint}>PHOTO</Text>
          </View>
          <Text style={styles.greeting}>Hey, I'm</Text>
          <Text style={styles.name}>Gentry Ryan{`\n`}Hughes</Text>
          <Text style={styles.handle}>AKA VIMSR</Text>
          <Text style={styles.welcomeCopy}>you got it</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionKicker}>A LITTLE ABOUT ME</Text>
          <Text style={styles.sectionTitle}>
            Curious by default.<Text style={styles.accentText}> Building on purpose.</Text>
          </Text>
          <View style={styles.interestRow}>
            {interests.map((interest) => (
              <View key={interest} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.focusPanel}>
          <Text style={styles.sectionKicker}>CURRENT FOCUS</Text>
          <Text style={styles.focusTitle}>Finish this app</Text>
          <Text style={styles.focusDetail}>Then bring VimHostage to Instagram.</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressLabel}>IN MOTION</Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryButton} accessibilityLabel="Start exploring">
            <Text style={styles.primaryButtonText}>START EXPLORING</Text>
            <Text style={styles.arrow}>-&gt;</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} accessibilityLabel="View profile">
            <Text style={styles.secondaryButtonText}>PROFILE</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#090b10' },
  content: { paddingHorizontal: 20, paddingTop: 54, paddingBottom: 42 },
  topLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 42 },
  eyebrow: { color: '#8b929f', fontSize: 11, letterSpacing: 2, fontWeight: '700' },
  liveMark: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#b8f36b' },
  liveText: { color: '#b8f36b', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  hero: { paddingBottom: 38 },
  avatarPlaceholder: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#c9f477', alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  avatarInitials: { color: '#151a12', fontSize: 25, fontWeight: '900', letterSpacing: 1 },
  avatarHint: { color: '#53633e', fontSize: 8, fontWeight: '800', letterSpacing: 1.5, marginTop: 3 },
  greeting: { color: '#a4aab4', fontSize: 18, fontWeight: '500', marginBottom: 6 },
  name: { color: '#f4f5f0', fontSize: 46, lineHeight: 48, fontWeight: '800', letterSpacing: -1.5 },
  handle: { color: '#c9f477', fontSize: 13, letterSpacing: 3, fontWeight: '800', marginTop: 18 },
  welcomeCopy: { color: '#727985', fontSize: 15, marginTop: 24, fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: '#252a31', marginBottom: 34 },
  section: { marginBottom: 28 },
  sectionKicker: { color: '#7b838f', fontSize: 10, letterSpacing: 1.8, fontWeight: '800', marginBottom: 14 },
  sectionTitle: { color: '#f0f1ed', fontSize: 24, lineHeight: 31, fontWeight: '700' },
  accentText: { color: '#c9f477' },
  interestRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  interestTag: { borderWidth: 1, borderColor: '#3c444d', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 4 },
  interestText: { color: '#cbd0d4', fontSize: 13, fontWeight: '700' },
  focusPanel: { backgroundColor: '#12161b', padding: 22, borderLeftWidth: 3, borderLeftColor: '#c9f477', marginBottom: 28 },
  focusTitle: { color: '#f4f5f0', fontSize: 25, fontWeight: '800', marginBottom: 6 },
  focusDetail: { color: '#a4aab4', fontSize: 15, lineHeight: 22 },
  progressTrack: { height: 4, backgroundColor: '#2b3239', marginTop: 22, marginBottom: 10 },
  progressFill: { height: 4, width: '62%', backgroundColor: '#c9f477' },
  progressLabel: { color: '#c9f477', fontSize: 9, letterSpacing: 1.5, fontWeight: '800' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  primaryButton: { flex: 1, backgroundColor: '#c9f477', minHeight: 54, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  primaryButtonText: { color: '#151a12', fontSize: 11, letterSpacing: 1, fontWeight: '900' },
  arrow: { color: '#151a12', fontSize: 18, fontWeight: '700' },
  secondaryButton: { borderWidth: 1, borderColor: '#49515b', minHeight: 54, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' },
  secondaryButtonText: { color: '#d4d8d3', fontSize: 11, letterSpacing: 1, fontWeight: '800' },
});
