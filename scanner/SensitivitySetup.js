import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { sensitivityOptions } from './sensitivityProfile';

export default function SensitivitySetup({ selectedIds, onChange, onContinue }) {
  const toggle = (id) => onChange(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>PERSONAL PROFILE</Text>
      <Text style={styles.title}>What should we watch for?</Text>
      <Text style={styles.detail}>Choose sensitivities to make scan results more relevant. This does not diagnose allergies or disease.</Text>
      <View style={styles.list}>
        {sensitivityOptions.map((option) => {
          const selected = selectedIds.includes(option.id);
          return (
            <Pressable key={option.id} style={[styles.option, selected && styles.selected]} onPress={() => toggle(option.id)}>
              <Text style={[styles.mark, selected && styles.selectedText]}>{selected ? 'x' : '+'}</Text>
              <Text style={[styles.label, selected && styles.selectedText]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>CONTINUE TO SCANNER  -&gt;</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22, paddingTop: 55, paddingBottom: 40, backgroundColor: '#090b10', flexGrow: 1 },
  kicker: { color: '#7b838f', fontSize: 10, letterSpacing: 1.8, fontWeight: '800' },
  title: { color: '#f4f5f0', fontSize: 32, lineHeight: 38, fontWeight: '800', marginTop: 14 },
  detail: { color: '#a4aab4', fontSize: 14, lineHeight: 21, marginTop: 10 },
  list: { marginTop: 25 },
  option: { minHeight: 48, borderWidth: 1, borderColor: '#303841', marginBottom: 8, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  selected: { borderColor: '#c9f477', backgroundColor: '#121a13' },
  mark: { color: '#7b838f', fontSize: 20, width: 20 },
  label: { color: '#d4d8d3', fontSize: 14 },
  selectedText: { color: '#c9f477', fontWeight: '800' },
  button: { backgroundColor: '#c9f477', minHeight: 54, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  buttonText: { color: '#151a12', fontSize: 11, letterSpacing: 1, fontWeight: '900' },
});
