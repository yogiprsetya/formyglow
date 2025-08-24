'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { CreateRoutineFormData } from './schema';

export const ListedProduct = () => {
  const { control, setValue, watch } = useFormContext<CreateRoutineFormData>();

  const { fields, remove, move } = useFieldArray({
    control,
    name: 'items'
  });

  const watchedItems = watch('items');

  const removeItem = (index: number) => {
    remove(index);
    // Update order numbers
    const updatedItems = watchedItems.filter((_, i) => i !== index);
    updatedItems.forEach((item, i) => {
      setValue(`items.${i}.order`, i + 1);
    });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      move(index, index - 1);
    } else if (direction === 'down' && index < watchedItems.length - 1) {
      move(index, index + 1);
    }

    // Update order numbers
    watchedItems.forEach((_, i) => {
      setValue(`items.${i}.order`, i + 1);
    });
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-white">Routine Steps</h4>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
        >
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{field.order}</span>
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{field.product.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {field.product.brand} • {field.product.category}
            </p>
            {field.notes && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{field.notes}</p>}
            {field.frequency === 'weekly' && field.repeatOn && field.repeatOn.length > 0 && (
              <div className="mt-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Repeated on: {field.repeatOn.join(', ')}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {field.frequency}
            </Badge>

            <div className="flex space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => moveItem(index, 'up')}
                disabled={index === 0}
                className="h-8 w-8 p-0"
              >
                ↑
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => moveItem(index, 'down')}
                disabled={index === fields.length - 1}
                className="h-8 w-8 p-0"
              >
                ↓
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
