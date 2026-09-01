const OPEN_FOOD_FACTS_URL = 'https://world.openfoodfacts.org/api/v2/product';
import { defaultSensitivities, findTriggerMatches } from './sensitivityProfile';

export async function lookupProduct(barcode, selectedSensitivities = defaultSensitivities) {
  const normalizedBarcode = String(barcode).replace(/\D/g, '');
  if (!normalizedBarcode) return null;

  const response = await fetch(`${OPEN_FOOD_FACTS_URL}/${encodeURIComponent(normalizedBarcode)}.json`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Product lookup failed with ${response.status}`);

  const result = await response.json();
  if (result.status !== 1 || !result.product) return null;

  const product = result.product;
  const nutrients = product.nutriments || {};
  const sugar = Number(nutrients.sugars_100g || 0);
  const fiber = Number(nutrients.fiber_100g || 0);
  const ingredients = product.ingredients_text || '';
  const labels = (product.labels_tags || []).join(' ');
  const animalTestingStatus = /cruelty-free|cruelty free|not tested on animals/i.test(labels) ? 'Cruelty-free claim listed' : 'Animal-testing information not listed';
  const matchedTriggers = findTriggerMatches(ingredients, selectedSensitivities);
  const score = Math.max(0, Math.min(100, Math.round(82 + fiber * 2 - sugar * 1.4 - matchedTriggers.length * 18)));

  return {
    name: product.product_name || 'Unknown food',
    brand: product.brands || 'Unknown brand',
    score,
    verdict: matchedTriggers.length ? 'REVIEW INGREDIENTS' : score >= 70 ? 'LOWER CONCERN' : 'CHECK THE LABEL',
    reasons: [
      ...matchedTriggers.map(({ label }) => `${label} signal found`),
      fiber >= 3 ? 'Good fiber' : 'Low fiber',
      sugar <= 8 ? 'Moderate sugar' : 'Higher sugar',
    ],
    matchedTriggers,
    details: { sugar, fiber, ingredientsLength: ingredients.length },
    barcode: normalizedBarcode,
    sourceName: 'Open Food Facts',
    sourceUrl: product.url || `https://world.openfoodfacts.org/product/${normalizedBarcode}`,
    communityNote: product.generic_name || product.categories || 'No community note was provided.',
    animalTestingStatus,
  };
}
