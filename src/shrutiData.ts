export interface Shruti {
  shruti: number;
  name: string;
  traditionalName: string | null;
  ratio: [number, number];
  cents: number;
  family: string;
  is12Note: boolean;
  description: string;
}

export interface Raga {
  name: string;
  melakarta?: number;
  janya?: boolean;
  scale: string;
  noteUsedAs?: string;
  description: string;
}

export interface RaagaEntry {
  description: string;
  ragas: Raga[];
}

// Using his nomenclature: Eka-shruti, Dvi-shruti, Tri-shruti, Chatushruti, Pancha-shruti, Shat-shruti
export const twentyTwoShrutis: Shruti[] = [
  // Shruti 1: Shadjam
  {
    shruti: 1,
    name: 'Shadjam',
    traditionalName: 'Shadjam (S)',
    ratio: [1, 1],
    cents: 0,
    family: 'S',
    is12Note: true,
    description: 'The tonic, fundamental note. Prakruti swara (unchanging).'
  },

  // Shrutis 2-5: Rishabham region
  {
    shruti: 2,
    name: 'Eka-shruti Rishabham',
    traditionalName: 'Shuddha Rishabham (R₁)',
    ratio: [256, 243],
    cents: 90,
    family: 'R',
    is12Note: true,
    description: 'Pythagorean minor second. First of the Rishabham variants.'
  },
  {
    shruti: 3,
    name: 'Dvi-shruti Rishabham',
    traditionalName: null,
    ratio: [16, 15],
    cents: 112,
    family: 'R',
    is12Note: false,
    description: 'Just minor second. Microtonal variant between R₁ and R₂.'
  },
  {
    shruti: 4,
    name: 'Tri-shruti Rishabham / Eka-shruti Gandharam',
    traditionalName: 'Chatushruti Rishabham (R₂)',
    ratio: [10, 9],
    cents: 182,
    family: 'R',
    is12Note: false,
    description: 'Minor whole tone. Microtonal variant approaching R₂.'
  },
  {
    shruti: 5,
    name: 'Chatushruti Rishabham / Dwi-shruti Gandharam',
    traditionalName: 'Chatushruti Rishabham (R₂) / Shuddha Gandharam (G₁)',
    ratio: [9, 8],
    cents: 204,
    family: 'R',
    is12Note: true,
    description: 'Major second. This position has two names depending on raga context.'
  },

  // Shrutis 6-9: Gandharam region
  {
    shruti: 6,
    name: 'Pancha-shruti Rishabham / Tri-shruti Gandharam',
    traditionalName: null,
    ratio: [32, 27],
    cents: 294,
    family: 'G',
    is12Note: false,
    description: 'Pythagorean minor third. Microtonal variant in Gandharam region.'
  },
  {
    shruti: 7,
    name: 'Shat-shruti Rishabham / Chatu-shruti Gandharam',
    traditionalName: 'Shatshruti Rishabham (R₃) / Sadharana Gandharam (G₂)',
    ratio: [6, 5],
    cents: 316,
    family: 'G',
    is12Note: true,
    description: 'Just minor third. This position has two names depending on raga context.'
  },
  {
    shruti: 8,
    name: 'Pancha-shruti Gandharam',
    traditionalName: 'Antara Gandharam (G₃)',
    ratio: [5, 4],
    cents: 386,
    family: 'G',
    is12Note: false,
    description: 'Just major third. Microtonal variant approaching Antara Gandharam.'
  },
  {
    shruti: 9,
    name: 'Shat-shruti Gandharam',
    traditionalName: 'Antara Gandharam (G₃)',
    ratio: [81, 64],
    cents: 408,
    family: 'G',
    is12Note: true,
    description: 'Pythagorean major third. The highest Gandharam position.'
  },

  // Shrutis 10-13: Madhyamam region
  {
    shruti: 10,
    name: 'Eka-shruti Madhyamam / Shuddha Madhyamam',
    traditionalName: 'Shuddha Madhyamam (M₁)',
    ratio: [4, 3],
    cents: 498,
    family: 'M',
    is12Note: true,
    description: 'Perfect fourth. The natural Madhyamam position.'
  },
  {
    shruti: 11,
    name: 'Dwi-shruti Madhyamam / Shuddha Madhyamam (Tivra)',
    traditionalName: 'Shuddha Madhyamam (M₁)',
    ratio: [27, 20],
    cents: 520,
    family: 'M',
    is12Note: false,
    description: 'Acute fourth. Microtonal variant between M₁ and M₂.'
  },
  {
    shruti: 12,
    name: 'Tri-shruti Madhyamam / Prati Madhyamam',
    traditionalName: 'Prati Madhyamam (M₂)',
    ratio: [45, 32],
    cents: 590,
    family: 'M',
    is12Note: true,
    description: 'Augmented fourth (tritone). First Prati Madhyamam position.'
  },
  {
    shruti: 13,
    name: 'Chatu-shruti Madhyamam',
    traditionalName: 'Prati Madhyamam (M₂)',
    ratio: [729, 512],
    cents: 612,
    family: 'M',
    is12Note: false,
    description: 'Pythagorean tritone. Higher variant of Prati Madhyamam.'
  },

  // Shruti 14: Panchamam
  {
    shruti: 14,
    name: 'Panchamam',
    traditionalName: 'Panchamam (P)',
    ratio: [3, 2],
    cents: 702,
    family: 'P',
    is12Note: true,
    description: 'Perfect fifth. Prakruti swara (unchanging), like Shadjam.'
  },

  // Shrutis 15-18: Dhaivatam region
  {
    shruti: 15,
    name: 'Eka-shruti Dhaivatam',
    traditionalName: 'Shuddha Dhaivatam (D₁)',
    ratio: [128, 81],
    cents: 792,
    family: 'D',
    is12Note: true,
    description: 'Pythagorean minor sixth. First of the Dhaivatam variants.'
  },
  {
    shruti: 16,
    name: 'Dvi-shruti Dhaivatam',
    traditionalName: 'Shuddha Dhaivatam (D₁)',
    ratio: [8, 5],
    cents: 814,
    family: 'D',
    is12Note: false,
    description: 'Just minor sixth. Microtonal variant between D₁ and D₂.'
  },
  {
    shruti: 17,
    name: 'Eka-shruti Nishadam / Tri-shruti Dhaivatam',
    traditionalName: 'Chatushruti Dhaivatam (D₂) / Shuddha Nishadam (N₁)',
    ratio: [5, 3],
    cents: 884,
    family: 'D',
    is12Note: false,
    description: 'Just major sixth. Microtonal variant approaching D₂.'
  },
  {
    shruti: 18,
    name: 'Dwi-shruti Nishadam / Chatushruti Dhaivatam',
    traditionalName: 'Chatushruti Dhaivatam (D₂) / Shuddha Nishadam (N₁)',
    ratio: [27, 16],
    cents: 906,
    family: 'D',
    is12Note: true,
    description: 'Pythagorean major sixth. This position has two names depending on raga context.'
  },

  // Shrutis 19-22: Nishadam region
  {
    shruti: 19,
    name: 'Tri-shruti Nishadam / Pancha-shruti Dhaivatam',
    traditionalName: 'Shatshruti Dhaivatam (D₃) / Kaisiki Nishadam (N₂)',
    ratio: [16, 9],
    cents: 996,
    family: 'N',
    is12Note: false,
    description: 'Pythagorean minor seventh. Microtonal variant in Nishadam region.'
  },
  {
    shruti: 20,
    name: 'Shat-shruti Dhaivatam',
    traditionalName: 'Shatshruti Dhaivatam (D₃) / Kaisiki Nishadam (N₂)',
    ratio: [9, 5],
    cents: 1018,
    family: 'N',
    is12Note: true,
    description: 'Just minor seventh. This position has two names depending on raga context.'
  },
  {
    shruti: 21,
    name: 'Pancha-shruti Nishadam / Kaisiki Nishadam',
    traditionalName: 'Kaisiki Nishadam',
    ratio: [15, 8],
    cents: 1088,
    family: 'N',
    is12Note: false,
    description: 'Just major seventh. Microtonal variant approaching Kakali Nishadam.'
  },
  {
    shruti: 22,
    name: 'Shat-shruti Nishadam / Kakali Nishadam',
    traditionalName: 'Kakali Nishadam (N₃)',
    ratio: [243, 128],
    cents: 1110,
    family: 'N',
    is12Note: true,
    description: 'Pythagorean major seventh. The highest Nishadam position.'
  },
];

