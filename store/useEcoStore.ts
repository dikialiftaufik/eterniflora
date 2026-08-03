import { create } from 'zustand';

interface EcoStoreState {
  balance: number;
  totalBottles: number;
  addDeposit: (bottles: number, points: number) => void;
  reset: () => void;
}

export const useEcoStore = create<EcoStoreState>((set) => ({
  balance: 0, // Starts at 0 as requested
  totalBottles: 0,
  addDeposit: (bottles, points) =>
    set((state) => ({
      balance: state.balance + points,
      totalBottles: state.totalBottles + bottles,
    })),
  reset: () => set({ balance: 0, totalBottles: 0 }),
}));
