import { images } from '@/constants/images';

export type EcoEvent = {
  id: string;
  title: string;
  description: string;
  category: string;
  rewardPoints: number;
  dateStr: string;
  day: string;
  month: string;
  time: string;
  location: string;
  fullAddress: string;
  attendeesCount: number;
  quotaMax: number;
  imageUrl?: string;
  imageSource?: any;
  isFeatured: boolean;
};

export const ecoEvents: EcoEvent[] = [
  {
    id: "1",
    title: "River Cleanup Cikapundung",
    description: "Aksi kolaboratif mengangkat sampah limbah plastik sekali pakai (PET/PP) di sepanjang bantaran Sungai Cikapundung untuk disuplai kembali ke ekosistem daur ulang.",
    category: "Air Bersih",
    rewardPoints: 150,
    dateStr: "12 Agustus 2026",
    day: "12",
    month: "AGS",
    time: "08:00 - 12:00 WIB",
    location: "1.2 km",
    fullAddress: "Bantaran Sungai Cikapundung, Jl. Ir. H. Juanda, Coblong, Bandung",
    attendeesCount: 47,
    quotaMax: 50,
    imageSource: images.riverCleanup,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Bibit Mangrove Pesisir",
    description: "Penanaman 1000 bibit mangrove untuk mencegah abrasi pesisir utara dan memulihkan ekosistem karbon biru.",
    category: "Pesisir Lestari",
    rewardPoints: 300,
    dateStr: "15 Agustus 2026",
    day: "15",
    month: "AGS",
    time: "07:30 - 11:30 WIB",
    location: "4.5 km",
    fullAddress: "Kawasan Konservasi Hutan Bakau, Muara Gembong",
    attendeesCount: 95,
    quotaMax: 100,
    imageSource: images.mangrovePesisir,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Penanaman Pohon Kota",
    description: "Menanam bibit pohon keras penahan erosi di lereng Babakan Siliwangi.",
    category: "Paru Kota",
    rewardPoints: 200,
    dateStr: "19 September 2026",
    day: "19",
    month: "SEP",
    time: "09:00 - 11:00 WIB",
    location: "3.0 km",
    fullAddress: "Hutan Kota Babakan Siliwangi, Lebak Siliwangi, Bandung",
    attendeesCount: 25,
    quotaMax: 35,
    imageSource: images.penanamanPohon,
    isFeatured: false,
  },
  {
    id: "4",
    title: "Edukasi Upcycling",
    description: "Workshop mengolah botol PET menjadi pot hidroponik pintar.",
    category: "Edukasi",
    rewardPoints: 100,
    dateStr: "23 Oktober 2026",
    day: "23",
    month: "OKT",
    time: "14:00 - 16:00 WIB",
    location: "2.1 km",
    fullAddress: "EterniFlora Studio Workspace, Braga, Bandung",
    attendeesCount: 15,
    quotaMax: 20,
    imageSource: images.edukasiUpcycling,
    isFeatured: false,
  }
];
