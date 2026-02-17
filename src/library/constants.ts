import type { UserProfile } from '../types/profile';

export const MOCK_USERS: UserProfile[] = [
    {
        id: '1',
        name: 'Seraphina',
        age: 26,
        bio: 'Architect by day, salsa dancer by night. Looking for someone who can appreciate a good brunch and deep conversations about urban design.',
        location: 'San Francisco, CA',
        images: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
        ],
        interests: ['Architecture', 'Salsa', 'Brunch', 'Travel'],
        occupation: 'Architect',
        compatibilityScore: 94,
    },
    {
        id: '2',
        name: 'Julian',
        age: 29,
        bio: 'Software engineer who loves mountain biking and craft beer. I make a mean sourdough starter.',
        location: 'Austin, TX',
        images: [
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
        ],
        interests: ['Coding', 'Cycling', 'Craft Beer', 'Baking'],
        occupation: 'Lead Engineer',
        compatibilityScore: 88,
    },
    {
        id: '3',
        name: 'Amara',
        age: 24,
        bio: 'Digital nomad and yoga enthusiast. I believe in positive energy and exploring every hidden gem in the city.',
        location: 'Miami, FL',
        images: [
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        ],
        interests: ['Yoga', 'Travel', 'Photography', 'Veganism'],
        occupation: 'UX Designer',
        compatibilityScore: 76,
    },
    {
        id: '4',
        name: 'Elena',
        age: 28,
        bio: 'Art historian with a penchant for 19th-century poetry and street photography. Let’s go to a gallery!',
        location: 'New York, NY',
        images: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        ],
        interests: ['Art', 'Museums', 'Poetry', 'Vinyl'],
        occupation: 'Curator',
        compatibilityScore: 91,
    },
    {
        id: '5',
        name: 'Marcus',
        age: 31,
        bio: 'Chef de cuisine. I spend most of my time in the kitchen but I love getting lost in a good book outdoors.',
        location: 'Chicago, IL',
        images: [
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
        ],
        interests: ['Cooking', 'Reading', 'Jazz', 'Hiking'],
        occupation: 'Head Chef',
        compatibilityScore: 82,
    },
    {
        id: '6',
        name: 'Chloe',
        age: 25,
        bio: 'Aspiring pilot. I love heights and high speeds. When I am on the ground, I am probably playing tennis.',
        location: 'Seattle, WA',
        images: [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
        ],
        interests: ['Flying', 'Tennis', 'Adrenaline', 'Dogs'],
        occupation: 'Pilot In Training',
        compatibilityScore: 85,
    },
];

export const PRIMARY_GRADIENT =
    'bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400';
