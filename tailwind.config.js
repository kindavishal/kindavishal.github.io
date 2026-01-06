/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // Indigo 500
                "background-light": "#F8FAFC",
                "background-dark": "#0A0A0A",
                "surface-light": "#FFFFFF",
                "surface-dark": "#1A1A1A",
                "accent-green": "#10B981",
                "accent-orange": "#F59E0B",
                "accent-purple": "#8B5CF6",
                "text-light": "#1F2937",
                "text-dark": "#E5E7EB",
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
            borderRadius: {
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            animation: {
                'zoomIn': 'zoomIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
            keyframes: {
                zoomIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                }
            },
            animation: {
                'zoomIn': 'zoomIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                'blob': 'blob 7s infinite',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
