import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ScannerApp from './scanner/ScannerApp';
import SensitivitySetup from './scanner/SensitivitySetup';
import { defaultSensitivities } from './scanner/sensitivityProfile';

const tabs = [
  { id: 'today', label: 'Today', icon: '○' },
  { id: 'scan', label: 'Scan', icon: '⌾' },
  { id: 'journal', label: 'Journal', icon: '▤' },
  { id: 'profile', label: 'Profile', icon: '◉' },
];

const habits = [
  { label: 'Hydration', value: '0 / 8 glasses', icon: '◌' },
  { label: 'Sleep', value: 'No entry yet', icon: '☾' },
  { label: 'Movement', value: 'No entry yet', icon: '↗' },
];

function TodayScreen({ onScan, mood, onMoodChange, hydration, onHydrationChange, onJournal }) {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>WEDNESDAY, SEP 02</Text>
          <Text style={styles.title}>Good morning.</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>GR</Text></View>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusTop}><Text style={styles.cardKicker}>TODAY'S CHECK-IN</Text><Text style={styles.statusBadge}>READY</Text></View>
        <Text style={styles.statusTitle}>How are you feeling?</Text>
        <Text style={styles.statusDetail}>A quick check-in helps keep your wellness notes useful.</Text>
        <View style={styles.moodRow}>
          {['Great', 'Okay', 'Low'].map((option) => <Pressable key={option} onPress={() => onMoodChange(option)} style={[styles.moodButton, mood === option && styles.moodSelected]}><Text style={styles.moodText}>{option}</Text></Pressable>)}
        </View>
      </View>

      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Quick scan</Text><Text style={styles.sectionMeta}>Food + personal care</Text></View>
      <Pressable style={styles.scanCard} onPress={onScan} accessibilityLabel="Open food and toiletries scanner">
        <View style={styles.scanIcon}><Text style={styles.scanIconText}>⌾</Text></View>
        <View style={styles.scanCopy}><Text style={styles.scanTitle}>Check before you choose</Text><Text style={styles.scanDetail}>Scan a food or toiletry for personalized ingredient signals.</Text></View>
        <Text style={styles.chevron}>-&gt;</Text>
      </Pressable>

      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Daily rhythm</Text><Text style={styles.sectionMeta}>Start where you are</Text></View>
      <View style={styles.habitGrid}>
        <Pressable style={styles.habitCard} onPress={() => onHydrationChange(hydration >= 8 ? 0 : hydration + 1)}><Text style={styles.habitIcon}>◌</Text><Text style={styles.habitLabel}>Hydration</Text><Text style={styles.habitValue}>{hydration} / 8 glasses</Text></Pressable>
        {habits.slice(1).map((habit) => <Pressable key={habit.label} style={styles.habitCard}><Text style={styles.habitIcon}>{habit.icon}</Text><Text style={styles.habitLabel}>{habit.label}</Text><Text style={styles.habitValue}>{habit.value}</Text></Pressable>)}
      </View>

      <View style={styles.noteCard}><Text style={styles.cardKicker}>WELLNESS NOTE</Text><Text style={styles.noteTitle}>Your patterns belong to you.</Text><Text style={styles.noteDetail}>Keep a private record of reactions and questions to bring to a trusted clinician.</Text><Pressable onPress={onJournal}><Text style={styles.linkText}>OPEN JOURNAL  -&gt;</Text></Pressable></View>
    </ScrollView>
  );
}

function JournalScreen({ entries, onAddEntry }) {
  const [note, setNote] = useState('');
  const addNote = () => { if (!note.trim()) return; onAddEntry(note.trim()); setNote(''); };

  return <ScrollView contentContainerStyle={styles.content}><Text style={styles.kicker}>PRIVATE JOURNAL</Text><Text style={styles.title}>Your notes.</Text><Text style={styles.pageIntro}>Record reactions, questions, and patterns in your own words.</Text><View style={styles.noteInputCard}><TextInput value={note} onChangeText={setNote} placeholder="Write a note..." placeholderTextColor="#9aa59e" multiline style={styles.noteInput} /><Pressable style={styles.primaryButton} onPress={addNote}><Text style={styles.primaryButtonText}>SAVE NOTE</Text></Pressable></View>{entries.length === 0 ? <View style={styles.emptyCard}><Text style={styles.emptyIcon}>＋</Text><Text style={styles.emptyTitle}>No entries yet</Text><Text style={styles.emptyDetail}>Your journal is ready when you are.</Text></View> : entries.map((entry, index) => <View key={`${entry}-${index}`} style={styles.entryCard}><Text style={styles.entryDate}>TODAY</Text><Text style={styles.entryText}>{entry}</Text></View>)}</ScrollView>;
}

