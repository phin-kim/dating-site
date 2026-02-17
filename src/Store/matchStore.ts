import { create } from 'zustand';
import type { UserProfile } from '../types/profile';
type Matches = {
    matches: UserProfile[];
    addMatch: (match: UserProfile) => void;
    clearMatches: () => void;
};
const useMatches = create<Matches>((set) => ({
    matches: [],
    addMatch: (user) =>
        set((state) => ({
            matches: state.matches.some((match) => match.id === user.id)
                ? state.matches
                : [user, ...state.matches],
        })),
    clearMatches: () => set({ matches: [] }),
}));
export default useMatches;
