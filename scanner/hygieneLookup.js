const OPEN_BEAUTY_FACTS_URL = 'https://world.openbeautyfacts.org/api/v2/product';
import { defaultSensitivities, findTriggerMatches } from './sensitivityProfile';

const concernSignals = [
  { pattern: /parfum|fragrance/i, label: 'Contains fragrance' },
  { pattern: /alcohol denat|sd alcohol|ethanol/i, label: 'Contains drying alcohol' },
  { pattern: /limonene|linalool|citronellol|geraniol/i, label: 'Lists fragrance allergens' },
  { pattern: /essential oil|tea tree|peppermint/i, label: 'Contains essential oils' },
];

export async function lookupHygieneProduct(barcode, selectedSensitivities = defaultSensitivities) {
  const normalizedBarcode = String(barcode).replace(/\D/g, '');
  if (!normalizedBarcode) return null;

  const response = await fetch(`${OPEN_BEAUTY_FACTS_URL}/${encodeURIComponent(normalizedBarcode)}.json`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Product lookup failed with ${response.status}`);

  const result = await response.json();
  if (result.status !== 1 || !result.product) return null;

  const product = result.product;
  const ingredients = product.ingredients_text || '';
  const labels = (product.labels_tags || []).join(' ');
  const animalTestingStatus = /cruelty-free|cruelty free|not tested on animals/i.test(labels) ? 'Cruelty-free claim listed' : 'Animal-testing information not listed';
  const matchedTriggers = findTriggerMatches(ingredients, selectedSensitivities);
  const signals = concernSignals.filter(({ pattern }) => pattern.test(ingredients));
  const score = Math.max(0, Math.min(100, 88 - matchedTriggers.length * 16 - signals.length * 5));

  return {
    name: product.product_name || 'Unknown toiletry',
    brand: product.brands || 'Unknown brand',
    category: product.categories || 'Personal care',
    score,
    verdict: matchedTriggers.length ? 'REVIEW INGREDIENTS' : score >= 70 ? 'LOWER CONCERN' : 'CHECK INGREDIENTS',
    reasons: matchedTriggers.length ? matchedTriggers.map(({ label }) => `${label} signal found`) : ['No selected trigger signals found'],
    matchedTriggers,
    details: { ingredientLength: ingredients.length, signalCount: signals.length },
    ingredientCount: ingredients ? ingredients.split(/[,;]/).filter(Boolean).length : 0,
    barcode: normalizedBarcode,
    sourceName: 'Open Beauty Facts',
    sourceUrl: product.url || `https://world.openbeautyfacts.org/product/${normalizedBarcode}`,
    communityNote: product.generic_name || product.categories || 'No community note was provided.',
    animalTestingStatus,
  };
}
