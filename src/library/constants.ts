import type { UserProfile } from '../types/profile';

export const MOCK_USERS: UserProfile[] = [
    {
        id: '1',
        name: 'Seraphina',
        age: 26,
        bio: 'Architect by day, salsa dancer by night. Looking for someone who can appreciate a good brunch and deep conversations about urban design.',
        location: 'San Francisco, CA',
        images: ['https://picsum.photos/seed/sera/600/800'],
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
        images: ['https://picsum.photos/seed/julian/600/800'],
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
        images: ['https://picsum.photos/seed/amara/600/800'],
        interests: ['Yoga', 'Travel', 'Photography', 'Veganism'],
        occupation: 'UX Designer',
        compatibilityScore: 76,
    },
];

export const PRIMARY_GRADIENT =
    'bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400';
