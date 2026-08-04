# EterniFlora 🌿
![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Tentang Aplikasi
**EterniFlora** adalah sebuah platform digital (berbasis aplikasi *mobile* dan *web*) premium yang menjembatani seni merangkai bunga dengan gaya hidup berkelanjutan (*eco-wellness*). Aplikasi ini menyelesaikan masalah limbah *floristry* tradisional dengan menawarkan pengalaman personalisasi buket bunga yang 100% ramah lingkungan, sekaligus menjadi pusat komunitas untuk berbagai acara lingkungan seperti *workshop upcycling* dan penanaman pohon.

## Fitur Utama
* 🎨 **Studio Bouquet Customizer**: Pengalaman interaktif 5-tahap (memilih bunga, warna kelopak, hiasan daun, kertas pembungkus, hingga pita) menggunakan visual berkualitas tinggi dan *state management* yang responsif.
* 📅 **Eco-Event Booking System**: Sistem terintegrasi bagi pengguna untuk mendaftarkan diri pada acara peduli lingkungan.
* ✨ **Premium UI/UX**: Antarmuka modern yang mematuhi *Best Practice UX* (Hick's Law), dilengkapi dengan paduan tipografi *serif* elegan (Playfair Display) dan *sans-serif* (Lato).
* 📱 **Cross-Platform Compatibility**: Berjalan mulus di iOS, Android, maupun Web dari satu basis kode.

## Teknologi yang Digunakan
* **Bahasa Pemrograman**: TypeScript, JavaScript
* **Framework**: React Native, Expo (dengan arsitektur *Expo Router*)
* **State Management**: Zustand (`useEcoStore`)
* **Pustaka Tambahan**: 
  * `expo-linear-gradient` (untuk efek gradasi)
  * `@expo/vector-icons` (untuk manajemen ikon)
  * `@expo-google-fonts` (Playfair Display & Lato)

## Persyaratan Alat
Sebelum melakukan instalasi, pastikan sistem Anda telah memasang:
* **Node.js** (Minimal versi 18.x atau terbaru disarankan)
* **npm** atau **yarn** (sebagai *package manager*)
* **Android Studio** (untuk simulator Android) atau **Xcode** (untuk simulator iOS)
* **Aplikasi Expo Go** di perangkat fisik Anda (opsional, untuk *testing* langsung di *smartphone*)

## Cara Instalasi (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan EterniFlora di sistem lokal Anda:

1. **Kloning Repositori**
   Buka terminal Anda dan jalankan perintah berikut:
   ```bash
   git clone https://github.com/username/eterniflora.git
   cd eterniflora
   ```

2. **Instalasi Dependensi**
   Unduh semua pustaka yang dibutuhkan menggunakan npm:
   ```bash
   npm install
   ```

3. **Menjalankan Aplikasi**
   Setelah proses instalasi selesai, jalankan *development server*:
   ```bash
   npx expo start
   ```

4. **Buka di Emulator / Perangkat Fisik**
   * Tekan **`a`** di terminal untuk membuka di Android Emulator.
   * Tekan **`i`** di terminal untuk membuka di iOS Simulator.
   * Atau *scan* **QR Code** yang muncul di terminal menggunakan aplikasi **Expo Go** (Android/iOS) di *smartphone* Anda.
