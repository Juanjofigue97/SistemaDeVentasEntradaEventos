// tailwind.config.js
export default {
    darkMode: 'class', // Esto es fundamental
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    light: '#ffffff',
                    dark: '#111827',
                },
                primary: {
                    DEFAULT: '#ef4444',
                },
            },
        },
    },
    plugins: [],
}
