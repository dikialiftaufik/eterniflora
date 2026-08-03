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
  attendeesCount: number;
  quotaMax: number;
  imageUrl: string;
  isFeatured: boolean;
};

export const ecoEvents: EcoEvent[] = [
  {
    id: "1",
    title: "River Cleanup Cikapundung",
    description: "Aksi kolaboratif mengangkat sampah limbah plastik sekali pakai (PET/PP) di sepanjang bantaran Sungai Cikapundung untuk disuplai kembali ke ekosistem daur ulang.",
    category: "Air Bersih",
    rewardPoints: 150,
    dateStr: "12 Juli 2026",
    day: "12",
    month: "JUL",
    time: "08:00 - 12:00 WIB",
    location: "1.2 km",
    attendeesCount: 42,
    quotaMax: 50,
    imageUrl: "https://picsum.photos/seed/river/600/400",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Bibit Mangrove Pesisir",
    description: "Penanaman 1000 bibit mangrove untuk mencegah abrasi pesisir utara dan memulihkan ekosistem karbon biru.",
    category: "Pesisir Lestari",
    rewardPoints: 300,
    dateStr: "15 Juli 2026",
    day: "15",
    month: "JUL",
    time: "07:30 - 11:30 WIB",
    location: "4.5 km",
    attendeesCount: 89,
    quotaMax: 100,
    imageUrl: "https://picsum.photos/seed/mangrove/600/400",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Penanaman Pohon Kota",
    description: "Menanam bibit pohon keras penahan erosi di lereng Babakan Siliwangi.",
    category: "Paru Kota",
    rewardPoints: 200,
    dateStr: "19 Juli 2026",
    day: "19",
    month: "JUL",
    time: "09:00 - 11:00 WIB",
    location: "3.0 km",
    attendeesCount: 25,
    quotaMax: 35,
    imageUrl: "https://picsum.photos/seed/tree/600/400",
    isFeatured: false,
  },
  {
    id: "4",
    title: "Edukasi Upcycling",
    description: "Workshop mengolah botol PET menjadi pot hidroponik pintar.",
    category: "Edukasi",
    rewardPoints: 100,
    dateStr: "23 Juli 2026",
    day: "23",
    month: "JUL",
    time: "14:00 - 16:00 WIB",
    location: "2.1 km",
    attendeesCount: 15,
    quotaMax: 20,
    imageUrl: "https://picsum.photos/seed/workshop/600/400",
    isFeatured: false,
  }
];
