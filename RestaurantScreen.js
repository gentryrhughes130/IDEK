import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RestaurantScreen() {
  const [query, setQuery] = useState('restaurants near me');
  const openRestaurants = () => Linking.openURL(`https://www.google.com/maps/search/${encodeURIComponent(query)}`);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>RESTAURANTS</Text>
      <Text style={styles.title}>Find a place to eat.</Text>
      <Text style={styles.intro}>Search nearby restaurants, then scan a menu item or packaged food before choosing.</Text>
      <View style={styles.searchCard}>
        <TextInput value={query} onChangeText={setQuery} placeholder="Cuisine, restaurant, or city" placeholderTextColor="#9aa59e" style={styles.input} />
        <Pressable style={styles.button} onPress={openRestaurants} accessibilityRole="button"><Text style={styles.buttonText}>SEARCH MAPS  -&gt;</Text></Pressable>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.kicker}>HOW IT WORKS</Text>
        <Text style={styles.infoTitle}>Find it. Check it. Choose it.</Text>
        <Text style={styles.infoText}>Use Maps to find a restaurant, then use Scan to review ingredients and sensitivities. Restaurant availability and menus come from the linked service.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 28, paddingBottom: 40 },
  kicker: { color: '#758078', fontSize: 10, fontWeight: '800', letterSpacing: 1.7 },
  title: { color: '#1b2b25', fontSize: 34, lineHeight: 40, fontWeight: '800', marginTop: 9 },
  intro: { color: '#6c7971', fontSize: 15, lineHeight: 22, marginTop: 12, marginBottom: 26 },
  searchCard: { backgroundColor: '#ffffff', padding: 16, borderWidth: 1, borderColor: '#e4e2da', marginBottom: 18 },
  input: { color: '#30453a', fontSize: 15, minHeight: 48, borderBottomWidth: 1, borderBottomColor: '#e4e2da', marginBottom: 4 },
  button: { backgroundColor: '#395f4b', paddingVertical: 15, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#f5f3ec', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  infoCard: { backgroundColor: '#dce9dc', padding: 20 },
  infoTitle: { color: '#1b2b25', fontSize: 21, fontWeight: '800', marginTop: 12, marginBottom: 7 },
  infoText: { color: '#5b6c61', fontSize: 13, lineHeight: 20 },
});
