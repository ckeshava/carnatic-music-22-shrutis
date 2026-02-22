import { describe, it, expect } from '@jest/globals';
import {
  twentyTwoShrutis,
  raagaExamples,
  calculateFrequency,
  getStringPosition,
} from './shrutiData';

describe('Shruti Data Integrity', () => {
  it('has exactly 22 shrutis', () => {
    expect(twentyTwoShrutis).toHaveLength(22);
  });

  it('has shruti numbers 1–22 with no gaps or duplicates', () => {
    const numbers = twentyTwoShrutis.map(s => s.shruti);
    const expected = Array.from({ length: 22 }, (_, i) => i + 1);
    expect(numbers).toEqual(expected);
  });

  it('has exactly 12 entries with is12Note: true', () => {
    const twelve = twentyTwoShrutis.filter(s => s.is12Note);
    expect(twelve).toHaveLength(12);
  });

  it('has all 7 families (S, R, G, M, P, D, N) represented', () => {
    const families = new Set(twentyTwoShrutis.map(s => s.family));
    expect(families).toEqual(new Set(['S', 'R', 'G', 'M', 'P', 'D', 'N']));
  });

  it('has monotonically ascending ratios', () => {
    for (let i = 1; i < twentyTwoShrutis.length; i++) {
      const prev = twentyTwoShrutis[i - 1].ratio;
      const curr = twentyTwoShrutis[i].ratio;
      expect(curr[0] / curr[1]).toBeGreaterThan(prev[0] / prev[1]);
    }
  });

  it('has monotonically ascending cents (0–1200)', () => {
    expect(twentyTwoShrutis[0].cents).toBe(0);
    for (let i = 1; i < twentyTwoShrutis.length; i++) {
      expect(twentyTwoShrutis[i].cents).toBeGreaterThan(twentyTwoShrutis[i - 1].cents);
    }
    expect(twentyTwoShrutis[twentyTwoShrutis.length - 1].cents).toBeLessThanOrEqual(1200);
  });

  it('every entry has all required fields', () => {
    for (const s of twentyTwoShrutis) {
      expect(s.shruti).toBeDefined();
      expect(s.name).toBeDefined();
      expect(s).toHaveProperty('traditionalName');
      expect(s.ratio).toBeDefined();
      expect(s.ratio).toHaveLength(2);
      expect(s.cents).toBeDefined();
      expect(s.family).toBeDefined();
      expect(typeof s.is12Note).toBe('boolean');
      expect(s.description).toBeDefined();
    }
  });

  it('no ratio has denominator === 0', () => {
    for (const s of twentyTwoShrutis) {
      expect(s.ratio[1]).not.toBe(0);
    }
  });
});

describe('Musical Invariants', () => {
  it('Shadjam (#1): ratio [1,1], cents 0', () => {
    const shadjam = twentyTwoShrutis.find(s => s.shruti === 1)!;
    expect(shadjam.ratio).toEqual([1, 1]);
    expect(shadjam.cents).toBe(0);
  });

  it('Panchamam (#14): ratio [3,2], cents 702', () => {
    const panchamam = twentyTwoShrutis.find(s => s.shruti === 14)!;
    expect(panchamam.ratio).toEqual([3, 2]);
    expect(panchamam.cents).toBe(702);
  });

  it('S and P are both is12Note: true', () => {
    const shadjam = twentyTwoShrutis.find(s => s.shruti === 1)!;
    const panchamam = twentyTwoShrutis.find(s => s.shruti === 14)!;
    expect(shadjam.is12Note).toBe(true);
    expect(panchamam.is12Note).toBe(true);
  });

  it('dual-name positions exist at shrutis #5, #7, #18, #20', () => {
    for (const num of [5, 7, 18, 20]) {
      const s = twentyTwoShrutis.find(s => s.shruti === num)!;
      const hasDualName = s.name.includes('/') || (s.traditionalName?.includes('/') ?? false);
      expect(hasDualName).toBe(true);
    }
  });
});

describe('calculateFrequency', () => {
  it('(261.63, [1,1]) → 261.63', () => {
    expect(calculateFrequency(261.63, [1, 1])).toBeCloseTo(261.63);
  });

  it('(261.63, [3,2]) → 392.445', () => {
    expect(calculateFrequency(261.63, [3, 2])).toBeCloseTo(392.445);
  });

  it('(261.63, [2,1]) → 523.26', () => {
    expect(calculateFrequency(261.63, [2, 1])).toBeCloseTo(523.26);
  });
});

describe('getStringPosition', () => {
  it('([1,1]) → "100.00"', () => {
    expect(getStringPosition([1, 1])).toBe('100.00');
  });

  it('([3,2]) → "66.67"', () => {
    expect(getStringPosition([3, 2])).toBe('66.67');
  });

  it('([2,1]) → "50.00"', () => {
    expect(getStringPosition([2, 1])).toBe('50.00');
  });
});

describe('Raaga Examples Data', () => {
  const expectedSymbols = ['S', 'R₁', 'R₂/G₁', 'R₃/G₂', 'G₃', 'M₁', 'M₂', 'P', 'D₁', 'D₂/N₁', 'D₃/N₂', 'N₃'];

  it('all 12 swara symbols have entries', () => {
    for (const sym of expectedSymbols) {
      expect(raagaExamples).toHaveProperty(sym);
    }
    expect(Object.keys(raagaExamples)).toHaveLength(12);
  });

  it('every raga has name, scale, description', () => {
    for (const [, entry] of Object.entries(raagaExamples)) {
      for (const raga of entry.ragas) {
        expect(raga.name).toBeDefined();
        expect(raga.scale).toBeDefined();
        expect(raga.description).toBeDefined();
      }
    }
  });

  it('all scales start with S', () => {
    for (const [, entry] of Object.entries(raagaExamples)) {
      for (const raga of entry.ragas) {
        expect(raga.scale).toMatch(/^S/);
      }
    }
  });

  it('dual-name positions have noteUsedAs on each raga', () => {
    const dualNameKeys = ['R₂/G₁', 'R₃/G₂', 'D₂/N₁', 'D₃/N₂'];
    for (const key of dualNameKeys) {
      const entry = raagaExamples[key];
      for (const raga of entry.ragas) {
        expect(raga.noteUsedAs).toBeDefined();
      }
    }
  });
});
