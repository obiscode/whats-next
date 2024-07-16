import create from "zustand";

interface TimerState {
  duration: number;
  isFocused: boolean;
  isPaused: boolean;
  setDuration: (duration: number) => void;
  startFocus: () => void;
  endFocus: () => void;
  togglePause: () => void;
  reset: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  duration: 0,
  isFocused: false,
  isPaused: true,
  setDuration: (duration) => set({ duration }),
  startFocus: () =>
    set((state) => ({
      isFocused: true,
      isPaused: false,
    })),
  endFocus: () =>
    set((state) => ({
      isFocused: false,
      isPaused: true,
      duration: 0,
    })),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  reset: () =>
    set((state) => ({ isPaused: true, isFocused: false, duration: 0 })),
}));
