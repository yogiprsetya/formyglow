# FormyGlow - Skincare Management App

## Struktur Aplikasi

Aplikasi telah direstrukturisasi sesuai dengan permintaan:

### 1. Halaman Marketing (`/`)

- **Hero Section**: Menampilkan value proposition utama aplikasi
- **Benefits**: Fitur-fitur unggulan termasuk PWA installable dan hemat memori
- **Pricing**:
  - **Free**: 1 routine, 8 produk, 1 progress tracking
  - **Pro**: Rp 16k/bulan - 7 routines, 20 produk, 5 progress tracking
  - **Premium**: Rp 37k/bulan - Unlimited routines, produk, dan progress tracking

### 2. Dashboard & Fitur (`/space`)

- **Dashboard** (`/space`): Halaman utama setelah login
- **Routines** (`/space/routines`): Manajemen rutinitas skincare
- **Inventory** (`/space/inventory`): Manajemen produk skincare
- **Progress** (`/space/progress`): Tracking kemajuan skincare

### 3. Autentikasi (`/signin`)

- Halaman sign in tetap di root level

## Fitur Utama

### PWA (Progressive Web App)

- **Installable**: Dapat diinstall langsung ke smartphone
- **Hemat Memori**: Tidak membebani memori smartphone
- **Offline Capable**: Dapat berfungsi tanpa internet

### Manajemen Skincare

- **Routine Management**: Buat dan kelola rutinitas skincare
- **Product Inventory**: Catat dan kelola produk skincare
- **Progress Tracking**: Monitor kemajuan dengan foto dan catatan
- **AI Recommendations**: Rekomendasi produk berdasarkan analisis AI

## Teknologi

- **Frontend**: Next.js 14 dengan TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Architecture**: App Router (Next.js 13+)

## Cara Menjalankan

1. Install dependencies:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka browser dan akses `http://localhost:3000`

## Struktur File

```
src/app/
├── page.tsx              # Halaman marketing (landing page)
├── layout.tsx            # Root layout
├── signin/               # Halaman sign in
├── space/                # Dashboard & fitur aplikasi
│   ├── layout.tsx        # Layout untuk space
│   ├── page.tsx          # Dashboard utama
│   ├── routines/         # Manajemen routines
│   ├── inventory/        # Manajemen inventory
│   └── progress/         # Progress tracking
└── api/                  # API routes
```

## Perubahan yang Dilakukan

1. **Restrukturisasi Routing**:
   - Semua halaman FE kecuali signin dipindah ke `/space`
   - Halaman home (dashboard) dipindah ke `/space`
   - Halaman marketing baru dibuat di root `/`

2. **Update Link Navigation**:
   - Semua internal link diperbarui untuk mengarah ke `/space/*`
   - Link di dashboard, routines, inventory, dan progress sudah diperbarui

3. **Halaman Marketing**:
   - Hero section dengan value proposition
   - Benefits section highlighting PWA features
   - Pricing section dengan 3 tier (Free, Pro, Premium)
   - CTA section untuk conversion
   - Footer dengan navigasi lengkap

## Keunggulan PWA

- **Installable**: Pengguna dapat menginstall aplikasi ke home screen
- **Hemat Memori**: Menggunakan teknologi web modern yang efisien
- **Cross-Platform**: Berfungsi di semua device dan browser
- **Offline Support**: Dapat berfungsi tanpa koneksi internet
- **Push Notifications**: Dapat mengirim notifikasi penting
- **Auto-Updates**: Update otomatis tanpa perlu download ulang
