import { create } from 'zustand';

export type FlowerType = 'roses' | 'lilies' | 'wildflowers' | 'sunflowers' | '';
export type PetalColor = 'ethereal-purple' | 'rose-pink' | 'amber' | 'white' | '';
export type LeafAccent = 'eucalyptus' | 'pine-fern' | 'silver-dollar' | '';
export type WrappingStyle = 'goni-lavender' | 'craft-coklat' | 'putih-salju' | '';
export type RibbonColor = 'ungu-royal' | 'hijau-sage' | 'emas-champagne' | '';

export interface BouquetConfig {
  flowerType: FlowerType;
  petalColor: PetalColor;
  leafAccent: LeafAccent;
  wrappingStyle: WrappingStyle;
  ribbonColor: RibbonColor;
}

interface EcoStoreState {
  balance: number;
  totalBottles: number;
  addDeposit: (bottles: number, points: number) => void;
  reset: () => void;
  
  // Bouquet Studio State
  bouquetConfig: BouquetConfig;
  setBouquetConfig: (config: Partial<BouquetConfig>) => void;
  resetBouquetConfig: () => void;
}

const initialBouquetConfig: BouquetConfig = {
  flowerType: 'roses', // Set a default so preview looks good immediately
  petalColor: 'ethereal-purple',
  leafAccent: 'eucalyptus',
  wrappingStyle: 'craft-coklat', // default
  ribbonColor: 'ungu-royal', // default
};

export const useEcoStore = create<EcoStoreState>((set) => ({
  balance: 0, // Starts at 0 as requested
  totalBottles: 0,
  addDeposit: (bottles, points) =>
    set((state) => ({
      balance: state.balance + points,
      totalBottles: state.totalBottles + bottles,
    })),
  reset: () => set({ balance: 0, totalBottles: 0 }),
  
  bouquetConfig: initialBouquetConfig,
  setBouquetConfig: (config) => 
    set((state) => ({
      bouquetConfig: { ...state.bouquetConfig, ...config }
    })),
  resetBouquetConfig: () => set({ bouquetConfig: initialBouquetConfig }),
}));
