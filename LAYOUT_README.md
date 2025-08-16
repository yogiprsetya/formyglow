# Layout Sidebar dengan Main Content Scrollable

## Deskripsi

Layout ini menyediakan sidebar kiri yang tetap (fixed) dengan height 100vh dan main content yang scrollable secara independen.

## Fitur Utama

### 1. Sidebar Desktop (md: dan ke atas)

- **Height**: 100vh (full viewport height)
- **Width**: 256px (w-64)
- **Position**: Fixed left side
- **Scroll**: Menu items dapat di-scroll jika terlalu panjang
- **Header & Footer**: Fixed position (tidak scroll)

### 2. Mobile Sidebar

- **Trigger**: Menu button di header mobile
- **Position**: Slide dari kiri menggunakan Sheet component
- **Width**: 280px - 320px (responsive)
- **Behavior**: Overlay di atas content

### 3. Main Content

- **Height**: 100vh dengan overflow hidden
- **Scroll**: Independent scrolling dengan `overflow-y-auto`
- **Mobile Header**: Fixed header dengan menu button
- **Responsive**: Padding yang berbeda untuk mobile dan desktop

## Struktur Komponen

```
AppLayout
├── Sidebar (Desktop - hidden md:flex)
│   ├── Header (Logo)
│   ├── Navigation Menu (scrollable)
│   └── Footer (Logout button)
└── Main Content Container
    ├── Mobile Header (md:hidden)
    │   ├── Logo
    │   └── SidebarMenu (Mobile trigger)
    └── Main Content (scrollable)
```

## CSS Classes yang Digunakan

### Container

- `h-screen`: Full viewport height
- `overflow-hidden`: Mencegah scroll pada container utama
- `flex`: Flexbox layout

### Sidebar

- `h-screen`: Full height
- `flex-shrink-0`: Mencegah sidebar menyusut
- `overflow-y-auto`: Scroll untuk menu items

### Main Content

- `flex-1`: Mengambil sisa space
- `min-w-0`: Mencegah overflow
- `overflow-y-auto`: Enable scrolling

## Responsive Behavior

### Desktop (md: dan ke atas)

- Sidebar selalu terlihat
- Main content scrollable
- Layout horizontal dengan flexbox

### Mobile (di bawah md:)

- Sidebar tersembunyi
- Header mobile dengan menu button
- Sidebar muncul sebagai overlay
- Main content scrollable

## Custom Scrollbar

Layout ini menggunakan custom scrollbar styling:

- Width: 6px
- Transparent track
- Muted foreground color dengan opacity
- Hover effect untuk thumb

## Penggunaan

```tsx
import { AppLayout } from '~/components/app-shell/app-layout';

export default function MyPage() {
  return (
    <AppLayout>
      {/* Your page content here */}
      <div>Content yang akan di-scroll</div>
    </AppLayout>
  );
}
```

## Keuntungan

1. **Performance**: Sidebar tidak re-render saat content scroll
2. **UX**: Navigasi selalu tersedia di desktop
3. **Mobile-friendly**: Sidebar overlay untuk mobile
4. **Consistent**: Height yang konsisten di semua device
5. **Accessible**: Proper focus management dan keyboard navigation
