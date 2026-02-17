export interface UserProfile {
    id: string;
    name: string;
    age: number;
    bio: string;
    location: string;
    images: string[];
    interests: string[];
    occupation: string;
    compatibilityScore?: number;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
}

export interface Chat {
    id: string;
    user: UserProfile;
    lastMessage: string;
    unreadCount: number;
}

/*export enum AppView {
    LANDING = 'LANDING',
    DASHBOARD = 'DASHBOARD',
    EXPLORE = 'EXPLORE',
    MESSAGES = 'MESSAGES',
    PROFILE = 'PROFILE',
}*/