import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  size?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  scientificName?: string;
  category: string;
  description?: string;
  benefits?: string[];
  sideEffects?: string[];
  contraindications?: string[];
  safetyRating?: number;
}

export interface InventoryItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  purchaseDate?: Date;
  expiryDate?: Date;
  openedDate?: Date;
  isOpen: boolean;
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  type: 'morning' | 'evening' | 'custom';
  description?: string;
  items: RoutineItem[];
  isActive: boolean;
}

export interface RoutineItem {
  id: string;
  productId: string;
  product: Product;
  order: number;
  frequency: 'daily' | 'alternate' | 'weekly';
  notes?: string;
}

export interface ProgressPhoto {
  id: string;
  title: string;
  description?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  photoDate: Date;
  skinCondition?: string;
  notes?: string;
}

interface SkincareStore {
  // State
  inventory: InventoryItem[];
  routines: Routine[];
  progressPhotos: ProgressPhoto[];
  selectedRoutine: Routine | null;

  // Actions
  addToInventory: (product: Product, quantity?: number, notes?: string) => void;
  removeFromInventory: (itemId: string) => void;
  updateInventoryItem: (itemId: string, updates: Partial<InventoryItem>) => void;

  createRoutine: (routine: Omit<Routine, 'id' | 'items'>) => void;
  updateRoutine: (routineId: string, updates: Partial<Routine>) => void;
  deleteRoutine: (routineId: string) => void;
  addProductToRoutine: (routineId: string, product: Product, order: number) => void;
  removeProductFromRoutine: (routineId: string, itemId: string) => void;
  reorderRoutineItems: (routineId: string, items: RoutineItem[]) => void;

  addProgressPhoto: (photo: Omit<ProgressPhoto, 'id'>) => void;
  updateProgressPhoto: (photoId: string, updates: Partial<ProgressPhoto>) => void;
  deleteProgressPhoto: (photoId: string) => void;

  setSelectedRoutine: (routine: Routine | null) => void;

  // Computed
  getInventoryByCategory: (category: string) => InventoryItem[];
  getRoutinesByType: (type: Routine['type']) => Routine[];
  getExpiringProducts: (days: number) => InventoryItem[];
}

export const useSkincareStore = create<SkincareStore>((set, get) => ({
  // Initial state
  inventory: [],
  routines: [],
  progressPhotos: [],
  selectedRoutine: null,

  // Actions
  addToInventory: (product, quantity = 1, notes) => {
    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      product,
      quantity,
      notes,
      isOpen: false
    };

    set((state) => ({
      inventory: [...state.inventory, newItem]
    }));
  },

  removeFromInventory: (itemId) => {
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== itemId)
    }));
  },

  updateInventoryItem: (itemId, updates) => {
    set((state) => ({
      inventory: state.inventory.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    }));
  },

  createRoutine: (routineData) => {
    const newRoutine: Routine = {
      ...routineData,
      id: crypto.randomUUID(),
      items: []
    };

    set((state) => ({
      routines: [...state.routines, newRoutine]
    }));
  },

  updateRoutine: (routineId, updates) => {
    set((state) => ({
      routines: state.routines.map((routine) =>
        routine.id === routineId ? { ...routine, ...updates } : routine
      )
    }));
  },

  deleteRoutine: (routineId) => {
    set((state) => ({
      routines: state.routines.filter((routine) => routine.id !== routineId),
      selectedRoutine: state.selectedRoutine?.id === routineId ? null : state.selectedRoutine
    }));
  },

  addProductToRoutine: (routineId, product, order) => {
    const newItem: RoutineItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      product,
      order,
      frequency: 'daily'
    };

    set((state) => ({
      routines: state.routines.map((routine) =>
        routine.id === routineId ? { ...routine, items: [...routine.items, newItem] } : routine
      )
    }));
  },

  removeProductFromRoutine: (routineId, itemId) => {
    set((state) => ({
      routines: state.routines.map((routine) =>
        routine.id === routineId
          ? { ...routine, items: routine.items.filter((item) => item.id !== itemId) }
          : routine
      )
    }));
  },

  reorderRoutineItems: (routineId, items) => {
    set((state) => ({
      routines: state.routines.map((routine) => (routine.id === routineId ? { ...routine, items } : routine))
    }));
  },

  addProgressPhoto: (photoData) => {
    const newPhoto: ProgressPhoto = {
      ...photoData,
      id: crypto.randomUUID()
    };

    set((state) => ({
      progressPhotos: [...state.progressPhotos, newPhoto]
    }));
  },

  updateProgressPhoto: (photoId, updates) => {
    set((state) => ({
      progressPhotos: state.progressPhotos.map((photo) =>
        photo.id === photoId ? { ...photo, ...updates } : photo
      )
    }));
  },

  deleteProgressPhoto: (photoId) => {
    set((state) => ({
      progressPhotos: state.progressPhotos.filter((photo) => photo.id !== photoId)
    }));
  },

  setSelectedRoutine: (routine) => {
    set({ selectedRoutine: routine });
  },

  // Computed
  getInventoryByCategory: (category) => {
    return get().inventory.filter((item) => item.product.category === category);
  },

  getRoutinesByType: (type) => {
    return get().routines.filter((routine) => routine.type === type);
  },

  getExpiringProducts: (days) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return get().inventory.filter((item) => {
      if (!item.expiryDate) return false;
      return new Date(item.expiryDate) <= futureDate;
    });
  }
}));
