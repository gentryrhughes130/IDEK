import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const cuisineOptions = ['Any cuisine', 'Vegan', 'Vegetarian', 'Mexican', 'Asian', 'Mediterranean', 'Cafe'];
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

function placeType(place) {
  return place.type === 'restaurant' || place.type === 'cafe' ? place.type.toUpperCase() : 'FOOD PLACE';
}

export default function RestaurantScreen() {
  const [query, setQuery] = useState('restaurants near me');
  const [cuisine, setCuisine] = useState('Any cuisine');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Search a city, neighborhood, cuisine, or restaurant.');

  const searchRestaurants = async () => {
    const searchText = cuisine === 'Any cuisine' ? query.trim() : `${cuisine} ${query.trim()}`;
    if (!searchText) return;
    setLoading(true);
    setMessage('Finding places on OpenStreetMap...');
    try {
      const response = await fetch(`${NOMINATIM_URL}?q=${encodeURIComponent(searchText)}&format=jsonv2&limit=10&addressdetails=1`, {
        headers: { Accept: 'application/json', 'User-Agent': 'IDEK-Wellness-App/1.0' },
      });
      if (!response.ok) throw new Error(`Restaurant search failed with ${response.status}`);
      const places = await response.json();
      setResults(places.filter((place) => ['restaurant', 'cafe', 'fast_food', 'bar', 'food_court'].includes(place.type)));
      setMessage(places.length ? '' : 'No places found. Try a broader search.');
    } catch {
      setMessage('Restaurant search is unavailable. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const openMap = (place) => Linking.openURL(`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=18/${place.lat}/${place.lon}`);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>OPEN RESTAURANT MAP</Text>
      <Text style={styles.title}>Choose with context.</Text>
      <Text style={styles.intro}>Search open map data for places to eat, then scan a menu item before choosing.</Text>
      <View style={styles.searchCard}>
        <TextInput value={query} onChangeText={setQuery} onSubmitEditing={searchRestaurants} placeholder="City, neighborhood, or restaurant" placeholderTextColor="#9aa59e" style={styles.input} returnKeyType="search" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {cuisineOptions.map((option) => <Pressable key={option} onPress={() => setCuisine(option)} style={[styles.filter, cuisine === option && styles.filterActive]}><Text style={[styles.filterText, cuisine === option && styles.filterTextActive]}>{option}</Text></Pressable>)}
        </ScrollView>
        <Pressable style={styles.button} onPress={searchRestaurants}><Text style={styles.buttonText}>{loading ? 'SEARCHING...' : 'SEARCH OPEN MAP  -&gt;'}</Text></Pressable>
      </View>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {results.map((place) => <View key={place.place_id} style={styles.resultCard}>
        <View style={styles.resultHeader}><View style={styles.resultHeading}><Text style={styles.placeType}>{placeType(place)}</Text><Text style={styles.placeName}>{place.name || place.display_name?.split(',')[0] || 'Unnamed place'}</Text></View><Text style={styles.openBadge}>OPEN DATA</Text></View>
        <Text style={styles.address}>{place.display_name || 'Address unavailable'}</Text>
        <Text style={styles.coordinates}>Coordinates: {Number(place.lat).toFixed(5)}, {Number(place.lon).toFixed(5)}</Text>
        <Pressable style={styles.mapButton} onPress={() => openMap(place)}><Text style={styles.mapButtonText}>VIEW ON OPENSTREETMAP  -&gt;</Text></Pressable>
      </View>)}
      <Text style={styles.disclaimer}>OpenStreetMap provides map data and place details, not ratings or reviews. Verify menu ingredients directly with the restaurant.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 28, paddingBottom: 40 },
  kicker: { color: '#758078', fontSize: 10, fontWeight: '800', letterSpacing: 1.7 },
  title: { color: '#1b2b25', fontSize: 34, lineHeight: 40, fontWeight: '800', marginTop: 9 },
  intro: { color: '#6c7971', fontSize: 15, lineHeight: 22, marginTop: 12, marginBottom: 26 },
  searchCard: { backgroundColor: '#ffffff', padding: 16, borderWidth: 1, borderColor: '#e4e2da', marginBottom: 18 },
  input: { color: '#30453a', fontSize: 15, minHeight: 48, borderBottomWidth: 1, borderBottomColor: '#e4e2da' },
  filters: { marginTop: 14, marginBottom: 4 },
  filter: { borderWidth: 1, borderColor: '#d2d9d0', paddingHorizontal: 11, paddingVertical: 8, marginRight: 7 },
  filterActive: { backgroundColor: '#e7f0df', borderColor: '#4d7958' },
  filterText: { color: '#78847d', fontSize: 11, fontWeight: '700' },
  filterTextActive: { color: '#356249' },
  button: { backgroundColor: '#395f4b', paddingVertical: 15, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#f5f3ec', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  message: { color: '#78847d', fontSize: 14, lineHeight: 20, marginBottom: 16 },
  resultCard: { backgroundColor: '#ffffff', padding: 18, borderWidth: 1, borderColor: '#e4e2da', marginBottom: 12 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  resultHeading: { flex: 1 },
  placeType: { color: '#758078', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  placeName: { color: '#1b2b25', fontSize: 20, lineHeight: 25, fontWeight: '800', marginTop: 6 },
  openBadge: { color: '#4d7958', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  address: { color: '#6c7971', fontSize: 13, lineHeight: 19, marginTop: 12 },
  coordinates: { color: '#879189', fontSize: 11, marginTop: 5 },
  mapButton: { alignSelf: 'flex-start', borderWidth: 1, borderColor: '#aebbb0', paddingHorizontal: 13, paddingVertical: 11, marginTop: 16 },
  mapButtonText: { color: '#356249', fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  disclaimer: { color: '#879189', fontSize: 11, lineHeight: 17, marginTop: 8 },
});
