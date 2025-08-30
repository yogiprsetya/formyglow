import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Check, Sparkles, Smartphone, Zap, Shield, Heart, Star, Camera, Package, Clock } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Skeleton } from '~/components/ui/skeleton';

const UserAction = dynamic(() => import('./header-action').then((m) => m.HeaderAction), {
  ssr: false,
  loading: () => <Skeleton className="w-32 h-10" />
});

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold accent-text">FormyGlow</h1>
              </div>
            </div>

            <UserAction />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding bg-miro-primary">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="miro" size="lg" className="mb-6">
              ✨ Skincare Management Made Simple
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 leading-tight">
              Kelola Skincare
              <span className="accent-text block mt-2">Lebih Pintar</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              Aplikasi skincare management yang dapat diinstall, tidak membebani memori smartphone, dan
              membantu Anda mencapai kulit sehat dengan rutinitas yang terstruktur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="miro" className="btn-miro text-lg px-8 py-4">
                <Link href="/space">Mulai Gratis</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-miro text-lg px-8 py-4">
                <Link href="#pricing">Lihat Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-clean">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Mengapa Memilih FormyGlow?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fitur-fitur unggulan yang membuat skincare management menjadi lebih mudah dan efektif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-miro text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Installable PWA</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dapat diinstall langsung ke smartphone seperti aplikasi native, tidak membebani memori
                  karena menggunakan teknologi PWA.
                </p>
              </CardContent>
            </Card>

            <Card className="card-miro text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Hemat Memori</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menggunakan Progressive Web App yang ringan dan efisien, tidak memakan ruang penyimpanan
                  berlebihan.
                </p>
              </CardContent>
            </Card>

            <Card className="card-miro text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Keamanan Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Data skincare Anda aman dan tersimpan dengan baik, dengan enkripsi dan backup otomatis.
                </p>
              </CardContent>
            </Card>

            <Card className="card-miro text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Personalisasi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rutinitas skincare yang disesuaikan dengan jenis kulit, kondisi, dan preferensi pribadi
                  Anda.
                </p>
              </CardContent>
            </Card>

            <Card className="card-miro text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-yellow-200 group-hover:to-amber-200 transition-all duration-300">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tracking Progress</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pantau kemajuan skincare Anda dengan foto dan catatan, lihat perubahan kulit dari waktu ke
                  waktu.
                </p>
              </CardContent>
            </Card>

            <Card className="card-miro text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-teal-200 group-hover:to-cyan-200 transition-all duration-300">
                  <Sparkles className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">AI Recommendations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rekomendasi produk dan rutinitas berdasarkan analisis AI yang memahami kebutuhan kulit Anda.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="section-padding bg-miro-secondary">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Fitur Lengkap untuk Skincare Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Semua yang Anda butuhkan untuk mengelola skincare dalam satu aplikasi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Inventory Management</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Kelola semua produk skincare Anda dengan mudah. Catat tanggal kadaluarsa, stok, dan
                    informasi produk secara terorganisir.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Routine Scheduler</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Atur jadwal skincare harian, mingguan, dan bulanan. Dapatkan notifikasi tepat waktu untuk
                    setiap langkah rutinitas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Progress Tracking</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Dokumentasikan kemajuan kulit Anda dengan foto dan catatan. Lihat perubahan dari waktu ke
                    waktu dengan visual yang jelas.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-border/60">
                <div className="bg-card rounded-lg p-4 border border-border/60">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Morning Routine</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-blue-200 rounded-full"></div>
                      <div className="h-1.5 bg-blue-200 rounded-full w-3/4"></div>
                      <div className="h-1.5 bg-blue-200 rounded-full w-1/2"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Evening Routine</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-purple-200 rounded-full w-2/3"></div>
                      <div className="h-1.5 bg-purple-200 rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pilih Paket yang Tepat</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mulai gratis atau upgrade untuk fitur lebih lengkap
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Free</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Untuk pemula yang ingin mencoba
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">Rp 0</span>
                  <span className="text-gray-600 dark:text-gray-400">/bulan</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">1 Routine</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">8 Produk</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">1 Progress Tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Basic Support</span>
                  </li>
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/space">Mulai Gratis</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-indigo-500 dark:border-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-300 transition-colors transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-indigo-600 text-white px-4 py-2 text-sm font-semibold">POPULAR</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Pro</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Untuk pengguna aktif
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">Rp 16k</span>
                  <span className="text-gray-600 dark:text-gray-400">/bulan</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">7 Routines</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">20 Produk</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">5 Progress Tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Priority Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">AI Recommendations</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Link href="/space">Pilih Pro</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-2 border-purple-500 dark:border-purple-400 hover:border-purple-600 dark:hover:border-purple-300 transition-colors">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold">PREMIUM</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Premium</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Untuk power user
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">Rp 37k</span>
                  <span className="text-gray-600 dark:text-gray-400">/bulan</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Unlimited Routines</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Unlimited Produk</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Unlimited Progress</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">24/7 Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Advanced Analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Custom Reports</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/space">Pilih Premium</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-miro-accent">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Siap Memulai Perjalanan Skincare?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat FormyGlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="miro" className="btn-miro text-lg px-8 py-4">
              <Link href="/space">Mulai Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-miro text-lg px-8 py-4">
              <Link href="/signin">Daftar Gratis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">FormyGlow</h3>
              </div>
              <p className="text-gray-400">
                Aplikasi skincare management terbaik untuk kulit sehat dan bercahaya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/space" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/space/routines" className="hover:text-white transition-colors">
                    Routines
                  </Link>
                </li>
                <li>
                  <Link href="/space/inventory" className="hover:text-white transition-colors">
                    Inventory
                  </Link>
                </li>
                <li>
                  <Link href="/space/progress" className="hover:text-white transition-colors">
                    Progress
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/signin" className="hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/space" className="hover:text-white transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FormyGlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
