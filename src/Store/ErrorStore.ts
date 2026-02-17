import { create } from 'zustand';
interface ErrorType {
    error: string | null;
    setError: (msg: string | null) => void;
}
const useErrorStore = create<ErrorType>((set) => ({
    error: null,
    setError: (msg) => set({ error: msg }),
    clearError: () => set({ error: null }),
}));
export default useErrorStore;
