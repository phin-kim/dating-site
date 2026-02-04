export type FormMode = 'login' | 'signup';

export interface SignupData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export interface LoginData {
    email: string;
    password: string;
}
export type User = {
    id: string;
    email: string;
    role: 'user' | 'admin' | 'moderator';
};
export type AuthResponse = {
    success: boolean;
    accessToken: string;
    user: User;
};
