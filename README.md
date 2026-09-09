# EterniFlora 🌿

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-Bear-brown?style=for-the-badge)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)

**EterniFlora** adalah sebuah platform digital *cross-platform* (iOS, Android, dan Web) premium yang menjembatani seni merangkai bunga dengan gaya hidup berkelanjutan (*eco-wellness*). Aplikasi ini dirancang dengan mengedepankan performa tinggi, modularitas kode, serta arsitektur yang tangguh untuk memudahkan pengembangan ke depan (*scalable*).

---

## 📋 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
3. [Struktur Direktori](#-struktur-direktori)
4. [Persyaratan Alat](#-persyaratan-alat)
5. [Cara Instalasi](#-cara-instalasi-getting-started)
6. [Konfigurasi Lingkungan](#-konfigurasi-lingkungan-env)
7. [Panduan Skrip](#-panduan-skrip)
8. [Build & Deployment](#-build--deployment)
9. [Lisensi](#-lisensi)

---

## ✨ Fitur Utama
* 🎨 **Studio Bouquet Customizer**: Pengalaman interaktif 5-tahap (pemilihan bunga, kelopak, daun, kertas pembungkus, hingga pita) menggunakan visual berkualitas tinggi yang didukung *state management* yang efisien.
* 📅 **Eco-Event Booking System**: Sistem integrasi registrasi acara lingkungan dengan manajemen sesi pengguna yang aman.
* 🧭 **Modular Routing Architecture**: Menggunakan Expo Router (berbasis *file-system routing*) untuk menjamin pemisahan alur logika (*separation of concerns*) yang bersih.
* 📱 **Premium UI/UX**: Antarmuka modern yang mematuhi *Hick's Law* untuk mereduksi beban kognitif pengguna, didukung oleh sistem tipografi responsif (Playfair Display & Lato).

## 🛠 Teknologi yang Digunakan
* **Core**: React Native, Expo SDK
* **Language**: TypeScript (Strict Mode)
* **Routing**: Expo Router v3
* **State Management**: Zustand
* **Styling**: NativeWind (TailwindCSS for React Native)
* **Assets & Fonts**: `@expo/vector-icons`, `@expo-google-fonts`
* **Linter & Formatter**: ESLint, Prettier

## 📂 Struktur Direktori
Proyek ini mengadopsi standar struktur direktori berbasis fitur (*feature-driven architecture*):

```text
eterniflora/
├── app/                  # File-based routing (Expo Router)
│   ├── (tabs)/           # Layout untuk Bottom Navigation
│   ├── _layout.tsx       # Root layout & providers
│   └── index.tsx         # Entry point aplikasi
├── assets/               # Gambar, fonts, dan aset statis
├── components/           # Reusable UI components (Atoms, Molecules, Organisms)
├── constants/            # Variabel konstan, tema warna, konfigurasi global
├── data/                 # Dummy data / mock API responses
├── store/                # Zustand global state management
├── app.json              # Konfigurasi aplikasi Expo
├── tailwind.config.js    # Konfigurasi utility-first styling NativeWind
└── tsconfig.json         # Aturan TypeScript
```

## 💻 Persyaratan Alat
Pastikan Anda telah memasang *environment* pengembangan berikut:
* **Node.js** (v18.x LTS atau lebih baru)
* **npm** atau **yarn**
* **Expo CLI** (`npm install -g expo-cli`)
* Emulator: **Android Studio** (Android) atau **Xcode** (iOS - hanya untuk macOS)
* Aplikasi **Expo Go** di perangkat seluler untuk pengujian fisik

## 🚀 Cara Instalasi (Getting Started)

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/username/eterniflora.git
   cd eterniflora
   ```

2. **Instalasi Dependensi**
   Sangat disarankan menggunakan `npm` untuk mencegah masalah resolusi versi:
   ```bash
   npm install
   ```

3. **Menjalankan Development Server**
   ```bash
   npx expo start
   ```

4. **Memulai Emulator/Perangkat**
   * Tekan **`a`** untuk membuka di Android Emulator.
   * Tekan **`i`** untuk membuka di iOS Simulator.
   * Atau *scan* **QR Code** menggunakan aplikasi **Expo Go**.

## 🔐 Konfigurasi Lingkungan (.env)
Gandakan file `.env.example` menjadi `.env` di direktori *root*. 
*(Untuk saat ini, seluruh Environment Variables masih dikelola secara internal/local dummy API, namun arsitektur telah disiapkan untuk pemanggilan REST API ke depannya)*:
```env
EXPO_PUBLIC_API_URL=https://api.eterniflora.local
EXPO_PUBLIC_ENVIRONMENT=development
```

## 📜 Panduan Skrip
Berikut adalah daftar perintah npm yang tersedia pada `package.json`:
* `npm start`: Memulai server bundler Metro.
* `npm run android`: Memulai server dan langsung membuka emulator Android.
* `npm run ios`: Memulai server dan langsung membuka simulator iOS.
* `npm run web`: Memulai aplikasi pada browser web lokal.
* `npm run lint`: Menjalankan ESLint untuk memeriksa masalah sintaks dan gaya kode.

## 📦 Build & Deployment
Aplikasi ini sudah dipersiapkan untuk diproduksi menggunakan **EAS (Expo Application Services)**.
1. Instal EAS CLI: `npm install -g eas-cli`
2. Login ke akun Expo: `eas login`
3. Bangun *package* untuk perangkat (APK/AAB/IPA):
   ```bash
   eas build --profile preview --platform android
   eas build --profile production --platform ios
   ```

## 📄 Lisensi
Hak Cipta © 2026 Tim EterniFlora. Seluruh hak cipta dilindungi.
Proyek ini merupakan kekayaan intelektual *proprietary* dan saat ini tidak didistribusikan untuk *open-source* publik.
