import forms from '@tailwindcss/forms';
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './tsx-folder/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            
            fontFamily: {
                sans: [
                    'system-ui',
                    'Avenir',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
                poppins: ['Poppins', 'sans-serif'],
                nunito:["Nunito","sans-serif"],
                dancing:["var(--font-display)"]
            },
            
        },
    },
    plugins: [forms],
};
