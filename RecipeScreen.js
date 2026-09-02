import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RecipeScreen() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Search TheMealDB for recipes.');

  const searchRecipes = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setMessage('Searching recipes...');
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.trim())}`);
      if (!response.ok) throw new Error('Recipe search failed');
      const result = await response.json();
      let matches = result.meals || [];
      let related = false;
      if (!matches.length) {
        const terms = query.trim().split(/\s+/).filter((term) => term.length > 2);
        const responses = await Promise.all(terms.map((term) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`)));
        const relatedMeals = await Promise.all(responses.filter((item) => item.ok).map((item) => item.json()));
        matches = relatedMeals.flatMap((item) => item.meals || []).filter((meal, index, all) => all.findIndex((candidate) => candidate.idMeal === meal.idMeal) === index).slice(0, 10);
        related = matches.length > 0;
      }
      setRecipes(matches);
      setMessage(matches.length ? related ? 'No exact title found. Showing related recipes.' : '' : 'No recipes found. Try another ingredient.');
    } catch {
      setMessage('Recipe search is unavailable. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const viewRecipe = (recipe) => Linking.openURL(recipe.strSource || `https://www.themealdb.com/search.php?s=${encodeURIComponent(recipe.strMeal)}`);
  const shopIngredients = (recipe) => Linking.openURL(`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${recipe.strMeal} ingredients`)}`);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>ONLINE RECIPE FINDER</Text>
      <Text style={styles.title}>Cook what fits.</Text>
      <Text style={styles.intro}>Search recipes online, then open a shopping search for the ingredients.</Text>
      <View style={styles.searchCard}>
        <TextInput value={query} onChangeText={setQuery} onSubmitEditing={searchRecipes} placeholder="Try chicken, rice, or vegetables" placeholderTextColor="#9aa59e" style={styles.input} returnKeyType="search" />
        <Pressable style={styles.button} onPress={searchRecipes}><Text style={styles.buttonText}>{loading ? 'SEARCHING...' : 'FIND RECIPES  -&gt;'}</Text></Pressable>
      </View>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {recipes.map((recipe) => (
        <View key={recipe.idMeal} style={styles.recipeCard}>
          <Text style={styles.category}>{recipe.strCategory || 'RECIPE'}  /  {recipe.strArea || 'ONLINE'}</Text>
          <Text style={styles.recipeTitle}>{recipe.strMeal}</Text>
          <Text style={styles.recipeDetail}>Recipe instructions and ingredients are available online.</Text>
          <View style={styles.actions}>
            <Pressable style={styles.secondaryButton} onPress={() => viewRecipe(recipe)}><Text style={styles.secondaryText}>VIEW RECIPE</Text></Pressable>
            <Pressable style={styles.shopButton} onPress={() => shopIngredients(recipe)}><Text style={styles.shopText}>SHOP INGREDIENTS</Text></Pressable>
          </View>
        </View>
      ))}
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
  message: { color: '#78847d', fontSize: 14, marginBottom: 16 },
  recipeCard: { backgroundColor: '#ffffff', padding: 18, borderWidth: 1, borderColor: '#e4e2da', marginBottom: 12 },
  category: { color: '#758078', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  recipeTitle: { color: '#1b2b25', fontSize: 21, fontWeight: '800', marginTop: 9 },
  recipeDetail: { color: '#78847d', fontSize: 13, lineHeight: 19, marginTop: 7, marginBottom: 14 },
  actions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  secondaryButton: { borderWidth: 1, borderColor: '#aebbb0', paddingHorizontal: 13, paddingVertical: 13 },
  secondaryText: { color: '#356249', fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  shopButton: { backgroundColor: '#395f4b', paddingHorizontal: 13, paddingVertical: 14, flex: 1, alignItems: 'center' },
  shopText: { color: '#f5f3ec', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
});
