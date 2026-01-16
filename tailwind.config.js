import flyonui from 'flyonui';
import flyonuiPlugin from 'flyonui/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flyonui/dist/js/*.js'],
    plugins: [
        flyonui,
        flyonuiPlugin
    ]
};
