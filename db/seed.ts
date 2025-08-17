import { ingredients } from './schema/skincare';
import { db } from './';

const skincareIngredients = [
  {
    name: 'Retinol',
    scientificName: 'Vitamin A',
    category: 'active',
    description: 'Gold standard anti-aging ingredient that promotes cell turnover',
    benefits: ['anti-aging', 'acne treatment', 'skin texture improvement'],
    sideEffects: ['irritation', 'dryness', 'sun sensitivity'],
    // contraindications: ['vitamin c', 'aha', 'bha'],
    safetyRating: 4
  },
  {
    name: 'Vitamin C',
    scientificName: 'Ascorbic Acid',
    category: 'active',
    description: 'Powerful antioxidant that brightens skin and protects from free radicals',
    benefits: ['brightening', 'antioxidant protection', 'collagen production'],
    sideEffects: ['irritation', 'staining'],
    // contraindications: ['retinol', 'niacinamide'],
    safetyRating: 5
  },
  {
    name: 'Niacinamide',
    scientificName: 'Vitamin B3',
    category: 'active',
    description: 'Multi-tasking ingredient that regulates oil production and improves texture',
    benefits: ['oil control', 'pore refinement', 'even skin tone'],
    sideEffects: ['mild irritation'],
    // contraindications: ['vitamin c'],
    safetyRating: 5
  },
  {
    name: 'Salicylic Acid',
    scientificName: 'Beta Hydroxy Acid',
    category: 'active',
    description: 'Oil-soluble exfoliant that penetrates pores to treat acne',
    benefits: ['acne treatment', 'pore cleansing', 'exfoliation'],
    sideEffects: ['dryness', 'irritation'],
    // contraindications: ['retinol', 'aha'],
    safetyRating: 4
  },
  {
    name: 'Glycolic Acid',
    scientificName: 'Alpha Hydroxy Acid',
    category: 'active',
    description: 'Water-soluble exfoliant that removes dead skin cells',
    benefits: ['exfoliation', 'texture improvement', 'brightening'],
    sideEffects: ['irritation', 'sun sensitivity'],
    // contraindications: ['retinol', 'bha'],
    safetyRating: 4
  },
  {
    name: 'Hyaluronic Acid',
    scientificName: 'Hyaluronan',
    category: 'hydrating',
    description: 'Humectant that attracts and retains moisture in the skin',
    benefits: ['hydration', 'plumping', 'moisture retention'],
    sideEffects: ['none'],
    // contraindications: [],
    safetyRating: 5
  },
  {
    name: 'Ceramides',
    scientificName: 'Ceramide',
    category: 'barrier',
    description: 'Lipids that strengthen the skin barrier and lock in moisture',
    benefits: ['barrier repair', 'moisture retention', 'skin protection'],
    sideEffects: ['none'],
    // contraindications: [],
    safetyRating: 5
  },
  {
    name: 'Peptides',
    scientificName: 'Amino Acid Chains',
    category: 'active',
    description: 'Building blocks that signal skin to produce collagen and elastin',
    benefits: ['anti-aging', 'collagen production', 'skin firming'],
    sideEffects: ['none'],
    // contraindications: [],
    safetyRating: 5
  },
  {
    name: 'Zinc Oxide',
    scientificName: 'ZnO',
    category: 'sunscreen',
    description: 'Physical sunscreen ingredient that provides broad-spectrum protection',
    benefits: ['sun protection', 'anti-inflammatory', 'gentle'],
    sideEffects: ['white cast'],
    // contraindications: [],
    safetyRating: 5
  },
  {
    name: 'Centella Asiatica',
    scientificName: 'Gotu Kola',
    category: 'soothing',
    description: 'Herbal extract that soothes and promotes skin healing',
    benefits: ['soothing', 'healing', 'anti-inflammatory'],
    sideEffects: ['none'],
    // contraindications: [],
    safetyRating: 5
  }
];

export async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Insert ingredients
    console.log('Inserting ingredients...');
    const insertedIngredients = await db.insert(ingredients).values(skincareIngredients).returning();
    console.log(`✅ Inserted ${insertedIngredients.length} ingredients`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
