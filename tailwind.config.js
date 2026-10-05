import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		logs: true,
		themes: ['light', 'dark']
	},
	theme: {
		extend: {
			colors: {
				tblack: '#0c1323',
				torange: '#d69b4d',
				tblue: '#3b6e9e',
				tteal: '#6894ba',
				twhite: '#ffffff'
			},
			keyframes: {
				'spin-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'spin-slow': 'spin-slow 10s linear infinite'
			}
		}
	},
	plugins: [daisyui]
};
