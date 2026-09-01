const OPEN_FOOD_FACTS_URL = 'https://world.openfoodfacts.org/api/v2/product';

export async function lookupProduct(barcode) {
  const response = await fetch(`${OPEN_FOOD_FACTS_URL}/${encodeURIComponent(barcode)}.json`);
  if (!response.ok) throw new Error(`Product lookup failed with ${response.status}`);

  const result = await response.json();
  if (result.status !== 1 || !result.product) return null;

  const product = result.product;
  const nutrients = product.nutriments || {};
  const sugar = Number(nutrients.sugars_100g || 0);
  const fiber = Number(nutrients.fiber_100g || 0);
  const ingredients = product.ingredients_text || '';
  const score = Math.max(0, Math.min(100, Math.round(78 + fiber * 2 - sugar * 1.4 - (ingredients.length > 240 ? 8 : 0))));

  return {
    name: product.product_name || 'Unknown food',
    brand: product.brands || 'Unknown brand',
    score,
    verdict: score >= 70 ? 'GOOD PICK' : score >= 40 ? 'CHECK THE LABEL' : 'OCCASIONAL PICK',
    reasons: [
      fiber >= 3 ? 'Good fiber' : 'Low fiber',
      sugar <= 8 ? 'Moderate sugar' : 'Higher sugar',
      ingredients.length <= 240 ? 'Short ingredient list' : 'Long ingredient list',
    ],
    barcode,
  };
}
