# Quiz App 🧠✨

Quiz App adalah platform web kuis interaktif modern yang dirancang untuk menguji wawasan pengguna di berbagai bidang seperti pemrograman, sains, dan pengetahuan umum. Proyek ini dibangun menggunakan **React**, **TypeScript**, dan **Tailwind CSS v4** dengan **Vite** sebagai build tool yang cepat dan efisien.

---

## 🌟 Fitur Utama

- **🔑 Fitur Login Sederhana**: Pengguna dapat masuk menggunakan nama pengguna (username) pilihan mereka yang secara otomatis disimpan di `localStorage`.
- **🌐 Integrasi API OpenTDB**: Pertanyaan diambil secara dinamis dari [Open Trivia Database (OpenTDB)](https://opentdb.com/).
- **⚙️ Konfigurasi Kuis**: Pengguna dapat memilih jumlah soal dan tingkat kesulitan sebelum kuis dimulai.
- **⏱️ Countdown Timer**: Dilengkapi dengan timer mundur interaktif. Jika waktu habis, sesi kuis otomatis berakhir dan menampilkan hasil.
- **⚡ Gameplay Cepat**: Satu halaman hanya menampilkan satu pertanyaan. Setelah memilih opsi jawaban, aplikasi otomatis melanjutkan ke soal berikutnya tanpa hambatan.
- **💾 Fitur Auto-Resume (LocalStorage)**: Jika browser tidak sengaja tertutup atau direfresh di tengah permainan, progres kuis (detik tersisa, daftar soal, dan jawaban) akan tersimpan secara otomatis sehingga user dapat melanjutkan kuis kembali.
- **📊 Halaman Hasil Detil**: Menampilkan ringkasan statistik permainan berupa jumlah jawaban benar, salah, serta total soal yang telah dikerjakan.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler/Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Cara Menjalankan Project Secara Lokal

### 1. Clone Repositori

```bash
git clone <url-repositori-github>
cd quiz-app
```

### 2. Instal Dependensi

Instal semua package dan pustaka yang dibutuhkan:

```bash
npm install
```

### 3. Jalankan Mode Development

Jalankan dev server lokal:

```bash
npm run dev
```

Buka tautan lokal yang muncul (biasanya `http://localhost:5173`) di browser Anda.

### 4. Build untuk Produksi

Untuk melakukan kompilasi versi produksi:

```bash
npm run build
```

Hasil build akan berada di dalam folder `/dist`.
