'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Badge } from '~/components/ui/badge';
import { Trash2, ArrowLeft, Save, X, Search, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { dayOfWeekOptions, routineFrequencyOptions, routineTypeOptions } from '../constant';
import { useInventory } from '~/app/space/inventory/use-inventory';
import type { SelectInventory } from '~/app/space/inventory/schema';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

interface RoutineItem {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    category: string;
  };
  order: number;
  frequency: string;
  notes: string;
  repeatedOn?: string[];
}

interface RoutineFormData {
  name: string;
  type: string;
  description: string;
  isActive: boolean;
  items: RoutineItem[];
}

export default function AddRoutinePage() {
  const router = useRouter();
  const { data: inventoryData, isLoading: isInventoryLoading } = useInventory();

  const [formData, setFormData] = useState<RoutineFormData>({
    name: '',
    type: 'morning',
    description: '',
    isActive: true,
    items: []
  });

  const [newItem, setNewItem] = useState({
    frequency: 'daily',
    notes: '',
    repeatedOn: [] as string[]
  });

  const [showProductPicker, setShowProductPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const addItem = (product: SelectInventory) => {
    const item: RoutineItem = {
      id: Date.now().toString(),
      product: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.skincareTypes || 'cleanser'
      },
      order: formData.items.length + 1,
      frequency: newItem.frequency,
      notes: newItem.notes,
      repeatedOn: newItem.frequency === 'weekly' ? newItem.repeatedOn : undefined
    };

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, item]
    }));

    // Reset new item form
    setNewItem({
      frequency: 'daily',
      notes: '',
      repeatedOn: []
    });

    setShowProductPicker(false);
  };

  const removeItem = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items
        .filter((item) => item.id !== itemId)
        .map((item, index) => ({ ...item, order: index + 1 }))
    }));
  };

  const moveItem = (itemId: string, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const items = [...prev.items];
      const currentIndex = items.findIndex((item) => item.id === itemId);

      if (direction === 'up' && currentIndex > 0) {
        [items[currentIndex], items[currentIndex - 1]] = [items[currentIndex - 1], items[currentIndex]];
      } else if (direction === 'down' && currentIndex < items.length - 1) {
        [items[currentIndex], items[currentIndex + 1]] = [items[currentIndex + 1], items[currentIndex]];
      }

      // Update order numbers
      items.forEach((item, index) => {
        item.order = index + 1;
      });

      return { ...prev, items };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.items.length === 0) {
      alert('Please fill in routine name and add at least one product');
      return;
    }

    try {
      // Here you would typically send the data to your API
      console.log('Saving routine:', formData);

      // For now, just redirect back to routines page
      router.push('/space/routines');
    } catch (error) {
      console.error('Error saving routine:', error);
    }
  };

  const filteredProducts =
    inventoryData?.data?.filter((product) => {
      if (!searchTerm) return true;
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.skincareTypes || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/space/routines">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Routines
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Routine</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Build your personalized skincare routine step by step
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Set the foundation for your new skincare routine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Routine Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Morning Glow, Evening Recovery"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Routine Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {routineTypeOptions.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your routine and its benefits..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isActive">Set as active routine</Label>
            </div>
          </CardContent>
        </Card>

        {/* Add Products */}
        <Card>
          <CardHeader>
            <CardTitle>Add Products</CardTitle>
            <CardDescription>
              Add products from your inventory to your routine in the order you&apos;ll use them
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Product Picker Button */}
            <div className="rounded-lg p-4 bg-gray-50 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Select Products from Inventory</h4>

                <Button
                  type="button"
                  onClick={() => setShowProductPicker(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Browse Inventory
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>

                  <Select
                    value={newItem.frequency}
                    onValueChange={(value) =>
                      setNewItem((prev) => ({
                        ...prev,
                        frequency: value
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {routineFrequencyOptions.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Default Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or notes..."
                    value={newItem.notes}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>

              {/* Repeated On Input for Weekly Frequency */}
              {newItem.frequency === 'weekly' && (
                <div className="space-y-2">
                  <Label htmlFor="repeatedOn">Repeated On</Label>

                  <ToggleGroup
                    type="multiple"
                    // onValueChange={field.onChange}
                    // value={field.value}
                    className="justify-start"
                    variant="outline"
                    size="lg"
                  >
                    {dayOfWeekOptions.map((day) => (
                      <ToggleGroupItem key={day.value} value={day.value}>
                        {day.label.substring(0, 3)}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              )}
            </div>

            {/* Products List */}
            {formData.items.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Routine Steps</h4>
                {formData.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
                  >
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {item.order}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.product.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.product.brand} • {item.product.category}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.notes}</p>
                      )}
                      {item.frequency === 'weekly' && item.repeatedOn && item.repeatedOn.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Repeated on: {item.repeatedOn.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.frequency}
                      </Badge>

                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(item.id, 'up')}
                          disabled={index === 0}
                          className="h-8 w-8 p-0"
                        >
                          ↑
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(item.id, 'down')}
                          disabled={index === formData.items.length - 1}
                          className="h-8 w-8 p-0"
                        >
                          ↓
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild>
            <Link href="/space/routines">Cancel</Link>
          </Button>

          <Button
            type="submit"
            disabled={!formData.name.trim() || formData.items.length === 0}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Create Routine
          </Button>
        </div>
      </form>

      {/* Product Picker Dialog */}
      {showProductPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Products from Inventory
              </h3>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProductPicker(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products by name, brand, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Products Grid */}
              {isInventoryLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading inventory...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm
                      ? 'Try adjusting your search terms'
                      : 'Your inventory is empty. Add some products first!'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer"
                      onClick={() => addItem(product)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{product.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {product.skincareTypes}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Size: {product.size}</span>
                        <span>Qty: {product.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
