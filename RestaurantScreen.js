import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const cuisineOptions = ['Any cuisine', 'Gluten-aware', 'Dairy-free', 'Vegan', 'Mexican', 'Asian', 'Mediterranean'];
const fieldMask = 'places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.reviews,places.googleMapsUri,places.primaryType';

function Stars({ rating }) {
  const rounded = Math.round(Number(rating || 0));
  return <View style={styles.stars}><Text style={styles.starText}>{[1, 2, 3, 4, 5].map((star) => star <= rounded ? '★' : '☆').join(' ')}</Text><Text style={styles.ratingText}>{rating ? Number(rating).toFixed(1) : 'New'}</Text></View>;
}

export default function RestaurantScreen() {
  const [query, setQuery] = useState('restaurants near me');
  const [cuisine, setCuisine] = useState('Any cuisine');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Search for a cuisine, restaurant, or city.');

  const searchRestaurants = async () => {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      setMessage('Restaurant previews need a Google Places API key in EXPO_PUBLIC_GOOGLE_PLACES_API_KEY.');
      return;
    }
    const searchText = cuisine === 'Any cuisine' ? query.trim() : `${cuisine} ${query.trim()}`;
    if (!searchText) return;
    setLoading(true);
    setMessage('Finding restaurants and reviews...');
    try {
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': fieldMask },
        body: JSON.stringify({ textQuery: searchText, maxResultCount: 10 }),
      });
      if (!response.ok) throw new Error(`Restaurant search failed with ${response.status}`);
      const data = await response.json();
      setResults(data.places || []);
      setMessage(data.places?.length ? '' : 'No restaurants found. Try a broader search.');
    } catch {
      setMessage('Restaurant search is unavailable. Check the Places API key and connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>RESTAURANTS</Text>
      <Text style={styles.title}>Choose with context.</Text>
      <Text style={styles.intro}>Compare ratings, review counts, addresses, and community comments before scanning a menu item.</Text>
      <View style={styles.searchCard}>
        <TextInput value={query} onChangeText={setQuery} onSubmitEditing={searchRestaurants} placeholder="City, neighborhood, or restaurant" placeholderTextColor="#9aa59e" style={styles.input} returnKeyType="search" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {cuisineOptions.map((option) => <Pressable key={option} onPress={() => setCuisine(option)} style={[styles.filter, cuisine === option && styles.filterActive]}><Text style={[styles.filterText, cuisine === option && styles.filterTextActive]}>{option}</Text></Pressable>)}
        </ScrollView>
        <Pressable style={styles.button} onPress={searchRestaurants}><Text style={styles.buttonText}>{loading ? 'SEARCHING...' : 'SEARCH RESTAURANTS  -&gt;'}</Text></Pressable>
      </View>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {results.map((place) => {
        const review = place.reviews?.[0];
        return <View key={place.googleMapsUri || place.formattedAddress} style={styles.resultCard}>
          <View style={styles.resultHeader}><View style={styles.resultHeading}><Text style={styles.placeType}>{place.primaryType?.replace(/_/g, ' ') || 'RESTAURANT'}</Text><Text style={styles.placeName}>{place.displayName?.text || 'Restaurant'}</Text></View><Stars rating={place.rating} /></View>
          <Text style={styles.address}>{place.formattedAddress || 'Address unavailable'}</Text>
          <Text style={styles.reviewCount}>{place.userRatingCount ? `${place.userRatingCount.toLocaleString()} reviews` : 'No review count listed'}</Text>
          {review?.text?.text ? <Text style={styles.review} numberOfLines={3}>“{review.text.text}”</Text> : <Text style={styles.reviewMuted}>No community review excerpt available.</Text>}
          <Pressable style={styles.mapButton} onPress={() => Linking.openURL(place.googleMapsUri)}><Text style={styles.mapButtonText}>OPEN IN MAPS  -&gt;</Text></Pressable>
        </View>;
      })}
      <Text style={styles.disclaimer}>Restaurant ratings and reviews are provided by Google Places. Verify menu ingredients directly with the restaurant.</Text>
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
  placeType: { color: '#758078', fontSize: 9, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  placeName: { color: '#1b2b25', fontSize: 20, lineHeight: 25, fontWeight: '800', marginTop: 6 },
  stars: { alignItems: 'flex-end' },
  starText: { color: '#c08b3e', fontSize: 13, letterSpacing: 1 },
  ratingText: { color: '#53665b', fontSize: 12, fontWeight: '800', marginTop: 4 },
  address: { color: '#6c7971', fontSize: 13, lineHeight: 19, marginTop: 12 },
  reviewCount: { color: '#879189', fontSize: 11, marginTop: 4 },
  review: { color: '#30453a', fontSize: 13, lineHeight: 19, fontStyle: 'italic', marginTop: 14 },
  reviewMuted: { color: '#9aa59e', fontSize: 13, marginTop: 14 },
  mapButton: { alignSelf: 'flex-start', borderWidth: 1, borderColor: '#aebbb0', paddingHorizontal: 13, paddingVertical: 11, marginTop: 16 },
  mapButtonText: { color: '#356249', fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  disclaimer: { color: '#879189', fontSize: 11, lineHeight: 17, marginTop: 8 },
});
