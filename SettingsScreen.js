import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const themes = [
  { id: 'sage', label: 'Sage and cream', color: '#395f4b' },
  { id: 'ocean', label: 'Ocean and mist', color: '#2f6470' },
  { id: 'night', label: 'Night and lime', color: '#1c2821' },
];

export default function SettingsScreen({ theme, onThemeChange, onClearData }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>SETTINGS</Text>
      <Text style={styles.title}>Make it yours.</Text>
      <Text style={styles.intro}>Change the look, services, and local data used by this app.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        {themes.map((option) => <Pressable key={option.id} style={[styles.option, theme === option.id && styles.optionActive]} onPress={() => onThemeChange(option.id)}><View style={[styles.swatch, { backgroundColor: option.color }]} /><Text style={styles.optionText}>{option.label}</Text><Text style={styles.check}>{theme === option.id ? '✓' : ''}</Text></Pressable>)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local information</Text>
        <Text style={styles.help}>Sensitivities, mood, hydration, journal entries, and this API key are stored locally on this device.</Text>
        <Pressable style={styles.clearButton} onPress={onClearData}><Text style={styles.clearText}>CLEAR WELLNESS DATA</Text></Pressable>
      </View>
      <Text style={styles.footer}>Sources: Open Food Facts, Open Beauty Facts, TheMealDB, and OpenStreetMap.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 28, paddingBottom: 40 },
  kicker: { color: '#758078', fontSize: 10, fontWeight: '800', letterSpacing: 1.7 },
  title: { color: '#1b2b25', fontSize: 34, lineHeight: 40, fontWeight: '800', marginTop: 9 },
  intro: { color: '#6c7971', fontSize: 15, lineHeight: 22, marginTop: 12, marginBottom: 28 },
  section: { marginBottom: 28 },
  sectionTitle: { color: '#1b2b25', fontSize: 19, fontWeight: '800', marginBottom: 12 },
  option: { minHeight: 54, flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e4e2da', paddingHorizontal: 14, marginBottom: 8 },
  optionActive: { borderColor: '#4d7958', backgroundColor: '#e7f0df' },
  swatch: { width: 22, height: 22, marginRight: 12 },
  optionText: { color: '#30453a', fontSize: 14, fontWeight: '700', flex: 1 },
  check: { color: '#356249', fontSize: 20, fontWeight: '800' },
  help: { color: '#6c7971', fontSize: 13, lineHeight: 20, marginBottom: 12 },
  input: { minHeight: 50, borderWidth: 1, borderColor: '#d8d9d0', backgroundColor: '#ffffff', paddingHorizontal: 14, color: '#30453a', fontSize: 14 },
  caption: { color: '#879189', fontSize: 11, marginTop: 7 },
  clearButton: { borderWidth: 1, borderColor: '#ba6b5f', paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  clearText: { color: '#a45247', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  footer: { color: '#879189', fontSize: 11, lineHeight: 17 },
});
