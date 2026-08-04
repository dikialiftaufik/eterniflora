import { FlowerType, PetalColor, LeafAccent, WrappingStyle, RibbonColor } from '@/store/useEcoStore';
import { images } from '@/constants/images';

export interface FlowerOption {
  id: FlowerType;
  name: string;
  subtitle: string;
  imageSource?: any;
  imageUrl?: string;
}

export const flowerOptions: FlowerOption[] = [
  { id: 'roses', name: 'Roses', subtitle: 'Klasik & Romantik', imageSource: images.displayRoses },
  { id: 'lilies', name: 'Lilies', subtitle: 'Kemurnian & Damai', imageSource: images.displayLilies },
  { id: 'wildflowers', name: 'Wildflowers', subtitle: 'Bebas & Organik', imageSource: images.displayWildflowers },
  { id: 'sunflowers', name: 'Sunflowers', subtitle: 'Keceriaan & Vitalitas', imageSource: images.displaySunflowers },
];

export interface ColorOption {
  id: PetalColor;
  name: string;
  subtitle: string;
  hexCode: string;
}

export const colorOptions: ColorOption[] = [
  { id: 'ethereal-purple', name: 'Ethereal Purple', subtitle: 'Menenangkan & penuh intuisi', hexCode: '#A78BFA' },
  { id: 'rose-pink', name: 'Soft Rose Pink', subtitle: 'Hangat, lembut & penuh kasih', hexCode: '#F472B6' },
  { id: 'amber', name: 'Sunset Glow Amber', subtitle: 'Semangat & penuh vitalitas', hexCode: '#FCD34D' },
  { id: 'white', name: 'Crystalline White', subtitle: 'Bersih, damai & murni', hexCode: '#F8FAFC' },
];

export interface LeafOption {
  id: LeafAccent;
  name: string;
  subtitle: string;
  imageSource?: any;
  imageUrl?: string;
}

export const leafOptions: LeafOption[] = [
  { id: 'eucalyptus', name: 'Eucalyptus Leaf', subtitle: 'Memberi efek rindang', imageSource: images.displayEucalyptus },
  { id: 'silver-dollar', name: 'Silver Dollar Leaf', subtitle: 'Nuansa eksotis & elegan', imageSource: images.displaySilver },
  { id: 'pine-fern', name: 'Pine & Fern Accents', subtitle: 'Kesan hutan alami', imageSource: images.displayFern },
];

export interface WrapperOption {
  id: WrappingStyle;
  name: string;
  subtitle: string;
  imageUrl: string;
}

export const wrapperOptions: WrapperOption[] = [
  { id: 'goni-lavender', name: 'Kain Goni Premium', subtitle: '& Kertas Lavender', imageUrl: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=200&auto=format&fit=crop' },
  { id: 'craft-coklat', name: 'Kertas Craft Coklat', subtitle: 'Klasik (Retro)', imageUrl: 'https://images.unsplash.com/photo-1606780074211-125027bfeb59?q=80&w=200&auto=format&fit=crop' },
  { id: 'putih-salju', name: 'Pembungkus Transparan', subtitle: 'Putih Salju', imageUrl: 'https://images.unsplash.com/photo-1520121401995-928dc50d4e27?q=80&w=200&auto=format&fit=crop' },
];

export interface RibbonOption {
  id: RibbonColor;
  name: string;
  subtitle: string;
  hexCode: string;
}

export const ribbonOptions: RibbonOption[] = [
  { id: 'ungu-royal', name: 'Pita Satin', subtitle: 'Ungu Royal', hexCode: '#5B21B6' },
  { id: 'hijau-sage', name: 'Pita Beludru', subtitle: 'Hijau Sage', hexCode: '#A3B18A' },
  { id: 'emas-champagne', name: 'Pita Sutera', subtitle: 'Emas Champagne', hexCode: '#F4E285' },
];

// Helper to get preview image based on flower + color
export const getPreviewImageUrl = (flower: FlowerType, color: PetalColor): string => {
  // Map combinations to specific high-quality unsplash bouquet photos
  const base = 'https://images.unsplash.com/';
  
  if (flower === 'roses') {
    if (color === 'rose-pink') return base + 'photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop';
    if (color === 'white') return base + 'photo-1525381850785-3df8d3615174?q=80&w=800&auto=format&fit=crop';
    if (color === 'amber') return base + 'photo-1549487968-3e5e67edb7de?q=80&w=800&auto=format&fit=crop';
    return base + 'photo-1548842104-58a6a575c44c?q=80&w=800&auto=format&fit=crop'; // ethereal-purple/default
  }
  
  if (flower === 'sunflowers') {
    return base + 'photo-1563241527-300ecb1086da?q=80&w=800&auto=format&fit=crop'; // Sunflowers typically yellow
  }

  if (flower === 'lilies') {
    if (color === 'white') return base + 'photo-1555519890-7818e6c7d2c3?q=80&w=800&auto=format&fit=crop';
    return base + 'photo-1563241527-02422a845cf1?q=80&w=800&auto=format&fit=crop';
  }

  // Fallbacks for wildflowers or anything else
  return base + 'photo-1563241527-02422a845cf1?q=80&w=800&auto=format&fit=crop';
};
