# FormyGlow - Personal Skincare Management

FormyGlow adalah aplikasi web untuk manajemen skincare personal yang membantu pengguna menemukan dan mengelola produk dengan tepat, aman, dan efektif.

## 🌟 Fitur Utama

### Core Features

- **Manage Inventory** - Simpan & kelola daftar produk skincare yang dimiliki
- **Skincare Routine Builder** - Buat rutinitas pagi/malam dengan drag-and-drop
- **Track Progress** - Upload foto before/after dan catatan perkembangan kulit
- **Ingredient Cross-Check** - Peringatan jika ada bahan yang tidak boleh digunakan bersamaan

### Smart Features (AI-powered)

- Analisis ingredient list
- Rekomendasi produk alternatif
- Personalization berdasarkan jenis kulit & masalah kulit

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Authentication**: Next-Auth dengan Google OAuth
- **Database**: Drizzle ORM + PostgreSQL
- **State Management**: Zustand
- **Styling**: Tailwind CSS + Shadcn UI
- **Image Storage**: Cloudinary (optional)

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials

## 🛠️ Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd formyglow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Buat file `.env.local` dengan konfigurasi berikut:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/formyglow"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Cloud Storage (optional)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Setup database**

   ```bash
   # Generate migrations
   npm run db:gen

   # Push to database
   npm run db:push

   # Seed with sample data
   npm run db:seed
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

Aplikasi menggunakan struktur database yang terdiri dari:

- **users** - Data pengguna (Next-Auth)
- **profiles** - Profil tambahan pengguna
- **ingredients** - Bahan-bahan skincare
- **products** - Produk skincare
- **product_ingredients** - Relasi many-to-many produk-bahan
- **inventory** - Inventori produk pengguna
- **routines** - Rutinitas skincare
- **routine_items** - Item dalam rutinitas
- **progress_photos** - Foto progress
- **progress_notes** - Catatan progress
- **ingredient_conflicts** - Konflik bahan
- **ai_recommendations** - Rekomendasi AI

## 🎨 Design Philosophy

- **Gender-Neutral**: Desain yang nyaman untuk laki-laki dan perempuan
- **Modern & Clean**: Interface yang bersih dan mudah digunakan
- **Accessible**: Mengikuti standar aksesibilitas web
- **Responsive**: Optimal untuk semua ukuran layar

## 📱 Target Audience

- Laki-laki & perempuan usia 24-36
- Daya beli menengah ke atas
- Tertarik dengan skincare dan wellness
- Mencari solusi digital untuk manajemen skincare

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered skin analysis
- [ ] Social features & community
- [ ] Integration dengan e-commerce
- [ ] Advanced analytics & insights

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.