function ProfileScreen({ sensitivities, onSensitivitiesChange }) {
  const [editing, setEditing] = useState(false);
  return <ScrollView contentContainerStyle={styles.content}><Text style={styles.kicker}>YOUR WELLNESS PROFILE</Text><Text style={styles.title}>Gentry Ryan Hughes.</Text><Text style={styles.pageIntro}>Your selected sensitivities shape the information shown after each scan.</Text>{editing ? <View style={styles.profileEditor}><SensitivitySetup selectedIds={sensitivities} onChange={onSensitivitiesChange} onContinue={() => setEditing(false)} /></View> : <><View style={styles.profileCard}><Text style={styles.cardKicker}>PROFILE STATUS</Text><Text style={styles.profileStatus}>Personalized screening is on</Text><Text style={styles.profileDetail}>{sensitivities.length} sensitivities selected for scan results.</Text><Pressable onPress={() => setEditing(true)}><Text style={styles.linkText}>EDIT SENSITIVITIES  -&gt;</Text></Pressable></View><View style={styles.profileCard}><Text style={styles.cardKicker}>DATA & SOURCES</Text><Text style={styles.profileDetail}>Results use Open Food Facts and Open Beauty Facts. Journal data is kept local while cloud sync is prepared.</Text></View></>}</ScrollView>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [mood, setMood] = useState('Okay');
  const [hydration, setHydration] = useState(0);
  const [entries, setEntries] = useState([]);
  const [sensitivities, setSensitivities] = useState(defaultSensitivities);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('wellness-app-state')
      .then((saved) => {
        if (!saved) return;
        const state = JSON.parse(saved);
        if (state.mood) setMood(state.mood);
        if (Number.isInteger(state.hydration)) setHydration(state.hydration);
        if (Array.isArray(state.entries)) setEntries(state.entries);
        if (Array.isArray(state.sensitivities)) setSensitivities(state.sensitivities);
      })
      .catch(() => {})
      .finally(() => setStorageReady(true));
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    AsyncStorage.setItem('wellness-app-state', JSON.stringify({ mood, hydration, entries, sensitivities })).catch(() => {});
  }, [mood, hydration, entries, sensitivities, storageReady]);

  const renderScreen = activeTab === 'scan' ? <ScannerApp selectedSensitivities={sensitivities} onSensitivitiesChange={setSensitivities} /> : activeTab === 'journal' ? <JournalScreen entries={entries} onAddEntry={(entry) => setEntries((current) => [entry, ...current])} /> : activeTab === 'profile' ? <ProfileScreen sensitivities={sensitivities} onSensitivitiesChange={setSensitivities} /> : <TodayScreen onScan={() => setActiveTab('scan')} onJournal={() => setActiveTab('journal')} mood={mood} onMoodChange={setMood} hydration={hydration} onHydrationChange={setHydration} />;

  return <SafeAreaProvider><SafeAreaView style={styles.screen}><StatusBar style={activeTab === 'scan' ? 'light' : 'dark'} />{renderScreen}<View style={styles.tabBar}>{tabs.map((tab) => <Pressable key={tab.id} style={styles.tab} onPress={() => setActiveTab(tab.id)} accessibilityLabel={`Open ${tab.label}`}><Text style={[styles.tabIcon, activeTab === tab.id && styles.tabActive]}>{tab.icon}</Text><Text style={[styles.tabLabel, activeTab === tab.id && styles.tabActive]}>{tab.label}</Text></Pressable>)}</View></SafeAreaView></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f3ec' },
  content: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 34 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  kicker: { color: '#758078', fontSize: 10, fontWeight: '800', letterSpacing: 1.7 },
  title: { color: '#1b2b25', fontSize: 34, lineHeight: 40, fontWeight: '800', marginTop: 9 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#b8cdb8', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#1b2b25', fontSize: 14, fontWeight: '800' },
  statusCard: { backgroundColor: '#dce9dc', padding: 20, marginBottom: 28 },
  statusTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardKicker: { color: '#66766b', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  statusBadge: { color: '#3e7553', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  statusTitle: { color: '#1b2b25', fontSize: 24, fontWeight: '800', marginTop: 17 },
  statusDetail: { color: '#5b6c61', fontSize: 14, lineHeight: 21, marginTop: 7 },
  moodRow: { flexDirection: 'row', gap: 8, marginTop: 18 },
  moodButton: { borderWidth: 1, borderColor: '#a7bda9', paddingHorizontal: 13, paddingVertical: 9 },
  moodSelected: { backgroundColor: '#f5f3ec', borderColor: '#f5f3ec' },
  moodText: { color: '#466251', fontSize: 12, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { color: '#1b2b25', fontSize: 19, fontWeight: '800' },
  sectionMeta: { color: '#879189', fontSize: 11 },
  scanCard: { backgroundColor: '#ffffff', padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 28, borderWidth: 1, borderColor: '#e4e2da' },
  scanIcon: { width: 48, height: 48, backgroundColor: '#e7f0df', alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  scanIconText: { color: '#4d7958', fontSize: 29 },
  scanCopy: { flex: 1 },
  scanTitle: { color: '#1b2b25', fontSize: 15, fontWeight: '800' },
  scanDetail: { color: '#78847d', fontSize: 12, lineHeight: 17, marginTop: 4 },
  chevron: { color: '#4d7958', fontSize: 17, marginLeft: 9 },
  habitGrid: { flexDirection: 'row', gap: 8, marginBottom: 28 },
  habitCard: { backgroundColor: '#ffffff', flex: 1, minHeight: 118, padding: 12, borderWidth: 1, borderColor: '#e4e2da' },
  habitIcon: { color: '#75917c', fontSize: 21, marginBottom: 12 },
  habitLabel: { color: '#30453a', fontSize: 12, fontWeight: '800' },
  habitValue: { color: '#8c9790', fontSize: 10, lineHeight: 14, marginTop: 5 },
  noteCard: { backgroundColor: '#2f5542', padding: 20 },
  noteTitle: { color: '#f5f3ec', fontSize: 20, lineHeight: 26, fontWeight: '800', marginTop: 12 },
  noteDetail: { color: '#c7d6c8', fontSize: 13, lineHeight: 20, marginTop: 7, marginBottom: 18 },
  linkText: { color: '#d8eea8', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  pageIntro: { color: '#6c7971', fontSize: 15, lineHeight: 22, marginTop: 12, marginBottom: 26 },
  emptyCard: { backgroundColor: '#ffffff', alignItems: 'center', padding: 28, borderWidth: 1, borderColor: '#e4e2da' },
  emptyIcon: { color: '#75917c', fontSize: 32 },
  emptyTitle: { color: '#1b2b25', fontSize: 20, fontWeight: '800', marginTop: 8 },
  emptyDetail: { color: '#78847d', fontSize: 14, marginTop: 6 },
  noteInputCard: { backgroundColor: '#ffffff', padding: 16, borderWidth: 1, borderColor: '#e4e2da', marginBottom: 18 },
  noteInput: { color: '#30453a', fontSize: 15, lineHeight: 21, minHeight: 90, textAlignVertical: 'top' },
  entryCard: { backgroundColor: '#e8efe5', padding: 17, marginBottom: 10 },
  entryDate: { color: '#718276', fontSize: 9, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  entryText: { color: '#30453a', fontSize: 15, lineHeight: 21 },
  primaryButton: { backgroundColor: '#395f4b', paddingHorizontal: 18, paddingVertical: 14, marginTop: 20 },
  primaryButtonText: { color: '#f5f3ec', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  profileCard: { backgroundColor: '#ffffff', padding: 20, borderWidth: 1, borderColor: '#e4e2da', marginBottom: 12 },
  profileStatus: { color: '#1b2b25', fontSize: 19, fontWeight: '800', marginTop: 12 },
  profileDetail: { color: '#78847d', fontSize: 13, lineHeight: 20, marginTop: 8, marginBottom: 18 },
  profileEditor: { backgroundColor: '#090b10', marginHorizontal: -20 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#deddd5', backgroundColor: '#fbfaf5', paddingBottom: 8, paddingTop: 10 },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  tabIcon: { color: '#9da59f', fontSize: 19 },
  tabLabel: { color: '#8a938c', fontSize: 10, fontWeight: '700' },
  tabActive: { color: '#356249' },
});
