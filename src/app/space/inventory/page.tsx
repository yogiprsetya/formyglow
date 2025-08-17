'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import { Plus, Search, Package, Calendar, AlertTriangle, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '~/components/common/stat-card';
import { DeleteInventoryDialog } from '~/app/space/inventory/delete-inventory-dialog';
import { ViewInventoryDialog } from '~/app/space/inventory/view-inventory-dialog';
import { toast } from 'sonner';

// Mock data untuk demo
const mockInventory = [
  {
    id: '1',
    product: {
      name: 'Gentle Daily Cleanser',
      brand: 'CeraVe',
      category: 'cleanser',
      imageUrl: '/api/placeholder/100/100',
      price: 1500,
      size: '236ml'
    },
    quantity: 2,
    purchaseDate: '2024-01-15',
    expiryDate: '2026-01-15',
    openedDate: '2024-01-20',
    isOpen: true,
    notes: 'Using daily, works great for sensitive skin'
  },
  {
    id: '2',
    product: {
      name: 'Vitamin C Serum',
      brand: 'The Ordinary',
      category: 'serum',
      imageUrl: '/api/placeholder/100/100',
      price: 800,
      size: '30ml'
    },
    quantity: 1,
    purchaseDate: '2024-02-01',
    expiryDate: '2025-02-01',
    openedDate: '2024-02-05',
    isOpen: true,
    notes: 'Using in morning routine'
  },
  {
    id: '3',
    product: {
      name: 'Daily Moisturizing Lotion',
      brand: 'CeraVe',
      category: 'moisturizer',
      imageUrl: '/api/placeholder/100/100',
      price: 1800,
      size: '236ml'
    },
    quantity: 1,
    purchaseDate: '2024-01-10',
    expiryDate: '2026-01-10',
    openedDate: '2024-01-15',
    isOpen: true,
    notes: 'Hydrating and non-greasy'
  }
];

const categories = ['all', 'cleanser', 'serum', 'moisturizer', 'sunscreen', 'exfoliant', 'mask', 'oil'];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showExpiring, setShowExpiring] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    itemId: string;
    itemName: string;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [viewDialog, setViewDialog] = useState<{ isOpen: boolean; item: any } | null>(null);

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch =
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.product.category === selectedCategory;
    const matchesExpiring =
      !showExpiring ||
      (item.expiryDate && new Date(item.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesCategory && matchesExpiring;
  });

  const getExpiringItems = () => {
    return mockInventory.filter(
      (item) => item.expiryDate && new Date(item.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    );
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDeleteClick = (itemId: string, itemName: string) => {
    setDeleteDialog({ isOpen: true, itemId, itemName });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewClick = (item: any) => {
    setViewDialog({ isOpen: true, item });
  };

  const handleDeleteSuccess = () => {
    setDeleteDialog(null);
    // TODO: Refresh inventory data
    toast.success('Produk berhasil dihapus');
  };

  const handleDeleteCancel = () => {
    setDeleteDialog(null);
  };

  const handleViewClose = () => {
    setViewDialog(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex md:items-center justify-between max-md:flex-col max-md:gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Inventory</h1>

            <p className="text-gray-600 dark:text-gray-300">
              Manage your skincare products and track their usage
            </p>
          </div>

          <Button
            asChild
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Link href="/space/inventory/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-4 mb-8">
        <StatCard variant="info" title="Total Products" icon={Package} stat={mockInventory.length} />

        <StatCard
          variant="success"
          title="Open Products"
          icon={Eye}
          stat={mockInventory.filter((item) => item.isOpen).length}
        />

        <StatCard
          variant="warning"
          title="Expiring Soon"
          icon={AlertTriangle}
          stat={getExpiringItems().length}
        />

        <StatCard
          variant="purple"
          title="Categories"
          icon={Calendar}
          stat={new Set(mockInventory.map((item) => item.product.category)).size}
        />
      </div>

      {/* Filters and Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all'
                      ? 'All Categories'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <Button
                variant={showExpiring ? 'default' : 'outline'}
                onClick={() => setShowExpiring(!showExpiring)}
                className="flex items-center space-x-2"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Expiring Soon</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => {
          const daysUntilExpiry = item.expiryDate ? getDaysUntilExpiry(item.expiryDate) : null;
          const isExpiringSoon = daysUntilExpiry && daysUntilExpiry <= 30;

          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.product.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {item.product.brand}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      {item.product.category}
                    </Badge>
                    {item.isOpen && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Open
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Image Placeholder */}
                <div className="w-full h-32 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>

                {/* Product Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Price:</span>
                    <span className="font-medium">{formatPrice(item.product.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Size:</span>
                    <span className="font-medium">{item.product.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Quantity:</span>
                    <span className="font-medium">{item.quantity}</span>
                  </div>
                  {item.purchaseDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Purchased:</span>
                      <span className="font-medium">{formatDate(item.purchaseDate)}</span>
                    </div>
                  )}
                  {item.expiryDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                      <span className={`font-medium ${isExpiringSoon ? 'text-red-600' : ''}`}>
                        {formatDate(item.expiryDate)}
                        {isExpiringSoon && ` (${daysUntilExpiry} days)`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {item.notes && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
                    <p className="font-medium mb-1">Notes:</p>
                    <p>{item.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/space/inventory/edit/${item.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewClick(item)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteClick(item.id, item.product.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredInventory.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm || selectedCategory !== 'all' || showExpiring
                ? 'Try adjusting your search or filters'
                : 'Start building your skincare collection'}
            </p>
            <Button asChild>
              <Link href="/space/inventory/add">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Dialog */}
      {deleteDialog?.isOpen && (
        <DeleteInventoryDialog
          itemId={deleteDialog.itemId}
          itemName={deleteDialog.itemName}
          onDelete={handleDeleteSuccess}
          onCancel={handleDeleteCancel}
        />
      )}

      {/* View Dialog */}
      {viewDialog?.isOpen && <ViewInventoryDialog item={viewDialog.item} onClose={handleViewClose} />}
    </main>
  );
}
