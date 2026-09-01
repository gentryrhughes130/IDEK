export const sensitivityOptions = [
  { id: 'gluten', label: 'Gluten / wheat', patterns: [/gluten|wheat|barley|rye|malt/i] },
  { id: 'dairy', label: 'Milk / lactose', patterns: [/milk|lactose|whey|casein|butter|cream|cheese/i] },
  { id: 'soy', label: 'Soy', patterns: [/soy|soya|tofu|lecithin/i] },
  { id: 'egg', label: 'Egg', patterns: [/egg|albumin/i] },
  { id: 'peanut', label: 'Peanuts', patterns: [/peanut/i] },
  { id: 'treeNuts', label: 'Tree nuts', patterns: [/almond|cashew|walnut|hazelnut|pistachio|pecan|macadamia/i] },
  { id: 'sesame', label: 'Sesame', patterns: [/sesame|tahini/i] },
  { id: 'fishShellfish', label: 'Fish / shellfish', patterns: [/fish|salmon|tuna|shrimp|crab|lobster|shellfish/i] },
  { id: 'sulfites', label: 'Sulfites', patterns: [/sulfite|sulphite|sulfur dioxide/i] },
  { id: 'fragrance', label: 'Fragrance', patterns: [/parfum|fragrance|perfume/i] },
  { id: 'essentialOils', label: 'Essential oils', patterns: [/essential oil|tea tree|peppermint|lavender oil/i] },
  { id: 'alcohol', label: 'Drying alcohols', patterns: [/alcohol denat|sd alcohol|ethanol/i] },
  { id: 'dyes', label: 'Dyes / colorants', patterns: [/colorant|colourant|\bci\s?\d{3,5}\b|dye/i] },
];

export const defaultSensitivities = sensitivityOptions.map(({ id }) => id);

export function findTriggerMatches(text = '', selectedIds = defaultSensitivities) {
  return sensitivityOptions
    .filter(({ id }) => selectedIds.includes(id))
    .filter(({ patterns }) => patterns.some((pattern) => pattern.test(text)))
    .map(({ id, label }) => ({ id, label }));
}
