/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'background': '#363539',
                'background-2': '#2c2c34',
                'secondary': '#1b1236',
                'primary': '#50379a',
                'accent': '#776aa0',
                'text': '#e9e5f6',
            }
        },
    },
    plugins: [],
};
