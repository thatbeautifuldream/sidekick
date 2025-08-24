import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UrlState {
  currentUrl: string;
  inputUrl: string;
  history: string[];
  historyIndex: number;
  setCurrentUrl: (url: string) => void;
  setInputUrl: (url: string) => void;
  setHistory: (history: string[]) => void;
  setHistoryIndex: (index: number) => void;
  addToHistory: (url: string) => void;
  goBack: () => void;
  goForward: () => void;
}

export const useUrlStore = create<UrlState>()(
  persist(
    (set, get) => ({
      currentUrl: "https://jsonvisualiser.com",
      inputUrl: "https://jsonvisualiser.com",
      history: ["https://jsonvisualiser.com"],
      historyIndex: 0,

      setCurrentUrl: (url: string) => set({ currentUrl: url }),
      setInputUrl: (url: string) => set({ inputUrl: url }),
      setHistory: (history: string[]) => set({ history }),
      setHistoryIndex: (index: number) => set({ historyIndex: index }),

      addToHistory: (url: string) => {
        const { history, historyIndex } = get();
        if (url !== history[historyIndex]) {
          const newHistory = [...history.slice(0, historyIndex + 1), url];
          set({
            history: newHistory,
            historyIndex: newHistory.length - 1,
          });
        }
      },

      goBack: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          const url = history[newIndex];
          set({
            historyIndex: newIndex,
            currentUrl: url,
            inputUrl: url,
          });
        }
      },

      goForward: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          const url = history[newIndex];
          set({
            historyIndex: newIndex,
            currentUrl: url,
            inputUrl: url,
          });
        }
      },
    }),
    {
      name: "url-storage", // unique name for localStorage key
    }
  )
);
