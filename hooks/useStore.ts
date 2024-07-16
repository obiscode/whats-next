import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the types
export interface HistoryItem {
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: string;
}

interface CurrentListSlice {
  currentList: string[];
  addToList: (item: string) => void;
  removeFromList: (item: string) => void;
}

interface HistoryListSlice {
  historyList: HistoryItem[];
  addToHistory: (item: HistoryItem) => void;
}

interface SharedSlice {
  clearAll: () => void;
}

// Function to split a string by line breaks
const splitStringByLineBreaks = (input: string): string[] => {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
};

// Create the slices
const createCurrentListSlice: StateCreator<
  CurrentListSlice & HistoryListSlice & SharedSlice,
  [],
  [],
  CurrentListSlice
> = (set) => ({
  currentList: [],
  addToList: (item) =>
    set((state) => ({
      currentList: [...state.currentList, ...splitStringByLineBreaks(item)],
    })),
  removeFromList: (item) =>
    set((state) => ({
      currentList: state.currentList.filter((i) => i !== item),
    })),
});

const createHistoryListSlice: StateCreator<
  CurrentListSlice & HistoryListSlice & SharedSlice,
  [],
  [],
  HistoryListSlice
> = (set) => ({
  historyList: [],
  addToHistory: (item) => {
    const newItem = { ...item };
    set((state) => ({ historyList: [...state.historyList, newItem] }));
  },
});

const createSharedSlice: StateCreator<
  CurrentListSlice & HistoryListSlice & SharedSlice,
  [],
  [],
  SharedSlice
> = (set) => ({
  clearAll: () => set({ currentList: [], historyList: [] }),
});

// Combine slices into a single store with persist
const useStore = create<CurrentListSlice & HistoryListSlice & SharedSlice>()(
  persist(
    (set, get) => ({
      ...createCurrentListSlice(set, get),
      ...createHistoryListSlice(set, get),
      ...createSharedSlice(set, get),
    }),
    {
      name: "app-storage",
      getStorage: () => AsyncStorage,
    }
  )
);

export default useStore;