export const raagaExamples: Record<string, RaagaEntry> = {
  'S': {
    description: 'Shadjam is the tonic note, present in every raga as the fundamental reference pitch (adhara shadja).',
    ragas: []
  },
  'R₁': {
    description: 'Shuddha Rishabham appears in many important ragas, especially in the Todi and Mayamalavagowla families.',
    ragas: [
      { name: 'Mayamalavagowla', melakarta: 15, scale: 'S R₁ G₃ M₁ P D₁ N₃', description: 'The foundational raga for beginners in Carnatic music' },
      { name: 'Hanumatodi', melakarta: 8, scale: 'S R₁ G₂ M₁ P D₁ N₂', description: 'One of the most majestic and expressive ragas' },
      { name: 'Subhapantuvarali', melakarta: 45, scale: 'S R₁ G₂ M₂ P D₁ N₃', description: 'A profound and meditative raga' },
    ]
  },
  'R₂/G₁': {
    description: 'Called R₂ (Chatushruti Rishabham) when R₁ is absent, and G₁ (Shuddha Gandharam) when R₁ is already present in the raga.',
    ragas: [
      { name: 'Shankarabharanam', melakarta: 29, scale: 'S R₂ G₃ M₁ P D₂ N₃', noteUsedAs: 'R₂', description: 'The Carnatic equivalent of the Western major scale' },
      { name: 'Kharaharapriya', melakarta: 22, scale: 'S R₂ G₂ M₁ P D₂ N₂', noteUsedAs: 'R₂', description: 'One of the most versatile melakartas' },
      { name: 'Kalyani', melakarta: 65, scale: 'S R₂ G₃ M₂ P D₂ N₃', noteUsedAs: 'R₂', description: 'Known for its grandeur and auspiciousness' },
    ]
  },
  'R₃/G₂': {
    description: 'Called R₃ (Shatshruti Rishabham) or G₂ (Sadharana Gandharam) depending on the raga context.',
    ragas: [
      { name: 'Hanumatodi', melakarta: 8, scale: 'S R₁ G₂ M₁ P D₁ N₂', noteUsedAs: 'G₂', description: 'Uses this position as Sadharana Gandharam' },
      { name: 'Kharaharapriya', melakarta: 22, scale: 'S R₂ G₂ M₁ P D₂ N₂', noteUsedAs: 'G₂', description: 'G₂ gives this raga its characteristic emotion' },
      { name: 'Natabhairavi', melakarta: 20, scale: 'S R₂ G₂ M₁ P D₁ N₂', noteUsedAs: 'G₂', description: 'A serene and contemplative raga' },
    ]
  },
  'G₃': {
    description: 'Antara Gandharam features prominently in bright, majestic ragas.',
    ragas: [
      { name: 'Shankarabharanam', melakarta: 29, scale: 'S R₂ G₃ M₁ P D₂ N₃', description: 'G₃ gives it the brilliant major-scale character' },
      { name: 'Kalyani', melakarta: 65, scale: 'S R₂ G₃ M₂ P D₂ N₃', description: 'G₃ contributes to Kalyani\'s characteristic brightness' },
      { name: 'Mayamalavagowla', melakarta: 15, scale: 'S R₁ G₃ M₁ P D₁ N₃', description: 'The first raga taught to students' },
      { name: 'Hamsadhwani', janya: true, scale: 'S R₂ G₃ P N₃', description: 'A beloved pentatonic raga' },
    ]
  },
  'M₁': {
    description: 'Shuddha Madhyamam (perfect fourth) appears in all Shuddha Madhyama melakartas (1\u201336).',
    ragas: [
      { name: 'Shankarabharanam', melakarta: 29, scale: 'S R₂ G₃ M₁ P D₂ N₃', description: 'The natural fourth adds stability and groundedness' },
      { name: 'Kharaharapriya', melakarta: 22, scale: 'S R₂ G₂ M₁ P D₂ N₂', description: 'M₁ provides the emotional anchor' },
      { name: 'Hanumatodi', melakarta: 8, scale: 'S R₁ G₂ M₁ P D₁ N₂', description: 'M₁ in Todi is deeply expressive' },
      { name: 'Mayamalavagowla', melakarta: 15, scale: 'S R₁ G₃ M₁ P D₁ N₃', description: 'The natural Madhyamam in the beginner\'s raga' },
    ]
  },
  'M₂': {
    description: 'Prati Madhyamam (augmented fourth) appears in all Prati Madhyama melakartas (37\u201372).',
    ragas: [
      { name: 'Kalyani', melakarta: 65, scale: 'S R₂ G₃ M₂ P D₂ N₃', description: 'M₂ is the defining characteristic of Kalyani' },
      { name: 'Vachaspati', melakarta: 64, scale: 'S R₂ G₃ M₂ P D₂ N₂', description: 'A bright and versatile raga' },
      { name: 'Simhendramadhyamam', melakarta: 57, scale: 'S R₂ G₃ M₂ P D₁ N₂', description: 'A unique and evocative raga' },
      { name: 'Subhapantuvarali', melakarta: 45, scale: 'S R₁ G₂ M₂ P D₁ N₃', description: 'M₂ adds intensity to this profound raga' },
    ]
  },
  'P': {
    description: 'Panchamam is a prakruti (unchanging) swara like Shadjam, present in most ragas. A few rare ragas like Shri omit it.',
    ragas: []
  },
  'D₁': {
    description: 'Shuddha Dhaivatam often imparts a devotional or introspective mood to ragas.',
    ragas: [
      { name: 'Mayamalavagowla', melakarta: 15, scale: 'S R₁ G₃ M₁ P D₁ N₃', description: 'D₁ contributes to its characteristic sound' },
      { name: 'Hanumatodi', melakarta: 8, scale: 'S R₁ G₂ M₁ P D₁ N₂', description: 'D₁ adds pathos to Todi' },
      { name: 'Natabhairavi', melakarta: 20, scale: 'S R₂ G₂ M₁ P D₁ N₂', description: 'D₁ gives Natabhairavi its serene quality' },
      { name: 'Simhendramadhyamam', melakarta: 57, scale: 'S R₂ G₃ M₂ P D₁ N₂', description: 'D₁ creates a unique tension in this raga' },
    ]
  },
  'D₂/N₁': {
    description: 'Called D₂ (Chatushruti Dhaivatam) when D₁ is absent, and N₁ (Shuddha Nishadam) when D₁ is already present in the raga.',
    ragas: [
      { name: 'Shankarabharanam', melakarta: 29, scale: 'S R₂ G₃ M₁ P D₂ N₃', noteUsedAs: 'D₂', description: 'Uses this as Chatushruti Dhaivatam' },
      { name: 'Kalyani', melakarta: 65, scale: 'S R₂ G₃ M₂ P D₂ N₃', noteUsedAs: 'D₂', description: 'D₂ enhances Kalyani\'s brilliance' },
      { name: 'Kharaharapriya', melakarta: 22, scale: 'S R₂ G₂ M₁ P D₂ N₂', noteUsedAs: 'D₂', description: 'A key note in this versatile raga' },
      { name: 'Harikambhoji', melakarta: 28, scale: 'S R₂ G₃ M₁ P D₂ N₂', noteUsedAs: 'D₂', description: 'Parent of many popular janya ragas like Mohanam and Kambhoji' },
    ]
  },
  'D₃/N₂': {
    description: 'Called D₃ (Shatshruti Dhaivatam) or N₂ (Kaisiki Nishadam) depending on the raga context.',
    ragas: [
      { name: 'Hanumatodi', melakarta: 8, scale: 'S R₁ G₂ M₁ P D₁ N₂', noteUsedAs: 'N₂', description: 'Kaisiki Nishadam gives Todi its poignant quality' },
      { name: 'Kharaharapriya', melakarta: 22, scale: 'S R₂ G₂ M₁ P D₂ N₂', noteUsedAs: 'N₂', description: 'N₂ adds depth to Kharaharapriya' },
      { name: 'Natabhairavi', melakarta: 20, scale: 'S R₂ G₂ M₁ P D₁ N₂', noteUsedAs: 'N₂', description: 'The gentle N₂ in this contemplative raga' },
      { name: 'Harikambhoji', melakarta: 28, scale: 'S R₂ G₃ M₁ P D₂ N₂', noteUsedAs: 'N₂', description: 'N₂ softens the brightness of Harikambhoji' },
    ]
  },
  'N₃': {
    description: 'Kakali Nishadam gives ragas a bright, uplifting character as the leading tone to upper Shadjam.',
    ragas: [
      { name: 'Shankarabharanam', melakarta: 29, scale: 'S R₂ G₃ M₁ P D₂ N₃', description: 'N₃ serves as the natural leading tone' },
      { name: 'Kalyani', melakarta: 65, scale: 'S R₂ G₃ M₂ P D₂ N₃', description: 'N₃ completes Kalyani\'s brilliance' },
      { name: 'Mayamalavagowla', melakarta: 15, scale: 'S R₁ G₃ M₁ P D₁ N₃', description: 'N₃ adds brightness to this foundational raga' },
      { name: 'Hamsadhwani', janya: true, scale: 'S R₂ G₃ P N₃', description: 'N₃ is essential to Hamsadhwani\'s joyful character' },
    ]
  },
};

export const familyColors: Record<string, string> = {
  'S': 'bg-red-100 border-red-400 hover:bg-red-200',
  'R': 'bg-orange-100 border-orange-400 hover:bg-orange-200',
  'G': 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200',
  'M': 'bg-green-100 border-green-400 hover:bg-green-200',
  'P': 'bg-teal-100 border-teal-400 hover:bg-teal-200',
  'D': 'bg-blue-100 border-blue-400 hover:bg-blue-200',
  'N': 'bg-purple-100 border-purple-400 hover:bg-purple-200',
};

export const familySelectedColors: Record<string, string> = {
  'S': 'bg-red-500 text-white',
  'R': 'bg-orange-500 text-white',
  'G': 'bg-yellow-600 text-white',
  'M': 'bg-green-500 text-white',
  'P': 'bg-teal-500 text-white',
  'D': 'bg-blue-500 text-white',
  'N': 'bg-purple-500 text-white',
};

export function calculateFrequency(baseFrequency: number, ratio: [number, number]): number {
  return baseFrequency * (ratio[0] / ratio[1]);
}

export function getStringPosition(ratio: [number, number]): string {
  return ((ratio[1] / ratio[0]) * 100).toFixed(2);
}
